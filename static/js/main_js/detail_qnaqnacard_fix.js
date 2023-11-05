

//===============================================================================================
const qnaCardContainer_answer = document.getElementById("qnaCardContainer_answer");
const qnaCardContainer = document.getElementById("qnaCardContainer");
const commentTxt = document.querySelector(".comment_txt");
const wordContainer = document.getElementById("wordContainer");
const commentInput = document.getElementById("commentInput");
const commentBtn = document.getElementById("comment_btn");
// const likeBtn = document.getElementById("likeBtn");

function refreshAccessToken(response) {
    return new Promise((resolve, reject) => {
        console.log(response.refresh)
        $.ajax({
            type: 'POST',
            url: '/api/account/refresh/',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                refresh: localStorage.getItem('refresh') // response 객체에서 refresh token 가져옴
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

function createQnaCard(data) {
    const qnaCard = document.createElement("div");
    qnaCard.classList.add("qna_card");
    const item = data.data.edit;
    qnaCard.innerHTML = `
            <div class="qna_card_img"><img src="${item.author.image}"></div>
            <div class="qna_card_inf">
                <div class="qna_card_name">
                    <p>${item.author.nickname}</p>
                </div>
                <div class="qna_card_date">
                    <p>&nbsp;· ${item.created_at}</p>
                </div>
                <div class="qna_card_view">
                    <p>&nbsp;· 조회수 ${item.views}</p>
                </div>
                <div class="qna_card_a_view">
                    <p>&nbsp;· 답변수 ${item.comment_count}</p>
                </div>
            </div>
            <div class="qna_card_a_text">
                <h1>${item.title}</h1>
                <h2>${item.content}</h2>
            </div>
            <div class="qna_card_q">
                <button id="likeBtn" class="like-button" onclick="countqView();">
                    <img src="/static/img/imoge/thinking_face_color.png">
                    <p>나도 궁금해요 ${item.likes}</p>
                </button>
            </div>
            <div class="qna_card_background"></div>
        `;

    qnaCardContainer.appendChild(qnaCard);
}


//=============================================================

function createQna_answer(data) {
    for (let i = 0; i < data.comment.length; i++) {
        const qnaCard = document.createElement("div");
        qnaCard.classList.add("qna_card");
        qnaCard.setAttribute("id", "comment"+data.comment[i].id);
        const dataimage = data.comment[i].author.image;
        const datanickname = data.comment[i].author.nickname;
        const datacreat = data.comment[i].created_at;
        const datacontent = data.comment[i].content;
        const datalikes = data.comment[i].likes;
        const commentId = data.comment[i].id; // 댓글의 ID 가져오기
        qnaCard.innerHTML = `
            <div class="qna_card_img"><img src="${dataimage}"></div>
            <div class="qna_card_inf">
                <div class="qna_card_name">
                    <p>${datanickname}</p>
                </div>
                <div class="qna_card_date">
                    <p>&nbsp;· ${datacreat}</p>
                </div>
            </div>
            <div class="qna_card_a_text">
                <h1>${datacontent}</h1>
            </div>
            <div class="qna_card_q">
                <button class="likebtn" onclick="countqhelpView(${commentId});">
                    <img src="/static/img/imoge/smiling_face_with_heart-eyes_color 1.png">
                    <p>도움이 되었어요 ${datalikes}</p>
                </button>
            </div>
            <div class="qna_card_background"></div>
        `;
        qnaCardContainer_answer.appendChild(qnaCard);
    }

}


function createQna_answer_plus(data) {
    console.log(data);
    const qnaCard = document.createElement("div");
    qnaCard.classList.add("qna_card");
    qnaCard.setAttribute("id", "comment"+data.id);
    qnaCard.innerHTML = `
            <div class="qna_card_img"><img src="${data.author.image}"></div>
            <div class="qna_card_inf">
                <div class="qna_card_name">
                    <p>${data.author.nickname}</p>
                </div>
                <div class="qna_card_date">
                    <p>&nbsp;· ${data.created_at}</p>
                </div>
            </div>
            <div class="qna_card_a_text">
                <h1>${data.content}</h1>
            </div>
            <div class="qna_card_q">
                <button class="likebtn" onclick="countqhelpView(${data.id});">
                    <img src="/static/img/imoge/smiling_face_with_heart-eyes_color 1.png">
                    <p>도움이 되었어요 ${data.likes}</p>
                </button>
            </div>
            <div class="qna_card_background"></div>
        `;

    qnaCardContainer_answer.appendChild(qnaCard);


}


//=========================댓글 등록================================================
function addComment() {
    const commentContent = commentInput.value.trim();
    var formData = new FormData();
    formData.append("edit_id", localStorage.getItem('qnafixCard_id'));
    formData.append("content", commentContent);

    var response = {
        "refresh": localStorage.getItem('refresh')
    };

    console.log(formData);

    $.ajax({
        type: "POST",
        url: "/api/word/comment/create/", // 실제 URL로 변경해야 합니다.
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
            createQna_answer_plus(response.data.edit);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 401) {
                console.error("Unauthorized:", jqXHR.responseText);
                refreshAccessToken(response)
                    //.then은 함수를 성공
                    .then(function (access_token) {

                        $.ajax({
                            type: 'POST',
                            url: '/api/word/comment/create/',
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
commentBtn.addEventListener("click", addComment);

//=========================댓글 등록================================================

//ajax시작===================================================
$.ajax({
    url: '/api/word/edit/detail/',
    type: "POST",
    dataType: 'json',
    data: {
        "edit_id": localStorage.getItem('qnafixCard_id'),
    },
    headers: {},

    success: function (result) {
        console.log(result);
        createQnaCard(result);
        createQna_answer(result.data.edit);
    },

    error: function (xhr) {
        alert(
            "Could not send URL to Django. Error: " +
            xhr.status +
            ": " +
            xhr.responseText
        );
    },
});

//ajax 끝===================================================


//===좋아요 버튼============================================

//=========================댓글 등록================================================
function countqhelpView(data) {
    var formData = new FormData();
    console.log(data)
    formData.append("comment_id", data);
    console.log(data)

    var response = {
        "refresh": localStorage.getItem('refresh')
    };

    console.log(formData);

    $.ajax({
        type: "POST",
        url: "/api/word/comment/like/", // 실제 URL로 변경해야 합니다.
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        data: formData,
        processData: false, // 필요한 경우 FormData 처리 방지
        contentType: false,
        success: function (response) {
            // 서버로부터의 응답을 처리
            console.log(response);
            const likeCountElement = document.querySelector("#comment"+data+">.qna_card_q>button");
            var currentText = likeCountElement.innerHTML;
            var startIndex = currentText.indexOf("도움이 되었어요 ") + 9;
            var newText = currentText.slice(0, startIndex) + response;
            
            likeCountElement.innerHTML = newText;


        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 401) {
                console.error("Unauthorized:", jqXHR.responseText);
                refreshAccessToken(response)
                    //.then은 함수를 성공
                    .then(function (access_token) {

                        $.ajax({
                            type: 'POST',
                            url: '/api/word/comment/like/',
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


function countqView() {
    var formData = new FormData();
    formData.append("edit_id", localStorage.getItem('qnafixCard_id'));

    var response = {
        "refresh": localStorage.getItem('refresh')
    };

    console.log(formData);

    $.ajax({
        type: "POST",
        url: "/api/word/edit/like/", // 실제 URL로 변경해야 합니다.
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
            const likeCountElement = document.querySelector(".like-button p");
            likeCountElement.innerText = `나도 궁금해요 ${response}`;
        },

        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 401) {
                console.error("Unauthorized:", jqXHR.responseText);
                refreshAccessToken(response)
                    //.then은 함수를 성공
                    .then(function (access_token) {

                        $.ajax({
                            type: 'POST',
                            url: '/api/word/edit/like/',
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
}
