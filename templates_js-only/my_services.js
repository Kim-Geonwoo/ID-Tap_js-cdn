
document.addEventListener('DOMContentLoaded', function() {
    const serviceModal = document.getElementById('serviceModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // 모달 열기
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        serviceModal.style.display = 'block';
    });

    // 모달 닫기 (X 버튼)
    closeModalBtn.addEventListener('click', () => {
        serviceModal.style.display = 'none';
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            serviceModal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 각 서비스에 대해 URL 가져오기
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const serviceUuid = card.dataset.serviceUuid;
        const publicUrlInput = card.querySelector(`#public-url-${serviceUuid}`);
        const previewLink = card.querySelector(`[data-preview-link-${serviceUuid}]`);

        async function fetchServiceUrls() {
            if (!serviceUuid) {
                console.error('서비스 UUID가 없습니다.');
                return;
            }

            try {
                const response = await fetch(`/get_service_url/${serviceUuid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (data.success) {
                    if (publicUrlInput) publicUrlInput.value = data.public_url;
                    if (previewLink) previewLink.href = data.preview_url;
                } else {
                    console.error('URL 가져오기 실패:', data.message);
                }
            } catch (error) {
                console.error('URL 요청 중 오류:', error);
            }
        }

        // URL 가져오기
        fetchServiceUrls();
    });

    function copyToClipboard(elementId) {
        const copyText = document.getElementById(elementId);
        copyText.select();
        copyText.setSelectionRange(0, 99999); // 모바일 지원

        navigator.clipboard.writeText(copyText.value).then(() => {
            alert('링크가 복사되었습니다.');
        }).catch(err => {
            console.error('복사 실패:', err);
            alert('링크 복사에 실패했습니다.');
        });
    }

    function shareViaEmail(publicUrl) {
        const subject = encodeURIComponent('내 프로필 링크 공유');
        const body = encodeURIComponent(publicUrl);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    function shareViaWhatsApp(publicUrl) {
        const text = encodeURIComponent(`내 프로필을 확인해보세요: ${publicUrl}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }

    // 전역 함수 설정
    window.copyToClipboard = copyToClipboard;
    window.shareViaEmail = shareViaEmail;
    window.shareViaWhatsApp = shareViaWhatsApp;
});

    document.addEventListener('DOMContentLoaded', function() {
        // 제한 안내 모달 관리
        const limitInfoModal = document.getElementById('limitInfoModal');
        const limitInfoBtn = document.getElementById('limitInfoBtn');
        const closeLimitModalBtn = document.getElementById('closeLimitModalBtn');
    
        limitInfoBtn.addEventListener('click', () => {
            limitInfoModal.style.display = 'block';
        });
    
        closeLimitModalBtn.addEventListener('click', () => {
            limitInfoModal.style.display = 'none';
        });
    
        window.addEventListener('click', (e) => {
            if (e.target === limitInfoModal) {
                limitInfoModal.style.display = 'none';
            }
        });
    
        // 배포 버튼 상태 관리
        const deployButtons = document.querySelectorAll('.deploy-btn');
        const deleteDeployButtons = document.querySelectorAll('.delete-deploy-btn');
    
        deployButtons.forEach(btn => {
            if (btn.hasAttribute('disabled')) {
                btn.classList.add('btn-secondary');
                btn.classList.remove('btn-primary');
            }
        });
    
        deleteDeployButtons.forEach(btn => {
            if (btn.hasAttribute('disabled')) {
                btn.classList.add('btn-outline-secondary');
                btn.classList.remove('btn-danger');
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const loadingOverlay = document.getElementById('loadingOverlay');
    
        // 모든 폼에 대한 로딩 처리
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                // 이미 로딩 중이면 중복 제출 방지
                if (this.classList.contains('loading')) {
                    e.preventDefault();
                    return;
                }
    
                // 제출 버튼 로딩 상태로 변경
                const submitButton = this.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.classList.add('loading');
                }
    
                // 로딩 오버레이 표시
                loadingOverlay.style.display = 'flex';
    
                // 타임아웃 설정 (네트워크 오류 대비)
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    if (submitButton) {
                        submitButton.classList.remove('loading');
                    }
                }, 30000); // 30초 후 로딩 해제
            });
        });
    
        // 서비스 생성 모달 폼 추가 로딩 처리
        const serviceModal = document.getElementById('serviceModal');
        if (serviceModal) {
            const serviceForm = serviceModal.querySelector('form');
            if (serviceForm) {
                serviceForm.addEventListener('submit', function(e) {
                    // 이미 로딩 중이면 중복 제출 방지
                    if (this.classList.contains('loading')) {
                        e.preventDefault();
                        return;
                    }
    
                    // 제출 버튼 로딩 상태로 변경
                    const submitButton = this.querySelector('button[type="submit"]');
                    if (submitButton) {
                        submitButton.classList.add('loading');
                    }
    
                    // 로딩 오버레이 표시
                    loadingOverlay.style.display = 'flex';
    
                    // 타임아웃 설정 (네트워크 오류 대비)
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                        if (submitButton) {
                            submitButton.classList.remove('loading');
                        }
                    }, 30000); // 30초 후 로딩 해제
                });
            }
        }
    
        // AJAX 요청 시 글로벌 로딩 처리
        const originalFetch = window.fetch;
        window.fetch = function() {
            loadingOverlay.style.display = 'flex';
            return originalFetch.apply(this, arguments)
                .finally(() => {
                    loadingOverlay.style.display = 'none';
                });
        };
    });