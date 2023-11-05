// Refresh Token 재발급 함수
function refreshAccessToken(response) {
  return new Promise((resolve, reject) => {
          console.log(response.refresh)
      $.ajax({
          type: 'POST',
          url: '/api/account/refresh/',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
              refresh: response.refresh // response 객체에서 refresh token 가져옴
          }),
          success: function(res) {
              var access = res.access;
              var refresh = res.refresh;
                  
              localStorage.setItem('access', access);
              localStorage.setItem('refresh', refresh);
              resolve(access);
          },
          error: function(jqXHR, textStatus, errorThrown) {
              reject(errorThrown);
          }
      });
  });
}   

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
    nextButton.removeAttribute("disabled"); //nextButton 의 비활성화를 풀어줌
  });
}

//질문 id를 받아서 다음 질문으로 넘어갈 수 있도록 하는 js
$(document).ready(function () {
    if (localStorage.getItem("refresh") == null){
    alert("로그인이 필요한 서비스 입니다.")
    window.location.href="index.html";
    }
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
  $('#changing_inform_submitbtn').click(function () {
    var answer1 = $('.dropdown-btn').text(); 
    var answer2 = $('#changing_inform_textarea').val();

    var questionData = {
      title: answer1,
      content: answer2,
      type:'수정 요청',
      word_id: localStorage.getItem('word_id')
    }

    var response = {
      "refresh": localStorage.getItem("refresh")
    };

    console.log(questionData);
    

    // refreshAccessToken(response)
    //   .then(function (access_token) {
    //     $.ajax({
    //       type: 'POST',
    //       url: '/api/word/edit/create/',
    //       contentType: 'application/json',
    //       data:JSON.stringify(questionData),
    //       beforeSend: function () {
    //         xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access"));
    //       },
    //       success: function (response) {
    //         alert('성공');
    //       },
    //       error: function (request, status, error) {
    //         alert('실패')
    //       }
    //     });
    //   })
    //   .catch(function (error) {
    //     console.error('Refresh token 재발급 실패:', error);
    //   });

    $.ajax({
      type: "POST",
      url: "/api/word/edit/create/", // 실제 URL로 변경해야 합니다.
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
      data: JSON.stringify(questionData),
      contentType: 'application/json', // 필요한 경우 Content-Type 설정 방지
      success: function (response) {
        // 서버로부터의 응답을 처리
        if (response.status === 401) {
          console.error("Unauthorized:", jqXHR.responseText);
          // refreshAccessToken(refresh)
          refreshAccessToken(response)
      .then(function (access_token) {
        $.ajax({
          type: 'POST',
          url: '/api/word/edit/create/',
          contentType: 'application/json',
          data:JSON.stringify(questionData),
          beforeSend: function () {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access"));
          },
          success: function (response) {
            alert('성공');
          },
          error: function (request, status, error) {
            alert('실패')
          }
        });
      })
      .catch(function (error) {
        console.error('Refresh token 재발급 실패:', error);
      });
        }
        console.log("데이터가 성공적으로 전송");
        window.location.href = "inform_complete.html";
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 404) {
          console.error("Not found:", jqXHR.responseText);
          alert("사용자가 존재하지 않습니다.");
        } else {
          console.error("Error:", jqXHR.status, errorThrown);
          alert("서버 에러");
        }
      }
    });
  })
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




