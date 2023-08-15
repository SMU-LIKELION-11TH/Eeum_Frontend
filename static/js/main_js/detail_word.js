//단어 카드 추가

document.addEventListener("DOMContentLoaded", function() {
    const wordContainer = document.getElementById("wordContainer");
    const commentTxt = document.querySelector(".comment_txt");

    // 예시 데이터 - 실제로는 서버에서 가져오는 데이터로 대체해야 합니다.
    const wordsData = [
        {
            index: 1,
            name: "~라고 할뻔",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "하고싶은 말 뒤에 쓴다",
            heart: 30,
            heart_img: "/static/img/imoge/heartred.png",
            link: "practice.html"
        },
        // ... 이하 데이터 추가
    ];

    // 함수를 통해 단어 카드 생성
    function createWordCard(data) {
        const wordItem = document.createElement("ul");
        wordItem.classList.add("word");
    
        let imageHtml = `<img src="${data.image}">`;
    
        if (data.image_snd) {
            imageHtml += `<img src="${data.image_snd}">`;
        }
    
        wordItem.innerHTML = `
            <li class="word_name">
                <p>${data.name}</p>
                <div class="img_container">
                    ${imageHtml}
                </div>
            </li>
            <li class="word_what"><p>${data.what}</p></li>
            <li class="word_heart">
                <img src="${data.heart_img}">
                <p>${data.heart}</p>
            </li>
        `;

        // 클릭 이벤트 처리
        wordItem.addEventListener("click", function() {
            // 해당 단어 카드의 링크로 이동
            window.location.href = data.link;
        });
    
        wordContainer.appendChild(wordItem);
    }
    
    if (wordsData.length === 0) {
        commentTxt.style.display = "none"; // "질문한 단어가 등록되었습니다." 문구 감춤
    } else {
        commentTxt.style.display = "flex"; // "질문한 단어가 등록되었습니다." 문구 표시
        wordsData.forEach(data => {
            createWordCard(data);
        });
    }
});
