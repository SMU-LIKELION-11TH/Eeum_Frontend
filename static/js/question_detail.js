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
$(document).ready(function() {
    if (localStorage.getItem("refresh") == null){
        alert("로그인이 필요한 서비스 입니다.")
        window.location.href="index.html";
    }
    $('#question_detail_submitbtn').click(function () {
        var answer1 = $('#question_detail_textarea').val();
    
        var questionData = {
            title: answer1,
            content: answer1,
            type: "질문",
            word_id: localStorage.getItem('word_id')
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
                    beforeSend: function (xhr) {
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
                window.location.href = "question_detail_complete.html";
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
    });
})

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