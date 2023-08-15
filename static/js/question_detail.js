//질문 1 타이핑 수 제한
const textarea = document.getElementById('question_detail_textarea');
const textLengthCnt = document.querySelector('.text-length-cnt');
const maxLength = 200;

textarea.addEventListener('input', function () {
    const textLength = textarea.value.length;
    textLengthCnt.textContent = textLength;

    // 입력 글자 수가 최대 글자 수를 초과할 경우 자르기
    if (textLength > maxLength) {
        textarea.value = textarea.value.slice(0, maxLength);
        textLengthCnt.textContent = maxLength;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // textarea 요소와 submit 버튼 요소를 가져옵니다.
    const textarea = document.getElementById("question_detail_textarea");
    const submitButton = document.getElementById("question_detail_submitbtn");

    // textarea의 input 이벤트를 감지하여 사용자가 입력할 때마다 버튼 상태를 업데이트합니다.
    textarea.addEventListener("input", function () {
        // textarea의 값을 trim하여 공백을 제거하고, 그 길이를 확인합니다.
        // 길이가 0이면 버튼을 비활성화하고, 0보다 크면 버튼을 활성화합니다.
        submitButton.disabled = textarea.value.trim().length === 0;
    });

    // 페이지가 로드될 때 버튼의 상태를 초기화합니다.
    // 사용자가 textarea에 글을 쓰기 전까지는 버튼이 비활성화되며, 글을 입력하면 버튼이 자동으로 활성화됩니다.
    submitButton.disabled = textarea.value.trim().length === 0;
});