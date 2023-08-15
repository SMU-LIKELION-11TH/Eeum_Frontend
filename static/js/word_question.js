//질문 id를 받아서 다음 질문으로 넘어갈 수 있도록 하는 js
$(document).ready(function () {
    $(".nextButton").on("click", function () {
        // 현재 표시되고 있는 질문의 ID를 가져옴
        var currentQuestion = $(this).closest(".word_question_question").attr("id");
        // 다음 질문의 ID를 data-next 속성으로부터 가져옴
        var nextQuestion = $(this).data("next");

        // 현재 질문을 숨기고 다음 질문을 표시
        $("#" + currentQuestion).hide();
        $(nextQuestion).show();
    });
    $(".backButton").click(function() {
        // 현재 표시되고 있는 단계를 숨깁니다.
        var currentStep = $(".word_question_question:visible");
        currentStep.hide();

        // 이전 단계를 보이도록 설정합니다.
        currentStep.prev(".word_question_question").show();
    });
      // 질문 1 입력값 감지하여 버튼 활성화/비활성화
      $('#word_question_input').on('input', function () {
        var inputVal = $(this).val(); // 입력된 텍스트 값
        var nextButton = $('#word_question_nextbtn');

        // 텍스트 값이 비어있지 않다면 버튼 활성화, 비어있다면 비활성화
        if (inputVal.trim() !== '') { //trim 함수는 비어있는지 확인해주는 함수 
            nextButton.prop('disabled', false);
        } else {
            nextButton.prop('disabled', true);
        }
    });
});

//질문 2 타이핑 수 제한
const textarea = document.getElementById('word_question_textarea');
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
    const textarea = document.getElementById("word_question_textarea");
    const submitButton = document.getElementById("word_question_submitbtn");

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