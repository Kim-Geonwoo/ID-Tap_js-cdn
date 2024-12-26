
        document.addEventListener('DOMContentLoaded', function() {
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault(); // 기본 동작 방지
                    const tabName = this.dataset.tab;
        
                    // 모든 버튼 스타일 초기화
                    tabButtons.forEach(btn => {
                        btn.classList.remove('bg-blue-500', 'text-white');
                        btn.classList.add('bg-gray-300', 'text-gray-700');
                    });
        
                    // 현재 선택된 버튼 스타일 적용
                    this.classList.remove('bg-gray-300', 'text-gray-700');
                    this.classList.add('bg-blue-500', 'text-white');
        
                    // 탭 콘텐츠 토글
                    tabContents.forEach(content => {
                        content.classList.add('hidden');
                    });
                    document.getElementById(`${tabName}-tab`).classList.remove('hidden');
                });
            });
        
            // 폼 제출 시 데이터 검증
            document.getElementById('serviceForm').addEventListener('submit', function(e) {
                try {
                    // data.json 검증
                    JSON.parse(document.getElementById('json-data').value);
                    
                    // contact.json 검증
                    JSON.parse(document.getElementById('contact-data').value);
                } catch (error) {
                    e.preventDefault();
                    alert('Invalid JSON format. Please check your JSON data.');
                }
            });
        });
        
            document.addEventListener('DOMContentLoaded', function() {
                const tabButtons = document.querySelectorAll('.tab-btn');
                const itemsContainer = document.getElementById('items-container');
                const addItemBtn = document.getElementById('add-item-btn');
                const contactInputSection = document.getElementById('contact-input-section');
                const contactTextarea = document.getElementById('contact-data');
                let isDataChanged = false; // 데이터 변경 여부를 추적하는 변수
                const contactNameInput = document.getElementById('contact-fn');
                const contactPositionInput = document.getElementById('contact-position');
                const previewName = document.getElementById('preview-name');
                const previewPosition = document.getElementById('preview-position');

                // 기본 정보 입력란 변경 시 미리보기 업데이트
                contactNameInput.addEventListener('input', function() {
                    previewName.innerText = this.value || '이름을 입력하세요';
                });

                contactPositionInput.addEventListener('input', function() {
                    previewPosition.innerText = this.value || '직위를 입력하세요';
                });

            
                // 탭 전환 시 items 섹션 표시/숨김 처리
                tabButtons.forEach(button => {
                    button.addEventListener('click', function(e) {
                        const tabName = this.dataset.tab;
            
                        if (tabName === 'data') {
                            itemsContainer.closest('.mb-4').style.display = 'block';
                            addItemBtn.style.display = 'block';
                            contactInputSection.style.display = 'none';
                        } else if (tabName === 'contact') {
                            itemsContainer.closest('.mb-4').style.display = 'none';
                            addItemBtn.style.display = 'none';
                            contactInputSection.style.display = 'block';
                        }
                    });
                });
            
                // 초기 로드 시 Contact 데이터 파싱 및 렌더링
                function initContactForm() {
                    try {
                        const contactData = JSON.parse(contactTextarea.value);
                        
                        // 기본 정보 입력란
                        document.getElementById('contact-fn').value = contactData.fn || '';
                        document.getElementById('contact-birthday').value = contactData.birthday || '';
                        document.getElementById('contact-address').value = contactData.address || '';
                        document.getElementById('contact-company').value = contactData.company || '';
                        document.getElementById('contact-position').value = contactData.position || '';
                        document.getElementById('contact-url').value = contactData.url || '';
                        document.getElementById('contact-tel').value = contactData.tel || '';
                        
                        // 기본 정보 입력란
                        document.getElementById('contact-fn').value = contactData.fn || '';
                        document.getElementById('contact-position').value = contactData.position || '';
                        
                        // 미리보기 업데이트
                        document.getElementById('preview-name').innerText = contactData.fn || '이름을 입력하세요';
                        document.getElementById('preview-position').innerText = contactData.position || '직위를 입력하세요';
                        
                        // 이메일 처리
                        const emailInputs = document.getElementById('contact-emails');
                        emailInputs.innerHTML = '';
                        if (contactData.email) {
                            Object.entries(contactData.email).forEach(([type, email]) => {
                                addEmailInput(type, email);
                            });
                        }
            
                        // 소셜 프로필 처리
                        const socialInputs = document.getElementById('contact-social-profiles');
                        socialInputs.innerHTML = '';
                        if (contactData.socialProfiles) {
                            Object.entries(contactData.socialProfiles).forEach(([platform, url]) => {
                                addSocialProfileInput(platform, url);
                            });
                        }
                    } catch (error) {
                        console.error('Error parsing contact data:', error);
                    }
                }
            
                // 이메일 입력란 추가 함수
                function addEmailInput(type = '', email = '') {
                    // 데이터 변경 시 isDataChanged를 true로 설정
                    isDataChanged = true;

                    const emailInputs = document.getElementById('contact-emails');
                    const emailItemElement = document.createElement('div');
                    emailItemElement.className = 'flex items-center bg-gray-200 p-2 rounded-lg mb-2';
                    
                    emailItemElement.innerHTML = `
                        <div class="flex-grow flex space-x-2">
                            <input type="text" placeholder="home 또는 work" value="${type}" class="w-1/3 p-1 border rounded email-type">
                            <input type="email" placeholder="이메일 주소" value="${email}" class="w-2/3 p-1 border rounded email-value">
                            <button type="button" class="bg-red-500 text-white rounded px-2 remove-email-item">
                                삭제
                            </button>
                        </div>
                    `;

                    // 삭제 버튼 이벤트
                    emailItemElement.querySelector('.remove-email-item').addEventListener('click', function() {
                        // 데이터 변경 시 isDataChanged를 true로 설정
                        isDataChanged = true;
                        emailItemElement.remove();
                        updateContactJson();
                    });

                    // 값 변경 시 JSON 업데이트
                    emailItemElement.querySelectorAll('input').forEach(el => {
                        el.addEventListener('change', updateContactJson);
                        el.addEventListener('input', updateContactJson);
                    });

                    emailInputs.appendChild(emailItemElement);
                }

            
                // 소셜 프로필 입력란 추가 함수
                function addSocialProfileInput(platform = '', url = '') {
                    // 데이터 변경 시 isDataChanged를 true로 설정
                    isDataChanged = true;
                    const socialInputs = document.getElementById('contact-social-profiles');
                    const socialItemElement = document.createElement('div');
                    socialItemElement.className = 'flex items-center bg-gray-200 p-2 rounded-lg mb-2';
                    
                    socialItemElement.innerHTML = `
                        <div class="flex-grow flex space-x-2">
                            <input type="text" placeholder="instagram, spotify, applemusic" value="${platform}" class="w-1/3 p-1 border rounded social-platform">
                            <input type="url" placeholder="프로필 URL" value="${url}" class="w-2/3 p-1 border rounded social-url">
                            <button type="button" class="bg-red-500 text-white rounded px-2 remove-social-item">
                                삭제
                            </button>
                        </div>
                    `;
            
                    // 삭제 버튼 이벤트
                    socialItemElement.querySelector('.remove-social-item').addEventListener('click', function() {
                        socialItemElement.remove();
                        updateContactJson();
                    });
            
                    // 값 변경 시 JSON 업데이트
                    socialItemElement.querySelectorAll('input').forEach(el => {
                        // 데이터 변경 시 isDataChanged를 true로 설정
                        isDataChanged = true;
                        el.addEventListener('input', updateContactJson);
                    });
            
                    socialInputs.appendChild(socialItemElement);
                }
            
                // 이메일 추가 버튼 이벤트
                document.getElementById('add-email-btn').addEventListener('click', () => {
                    // 데이터 변경 시 isDataChanged를 true로 설정
                    isDataChanged = true;
                    addEmailInput();
                    updateContactJson();
                });
            
                // 소셜 프로필 추가 버튼 이벤트
                document.getElementById('add-social-profile-btn').addEventListener('click', () => {
                    addSocialProfileInput();
                    updateContactJson();
                });
            
                // JSON 업데이트 함수
                function updateContactJson() {
                    const contactData = {
                        fn: document.getElementById('contact-fn').value,
                        birthday: document.getElementById('contact-birthday').value,
                        address: document.getElementById('contact-address').value,
                        company: document.getElementById('contact-company').value,
                        position: document.getElementById('contact-position').value,
                        url: document.getElementById('contact-url').value,
                        tel: document.getElementById('contact-tel').value,
                        email: {},
                        socialProfiles: {}
                    };
            
                    // 이메일 수집
                    document.querySelectorAll('#contact-emails .email-type').forEach((typeInput, index) => {
                        const type = typeInput.value.trim();
                        const emailValue = typeInput.nextElementSibling.value.trim();
                        if (type && emailValue) {
                            contactData.email[type] = emailValue;
                        }
                    });
            
                    // 소셜 프로필 수집
                    document.querySelectorAll('#contact-social-profiles .social-platform').forEach((platformInput, index) => {
                        const platform = platformInput.value.trim();
                        const urlValue = platformInput.nextElementSibling.value.trim();
                        if (platform && urlValue) {
                            contactData.socialProfiles[platform] = urlValue;
                        }
                    });
            
                    contactTextarea.value = JSON.stringify(contactData, null, 2);
                }
            
                // 기본 입력란 변경 시 JSON 업데이트
                ['contact-fn', 'contact-birthday', 'contact-address', 'contact-company', 
                'contact-position', 'contact-url', 'contact-tel'].forEach(id => {
                    document.getElementById(id).addEventListener('input', updateContactJson);
                });
            
                // 초기 로드 시 Contact 데이터를 초기화하고 렌더링하는 기능을 추가합니다.
                initContactForm();
            
                // Contact 탭이 활성화될 때마다 Contact 데이터를 초기화
                tabButtons.forEach(button => {
                    button.addEventListener('click', function(e) {
                        const tabName = this.dataset.tab;
                        if (tabName === 'contact') {
                            initContactForm();
                        }
                    });
                });
            });
            
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.querySelector('.carousel');
        const images = carousel.querySelectorAll('.carousel-image');
        const indicators = carousel.querySelectorAll('.carousel-indicators div');
        let currentIndex = 0;
    
        // 이미지 전환 함수
        function showImage(index) {
            // 모든 이미지 숨기기
            images.forEach(img => {
                img.classList.remove('active');
                img.classList.add('hidden');
            });
    
            // 모든 인디케이터 비활성화
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
    
            // 선택된 이미지 표시
            images[index].classList.remove('hidden');
            images[index].classList.add('active');
    
            // 선택된 인디케이터 활성화
            indicators[index].classList.add('active');
    
            currentIndex = index;
        }
    
        // 인디케이터 클릭 이벤트
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showImage(index);
            });
        });
    
        // 자동 슬라이드 기능
        function autoSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }
    
        // 5초마다 자동 슬라이드
        let autoSlideInterval = setInterval(autoSlide, 4000);
    
        // 마우스 호버 시 자동 슬라이드 일시 중지
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
    
        carousel.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(autoSlide, 4000);
        });
    });
     document.addEventListener('DOMContentLoaded', function() {
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault(); // 기본 동작 방지
                    const tabName = this.dataset.tab;
        
                    // 모든 버튼 스타일 초기화
                    tabButtons.forEach(btn => {
                        btn.classList.remove('bg-blue-500', 'text-white');
                        btn.classList.add('bg-gray-300', 'text-gray-700');
                    });
        
                    // 현재 선택된 버튼 스타일 적용
                    this.classList.remove('bg-gray-300', 'text-gray-700');
                    this.classList.add('bg-blue-500', 'text-white');
        
                    // 탭 콘텐츠 토글
                    tabContents.forEach(content => {
                        content.classList.add('hidden');
                    });
                    document.getElementById(`${tabName}-tab`).classList.remove('hidden');
                });
            });
        
            // 폼 제출 시 데이터 검증
            document.getElementById('serviceForm').addEventListener('submit', function(e) {
                try {
                    // data.json 검증
                    JSON.parse(document.getElementById('json-data').value);
                    
                    // contact.json 검증
                    JSON.parse(document.getElementById('contact-data').value);
                } catch (error) {
                    e.preventDefault();
                    alert('Invalid JSON format. Please check your JSON data.');
                }
            });
        });
        
            document.addEventListener('DOMContentLoaded', function() {
                const tabButtons = document.querySelectorAll('.tab-btn');
                const itemsContainer = document.getElementById('items-container');
                const addItemBtn = document.getElementById('add-item-btn');
                const contactInputSection = document.getElementById('contact-input-section');
                const contactTextarea = document.getElementById('contact-data');
                let isDataChanged = false; // 데이터 변경 여부를 추적하는 변수
                const contactNameInput = document.getElementById('contact-fn');
                const contactPositionInput = document.getElementById('contact-position');
                const previewName = document.getElementById('preview-name');
                const previewPosition = document.getElementById('preview-position');

                // 기본 정보 입력란 변경 시 미리보기 업데이트
                contactNameInput.addEventListener('input', function() {
                    previewName.innerText = this.value || '이름을 입력하세요';
                });

                contactPositionInput.addEventListener('input', function() {
                    previewPosition.innerText = this.value || '직위를 입력하세요';
                });

            
                // 탭 전환 시 items 섹션 표시/숨김 처리
                tabButtons.forEach(button => {
                    button.addEventListener('click', function(e) {
                        const tabName = this.dataset.tab;
            
                        if (tabName === 'data') {
                            itemsContainer.closest('.mb-4').style.display = 'block';
                            addItemBtn.style.display = 'block';
                            contactInputSection.style.display = 'none';
                        } else if (tabName === 'contact') {
                            itemsContainer.closest('.mb-4').style.display = 'none';
                            addItemBtn.style.display = 'none';
                            contactInputSection.style.display = 'block';
                        }
                    });
                });
            
                // 초기 로드 시 Contact 데이터 파싱 및 렌더링
                function initContactForm() {
                    try {
                        const contactData = JSON.parse(contactTextarea.value);
                        
                        // 기본 정보 입력란
                        document.getElementById('contact-fn').value = contactData.fn || '';
                        document.getElementById('contact-birthday').value = contactData.birthday || '';
                        document.getElementById('contact-address').value = contactData.address || '';
                        document.getElementById('contact-company').value = contactData.company || '';
                        document.getElementById('contact-position').value = contactData.position || '';
                        document.getElementById('contact-url').value = contactData.url || '';
                        document.getElementById('contact-tel').value = contactData.tel || '';
                        
                        // 기본 정보 입력란
                        document.getElementById('contact-fn').value = contactData.fn || '';
                        document.getElementById('contact-position').value = contactData.position || '';
                        
                        // 미리보기 업데이트
                        document.getElementById('preview-name').innerText = contactData.fn || '이름을 입력하세요';
                        document.getElementById('preview-position').innerText = contactData.position || '직위를 입력하세요';
                        
                        // 이메일 처리
                        const emailInputs = document.getElementById('contact-emails');
                        emailInputs.innerHTML = '';
                        if (contactData.email) {
                            Object.entries(contactData.email).forEach(([type, email]) => {
                                addEmailInput(type, email);
                            });
                        }
            
                        // 소셜 프로필 처리
                        const socialInputs = document.getElementById('contact-social-profiles');
                        socialInputs.innerHTML = '';
                        if (contactData.socialProfiles) {
                            Object.entries(contactData.socialProfiles).forEach(([platform, url]) => {
                                addSocialProfileInput(platform, url);
                            });
                        }
                    } catch (error) {
                        console.error('Error parsing contact data:', error);
                    }
                }
            
                // 이메일 입력란 추가 함수
                function addEmailInput(type = '', email = '') {
                    // 데이터 변경 시 isDataChanged를 true로 설정
                    isDataChanged = true;

                    const emailInputs = document.getElementById('contact-emails');
                    const emailItemElement = document.createElement('div');
                    emailItemElement.className = 'flex items-center bg-gray-200 p-2 rounded-lg mb-2';
                    
                    emailItemElement.innerHTML = `
                        <div class="flex-grow flex space-x-2">
                            <input type="text" placeholder="home 또는 work" value="${type}" class="w-1/3 p-1 border rounded email-type">
                            <input type="email" placeholder="이메일 주소" value="${email}" class="w-2/3 p-1 border rounded email-value">
                            <button type="button" class="bg-red-500 text-white rounded px-2 remove-email-item">
                                삭제
                            </button>
                        </div>
                    `;

                    // 삭제 버튼 이벤트
                    emailItemElement.querySelector('.remove-email-item').addEventListener('click', function() {
                        // 데이터 변경 시 isDataChanged를 true로 설정
                        isDataChanged = true;
                        emailItemElement.remove();
                        updateContactJson();
                    });

                    // 값 변경 시 JSON 업데이트
                    emailItemElement.querySelectorAll('input').forEach(el => {
                        el.addEventListener('change', updateContactJson);
                        el.addEventListener('input', updateContactJson);
                    });

                    emailInputs.appendChild(emailItemElement);
                }

            
                // 소셜 프로필 입력란 추가 함수
                function addSocialProfileInput(platform = '', url = '') {
                    // 데이터 변경 시 isDataChanged를 true로 설정
                    isDataChanged = true;
                    const socialInputs = document.getElementById('contact-social-profiles');
                    const socialItemElement = document.createElement('div');
                    socialItemElement.className = 'flex items-center bg-gray-200 p-2 rounded-lg mb-2';
                    
                    socialItemElement.innerHTML = `
                        <div class="flex-grow flex space-x-2">
                            <input type="text" placeholder="instagram, spotify, applemusic" value="${platform}" class="w-1/3 p-1 border rounded social-platform">
                            <input type="url" placeholder="프로필 URL" value="${url}" class="w-2/3 p-1 border rounded social-url">
                            <button type="button" class="bg-red-500 text-white rounded px-2 remove-social-item">
                                삭제
                            </button>
                        </div>
                    `;
            
                    // 삭제 버튼 이벤트
                    socialItemElement.querySelector('.remove-social-item').addEventListener('click', function() {
                        socialItemElement.remove();
                        updateContactJson();
                    });
            
                    // 값 변경 시 JSON 업데이트
                    socialItemElement.querySelectorAll('input').forEach(el => {
                        // 데이터 변경 시 isDataChanged를 true로 설정
                        isDataChanged = true;
                        el.addEventListener('input', updateContactJson);
                    });
            
                    socialInputs.appendChild(socialItemElement);
                }
            
                // 이메일 추가 버튼 이벤트
                document.getElementById('add-email-btn').addEventListener('click', () => {
                    // 데이터 변경 시 isDataChanged를 true로 설정
                    isDataChanged = true;
                    addEmailInput();
                    updateContactJson();
                });
            
                // 소셜 프로필 추가 버튼 이벤트
                document.getElementById('add-social-profile-btn').addEventListener('click', () => {
                    addSocialProfileInput();
                    updateContactJson();
                });
            
                // JSON 업데이트 함수
                function updateContactJson() {
                    const contactData = {
                        fn: document.getElementById('contact-fn').value,
                        birthday: document.getElementById('contact-birthday').value,
                        address: document.getElementById('contact-address').value,
                        company: document.getElementById('contact-company').value,
                        position: document.getElementById('contact-position').value,
                        url: document.getElementById('contact-url').value,
                        tel: document.getElementById('contact-tel').value,
                        email: {},
                        socialProfiles: {}
                    };
            
                    // 이메일 수집
                    document.querySelectorAll('#contact-emails .email-type').forEach((typeInput, index) => {
                        const type = typeInput.value.trim();
                        const emailValue = typeInput.nextElementSibling.value.trim();
                        if (type && emailValue) {
                            contactData.email[type] = emailValue;
                        }
                    });
            
                    // 소셜 프로필 수집
                    document.querySelectorAll('#contact-social-profiles .social-platform').forEach((platformInput, index) => {
                        const platform = platformInput.value.trim();
                        const urlValue = platformInput.nextElementSibling.value.trim();
                        if (platform && urlValue) {
                            contactData.socialProfiles[platform] = urlValue;
                        }
                    });
            
                    contactTextarea.value = JSON.stringify(contactData, null, 2);
                }
            
                // 기본 입력란 변경 시 JSON 업데이트
                ['contact-fn', 'contact-birthday', 'contact-address', 'contact-company', 
                'contact-position', 'contact-url', 'contact-tel'].forEach(id => {
                    document.getElementById(id).addEventListener('input', updateContactJson);
                });
            
                // 초기 로드 시 Contact 데이터를 초기화하고 렌더링하는 기능을 추가합니다.
                initContactForm();
            
                // Contact 탭이 활성화될 때마다 Contact 데이터를 초기화
                tabButtons.forEach(button => {
                    button.addEventListener('click', function(e) {
                        const tabName = this.dataset.tab;
                        if (tabName === 'contact') {
                            initContactForm();
                        }
                    });
                });
            });
            
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.querySelector('.carousel');
        const images = carousel.querySelectorAll('.carousel-image');
        const indicators = carousel.querySelectorAll('.carousel-indicators div');
        let currentIndex = 0;
    
        // 이미지 전환 함수
        function showImage(index) {
            // 모든 이미지 숨기기
            images.forEach(img => {
                img.classList.remove('active');
                img.classList.add('hidden');
            });
    
            // 모든 인디케이터 비활성화
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
    
            // 선택된 이미지 표시
            images[index].classList.remove('hidden');
            images[index].classList.add('active');
    
            // 선택된 인디케이터 활성화
            indicators[index].classList.add('active');
    
            currentIndex = index;
        }
    
        // 인디케이터 클릭 이벤트
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showImage(index);
            });
        });
    
        // 자동 슬라이드 기능
        function autoSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }
    
        // 5초마다 자동 슬라이드
        let autoSlideInterval = setInterval(autoSlide, 4000);
    
        // 마우스 호버 시 자동 슬라이드 일시 중지
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
    
        carousel.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(autoSlide, 4000);
        });
    });


    document.addEventListener('DOMContentLoaded', function() {

    // Image tab functionality
    const profileImageInput = document.getElementById('profile-image');
    const carouselImage1Input = document.getElementById('carousel-image-1');
    const carouselImage2Input = document.getElementById('carousel-image-2');
    const carouselImage3Input = document.getElementById('carousel-image-3');
    let isDataChanged = false; // 데이터 변경 여부를 추적하는 변수

        
    // Preview images when selected
    profileImageInput.addEventListener('change', function() {
        // 데이터 변경 시 isDataChanged를 true로 설정
        isDataChanged = true;
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview-profile-image').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    carouselImage1Input.addEventListener('change', function() {
        // 데이터 변경 시 isDataChanged를 true로 설정
        isDataChanged = true;
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview-carousel-image-1').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    carouselImage2Input.addEventListener('change', function() {
        // 데이터 변경 시 isDataChanged를 true로 설정
        isDataChanged = true;
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview-carousel-image-2').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    carouselImage3Input.addEventListener('change', function() {
        // 데이터 변경 시 isDataChanged를 true로 설정
        isDataChanged = true;
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview-carousel-image-3').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Modify the form submission to include image uploads
    document.getElementById('serviceForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData(this);
        
        // Append image files to FormData
        const profileImageFile = profileImageInput.files[0];
        const carouselImage1File = carouselImage1Input.files[0];
        const carouselImage2File = carouselImage2Input.files[0];
        const carouselImage3File = carouselImage3Input.files[0];

        if (profileImageFile) {
            formData.append('profile_image', profileImageFile);
        }
        if (carouselImage1File) {
            formData.append('carousel_image_1', carouselImage1File);
        }
        if (carouselImage2File) {
            formData.append('carousel_image_2', carouselImage2File);
        }
        if (carouselImage3File) {
            formData.append('carousel_image_3', carouselImage3File);
        }

        // Send the form data to the server
        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 성공 시 알림 표시
                alert('서비스가 성공적으로 업데이트되었습니다.');
                
                // 페이지 새로고침
                window.location.reload();
            } else {
                alert(data.error); // Show error message
            }
        })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('An error occurred while updating the service.');
        // });
    });
});

        document.addEventListener('DOMContentLoaded', function() {
    const jsonTextarea = document.getElementById('json-data');
    const itemsContainer = document.getElementById('items-container');
    const addItemBtn = document.getElementById('add-item-btn');
    let isDataChanged = false; // 데이터 변경 여부를 추적하는 변수


    // Cancel 버튼 클릭 시 확인 대화 상자 표시
    document.getElementById('cancel-button').addEventListener('click', function(event) {
            if (isDataChanged) {
                const confirmation = confirm("변경사항이 적용되지 않았습니다. 그래도 취소하시겠습니까?");
                if (!confirmation) {
                    event.preventDefault(); // 사용자가 "아니오"를 선택하면 기본 동작을 취소
                } else {
                    // 사용자가 "예"를 선택하면 페이지를 이동
                    window.location.href = "{{ url_for('main.my_services') }}";
                }
            } else {
                // 변경 사항이 없으면 바로 이동
                window.location.href = "{{ url_for('main.my_services') }}";
            }
        });
    

    // 초기 데이터 렌더링
    let initialData = JSON.parse(jsonTextarea.value);
    renderItemsEditor(initialData.items);
    renderPreview(initialData);

    // Sortable 초기화 
    const sortable = new Sortable(itemsContainer, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        handle: '.drag-handle',
        chosenClass: 'sortable-chosen',
        onEnd: function(evt) {
            // 드래그 앤 드롭 후 아이템 순서 재정렬
            const oldIndex = evt.oldIndex;
            const newIndex = evt.newIndex;
            
            // initialData의 items 배열 순서 변경
            const movedItem = initialData.items.splice(oldIndex, 1)[0];
            initialData.items.splice(newIndex, 0, movedItem);
            
            // UI 및 JSON 업데이트
            renderItemsEditor(initialData.items);
            updateJsonData();
        }
    });

    addItemBtn.addEventListener('click', function() {
        // 아이템 추가 버튼 클릭 시 isDataChanged를 true로 설정
        isDataChanged = true;
    const itemTypes = [
        { value: 'link', label: '링크', icon: 'link', title: 'New Link' },
        { value: 'description', label: '설명', icon: null, title: 'New Description' },
        { value: 'email', label: '이메일', icon: 'envelope', title: 'New Email' },
        { value: 'tel', label: '전화번호', icon: 'phone', title: 'New Phone' },
        { value: 'sms', label: 'SMS', icon: 'comment', title: 'New SMS' }
    ];

    const predefinedIcons = [
        '직접 입력', 'link', 'apple', 'spotify', 'instagram', 
        'chrome', 'github', 'youtube', 'twitter', 
        'facebook', 'linkedin', 'slack'
    ];

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white p-6 rounded-lg w-96';
    
    const select = document.createElement('select');
    select.className = 'w-full p-2 border rounded mb-4';
    
    itemTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.value;
        option.textContent = type.label;
        select.appendChild(option);
    });

    const inputContainer = document.createElement('div');
    inputContainer.className = 'mb-4';

    const titleInput = document.createElement('input');
    titleInput.placeholder = '제목';
    titleInput.className = 'w-full p-2 border rounded mb-2';

    const linkInput = document.createElement('input');
    linkInput.placeholder = '링크 또는 내용';
    linkInput.className = 'w-full p-2 border rounded mb-2';

    const iconSelect = document.createElement('select');
    iconSelect.className = 'w-full p-2 border rounded mb-2';

    const customIconInput = document.createElement('input');
    customIconInput.placeholder = '직접 입력 (선택사항)';
    customIconInput.className = 'w-full p-2 border rounded mb-2';

    predefinedIcons.forEach(icon => {
        const option = document.createElement('option');
        option.value = icon;
        option.textContent = icon;
        iconSelect.appendChild(option);
    });

    select.addEventListener('change', () => {
    const selectedType = select.value;
    inputContainer.innerHTML = '';
    
    if (selectedType !== 'description') {
        titleInput.value = '';
        linkInput.value = '';
        iconSelect.value = 'link';
        customIconInput.value = '';
        
        inputContainer.appendChild(titleInput);
        inputContainer.appendChild(linkInput);
        
        if (selectedType === 'link') {
            inputContainer.appendChild(iconSelect);
            inputContainer.appendChild(customIconInput);
            
            // link 타입일 때만 직접 입력 input 표시
            customIconInput.classList.add('hidden');
            
            // 아이콘 선택 시 직접 입력 input 토글
            iconSelect.addEventListener('change', function() {
                if (this.value === '직접 입력') {
                    customIconInput.classList.remove('hidden');
                    customIconInput.focus();
                } else {
                    customIconInput.classList.add('hidden');
                }
            });
        } else {
            // link 타입이 아니면 아이콘 관련 input 숨김
            if (iconSelect) iconSelect.remove();
            if (customIconInput) customIconInput.remove();
        }
    } else {
        linkInput.value = '';
        inputContainer.appendChild(linkInput);
        
        // description 타입이면 아이콘 관련 input 모두 제거
        if (iconSelect) iconSelect.remove();
        if (customIconInput) customIconInput.remove();
    }
});
    
    const addButton = document.createElement('button');
    addButton.textContent = '아이템 추가';
    addButton.className = 'w-full bg-blue-500 text-white p-2 rounded';
    
    modalContent.appendChild(select);
    modalContent.appendChild(inputContainer);
    modalContent.appendChild(addButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // 초기 상태 설정
    select.dispatchEvent(new Event('change'));

    // 모달 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    addButton.addEventListener('click', () => {
        const selectedType = select.value;
        const selectedTypeInfo = itemTypes.find(type => type.value === selectedType);
        
        let newItem;
        switch(selectedType) {
            case 'link':
                newItem = {
                    title: titleInput.value || selectedTypeInfo.title,
                    link: linkInput.value,
                    type: selectedType,
                    icon: customIconInput.value || iconSelect.value
                };
                break;
            case 'email':
            case 'tel':
            case 'sms':
                newItem = {
                    title: titleInput.value || selectedTypeInfo.title,
                    link: linkInput.value,
                    type: selectedType,
                    icon: selectedTypeInfo.icon
                };
                break;
            case 'description':
                newItem = {
                    content: [linkInput.value || '새로운 설명을 입력하세요'],
                    type: selectedType
                };
                break;
        }
        
        initialData.items.push(newItem);
        renderItemsEditor(initialData.items);
        updateJsonData();
        document.body.removeChild(modal);
    });
});

    jsonTextarea.addEventListener('input', function() {
        // JSON 데이터 변경 시 isDataChanged를 true로 설정
        isDataChanged = true;
        try {
            initialData = JSON.parse(jsonTextarea.value);
            renderItemsEditor(initialData.items);
            renderPreview(initialData);
        } catch (e) {
            console.error('Invalid JSON:', e);
        }
    });

    function updateItem(index, updatedItem) {
    // initialData의 특정 인덱스 아이템을 업데이트
    initialData.items[index] = updatedItem;
}

    function renderItemsEditor(items) {
    itemsContainer.innerHTML = '';
    const predefinedIcons = [
        '직접 입력', 'link', 'apple', 'spotify', 'instagram', 
        'chrome', 'github', 'youtube', 'twitter', 
        'facebook', 'linkedin', 'slack'
    ];

    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-center justify-between bg-gray-200 p-2 rounded-lg mb-2 sortable-item';
        
        if (item.type === 'description') {
            itemElement.innerHTML = `
                <div class="flex items-center w-full">
                    <div class="drag-handle cursor-move mr-3">
                        <i class="fa-solid fa-bars text-gray-500"></i>
                    </div>
                    <div class="flex-grow">
                        <textarea 
                            class="w-full p-2 border rounded" 
                            rows="3" 
                            placeholder="Enter description lines (one per line)"
                            data-index="${index}" 
                            data-field="content"
                        >${item.content ? item.content.join('\n') : ''}</textarea>
                    </div>
                    <div class="flex items-center ml-2">
                        <button type="button" class="bg-red-500 text-white rounded px-2" data-index="${index}">삭제</button>
                    </div>
                </div>
            `;
        } else {
            const iconSelectOptions = predefinedIcons.map(icon => 
                `<option value="${icon}" ${item.icon === icon ? 'selected' : ''}>${icon}</option>`
            ).join('');

            itemElement.innerHTML = `
                <div class="flex items-center w-full">
                    <div class="drag-handle cursor-move mr-3">
                        <i class="fa-solid fa-bars text-gray-500"></i>
                    </div>
                    <div class="flex-grow">
                        <input type="text" value="${item.title}" class="w-full p-1 border rounded" placeholder="제목" data-index="${index}" data-field="title" />
                        <input type="text" value="${item.link}" class="w-full p-1 border rounded" placeholder="링크" data-index="${index}" data-field="link" />
                        ${item.type === 'link' ? `
                            <select class="w-full p-1 border rounded mb-1" data-index="${index}" data-field="icon-select">
                                ${iconSelectOptions}
                            </select>
                            <input type="text" 
                                value="${item.icon}" 
                                class="w-full p-1 border rounded ${item.icon && predefinedIcons.includes(item.icon) ? 'hidden' : ''}" 
                                placeholder="직접 입력" 
                                data-index="${index}" 
                                data-field="icon" 
                                id="custom-icon-input-${index}"
                        />
                        ` : `
                            <input type="text" value="${item.icon}" class="w-full p-1 border rounded" placeholder="아이콘 이름" data-index="${index}" data-field="icon" />
                        `}
                    </div>
                    <div class="flex items-center ml-2">
                        <button type="button" class="bg-red-500 text-white rounded px-2" data-index="${index}">삭제</button>
                    </div>
                </div>
            `;
        }

        itemsContainer.appendChild(itemElement);
    });


    itemsContainer.querySelectorAll('input[data-field="icon"]').forEach(input => {
    input.addEventListener('change', function() {
        const index = this.dataset.index;
        const value = this.value;

        updateItem(index, { ...initialData.items[index], icon: value });
        updateJsonData(); // 변경 사항 저장
    });
});

    // 이벤트 리스너 추가
    itemsContainer.querySelectorAll('select[data-field="icon-select"]').forEach(select => {
        select.addEventListener('change', function() {
            const index = this.dataset.index;
            const value = this.value;
            const customIconInput = document.getElementById(`custom-icon-input-${index}`);
            
            if (value === '직접 입력') {
                customIconInput.classList.remove('hidden');
                customIconInput.value = '';
                customIconInput.focus();
            } else {
                customIconInput.classList.add('hidden');
                customIconInput.value = value;
            }
            
            updateItem(index, { ...initialData.items[index], icon: value });
            updateJsonData(); // 변경 사항 저장
        });
    });

    // 기존 이벤트 리스너들
    itemsContainer.querySelectorAll('input:not([data-field="icon-select"]), textarea').forEach(input => {
        input.addEventListener('change', function() {
            const index = this.dataset.index;
            const field = this.dataset.field;
            const value = this.value;

            if (field === 'content') {
                const contentLines = value.split('\n');
                updateItem(index, { ...initialData.items[index], content: contentLines });
                updateJsonData(); // 변경 사항 저장
            } else {
                updateItem(index, { ...initialData.items[index], [field]: value });
                updateJsonData(); // 변경 사항 저장
            }
        });
    });

    // 삭제 버튼 이벤트 리스너
    itemsContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.dataset.index;
            initialData.items.splice(index, 1);
            renderItemsEditor(initialData.items);
            updateJsonData(); // 변경 사항 저장
        });
    });
}

    

    function updateJsonData() {
        // JSON 텍스트 영역 업데이트
        jsonTextarea.value = JSON.stringify(initialData, null, 2);
        
        // 프리뷰 렌더링
        renderPreview(initialData);
    }

    
    function downloadVCard(data) {
    // contact.json에서 직접 데이터를 가져오도록 수정
    const contactData = JSON.parse(document.getElementById('contact-data').value);

    const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${contactData.fn}
N;CHARSET=UTF-8:;${contactData.fn};;;
TEL;TYPE=CELL:${contactData.tel || ''}
EMAIL;CHARSET=UTF-8;type=HOME,INTERNET:${contactData.email?.home || ''}
EMAIL;CHARSET=UTF-8;type=WORK,INTERNET:${contactData.email?.work || ''}
ADR;CHARSET=UTF-8;TYPE=HOME:;;;;;;${contactData.address || ''}
URL;CHARSET=UTF-8:${contactData.url || ''}
BDAY:${contactData.birthday || ''}
ORG:${contactData.company || ''}
TITLE:${contactData.position || ''}
${Object.entries(contactData.socialProfiles || {}).map(([platform, url]) => 
    `X-SOCIALPROFILE;TYPE=${platform}:${url}`
).join('\n')}
END:VCARD`;

    const blob = new Blob([vCardContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contactData.fn}_contact.vcf`;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    link.remove();
}

    function renderPreview(data) {
        const linksContainer = document.getElementById('preview-links');
        linksContainer.innerHTML = '';
        
        data.items.forEach(item => {
            const linkElement = document.createElement('div');

            if (item.type === 'description') {
                linkElement.className = '';
                linkElement.innerHTML = `
                    <div class="mt-6 bg-gray-200 p-2 rounded-lg text-center">
                        ${item.content ? item.content.map(line => `<p class="mb-1">${line}</p>`).join('') : ''}
                    </div>
                `;
            } else if (item.type === 'email' || item.type === 'tel' || item.type === 'sms') {
                linkElement.className = '';
                const href = item.type === 'email' ? `mailto:${item.link}` : 
                            item.type === 'tel' ? `tel:${item.link}` : 
                            `sms:${item.link}`;

                linkElement.innerHTML = `
                    <div class="card bg-gray-200 rounded-lg shadow-md p-2 flex items-center justify-center">
                        <a href="${href}" class="flex items-center justify-center w-full text-gray-700" target="_blank" rel="noopener noreferrer">
                            <i class="fa-solid fa-${item.type === 'email' ? 'envelope' : item.type === 'tel' ? 'phone' : 'sms'} mr-2"></i>
                            ${item.title}
                        </a>
                    </div>
                `;
            } else {
                linkElement.className = '';
                linkElement.innerHTML = `
                    <div class="card bg-gray-200 rounded-lg shadow-md p-2 flex items-center justify-center">
                        <a href="${item.link}" class="flex items-center justify-center w-full text-gray-700" target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-${item.icon} mr-2"></i>
                            ${item.title}
                        </a>
                    </div>
                `;
        }

        linksContainer.appendChild(linkElement);
    });

    // 연락처 추가 버튼 추가
    const addContactButton = document.createElement('button');
    addContactButton.id = 'add-contact';
    addContactButton.className = 'w-full inline-block mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 text-center';
    addContactButton.innerHTML = `
        <i class="fa-solid fa-user-plus mr-2"></i> 연락처 추가
    `;
    
    // 이벤트 리스너 추가
    addContactButton.addEventListener('click', () => {
        downloadVCard(data);
    });

    linksContainer.appendChild(addContactButton);
}
});
