document.getElementById('sendVerificationBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // FormData 사용
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    fetch("{{ url_for('main.send_withdrawal_verification') }}", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('인증 코드가 발송되었습니다.');
        } else {
            alert(data.message || '인증 코드 발송에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('오류가 발생했습니다.');
    });
});