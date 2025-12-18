# 네이버 검색 등록 가이드

## 📝 네이버 서치어드바이저 등록

### 1단계: 네이버 서치어드바이저 접속

1. **[네이버 서치어드바이저](https://searchad.naver.com)** 접속
2. 네이버 계정으로 로그인
   - 네이버 계정이 없으면 회원가입 필요

### 2단계: 웹마스터 도구 접속

1. 로그인 후 상단 메뉴에서 **"웹마스터 도구"** 클릭
   - 또는 직접 접속: https://searchad.naver.com/webmaster

### 3단계: 사이트 추가

1. **"사이트 추가"** 또는 **"사이트 등록"** 버튼 클릭
2. 웹사이트 URL 입력:
   ```
   https://sunwoong4969.github.io/cheonwoo-trading/
   ```
3. **"확인"** 또는 **"등록"** 버튼 클릭

### 4단계: 소유권 확인

네이버는 여러 확인 방법을 제공합니다:

**방법 1: HTML 메타 태그 (추천)**

1. "HTML 메타 태그" 방법 선택
2. 제공된 메타 태그 코드 복사
   - 예: `<meta name="naver-site-verification" content="abc123..." />`
3. GitHub 저장소로 이동:
   ```
   https://github.com/sunwoong4969/cheonwoo-trading
   ```
4. **`index.html`** 파일 클릭
5. 오른쪽 상단의 **연필 아이콘(✏️)** 클릭
6. `<head>` 섹션에서 다음 줄 찾기:
   ```html
   <meta name="naver-site-verification" content="">
   ```
7. 이 줄을 복사한 메타 태그로 교체:
   ```html
   <meta name="naver-site-verification" content="여기에_복사한_코드">
   ```
8. 페이지 하단에서 **"Commit changes"** 클릭
9. 네이버 서치어드바이저로 돌아가서 **"확인"** 클릭

**방법 2: HTML 파일 업로드**

1. "HTML 파일" 방법 선택
2. 제공된 HTML 파일 다운로드
3. GitHub 저장소에서 **"Add file"** > **"Upload files"** 선택
4. 다운로드한 파일 업로드
5. **"Commit changes"** 클릭
6. 네이버에서 **"확인"** 클릭

### 5단계: 사이트맵 제출

소유권 확인 완료 후:

1. 왼쪽 메뉴에서 **"요청"** 클릭
2. **"사이트맵 제출"** 선택
3. 사이트맵 URL 입력:
   ```
   sitemap.xml
   ```
   - 또는 전체 URL: `https://sunwoong4969.github.io/cheonwoo-trading/sitemap.xml`
4. **"확인"** 또는 **"제출"** 클릭

---

## 🔍 네이버 웹마스터 도구 (추가 등록)

네이버에는 두 가지 도구가 있습니다:

### 1. 네이버 서치어드바이저 (위에서 등록)
- URL: https://searchad.naver.com/webmaster
- 검색 광고와 연계된 도구

### 2. 네이버 웹마스터 도구 (추가 등록 권장)
- URL: https://searchadvisor.naver.com
- 순수 검색 최적화 도구

**추가 등록 방법:**
1. [네이버 웹마스터 도구](https://searchadvisor.naver.com) 접속
2. 사이트 등록
3. 소유권 확인 (동일한 방법)
4. 사이트맵 제출

---

## ⏰ 검색 등록 소요 시간

- **네이버**: 1-3일 (구글보다 빠름!)
- 사이트맵 제출 후 크롤링 시작
- 검색 결과에 나타나기 시작

---

## ✅ 확인 방법

### 네이버에서 사이트 검색:
```
site:sunwoong4969.github.io/cheonwoo-trading
```

### 검색어로 검색:
- "천우무역" 검색
- "군산 천우무역" 검색
- 1-3일 후 결과에 나타나기 시작

---

## 📋 체크리스트

- [ ] 네이버 서치어드바이저 접속
- [ ] 웹마스터 도구 > 사이트 추가
- [ ] 웹사이트 URL 입력: `https://sunwoong4969.github.io/cheonwoo-trading/`
- [ ] 소유권 확인 (HTML 메타 태그 방법)
- [ ] GitHub에서 `index.html` 수정
- [ ] 네이버에서 확인 완료
- [ ] 사이트맵 제출: `sitemap.xml`
- [ ] 네이버 웹마스터 도구에도 추가 등록 (선택사항)

---

## 💡 팁

1. **네이버는 구글보다 빠르게 인덱싱합니다**
   - 보통 1-3일 내에 검색 결과에 나타남

2. **두 가지 도구 모두 등록하는 것을 권장**
   - 네이버 서치어드바이저
   - 네이버 웹마스터 도구

3. **사이트맵은 동일하게 제출**
   - `sitemap.xml` 또는 전체 URL

---

## 🆘 문제 해결

### "확인 실패" 오류:
- 파일 저장 후 몇 분 기다리기
- 메타 태그가 정확히 복사되었는지 확인
- `<head>` 섹션 안에 있는지 확인

### 사이트맵 오류:
- `sitemap.xml` 파일이 GitHub에 업로드되었는지 확인
- 브라우저에서 직접 접속해서 확인:
  ```
  https://sunwoong4969.github.io/cheonwoo-trading/sitemap.xml
  ```

