document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const minLengthCheck = password.length >= 8;
    const uppercaseCheck = /[A-Z]/.test(password);
    const numbersCheck = (password.match(/\d/g) || []).length >= 3;

    document.querySelector('[data-check="min-length"]').textContent = minLengthCheck ? '✔️' : '❌';
    document.querySelector('[data-check="uppercase"]').textContent = uppercaseCheck ? '✔️' : '❌';
    document.querySelector('[data-check="numbers"]').textContent = numbersCheck ? '✔️' : '❌';
});