const wordContainerRecent = document.getElementById("wordContainerRecent");

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

function createWordCard_snd(item) {
    console.log(item)
    let cardCount = 0; // 데이터가 몇개 들어 왔는지 카운트
    $.each(item, function (index, data) {
        if (cardCount >= 8) {
            return false; //데이터 개수 
        }
        const wordItem = document.createElement("ul");
        wordItem.classList.add("word");

        const age = data.age; // Assume age is an array containing age values

        let imageHtml = ""; // Initialize imageHtml variable

        if (age[0] === 10) {
            imageHtml += `<img src="../static/img/age/age_10.png">`;
        } else if (age[0] === 20) {
            imageHtml += `<img src="../static/img/age/age_20.png">`;
        } else if (age[0] === 30) {
            imageHtml += `<img src="../static/img/age/age_30.png">`;
        } else if (age[0] === 40) {
            imageHtml += `<img src="../static/img/age/age_40.png">`;
        } else if (age[0] === 50) {
            imageHtml += `<img src="../static/img/age/age_50.png">`;
        }

        if (age[1]) {
            if (age[1] === 10) {
                imageHtml += `<img src="../static/img/age/age_10.png">`;
            } else if (age[1] === 20) {
                imageHtml += `<img src="../static/img/age/age_20.png">`;
            } else if (age[1] === 30) {
                imageHtml += `<img src="../static/img/age/age_30.png">`;
            } else if (age[1] === 40) {
                imageHtml += `<img src="../static/img/age/age_40.png">`;
            } else if (age[1] === 50) {
                imageHtml += `<img src="../static/img/age/age_50.png">`;
            }
        }

        wordItem.innerHTML = `
            <li class="word_name">
                <p>${truncateText(data.title, 8)}</p>
                <div class="img_container">
                    ${imageHtml}
                </div>
            </li>
            <li class="word_what"><p>${data.mean}</p></li>
            <li class="word_heart">
                <img src="../static/img/imoge/heartred.png">
                <p>${data.likes}</p>
            </li>
        `;

        // 클릭 이벤트 처리
        wordItem.addEventListener("click", function () {
            // 해당 단어 카드의 링크로 이동
            var wordId = data.id;
            localStorage.setItem('word_id', wordId);
            window.location.href = "/word/detail.html";
        });



        wordContainerRecent.appendChild(wordItem);
        cardCount++; // 데이터 증가
    })


}

//ajax 시작=========================================
$.ajax({
    url: '/api/word/recent/',
    type: "GET",
    dataType: "JSON",
    headers: {},

    success: function (result) {
        console.log(JSON.stringify(result));
        createWordCard_snd(result.data);
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


