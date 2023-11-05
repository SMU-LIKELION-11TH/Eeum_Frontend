var data;
const itemsPerPage = 12; // 페이지당 보여줄 아이템 개수
let initialPageNumber = 1;
let currentPage = 1; // 현재 페이지 번호
const wordContainer = document.getElementById("wordContainer");
const paginationContainer = document.getElementById("paginationContainer");
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}


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

function displayPageItems(data) {
    wordContainer.innerHTML = ""; // 기존 아이템 초기화

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        createWordCard_snd(data[i]);
    }
}

function createPaginationButtons(totalPages) {
    let paginationHtml = '';

    paginationHtml += '<button id="prevButton" class="pag_btn">&lt;</button>';

    const startPage = Math.max(currentPage - 2, 1);
    //수정할 부분
    var endPage;
    if (totalPages == 0){
        endPage=1
    }
    else{
        endPage = Math.min(startPage + 4, totalPages);
    }
    //수정할 부분

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

    pageButtons.forEach((button) => {
        button.addEventListener("click", function () {
            if (button.textContent === "<") {
                currentPage = Math.max(currentPage - 1, 1);
            } else if (button.textContent === ">") {
                currentPage = Math.min(currentPage + 1, totalPages);
            } else {
                currentPage = parseInt(button.textContent);
            }
            updatePage();
        });
    });
}

// 데이터 업데이트 및 페이지네이션 호출 함수
function updatePage() {
    displayPageItems(data);
    createPaginationButtons(Math.ceil(data.length / itemsPerPage));
}

// 옵션 선택에 따른 페이지 업데이트 함수
function updatePageByOption(selectedOption) {
    const ajaxUrl = selectedOption === "recency"
        ? "/api/word/recent/"
        : "/api/word/most_views/";

    $.ajax({
        url: ajaxUrl,
        type: "GET",
        dataType: "JSON",
        headers: {},
        success: function (result) {
            data = result.data;
            updatePage();
        },
        error: function (xhr, textStatus, thrownError) {
            alert("Django로 URL을 보내지 못했습니다. 오류: " + xhr.status + ": " + xhr.responseText);
        },
    });
}

// 초기 페이지 업데이트 (최신순으로 시작)
updatePageByOption("recency");

// 옵션 선택 요소 이벤트 리스너
const sortingSelect = document.getElementById("sortingSelect");
sortingSelect.addEventListener("change", function () {
    const selectedOption = sortingSelect.value;
    updatePageByOption(selectedOption);
});
