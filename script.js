// 모바일 메뉴 토글
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// 네비게이션 링크 클릭 시 메뉴 닫기
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// 스크롤 시 헤더 스타일 변경
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// 폼 제출 처리
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // 제출 버튼 비활성화 및 로딩 표시
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = '전송 중...';
        
        try {
            // 환경에 따른 API 엔드포인트 설정
            // 개발 환경: localhost, 프로덕션: 실제 백엔드 서버 URL
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const API_BASE_URL = isLocalhost 
                ? 'http://localhost:3000' 
                : 'https://여기에_백엔드_서버_URL_입력'; // 예: https://cheonwoo-api.railway.app
            
            // 백엔드 API로 데이터 전송
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert('문의가 접수되었습니다.\n빠른 시일 내에 연락드리겠습니다.');
                contactForm.reset();
            } else {
                alert('오류가 발생했습니다: ' + (result.message || '알 수 없는 오류'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버 연결 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.');
        } finally {
            // 제출 버튼 다시 활성화
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션 대상 요소들
const animateElements = document.querySelectorAll('.service-card, .product-category, .stat-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 숫자 카운트 애니메이션
const statNumbers = document.querySelectorAll('.stat-number');
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = entry.target.textContent.replace(/\D/g, '');
            const suffix = entry.target.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current) + suffix;
                }
            }, 20);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    countObserver.observe(stat);
});

