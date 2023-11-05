
var data;
const itemsPerPage = 6; // 페이지당 보여줄 아이템 개수
let initialPageNumber = 1;
const wordContainer = document.getElementById("wordContainer");
const paginationContainer = document.getElementById("paginationContainer");
const fixcontainer = document.getElementById("fixcontainer");

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
        <p class = "fix_p" id = "fix_p">${data} 님의<br>등록 단어 목록 입니다</p>
    `;
}



function createWordCard_snd(item) {

    const data = item;
    const wordItem = document.createElement("ul");
    wordItem.classList.add("word");

    const age = data.ages; // Assume age is an array containing age values

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

function displayPageItems(currentPage,data) {
    wordContainer.innerHTML = ""; // 기존 아이템 초기화

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

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



// var formData = new FormData();
// formData.append("word_id", 16);
// //아이디값을 넣어 줘야된다
var response = {
    "refresh": localStorage.getItem('refresh')
};


$.ajax({
    type: "GET",
    url: "/api/account/user/word/list/", // 실제 URL로 변경해야 합니다.
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
    },
    // data: formData,
    processData: false, // 필요한 경우 FormData 처리 방지
    contentType: false,
    success: function (response) {
        // 서버로부터의 응답을 처리
        data = response.words;
        console.log(response);
        console.log(data);
        createPaginationButtons(Math.ceil(data.length / itemsPerPage), initialPageNumber); // 초기 페이지는 1로 설정
        createPcard(response.user)
        displayPageItems(initialPageNumber, data);
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
                        url: '/api/account/user/word/list/',
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
