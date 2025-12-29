// 백엔드 서버 (Node.js + Express)
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
// CORS 설정: GitHub Pages + 커스텀 도메인 허용
const defaultAllowedOrigins = [
    'https://sunwoong4969.github.io', // GitHub Pages 도메인
    'http://localhost:8080',          // 로컬 개발 환경
    'http://127.0.0.1:8080'           // 로컬 개발 환경
];

const envAllowedOrigins = (process.env.FRONTEND_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

const allowedOrigins = new Set([...defaultAllowedOrigins, ...envAllowedOrigins]);

const corsOptions = {
    origin: (origin, callback) => {
        // 일부 환경(예: 서버 간 호출)에서 Origin이 없을 수 있음
        if (!origin) return callback(null, true);
        if (allowedOrigins.has(origin)) return callback(null, true);
        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MariaDB 연결 풀 생성
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 연결 테스트
pool.getConnection()
    .then(connection => {
        console.log('✅ MariaDB 연결 성공');
        connection.release();
    })
    .catch(err => {
        console.error('❌ MariaDB 연결 실패:', err.message);
    });

// Twilio 클라이언트 초기화
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    console.log('✅ Twilio 클라이언트 초기화 완료');
} else {
    console.warn('⚠️ Twilio 환경 변수가 설정되지 않았습니다. SMS 알림 기능이 비활성화됩니다.');
}

// Twilio SMS 전송 함수
async function sendSMSNotification(contactData) {
    if (!twilioClient || !process.env.TWILIO_PHONE_NUMBER || !process.env.ADMIN_PHONE_NUMBER) {
        console.warn('⚠️ Twilio 설정이 완료되지 않아 SMS를 전송할 수 없습니다.');
        return false;
    }

    try {
        const message = `[군산 천우무역] 새로운 문의가 접수되었습니다.\n\n` +
                       `이름: ${contactData.name}\n` +
                       `이메일: ${contactData.email}\n` +
                       (contactData.phone ? `전화번호: ${contactData.phone}\n` : '') +
                       (contactData.subject ? `제목: ${contactData.subject}\n` : '') +
                       `메시지: ${contactData.message.substring(0, 100)}${contactData.message.length > 100 ? '...' : ''}`;

        // 여러 전화번호 지원 (쉼표로 구분)
        const phoneNumbers = process.env.ADMIN_PHONE_NUMBER
            .split(',')
            .map(num => num.trim())
            .filter(num => num.length > 0);

        // 각 번호로 SMS 전송
        const results = await Promise.allSettled(
            phoneNumbers.map(phoneNumber => 
                twilioClient.messages.create({
                    body: message,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: phoneNumber
                })
            )
        );

        // 결과 확인
        let successCount = 0;
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`✅ SMS 전송 성공 [${phoneNumbers[index]}]:`, result.value.sid);
                successCount++;
            } else {
                console.error(`❌ SMS 전송 실패 [${phoneNumbers[index]}]:`, result.reason.message);
            }
        });

        return successCount > 0;
    } catch (error) {
        console.error('❌ SMS 전송 실패:', error.message);
        return false;
    }
}

// 문의하기 API 엔드포인트
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        
        // 입력값 검증
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: '이름, 이메일, 메시지는 필수 입력 항목입니다.'
            });
        }
        
        // 이메일 형식 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: '올바른 이메일 형식이 아닙니다.'
            });
        }
        
        // 데이터베이스에 저장
        const connection = await pool.getConnection();
        
        try {
            const [result] = await connection.execute(
                `INSERT INTO contacts (name, email, phone, subject, message, created_at) 
                 VALUES (?, ?, ?, ?, ?, NOW())`,
                [name, email, phone || null, subject || null, message]
            );
            
            console.log('✅ 문의 저장 성공:', result.insertId);
            
            // Twilio SMS 알림 전송 (비동기, 실패해도 응답은 정상 반환)
            sendSMSNotification({ name, email, phone, subject, message })
                .catch(err => {
                    console.error('SMS 전송 중 오류 (무시됨):', err);
                });
            
            res.json({
                success: true,
                message: '문의가 성공적으로 접수되었습니다.',
                id: result.insertId
            });
        } finally {
            connection.release();
        }
        
    } catch (error) {
        console.error('❌ 문의 저장 오류:', error);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        });
    }
});

// 문의 목록 조회 API (관리자용)
app.get('/api/contacts', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        
        try {
            const [rows] = await connection.execute(
                `SELECT id, name, email, phone, subject, message, created_at 
                 FROM contacts 
                 ORDER BY created_at DESC`
            );
            
            res.json({
                success: true,
                data: rows
            });
        } finally {
            connection.release();
        }
        
    } catch (error) {
        console.error('❌ 문의 목록 조회 오류:', error);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.'
        });
    }
});

// 서버 시작
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server is running. PORT=${PORT}`);
    console.log(`📧 POST /api/contact`);
    console.log(`📋 GET  /api/contacts`);
});

