
var data;
const itemsPerPage = 6; // 페이지당 보여줄 아이템 개수
let initialPageNumber = 1;
const qnaCardContainer = document.getElementById("qnaCardContainer");
const paginationContainer = document.getElementById("paginationContainer");

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
                    <p>&nbsp;· 답변수 ${data.answers}</p>
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


    qnaCard.setAttribute("id", `qnaCard_${data.id}`); // id 값을 설정
    qnaCard.addEventListener("click", function () {
        // 해당 단어 카드의 링크로 이동
        const index = data.id;
        console.log(data.id)
        localStorage.setItem('qnaCard_id', index);
        window.location.href = "/qna/list.html";

    });

    qnaCardContainer.appendChild(qnaCard);
    console.log(qnaCardContainer)

}


function displayPageItems(pageNumber, data) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(pageNumber);
    qnaCardContainer.innerHTML = ""; // 기존 아이템 초기화

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


//ajax 시작=========================================
$.ajax({
    url: '/api/question/list/',
    type: "POST",
    dataType: "JSON",
    data: { sort: "최신", type: "등록 요청" },
    headers: {},

    success: function (result) {
        data = result;
        createPaginationButtons(Math.ceil(data.length / itemsPerPage), initialPageNumber); // 초기 페이지는 1로 설정
        console.log(data);
        displayPageItems(initialPageNumber, data);
        console.log(initialPageNumber);
    },

    error: function (xhr, textStatus, thrownError) {
        alert(
            "Could not send URL to Django. Error: " +
            xhr.status +
            ": " +
            xhr.responseText
        );
    },
})
//ajax 끝===========================================
