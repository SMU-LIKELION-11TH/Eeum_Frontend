document.addEventListener("DOMContentLoaded", function() {
    const qnaCardContainer = document.getElementById("qnaCardContainer_answer");
    const commentInput = document.getElementById("commentInput");
    const commentBtn = document.getElementById("comment_btn");

    const wordsData = [
        // 기존 데이터들...
        {
            index: 1,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            time: "22:00",
            questionTitle: "움직이는 짤의 줄임말입니다.",
            questionTitle_two: "짤은 사진이니까 움직이는 사진이라는 뜻입니다.",
            answerCommentCount: 12,
        },
        {
            index: 2,
            profileImgSrc: "/static/img/profile/지렁이.png",
            username: "귀여운 햄스터",
            date: "2023/07/25",
            time: "22:00",
            questionTitle: "움직이는 짤이라는 뜻입니다",
            questionTitle_two: "짤은 사진이니까 움직이는 사진이라는 뜻입니다.",
            answerCommentCount: 12,
        },
    ];

    function createQnaCard(data, container) {
        const qnaCard = document.createElement("div");
        qnaCard.classList.add("qna_card");

        qnaCard.innerHTML = `
            <div class="qna_card_img"><img src="${data.profileImgSrc}"></div>
            <div class="qna_card_inf">
                <div class="qna_card_name">
                    <p>${data.username}</p>
                </div>
                <div class="qna_card_date">
                    <p>&nbsp;· ${data.date}</p>
                </div>
                <div class="qna_card_a_view">
                    <p>&nbsp;${data.time}</p>
                </div>
            </div>
            <div class="qna_card_a_text">
                <h1>${data.questionTitle}<br>${data.questionTitle_two}</h1>
            </div>
            <div class="qna_card_q">
                <button onclick="countqView();">
                    <img src="/static/img/imoge/smiling_face_with_heart-eyes_color 1.png">
                    <p>도움이 되었어요 ${data.answerCommentCount}</p>
                </button>
            </div>
            <div class="qna_card_background"></div>
        `;

        container.appendChild(qnaCard);
    }

    // 버튼 클릭 시 댓글을 단어 카드로 추가하는 함수
    function addComment() {
        const commentContent = commentInput.value.trim();
        
        if (commentContent !== "") {
            const newCardData = {
                index: wordsData.length + 1, // 새로운 카드의 인덱스
                profileImgSrc: "/static/img/profile/지렁이.png", // 사용자 프로필 이미지 경로
                username: "사용자명", // 사용자명
                date: getCurrentDate(), // 현재 날짜
                time: getCurrentTime(), // 현재 시간
                questionTitle: commentContent, // 댓글 내용을 질문 제목으로 사용
                questionTitle_two: "", // 추가 질문 제목 (비움)
                answerCommentCount: 0, // 초기 댓글 개수
            };
            
            wordsData.push(newCardData);
            createQnaCard(newCardData, qnaCardContainer);
            
            // 댓글 입력창 비우기
            commentInput.value = "";
        }
    }

    // 버튼 클릭 시 댓글 추가 함수 호출
    commentBtn.addEventListener("click", addComment);

    // 현재 날짜 반환 함수 (YYYY/MM/DD 형식)
    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}/${month}/${day}`;
    }

    // 현재 시간 반환 함수 (HH:MM 형식)
    function getCurrentTime() {
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, "0");
        const minutes = String(currentTime.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    wordsData.forEach(data => {
        createQnaCard(data, qnaCardContainer);
    });
});
