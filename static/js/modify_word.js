// Refresh Token 재발급 함수
function refreshAccessToken(response) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: '/api/account/refresh/',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                refresh: localStorage.getItem("refresh") // response 객체에서 refresh token 가져옴
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

// 'image-input' 요소에 변경 이벤트 리스너를 추가
document.getElementById('image-input').addEventListener('change', function (event) {
    const file = event.target.files[0]; // 선택된 파일을 가져옴
    const previewImage = document.getElementById('preview-image'); 
    const previewContainer = document.getElementById('preview-container'); 

    if (file) { // 파일이 선택되었을 경우
        const reader = new FileReader(); // FileReader 객체를 생성합니다.

        // 파일 읽기가 완료되면 실행되는 함수
        reader.onload = function () {
            previewImage.style.backgroundImage = `url(${reader.result})`; // 미리보기 이미지의 배경 이미지를 설정합니다.
            previewImage.classList.remove('empty-preview'); // 'empty-preview' 클래스를 제거합니다.

            uploadedimage = reader.result; // 업로드된 이미지를 저장합니다.
        };

        reader.readAsDataURL(file); // 파일을 Data URL 형태로 읽습니다.
    } else { // 파일이 선택되지 않았을 경우
        previewImage.style.backgroundImage = ''; // 미리보기 이미지의 배경 이미지를 제거합
        previewImage.classList.add('empty-preview'); // 'empty-preview' 클래스를 추가
    }
});

// 이미지 삭제 함수
function deleteImage() {
    const previewImage = document.getElementById('preview-image'); 
    const imageInput = document.getElementById('image-input'); 
    imageInput.value = ''; // 이미지 입력 요소의 값(value)을 초기화
    previewImage.style.backgroundImage = ''; // 미리보기 이미지의 배경 이미지를 제거
    previewImage.classList.add('empty-preview'); // 'empty-preview' 클래스를 추가

    uploadedimage = null; // 업로드된 이미지를 초기화합니다.
}


