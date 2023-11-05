var data;
const itemsPerPage = 12; // 페이지당 보여줄 아이템 개수
let initialPageNumber = 1;
const wordContainer = document.getElementById("wordContainer");
const paginationContainer = document.getElementById("paginationContainer");

// const storedArray = JSON.parse(localStorage.getItem('wordsearchresult'));
// console.log(storedArray)


function createWordCard_snd(item) {

    const data = item;
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
                <p>${data.title}</p>
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
    wordItem.setAttribute("id", `wordCard_${data.id}`); // id 값을 설정
    wordItem.addEventListener("click", function () {
        // 해당 단어 카드의 링크로 이동
        const index = data.id;
        console.log(data.id)
        localStorage.setItem('word_id', index);
        window.location.href = "/word/detail.html";

    });

    wordContainer.appendChild(wordItem);
}

function displayPageItems(pageNumber, data) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    wordContainer.innerHTML = ""; // 기존 아이템 초기화

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        createWordCard_snd(data[i]);
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


// ajax 시작=========================================
$.ajax({
    url: '/api/word/all/',
    type: "GET",
    dataType: "JSON",
    headers: {},
    success: function (result) {
        data = result.data.word;
        console.log(result);
        createPaginationButtons(Math.ceil(data.length / itemsPerPage), initialPageNumber); // 초기 페이지는 1로 설정
        displayPageItems(initialPageNumber, data);
        (initialPageNumber);
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
// ajax 끝===========================================

