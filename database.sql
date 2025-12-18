-- MariaDB 데이터베이스 스키마 
-- DBeaver에서 실행하거나 MariaDB 클라이언트에서 실행

-- 데이터베이스 생성 (이미 있으면 생략 가능)
CREATE DATABASE IF NOT EXISTS cheonwoo_trading 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 데이터베이스 사용
USE cheonwoo_trading;

-- 문의 테이블 생성
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '이름',
    email VARCHAR(255) NOT NULL COMMENT '이메일',
    phone VARCHAR(20) COMMENT '전화번호',
    subject VARCHAR(255) COMMENT '제목',
    message TEXT NOT NULL COMMENT '메시지',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='문의 테이블';

-- 테이블 확인
SELECT * FROM contacts;

