// 백엔드 서버 (Node.js + Express)
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
// CORS 설정: GitHub Pages 도메인 허용
const corsOptions = {
    origin: [
        'https://sunwoong4969.github.io',  // GitHub Pages 도메인
        'http://localhost:8080',            // 로컬 개발 환
        'http://127.0.0.1:8080'             // 로컬 개발 환경
    ],
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

