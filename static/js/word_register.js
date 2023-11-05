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
            success: function (res) {
                var access = res.access;
                var refresh = res.refresh;

                localStorage.setItem('access', access);
                localStorage.setItem('refresh', refresh);
                resolve(access);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }
        });
    });
}

//질문 넘어가기에 대한 js
$(document).ready(function () {
    if (localStorage.getItem("refresh") == null){
        alert("로그인이 필요한 서비스 입니다.")
        window.location.href="index.html";
    }
    var userData;

    $.ajax({
        type:"GET",
        url: "/api/account/user/",
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem('access')}`
        },
        dataType: 'json',
        success: function(response){
               // 서버로부터의 응답을 처리
               if (response.status === 401) {
                refreshAccessToken(response)
                .then(function (access_token) {
                    $.ajax({
                        type: 'GET',
                        url: '/api/account/user/',
                        contentType: 'application/json',
                        dataType: 'json',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access"));
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
              } 
              else{
                userData = response;
                console.log(userData);
                document.getElementById("usernickname").textContent = userData.nickname;
              }
             
        },
        error: function(xhr, status, error) {
            console.log("데이터를 불러오지 못함");
        }
    })


    $(".nextButton").on("click", function () {
        var currentQuestion = $(this).closest(".word_register_question");
        var nextQuestion = $(this).data("next");

        currentQuestion.hide();
        $(nextQuestion).show();

        if (nextQuestion === "#q2") {
            var wordToDefine = $('#word_register_input').val();
            $('#wordToDefine').text(wordToDefine);
        }
        if (nextQuestion === "#q3") {
            var wordToDefine = $('#word_register_input').val();
            $('#wordToDefine2').text(wordToDefine);
        }
        if (nextQuestion === "#q4") {
            var wordToDefine = $('#word_register_input').val();
            $('#wordToDefine3').text(wordToDefine);
        }
    });
    $(".backButton").click(function () {
        // 현재 표시되고 있는 단계를 숨깁니다.
        var currentStep = $(".word_register_question:visible");
        currentStep.hide();

        // 이전 단계를 보이도록 설정합니다.
        currentStep.prev(".word_register_question").show();
    });

    // 질문 1 입력값 감지하여 버튼 활성화/비활성화
    $('#word_register_input').on('input', function () {
        var inputVal = $(this).val(); // 입력된 텍스트 값
        var nextButton = $('#word_register_nextbtn');
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
                keyword: document.getElementById('word_register_input').value
            }),
            contentType: 'application/json',
            success: function (response){
                console.log("성공")
                console.log(response);

                var successMessage = $('#success');
                var failMessage = $('#fail');
                var button = $('#word_register_nextbtn');
                
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
    // 질문 2 체크 박스 선택 최대 2개 제한 및 버튼 활성화/비활성화
    var maxChecked = 2; // 최대 선택 가능한 체크 박스 개수
    var checkboxes = $("input[name='age']");
    var nextButton = $("#word_register_nextbtn1");

    checkboxes.on("click", function () {
        var checkedCount = checkboxes.filter(":checked").length;

        if (checkedCount > maxChecked) {
            checkboxes.not(":checked").prop("disabled", true);
        } else {
            checkboxes.prop("disabled", false);
        }

        if (checkedCount > 0) {
            nextButton.prop("disabled", false); // 버튼 활성화
        } else {
            nextButton.prop("disabled", true); // 버튼 비활성화
        }

        if (checkedCount === 3) {
            // 세 번째 체크박스가 선택되었을 때 해제하고 알림창을 띄웁니다.
            alert("최대 2개까지 선택해주시기 바랍니다.");
            checkboxes.filter(":checked").last().prop("checked", false);
        }
    });

    // 질문 3 입력값 감지하여 버튼 활성화/비활성화
    // 텍스트 영역에 입력이 있을 때
    $('#q3_word_register_textarea').on('input', function () {
        var inputVal = $(this).val(); // 입력된 텍스트 값
        var nextButton = $('#word_register_nextbtn2');

        // 입력된 텍스트 길이 계산
        var textLength = inputVal.length;
        var maxLength = 40; // 최대 길이

        // 텍스트 길이 정보 업데이트
        $('.q3_text-length-cnt').text(textLength);
        $('.q3_text-length-total').text(maxLength);

        // 텍스트 값이 비어있거나 최대 길이를 넘지 않을 때 버튼 활성화
        if (textLength <= maxLength && textLength > 0) {
            nextButton.prop('disabled', false);
        } else {
            nextButton.prop('disabled', true);
        }
    });
    // 질문 4 입력값 감지하여 버튼 활성화/비활성화
    // 텍스트 영역에 입력이 있을 때
    $('#q4_word_register_textarea').on('input', function () {
        var inputVal = $(this).val(); // 입력된 텍스트 값
        var nextButton = $('#word_register_nextbtn3');

        // 입력된 텍스트 길이 계산
        var textLength = inputVal.length;
        var maxLength = 300; // 최대 길이

        // 텍스트 길이 정보 업데이트
        $('.q4_text-length-cnt').text(textLength);
        $('.q4_text-length-total').text(maxLength);

        // 텍스트 값이 최대 길이를 넘지 않으면 버튼 활성화
        if (textLength <= maxLength && textLength > 0) {
            nextButton.prop('disabled', false);
        } else {
            nextButton.prop('disabled', true);
        }
    });
    $('#word_register_submitbtn').click(function () {
        var answer1 = $('#word_register_input').val();
        var answer2 = [];
        $("input[name='age']:checked").each(function () {
            answer2.push($(this).val());
        });
        var answer3 = $('#q3_word_register_textarea').val();
        var answer4 = $('#q4_word_register_textarea').val();
        var answer5 = document.querySelector('#image-input'); // 이미지 관련 데이터를 추가
        console.log(answer5.files[0]);
        var formData = new FormData();

        formData.append("title", answer1);
        formData.append("age", answer2);
        formData.append("mean", answer3);
        formData.append("content", answer4);
        formData.append("image", answer5.files[0]);


        var response = {
            "refresh": localStorage.getItem('refresh')
        };

        console.log(answer2);
    
        // refreshAccessToken(response)
        //     .then(function (access_token) {
        //         $.ajax({
        //             type: 'POST',
        //             url: '/api/word/create/',
        //             contentType: 'application/json',

        //             beforeSend: function () {
        //                 xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access'));
        //             },
        //             success: function (response) {
        //                 alert('성공')
        //             },
        //             error: function (request, status, error) {
        //                 alert('실패')
        //             }
        //         });
        //     })
        //     .catch(function (error) {
        //         console.error('Refresh token 재발급 실패:', error);
        //     });

        $.ajax({
            type: "POST",
            url: "/api/word/create/", // 실제 URL로 변경해야 합니다.
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('access')}`
            },
            data: formData,
            processData: false, // 필요한 경우 FormData 처리 방지
            contentType: false, 
            success: function (response) {
                // 서버로부터의 응답을 처리
                console.log("데이터가 성공적으로 전송");
                window.location.href = "register_complete.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 401) {
                  console.error("Unauthorized:", jqXHR.responseText);
                //   refreshAccessToken(refresh)
                  refreshAccessToken(response)
                  .then(function (access_token) {
                      $.ajax({
                          type: 'POST',
                          url: '/api/word/create/',
                          contentType: 'application/json',
      
                          beforeSend: function () {
                              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access'));
                          },
                          success: function (response) {
                              alert('성공')
                          },
                          error: function (request, status, error) {
                              alert('실패')
                          }
                      });
                  })
                  .catch(function (error) {
                      console.error('Refresh token 재발급 실패:', error);
                  });
      
                } else if (jqXHR.status === 404) {
                    console.error("Not found:", jqXHR.responseText);
                    alert("사용자가 존재하지 않습니다.");
                } else {
                    console.error("Error:", jqXHR.status, errorThrown);
                    alert("서버 에러");
                }
            }
        });
    });


    // $('#word_register_submitbtn').click(function (formData) {
    //     var answer1 = $('#word_register_input').val();
    //     var answer2 = [];
    //     $("input[name='age']:checked").each(function () {
    //         answer2.push($(this).val());
    //     });
    //     var answer3 = $('#q3_word_register_textarea').val();
    //     var answer4 = $('#q4_word_register_textarea').val();
    //     var answer5 = []
    //     var registerdata = {
    //         title: answer1,
    //         age: answer2,
    //         mean: answer3,
    //         content: answer4,
    //         image: answer5
    //     };

    //     $.ajax({
    //         type: "POST",
    //         url: "#",
    //         data: JSON.stringify(registerdata),
    //         contentType: 'application/JSON',
    //         success: function (response) {
    //             // 서버로부터의 응답을 처리
    //             console.log("데이터가 성공적으로 전송");
    //             window.location.href = "/templates/word/register_complete"
    //         },
    //         error: function (error) {
    //             console.log("데이터 전송 중 오류가 발생");
    //         }
    //     });
    // });
});

