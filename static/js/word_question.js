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

//질문 id를 받아서 다음 질문으로 넘어갈 수 있도록 하는 js
$(document).ready(function () {
    if (localStorage.getItem("refresh") == null){
        alert("로그인이 필요한 서비스 입니다.")
        window.location.href="index.html";
    }
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
        var successMessage = $('#success');
        var failMessage = $('#fail');


        // 텍스트 값이 비어있지 않다면 버튼 활성화, 비어있다면 비활성화
        if (inputVal.trim() !== '') { //trim 함수는 비어있는지 확인해주는 함수 
            nextButton.prop('disabled', false);
        } else {
            nextButton.prop('disabled', true);
            successMessage.hide();
            failMessage.hide();
            return;
        }

        $.ajax({
            type: "POST",
            url: "/api/search/word/exists/",
            data: JSON.stringify({
                keyword: document.getElementById('word_question_input').value
            }),
            contentType: 'application/json',
            success: function (response){
                console.log("성공")
                console.log(response);

                var successMessage = $('#success');
                var failMessage = $('#fail');
                var button = $('#word_question_nextbtn');
                
                if (response.is_exists === true) {
                    //등록 불가능한 단어인 경우
                    console.log("if");
                    successMessage.hide();
                    failMessage.show();
                    button.prop('disabled',true);
                    $('#word_container').show();

                    var wordName = response.word.title;
                    var wordDescription = response.word.mean;
                    var wordLikes = response.word.likes;
                    var wordAges = response.word.age;
                    

                    // 해당 요소에 데이터를 삽입
                    $('#word_container .word_name p').text(wordName);
                    $('#word_container .word_what p').text(wordDescription);
                    $('#word_container .word_heart p').text(wordLikes);
                    
                    if (wordAges.length >= 1) {
                        $('#word_age_icon1').attr('src', "/static/img/age/age_" + wordAges[0] + ".png");
                        $('#word_age_icon1').show();
                    } else {
                        $('#word_age_icon1').hide();
                    }
                    
                    if (wordAges.length >= 2) {
                        $('#word_age_icon2').attr('src', "/static/img/age/age_" + wordAges[1] + ".png");
                        $('#word_age_icon2').show();
                    } else {
                        $('#word_age_icon2').hide();
                    }

                } else {
                    // 등록 가능한 단어인 경우
                    console.log("else");
                    successMessage.show();
                    failMessage.hide();
                    button.prop('disabled',false);
                    $('#word_container').hide();
                }
            },
            error: function(xhr, status, error) {  // 요청 실패 시 실행되는 함수
                console.log('실패');
            }
            
        })
    });
    $('#word_question_submitbtn').click(function () {
        var answer1 = $('#word_question_input').val();
        var answer2 = $('#word_question_textarea').val();

        var questionData = {
            title: answer1,
            content: answer2,
            type: "등록 요청",
            word_id: null
        }

        var response = {
            "refresh": localStorage.getItem("refresh")
        };
    
        refreshAccessToken(response)
            .then(function (access_token) {
                $.ajax({
                    type: 'POST',
                    url: '/api/question/questioncreate/',
                    contentType: 'application/json',
                    data: JSON.stringify(questionData),
                    beforeSend: function () {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
                    },
                    success: function (response) {
                        console.log('성공')
                    },
                    error: function (request, status, error) {
                        console.log('실패')
                    }
                });
            })
            .catch(function (error) {
                console.error('Refresh token 재발급 실패:', error);
            });

        $.ajax({
            type: "POST",
            url: "/api/question/questioncreate/", // 실제 URL로 변경해야 합니다.
            headers: {
                 'Authorization' : `Bearer ${localStorage.getItem('access')}`
            },
            data: JSON.stringify(questionData),
            contentType: 'application/json', // 필요한 경우 Content-Type 설정 방지
            success: function (response) {
                // 서버로부터의 응답을 처리
                if (response.status === 401) {
                    refreshAccessToken(refresh)
                  }
                console.log("데이터가 성공적으로 전송");
                window.location.href = "question_complete.html";
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