# 검색엔진 등록 가이드

천우무역 웹사이트를 모든 주요 검색엔진에 등록하는 방법입니다.

---

## 📋 등록 순서 (권장)

1. **구글 (Google Search Console)** - 가장 중요
2. **네이버 (서치어드바이저 + 웹마스터 도구)** - 한국 필수
3. **다음 (Daum)** - 네이버와 연동
4. **빙 (Bing Webmaster Tools)** - 마이크로소프트
5. **야후 (Yahoo)** - 빙과 연동

---

## 1️⃣ 구글 (Google Search Console)

### 1-1. 접속 및 로그인

1. **[Google Search Console](https://search.google.com/search-console)** 접속
2. Google 계정으로 로그인

### 1-2. 속성 추가

1. **"속성 추가"** 클릭
2. **"URL 접두어"** 선택
3. 웹사이트 URL 입력:
   ```
   https://sunwoong4969.github.io/cheonwoo-trading/
   ```
4. **"계속"** 클릭

### 1-3. 소유권 확인

**방법 1: HTML 메타 태그 (추천)**

1. "HTML 태그" 방법 선택
2. 제공된 메타 태그 코드 복사
   - 예: `<meta name="google-site-verification" content="abc123..." />`
3. GitHub 저장소에서 `index.html` 파일 수정
4. `<head>` 섹션에서 다음 줄 찾기:
   ```html
   <meta name="google-site-verification" content="">
   ```
5. 복사한 코드로 교체:
   ```html
   <meta name="google-site-verification" content="여기에_복사한_코드">
   ```
6. GitHub에 커밋 및 푸시
7. Google Search Console에서 **"확인"** 클릭

**방법 2: HTML 파일 업로드**

1. "HTML 파일" 방법 선택
2. 제공된 HTML 파일 다운로드
3. GitHub 저장소에 업로드
4. Google에서 **"확인"** 클릭

### 1-4. 사이트맵 제출

1. 왼쪽 메뉴에서 **"Sitemaps"** 클릭
2. **"새 사이트맵 추가"** 클릭
3. 사이트맵 URL 입력:
   ```
   sitemap.xml
   ```
4. **"제출"** 클릭

### 1-5. robots.txt 확인

1. 왼쪽 메뉴에서 **"robots.txt 테스터"** 클릭
2. `robots.txt` 파일이 정상적으로 읽히는지 확인

---

## 2️⃣ 네이버 (서치어드바이저)

자세한 내용은 `NAVER_REGISTRATION.md` 파일 참고

### 빠른 등록 방법:

1. **[네이버 서치어드바이저](https://searchad.naver.com/webmaster)** 접속
2. **"사이트 추가"** 클릭
3. URL 입력: `https://sunwoong4969.github.io/cheonwoo-trading/`
4. 소유권 확인 (HTML 메타 태그 방법)
5. `index.html`에 메타 태그 추가
6. 사이트맵 제출: `sitemap.xml`

### 추가 등록:

- **[네이버 웹마스터 도구](https://searchadvisor.naver.com)**에도 동일하게 등록 권장

---

## 3️⃣ 다음 (Daum)

### 3-1. 접속 및 등록

1. **[다음 검색 등록](https://register.search.daum.net/index.daum)** 접속
2. 다음 계정으로 로그인 (없으면 회원가입)
3. **"사이트 등록"** 클릭
4. 웹사이트 URL 입력:
   ```
   https://sunwoong4969.github.io/cheonwoo-trading/
   ```
5. 사이트 정보 입력:
   - 사이트명: 천우무역
   - 카테고리: 비즈니스/경제 > 무역/수출입
   - 설명: 한국과 중국을 중심으로 한 전문 무역 서비스
6. **"등록"** 클릭

### 3-2. 확인

- 다음은 자동으로 크롤링합니다
- 등록 후 1-2주 내에 검색 결과에 나타남

---

## 4️⃣ 빙 (Bing Webmaster Tools)

### 4-1. 접속 및 로그인

1. **[Bing Webmaster Tools](https://www.bing.com/webmasters)** 접속
2. Microsoft 계정으로 로그인 (없으면 회원가입)

### 4-2. 사이트 추가

1. **"Add a site"** 또는 **"사이트 추가"** 클릭
2. 웹사이트 URL 입력:
   ```
   https://sunwoong4969.github.io/cheonwoo-trading/
   ```
3. **"Add"** 클릭

### 4-3. 소유권 확인

**방법 1: 메타 태그**

1. "Meta tag" 방법 선택
2. 제공된 메타 태그 복사
3. `index.html`의 `<head>` 섹션에 추가
4. GitHub에 커밋 및 푸시
5. Bing에서 **"Verify"** 클릭

**방법 2: XML 파일**

1. "XML file" 방법 선택
2. 제공된 XML 파일 다운로드
3. GitHub 저장소에 업로드
4. Bing에서 **"Verify"** 클릭

### 4-4. 사이트맵 제출

1. 왼쪽 메뉴에서 **"Sitemaps"** 클릭
2. 사이트맵 URL 입력:
   ```
   https://sunwoong4969.github.io/cheonwoo-trading/sitemap.xml
   ```
3. **"Submit"** 클릭

---

## 5️⃣ 야후 (Yahoo)

### 자동 연동

- **Bing Webmaster Tools에 등록하면 자동으로 야후에도 등록됩니다**
- 별도 등록 불필요

---

## 6️⃣ 기타 검색엔진

### 네이버 블로그/카페 등록

1. 네이버 블로그에 회사 소개 글 작성
2. 웹사이트 링크 포함
3. 네이버 카페 관련 카테고리에 가입 후 홍보

### 다음 카페 등록

1. 다음 카페 관련 카테고리에 가입
2. 회사 소개 및 웹사이트 링크 게시

---

## 📝 체크리스트

### 필수 등록 (우선순위 높음)
- [ ] 구글 Search Console 등록
- [ ] 네이버 서치어드바이저 등록
- [ ] 네이버 웹마스터 도구 등록
- [ ] 빙 Webmaster Tools 등록

### 선택 등록
- [ ] 다음 검색 등록
- [ ] 네이버 블로그 작성
- [ ] 다음 카페 등록

### 파일 준비
- [ ] `robots.txt` 파일 생성 완료 ✅
- [ ] `sitemap.xml` 파일 확인 ✅
- [ ] `index.html`에 메타 태그 추가 준비

---

## 🔧 index.html 메타 태그 추가 방법

각 검색엔진에서 제공하는 메타 태그를 `index.html`의 `<head>` 섹션에 추가하세요:

```html
<head>
    <!-- 기존 메타 태그들... -->
    
    <!-- 구글 검증 -->
    <meta name="google-site-verification" content="구글에서_받은_코드">
    
    <!-- 네이버 검증 -->
    <meta name="naver-site-verification" content="네이버에서_받은_코드">
    
    <!-- 빙 검증 (필요시) -->
    <meta name="msvalidate.01" content="빙에서_받은_코드">
</head>
```

---

## ⏰ 검색 등록 소요 시간

| 검색엔진 | 소요 시간 | 비고 |
|---------|---------|------|
| 구글 | 1-2주 | 가장 느리지만 가장 중요 |
| 네이버 | 1-3일 | 한국에서 가장 빠름 |
| 다음 | 1-2주 | 자동 크롤링 |
| 빙/야후 | 1-2주 | Bing 등록 시 Yahoo 자동 연동 |

---

## ✅ 등록 확인 방법

### 구글
```
site:sunwoong4969.github.io/cheonwoo-trading
```

### 네이버
```
site:sunwoong4969.github.io/cheonwoo-trading
```

### 다음
```
site:sunwoong4969.github.io/cheonwoo-trading
```

### 빙
```
site:sunwoong4969.github.io/cheonwoo-trading
```

---

## 💡 SEO 최적화 팁

1. **정기적인 콘텐츠 업데이트**
   - 블로그나 뉴스 섹션 추가
   - 최신 정보 업데이트

2. **백링크 구축**
   - 관련 사이트에 링크 등록
   - 소셜 미디어 공유

3. **모바일 최적화**
   - 반응형 디자인 확인 ✅

4. **페이지 속도 최적화**
   - 이미지 최적화
   - CSS/JS 압축

5. **로컬 SEO**
   - Google My Business 등록 (실제 주소가 있다면)
   - 지역 키워드 최적화

---

## 🆘 문제 해결

### "소유권 확인 실패"
- 파일 저장 후 몇 분 기다리기
- 메타 태그가 정확히 복사되었는지 확인
- `<head>` 섹션 안에 있는지 확인
- GitHub Pages가 업데이트되었는지 확인 (1-2분 소요)

### "사이트맵 오류"
- `sitemap.xml` 파일이 GitHub에 업로드되었는지 확인
- 브라우저에서 직접 접속해서 확인:
  ```
  https://sunwoong4969.github.io/cheonwoo-trading/sitemap.xml
  ```

### "크롤링이 안 됨"
- `robots.txt` 파일 확인
- 사이트맵 제출 확인
- 몇 주 기다리기 (검색엔진마다 다름)

---

## 📚 참고 자료

- [Google Search Console 도움말](https://support.google.com/webmasters)
- [네이버 서치어드바이저 도움말](https://help.naver.com/service/5632)
- [Bing Webmaster Tools 도움말](https://www.bing.com/webmasters/help)

---

**작성일:** 2024년
**웹사이트:** https://sunwoong4969.github.io/cheonwoo-trading/



