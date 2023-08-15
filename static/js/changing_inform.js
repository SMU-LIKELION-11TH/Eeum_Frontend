//드롭 다운 버튼 js
const dropdownButton = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");
const nextButton = document.getElementById("changing_inform_nextbtn");

dropdownButton.addEventListener("click", function() { //드롭 다운 버튼을 눌렀을때
  dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
});

const dropdownItems = dropdownContent.getElementsByClassName("dropdown-item");
for (const item of dropdownItems) {
  item.addEventListener("click", function() { //항목을 선택하면
    const value = item.getAttribute("data-value"); //항목의 값을 value 에 저장하고 
    dropdownButton.textContent = value; //버튼에 있는 내용을 항목 값으로 바꿔주고 
    dropdownContent.style.display = "none"; 
    nextButton.removeAttribute("disabled"); //nextButton 의 비활성화를 풀어줌.
  });
}

//질문 id를 받아서 다음 질문으로 넘어갈 수 있도록 하는 js
$(document).ready(function () {
    $(".nextButton").on("click", function () {
        // 현재 표시되고 있는 질문의 ID를 가져옴
        var currentQuestion = $(this).closest(".changing_inform_question").attr("id");
        // 다음 질문의 ID를 data-next 속성으로부터 가져옴
        var nextQuestion = $(this).data("next");

        // 현재 질문을 숨기고 다음 질문을 표시
        $("#" + currentQuestion).hide();
        $(nextQuestion).show();
    });
    $(".backButton").click(function() {
      // 현재 표시되고 있는 단계를 숨깁니다.
      var currentStep = $(".changing_inform_question:visible");
      currentStep.hide();

      // 이전 단계를 보이도록 설정합니다.
      currentStep.prev(".changing_inform_question").show();
    });
    //질문 2 텍스트 입력 감지 및 버튼 활성화/비활성화
    $('#changing_inform_textarea').on('input', function () {
      var inputVal = $(this).val(); // 입력된 텍스트 값
      var submitButton = $('#changing_inform_submitbtn');
      
      // 입력된 텍스트 길이 계산
      var textLength = inputVal.length;
      var maxLength = 200; // 최대 길이
      
      // 텍스트 길이 정보 업데이트
      $('.text-length-cnt').text(textLength);
      $('.text-length-total').text(maxLength);

      // 텍스트 값이 비어있거나 최대 길이를 넘지 않을 때 버튼 활성화
      if (textLength <= maxLength && textLength > 0) {
          submitButton.prop('disabled', false);
      } else {
          submitButton.prop('disabled', true);
      }
  });
});

//질문 2 타이핑 수 제한
const textarea = document.getElementById('changing_inform_textarea');
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