//질문 id를 받아서 다음 질문으로 넘어갈 수 있도록 하는 js
$(document).ready(function () {
    $(".nextButton").on("click", function () {
        // 현재 표시되고 있는 질문의 ID를 가져옴
        var currentQuestion = $(this).closest(".modify_word_question").attr("id");
        // 다음 질문의 ID를 data-next 속성으로부터 가져옴
        var nextQuestion = $(this).data("next");

        // 현재 질문을 숨기고 다음 질문을 표시
        $("#" + currentQuestion).hide();
        $(nextQuestion).show();
    });
    $(".backButton").click(function() {
        // 현재 표시되고 있는 단계를 숨깁니다.
        var currentStep = $(".modify_word_question:visible");
        currentStep.hide();
  
        // 이전 단계를 보이도록 설정합니다.
        currentStep.prev(".modify_word_question").show();
    });

    document.querySelector(".q1_text-length-cnt").textContent = localStorage.mean.length;
    document.querySelector(".q2_text-length-cnt").textContent = localStorage.content.length;
    document.getElementById("wordToDefine").textContent = localStorage.title;
    document.getElementById("wordToDefine1").textContent = localStorage.title;
    document.getElementById("wordToDefine2").textContent = localStorage.title;
    document.getElementById("q1_modify_word_textarea").value = localStorage.mean;
    document.getElementById("q2_modify_word_textarea").value = localStorage.content;
    document.querySelector("#preview-image").style.backgroundImage = `url(${localStorage.image})`;
    document.querySelector("#preview-image").classList.remove('empty-preview');

    refreshAccessToken(localStorage.getItem("refresh"))
        .then(function (access_token) {
            $.ajax({
                type: 'PUT',
                url: '/api/word/update/'+localStorage.getItem("word_id")+'/',
                contentType: 'application/json',
                data: JSON.stringify({ word_id: localStorage.getItem("word_id"),
                mean: localStorage.getItem("mean"),
                content: localStorage.getItem("content"),
                image: localStorage.getItem("image")}),
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

    // $.ajax({
    //     type: "PUT",
    //     url:"/api/word/update/" + localStorage.getItem("word_id")+"/",
    //     headers:{
    //         'Authorization': `Bearer ${localStorage.getItem('access')}`
    //     },
    //     contentType: 'application/json',
    //     data: JSON.stringify({ word_id: localStorage.getItem("word_id"),
    //     mean: localStorage.getItem("mean"),
    //     content: localStorage.getItem("content"),
    //     image: localStorage.getItem("image")}),
    //     success: function(response){
    //         alert('변경 성공');
    //         console.log("data : ", response);
            
    //     },
    //     error: function(request, status, error){
    //         alert('변경 실패');
    //     }

    // })
    // 텍스트 영역에 입력이 있을 때
    $('#q1_modify_word_textarea').on('input', function () {
        var inputVal = $(this).val(); // 입력된 텍스트 값
        var nextButton = $('#modify_word_nextbtn1');
        
        // 입력된 텍스트 길이 계산
        var textLength = inputVal.length;
        var maxLength = 40; // 최대 길이

        console.log(textLength);
        
        // 텍스트 길이 정보 업데이트
        $('.q1_text-length-cnt').text(textLength);
        $('.q1_text-length-total').text(maxLength);

        // 텍스트 값이 비어있거나 최대 길이를 넘지 않을 때 버튼 활성화
        if (textLength > 0) {
            nextButton.attr('disabled', false);
        } else {
            nextButton.prop('disabled', true);
        }
    });
    // 텍스트 영역에 입력이 있을 때
    $('#q2_modify_word_textarea').on('input', function () {
        var inputVal = $(this).val(); // 입력된 텍스트 값
        var nextButton = $('#modify_word_nextbtn2');
        
        // 입력된 텍스트 길이 계산
        var textLength = inputVal.length;
        var maxLength = 300; // 최대 길이
        
        // 텍스트 길이 정보 업데이트
        $('.q2_text-length-cnt').text(textLength);
        $('.q2_text-length-total').text(maxLength);

        // 텍스트 값이 비어있거나 최대 길이를 넘지 않을 때 버튼 활성화
        if ( textLength > 0) {
            nextButton.prop('disabled', false);
        } else {
            nextButton.prop('disabled', true);
        }
    });

    $('#modify_word_submitbtn').click(function () {
        var answer1 = $('#q1_modify_word_textarea').val();
        var answer2 = $('#q2_modify_word_textarea').val();
        var answer3 = document.querySelector('#image-input'); // 이미지 관련 데이터를 추가
        console.log(answer3.files[0]);
        var Data = new FormData();
    
        Data.append('mean', answer1);
        Data.append('content', answer2);
        Data.append('image', answer3.files[0]);


        var response = {
            "refresh": localStorage.getItem('refresh')
        };

        for (var value of Data.values()) {

            console.log(value);
          
        }

        console.log(answer1);
        console.log(answer2);

        $.ajax({
            type: "PUT",
            url:"/api/word/update/" + localStorage.getItem("word_id")+"/", // 실제 URL로 변경해야 합니다.
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('access')}`
            },
            data: Data,
            processData: false, // 필요한 경우 FormData 처리 방지
            contentType: false, 
            success: function (response) {
                // 서버로부터의 응답을 처리
                
                console.log("데이터 성공적으로 변경");
                window.location.href = "modify_complete.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 401) {
                    refreshAccessToken(response)
            .then(function (access_token) {
                $.ajax({
                    type: 'PUT',
                    url:"/api/word/update/" + localStorage.getItem("word_id")+"/",
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
                  console.error("Unauthorized:", jqXHR.responseText);
                  refreshAccessToken(refresh)
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
});


//타이필 수 제한 함수 ------------------------------------

// 질문 1 타이핑 수 제한
const q1_textarea = document.getElementById('q1_modify_word_textarea');
const q1_textLengthCnt = document.querySelector('.q1_text-length-cnt');
const q1_maxLength = 40;

q1_textarea.addEventListener('input', function () {
    const q1_textLength = q1_textarea.value.length;
    q1_textLengthCnt.textContent = q1_textLength;

    // 입력 글자 수가 최대 글자 수를 초과할 경우 자르기
    if (q1_textLength > q1_maxLength) {
        q1_textarea.value = q1_textarea.value.slice(0, q1_maxLength);
        q1_textLengthCnt.textContent = q1_maxLength;
    }
});

// 질문 2 타이핑 수 제한
const q2_textarea = document.getElementById('q2_modify_word_textarea');
const q2_textLengthCnt = document.querySelector('.q2_text-length-cnt');
const q2_maxLength = 300;

q2_textarea.addEventListener('input', function () {
    const q2_textLength = q2_textarea.value.length;
    q2_textLengthCnt.textContent = q2_textLength;

    // 입력 글자 수가 최대 글자 수를 초과할 경우 자르기
    if (q2_textLength > q2_maxLength) {
        q2_textarea.value = q2_textarea.value.slice(0, q2_maxLength);
        q2_textLengthCnt.textContent = q2_maxLength;
    }
});
