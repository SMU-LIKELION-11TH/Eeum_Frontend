
//===좋아요 버튼============================================

//=========================댓글 등록================================================
function countqView() {
    const commentContent = commentInput.value.trim();
    var formData = new FormData();
    formData.append("question_id", localStorage.getItem('qnaCard_id'));
    formData.append("content", commentContent);

    var response = {
        "refresh": localStorage.getItem('refresh')
    };

    console.log(formData);

    $.ajax({
        type: "POST",
        url: "/api/question/questionlike/", // 실제 URL로 변경해야 합니다.
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        data: formData,
        processData: false, // 필요한 경우 FormData 처리 방지
        contentType: false,
        success: function (response) {
            // 서버로부터의 응답을 처리
            console.log("데이터가 성공적으로 전송");
            console.log(response);
            //  
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 401) {
                console.error("Unauthorized:", jqXHR.responseText);
                refreshAccessToken(response)
                    //.then은 함수를 성공
                    .then(function (access_token) {

                        $.ajax({
                            type: 'POST',
                            url: '/api/question/questionlike/',
                            contentType: 'application/json',

                            beforeSend: function (xhr) {
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
}

// 버튼 클릭 시 댓글 추가 함수 호출
commentBtn.addEventListener("click", countqView);