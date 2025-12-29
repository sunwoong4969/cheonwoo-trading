@echo off
chcp 65001 >nul
echo ========================================
echo 군산 천우무역 웹사이트 GitHub 배포 스크립트
echo ========================================
echo.

echo [1단계] Git 설치 확인 중...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 오류: Git이 설치되어 있지 않습니다.
    echo https://git-scm.com/download/win 에서 Git을 다운로드하세요.
    pause
    exit /b 1
)
echo Git이 설치되어 있습니다.
echo.

echo [2단계] Git 초기화 중...
if exist .git (
    echo 이미 Git 저장소입니다.
) else (
    git init
    echo Git 저장소 초기화 완료.
)
echo.

echo [3단계] 파일 추가 중...
git add .
echo 파일 추가 완료.
echo.

echo [4단계] 커밋 중...
git commit -m "Update website" 2>nul
if %errorlevel% neq 0 (
    echo 변경사항이 없거나 이미 커밋되었습니다.
) else (
    echo 커밋 완료.
)
echo.

echo [5단계] 브랜치 이름 확인 중...
git branch -M main
echo.

echo ========================================
echo 다음 단계를 수동으로 진행하세요:
echo ========================================
echo.
echo 1. GitHub에서 저장소를 만드세요:
echo    https://github.com/new
echo.
echo 2. 저장소 이름: cheonwoo-trading
echo    Public 선택 (중요!)
echo.
echo 3. 저장소를 만든 후, 아래 명령어를 실행하세요:
echo    git remote add origin https://github.com/YOUR_USERNAME/cheonwoo-trading.git
echo    (YOUR_USERNAME을 본인 GitHub 사용자명으로 변경!)
echo.
echo 4. 파일 업로드:
echo    git push -u origin main
echo.
echo 5. GitHub 저장소 > Settings > Pages에서:
echo    - Source: Deploy from a branch
echo    - Branch: main
echo    - Folder: / (root)
echo    - Save 클릭
echo.
echo ========================================
pause

