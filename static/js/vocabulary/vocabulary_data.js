
let access_token = localStorage.getItem("access");
let data;
let wordData = [];

const itemsPerPage = 12; // 페이지당 보여줄 아이템 개수
let initialPageNumber = 1;
const wordContainer = document.getElementById("wordContainer");
const paginationContainer = document.getElementById("paginationContainer");
let vocaLength;

document.addEventListener("DOMContentLoaded", function() {

    console.log(localStorage)
    if (localStorage.getItem("refresh") == null){
        alert("로그인이 필요한 서비스 입니다.")
        window.location.href="index.html";
    }
    
    const response = { 
        "refresh": localStorage.refresh
    }

    console.log(response)
    refreshAccessToken(response)
    getWordData();
    getUserInfo();
    
    function createWordCard_snd(item) {
        wordData = item;
        console.log(wordData)
        const wordItem = document.createElement("ul");
        wordItem.classList.add("word");
    
        let age = [];
        age = wordData.ages;
        console.log(age)

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
                    <p>${wordData.title}</p>
                    <div class="img_container">
                        ${imageHtml}
                    </div>
                </li>
                <li class="word_what"><p>${wordData.mean}</p></li>
                <li class="word_heart">
                    <img src="../static/img/imoge/heartred.png">
                    <p>${wordData.likes}</p>
                </li>
            `;

            wordItem.setAttribute("id", `wordCard_${item.id}`); // id 값을 설정
    
            wordItem.addEventListener("click", function () {
                const index = item.id;
                console.log(index)
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
    
    // 저장된 단어 없을 때 호출되는 함수
    function updateWordContainerVisibility() {
        const noWordSection = document.getElementById("noWord");
        const vocabularySection = document.getElementById("vocabulary");
    
        if (vocaLength === 0){
            vocabularySection.style.display = 'none';
            noWordSection.style.display = 'block';
        } else{
            vocabularySection.style.display = 'block';
            noWordSection.style.display = 'none';
        }
    }

    //퀴즈 활성화 시 이동
    function editBtnClick(){
        window.location.href = "quiz.html"
    }


    // 퀴즈 버튼
    function checkDataAndToggleQuizBtn() {
        const quizBtn = document.querySelector(".quizBtn");
        var quizBtnTxt = document.createElement('p');

        if (vocaLength < 5 ) {
            quizBtn.classList.add("disabled");
            quizBtnTxt.textContent = "5개 이상 단어를 추가하고 퀴즈에 도전하세요!";
            quizBtn.appendChild(quizBtnTxt);
        } else {
            quizBtn.classList.remove("disabled");
            quizBtnTxt.textContent = "단어 퀴즈 풀고 경험치 쌓으세요!";
            quizBtn.appendChild(quizBtnTxt);
            quizBtn.addEventListener("click", editBtnClick);
        }
    }

    // ajax 시작=========================================
    function getWordData(){
        $.ajax({
            type: "GET",
            url: '/api/vocabulary/',
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
            },
            success: function (response) {
                console.log(JSON.stringify(response));
                vocaLength = response.length;
                if (vocaLength === 0){
                    updateWordContainerVisibility()
                } else {
                    data = response;
                    console.log(data);
                    createPaginationButtons(Math.ceil(data.length / itemsPerPage), initialPageNumber); // 초기 페이지는 1로 설정
                    displayPageItems(initialPageNumber, data);
                    checkDataAndToggleQuizBtn();
                }
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
    }

function refreshAccessToken(response) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: '/api/account/refresh/',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                "refresh": response.refresh // response 객체에서 refresh token 가져옴
            }),
            success: function(res) {
                const access = res.access;
                const refresh = res.refresh;
                    
                localStorage.setItem('access', access);
                localStorage.setItem('refresh', refresh);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }
        });
    });
}

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/api/account/user/',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        },
        success: function(response) {
            console.log("유저 data : ", response);
            var user_nickname = response.nickname;
            userInfo(user_nickname);
        },
        error: function(request, status, error) {
            alert('불러오기 실패');
        }
    });
}

function userInfo(nickname){
    var infoNameInput = document.querySelector(".fix");
    var username = document.createElement('p');
    var currentNickname = nickname;
    username.innerHTML = `
    ${currentNickname}님의 <br>
    단어장 입니다.
    `    
    infoNameInput.append(username);

}

});

