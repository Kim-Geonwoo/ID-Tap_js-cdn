// 모바일 여부 확인
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const agentStatus = document.getElementById("agentStatus");

// 에이전트 상태 표시
agentStatus.textContent = isMobile ? "현재 사용 중인 기기는 모바일입니다." : "현재 사용 중인 기기는 데스크톱입니다.";

// 모달 팝업 관련 스크립트
const modal = document.getElementById("myModal");
const btn = document.getElementById("addToHomeScreen");
const span = document.getElementsByClassName("close")[0];
const confirmAdd = document.getElementById("confirmAdd");

// 모바일인 경우에만 버튼 클릭 시 모달 열기
btn.onclick = function() {
    if (isMobile) {
        modal.style.display = "block";
    } else {
        alert("데스크톱에서는 홈 화면에 추가할 수 없습니다.");
    }
}

// 모달 닫기
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 홈 화면 추가 버튼 클릭 시
confirmAdd.onclick = function() {
    // Android 및 iOS에 따라 홈 화면 추가 처리
    if (window.matchMedia('(display-mode: standalone)').matches) {
        // 이미 홈 화면에 추가된 경우
        alert("이미 홈 화면에 추가되었습니다.");
    } else {
        // Android의 경우
        if (window.navigator.standalone === false) {
            alert("안드로이드 기기에서 홈 화면에 추가하려면 브라우저 메뉴에서 '홈 화면에 추가'를 선택하세요.");
        }
        // iOS의 경우
        else {
            alert("iOS 기기에서 홈 화면에 추가하려면 Safari 브라우저의 공유 버튼을 눌러 '홈 화면에 추가'를 선택하세요.");
        }
    }
    modal.style.display = "none"; // 모달 닫기
}
const { element } = HSRemoveElement.getInstance('#remove-element', true);
const destroyBtn = document.querySelector('#dismiss-alert');

destroyBtn.addEventListener('click', () => {
element.destroy();
});