// 질문 3 타이핑 수 제한
const q3_textarea = document.getElementById('q3_word_register_textarea');
const q3_textLengthCnt = document.querySelector('.q3_text-length-cnt');
const q3_maxLength = 40;

q3_textarea.addEventListener('input', function () {
    const q3_textLength = q3_textarea.value.length;
    q3_textLengthCnt.textContent = q3_textLength;

    // 입력 글자 수가 최대 글자 수를 초과할 경우 자르기
    if (q3_textLength > q3_maxLength) {
        q3_textarea.value = q3_textarea.value.slice(0, q3_maxLength);
        q3_textLengthCnt.textContent = q3_maxLength;
    }
});

// 질문 4 타이핑 수 제한
const q4_textarea = document.getElementById('q4_word_register_textarea');
const q4_textLengthCnt = document.querySelector('.q4_text-length-cnt');
const q4_maxLength = 300;

q4_textarea.addEventListener('input', function () {
    const q4_textLength = q4_textarea.value.length;
    q4_textLengthCnt.textContent = q4_textLength;

    // 입력 글자 수가 최대 글자 수를 초과할 경우 자르기
    if (q4_textLength > q4_maxLength) {
        q4_textarea.value = q4_textarea.value.slice(0, q4_maxLength);
        q4_textLengthCnt.textContent = q4_maxLength;
    }
});
