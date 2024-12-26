function validateForm() {
    const password = document.getElementById('new_password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const passwordError = document.getElementById('password-error');
    const confirmError = document.getElementById('confirm-error');

    // 비밀번호 유효성 검사 초기화
    passwordError.textContent = '';
    confirmError.textContent = '';

    let isValid = true;

    // 비밀번호 길이 검사
    if (password.length < 8) {
        passwordError.textContent = '비밀번호는 최소 8자리 이상이어야 합니다.';
        isValid = false;
    }

    // 대문자 포함 검사
    if (!/[A-Z]/.test(password)) {
        passwordError.textContent += ' 대문자를 1개 이상 포함해야 합니다.';
        isValid = false;
    }

    // 숫자 3자리 이상 검사
    const numberCount = (password.match(/\d/g) || []).length;
    if (numberCount < 3) {
        passwordError.textContent += ' 숫자를 3자리 이상 포함해야 합니다.';
        isValid = false;
    }

    // 비밀번호 일치 검사
    if (password !== confirmPassword) {
        confirmError.textContent = '비밀번호가 일치하지 않습니다.';
        isValid = false;
    }

    return isValid;
}