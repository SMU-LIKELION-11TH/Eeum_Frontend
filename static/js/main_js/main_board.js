const qnaCardContainerMostViewed = document.getElementById("qnaCardContainerMostViewed");

// 함수를 통해 Q&A 카드 생성
function createQnaCard(item) {

    let cardCount = 0; // 데이터가 몇개 들어 왔는지 카운트
    $.each(item, function (index, data) {
        if (cardCount >= 4) {
            return false; //데이터 개수 
        }
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
            window.location.href = "/registrationrequest/detail.html";

        });


        qnaCardContainerMostViewed.appendChild(qnaCard);
        cardCount++; // 데이터 증가
    })
}



//ajax 시작=========================================
$.ajax({
    url: '/api/question/list/',
    type: "POST",
    dataType: "JSON",
    data: { sort: "조회수", type: "등록 요청" },
    headers: {},

    success: function (result) {
        console.log(JSON.stringify(result));
        console.log(result);
        createQnaCard(result);
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