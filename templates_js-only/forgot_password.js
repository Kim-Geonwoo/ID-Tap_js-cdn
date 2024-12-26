
function validateForm() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!emailRegex.test(emailInput.value)) {
        emailError.style.display = 'block';
        emailInput.focus();
        return false;
    }

    emailError.style.display = 'none';
    return true;
}

// 페이지 로드 시 이메일 입력란에 포커스
window.onload = function() {
    document.getElementById('email').focus();
}