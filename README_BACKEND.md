# 천우무역 백엔드 서버 설정 가이드

## 📋 프로젝트 구조

```
cheonwoo-trading/
├── index.html          # 프론트엔드 (기존)
├── style.css          # 스타일 (기존)
├── script.js          # 프론트엔드 JavaScript (수정됨)
├── server.js           # 백엔드 서버 (새로 생성)
├── database.sql       # 데이터베이스 스키마 (새로 생성)
├── package.json       # Node.js 의존성 (새로 생성)
├── .env.example       # 환경 변수 예시 (새로 생성)
└── .env               # 환경 변수 (직접 생성 필요)
```

## 🚀 설치 및 실행 방법

### 1단계: Node.js 설치

1. [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드
2. 설치 완료 후 터미널에서 확인:
   ```bash
   node --version
   npm --version
   ```

### 2단계: 프로젝트 의존성 설치

프로젝트 폴더에서 실행:
```bash
npm install
```

### 3단계: MariaDB 데이터베이스 설정

#### DBeaver에서 실행:

1. **DBeaver 실행**
2. **MariaDB 연결 생성** (아직 없으면)
   - 호스트: `localhost` (또는 MariaDB 서버 주소)
   - 포트: `3306`
   - 사용자명: MariaDB 사용자명
   - 비밀번호: MariaDB 비밀번호
3. **데이터베이스 생성 및 테이블 생성:**
   - `database.sql` 파일을 DBeaver에서 열기
   - 전체 스크립트 실행 (Ctrl+Enter 또는 실행 버튼)
   - 또는 SQL 편집기에서 직접 실행

#### 또는 MariaDB 클라이언트에서:

```bash
mysql -u 사용자명 -p < database.sql
```

### 4단계: 환경 변수 설정

1. **`.env.example` 파일을 복사하여 `.env` 파일 생성:**
   ```bash
   # Windows
   copy .env.example .env
   
   # Mac/Linux
   cp .env.example .env
   ```

2. **`.env` 파일을 열어서 실제 값으로 수정:**
   ```env
   PORT=3000
   DB_HOST=여기에_MariaDB_서버_주소_입력
   DB_USER=여기에_MariaDB_사용자명_입력
   DB_PASSWORD=여기에_MariaDB_비밀번호_입력
   DB_NAME=cheonwoo_trading
   DB_PORT=3306
   ```

   **예시:**
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=mypassword123
   DB_NAME=cheonwoo_trading
   DB_PORT=3306
   ```

### 5단계: 백엔드 서버 실행

```bash
npm start
```

또는 개발 모드 (자동 재시작):
```bash
npm run dev
```

**성공 메시지:**
```
✅ MariaDB 연결 성공
🚀 서버가 http://localhost:3000 에서 실행 중입니다.
📧 문의 API: http://localhost:3000/api/contact
```

### 6단계: 프론트엔드 실행

백엔드 서버가 실행 중인 상태에서:
- 브라우저에서 `index.html` 파일 열기
- 또는 로컬 서버 실행:
  ```bash
  python -m http.server 8080
  ```
- 브라우저에서 `http://localhost:8080` 접속

## 📊 데이터베이스 구조

### contacts 테이블

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| id | INT | 자동 증가 기본키 |
| name | VARCHAR(100) | 이름 (필수) |
| email | VARCHAR(255) | 이메일 (필수) |
| phone | VARCHAR(20) | 전화번호 (선택) |
| subject | VARCHAR(255) | 제목 (선택) |
| message | TEXT | 메시지 (필수) |
| created_at | DATETIME | 등록일시 (자동) |
| updated_at | DATETIME | 수정일시 (자동) |

## 🔌 API 엔드포인트

### POST /api/contact
문의하기 폼 제출

**요청:**
```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "phone": "010-1234-5678",
  "subject": "문의 제목",
  "message": "문의 내용"
}
```

**응답 (성공):**
```json
{
  "success": true,
  "message": "문의가 성공적으로 접수되었습니다.",
  "id": 1
}
```

**응답 (실패):**
```json
{
  "success": false,
  "message": "오류 메시지"
}
```

### GET /api/contacts
문의 목록 조회 (관리자용)

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "홍길동",
      "email": "hong@example.com",
      "phone": "010-1234-5678",
      "subject": "문의 제목",
      "message": "문의 내용",
      "created_at": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

## 🔍 DBeaver에서 데이터 확인

1. DBeaver에서 `cheonwoo_trading` 데이터베이스 선택
2. `contacts` 테이블 우클릭 > "데이터 보기"
3. 저장된 문의 데이터 확인

## ⚠️ 문제 해결

### MariaDB 연결 실패
- `.env` 파일의 DB 정보가 정확한지 확인
- MariaDB 서버가 실행 중인지 확인
- 방화벽 설정 확인

### 포트 충돌
- `.env` 파일에서 `PORT` 변경
- 또는 다른 포트 사용: `PORT=3001`

### CORS 오류
- `server.js`에서 `cors()` 미들웨어가 설정되어 있는지 확인
- 프론트엔드와 백엔드가 같은 포트에서 실행되는 경우 CORS 문제 없음

## 📝 다음 단계

1. ✅ 백엔드 서버 실행
2. ✅ 프론트엔드에서 문의 폼 테스트
3. ✅ DBeaver에서 데이터 확인
4. ✅ 프로덕션 환경 배포 (선택사항)

