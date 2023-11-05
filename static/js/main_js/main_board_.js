
var data;
const itemsPerPage = 6; // 페이지당 보여줄 아이템 개수
let initialPageNumber = 1;
const qnaCardContainer = document.getElementById("qnaCardContainer");
const paginationContainer = document.getElementById("paginationContainer");
const fixcontianer = document.getElementById("fixcontianer");
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
function createPcard(data) {
    fixcontainer.innerHTML = `
        <p class = "fix_p" id = "fix_p">${data.word} 에 대한<br>수정 요청 목록 입니다</p>
    `;
}
// 함수를 통해 Q&A 카드 생성
function createQnaCard(data) {

    console.log(data);
    const qnaCard = document.createElement("div");
    qnaCard.classList.add("qna_card");
    qnaCard.innerHTML = `
            <div class="qna_card_img"><img src="${data.author.image}"></div>
            <div class="qna_card_inf">
                <div class="qna_card_name">
                    <p>${data.author.nickname}</p>
                </div>
                <div class="qna_card_date">
                    <p>&nbsp;· ${data.created_at}</p>
                </div>
                <div class="qna_card_view">
                    <p>&nbsp;· 조회수 ${data.views}</p>
                </div>
                <div class="qna_card_a_view">
                    <p>&nbsp;· 답변수 ${data.comment_count}</p>
                </div>
            </div>
            <div class="qna_card_a_text">
                <h1>${data.title}</h1>
                <h2>${data.content}</h2>
            </div>
            <div class="qna_card_q">
                <button onclick="countqView();">
                    <img src="/static/img/imoge/thinking_face_color.png">
                    <p>나도 궁금해요 ${data.likes}</p>
                </button>
            </div>
            <div class="qna_card_a">
                <button onclick="qna_a();">
                    <img src="/static/img/imoge/nerd_face_color.png">
                    <p>댓글 등록하기</p>
                </button>
            </div>
            <div class="qna_card_background"></div>
        `;

    console.log(data.id);
    qnaCard.setAttribute("id", `qnaCard_${data.id}`); // id 값을 설정
    qnaCard.addEventListener("click", function () {
        // 해당 단어 카드의 링크로 이동
        const index = data.id;
        
        console.log(data.id)
        localStorage.setItem('qnafixCard_id', index);
        window.location.href = "/wordfix/detail.html";

    });

    qnaCardContainer.appendChild(qnaCard);
    console.log(qnaCardContainer)

}


function displayPageItems(pageNumber, data) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(pageNumber);
    qnaCardContainer.innerHTML = ""; // 기존 아이템 초기화
    console.log(data);
    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        console.log(data);
        createQnaCard(data[i]);
    }
}

function createPaginationButtons(totalPages, currentPage) {
    let paginationHtml = '';

    paginationHtml += '<button id="prevButton" class="pag_btn">&lt;</button>';

    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHtml += `<button class="pag_btn current">${i}</button>`;
        } else {
            paginationHtml += `<button class="pag_btn">${i}</button>`;
        }
    }

    paginationHtml += '<button id="nextButton" class="pag_btn">&gt;</button>';

    paginationContainer.innerHTML = paginationHtml;

    const pageButtons = paginationContainer.querySelectorAll(".pag_btn");


    pageButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            let newPage = currentPage;
            if (button.textContent === "<") {
                currentPage = Math.max(currentPage - 1, 1);
            } else if (button.textContent === ">") {
                currentPage = Math.min(currentPage + 1, totalPages);
            } else {
                currentPage = parseInt(button.textContent);
            }
            console.log(currentPage);
            createPaginationButtons(totalPages, currentPage);
            displayPageItems(currentPage, data);
            console.log(currentPage);
        });
    });
}


// var formData = new FormData();
// formData.append("word_id", 16);
// //아이디값을 넣어 줘야된다
var response = {
    "refresh": localStorage.getItem('refresh')
};


$.ajax({
    type: "GET",
    url: "/api/account/user/question/list/", // 실제 URL로 변경해야 합니다.
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
    },
    // data: formData,
    processData: false, // 필요한 경우 FormData 처리 방지
    contentType: false,
    success: function (response) {
        // 서버로부터의 응답을 처리
        data = response;
        console.log(data);
        console.log(data);
        createPaginationButtons(Math.ceil(data.edit.length / itemsPerPage), initialPageNumber); // 초기 페이지는 1로 설정
        createPcard(data.edit)
        displayPageItems(initialPageNumber, data.edit);
        console.log("데이터가 성공적으로 전송");
    },
    error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 401) {
            console.error("Unauthorized:", jqXHR.responseText);
            refreshAccessToken(response)
                //.then은 함수를 성공
                .then(function (access_token) {

                    $.ajax({
                        type: 'GET',
                        url: '/api/account/user/question/list/',
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
})
    