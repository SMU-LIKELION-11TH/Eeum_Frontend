let wordData = [];
let myQuest = [];
let myRequest = [];
let userName;
let access_token = localStorage.getItem("access");

const myUserWordContainer = document.getElementsByClassName("userWordCardList");

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("refresh") == null){
        alert("로그인이 필요한 서비스 입니다.")
        window.location.href="index.html";
    }

    const response = { 
        "refresh": localStorage.refresh
    }

    
    getUserInfo();
    getUserWordData();
    getUserQuestionData();
    getUserReuestData();

    let newName = ""; // 수정된 닉네임을 저장하는 변수

    const editBtn = document.getElementById("editBtn");
    const inputBox = document.getElementById("inputName");
    
    // 수정 버튼 클릭 이벤트 핸들러 등록
    editBtn.addEventListener("click", editBtnClick);

    //수정 버튼 클릭 이벤트 핸들러
    function editBtnClick() {
        inputBox.readOnly = !inputBox.readOnly;
        
        if(inputBox.readOnly){
                $(editBtn).css("background-color", "#FFFFFF");
                $(editBtn).val("수정");
        } else{
                $(editBtn).css("background-color", "#FFE173");
                $(editBtn).val("저장");
                console.log(inputBox.value)
                newName = inputBox.value; // 수정된 닉네임 저장
        }
    }

            // 저장 버튼 클릭 이벤트 핸들러
            editBtn.addEventListener("click", function() {
                if (inputBox.readOnly) {
                    // inputBox가 편집 가능한 상태일 때에만 changeData 호출
                    changeData(inputBox.value);
                }
            });

// Refresh Token 재발급 함수
function refreshAccessToken(response) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: '/api/account/refresh/',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                "refresh": localStorage.getItem('refresh')
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

function createWordCard(wordData){
    const wordCardContainer = document.querySelector('.userWordCardList');
    const wordCard = document.createElement('li');
    wordCard.classList.add("userWordCard")
    let cardAges = wordData.ages;

    let imageHtml = ""; // Initialize imageHtml variable
    
    if (cardAges[0] === 10) {
        imageHtml += `<img src="../static/img/age/age_10.png">`;
    } else if (cardAges[0] === 20) {
        imageHtml += `<img src="../static/img/age/age_20.png">`;
    } else if (cardAges[0] === 30) {
        imageHtml += `<img src="../static/img/age/age_30.png">`;
    } else if (cardAges[0] === 40) {
        imageHtml += `<img src="../static/img/age/age_40.png">`;
    } else if (cardAges[0] === 50) {
        imageHtml += `<img src="../static/img/age/age_50.png">`;
    }

    if (cardAges[1]) {
        if (cardAges[1] === 10) {
            imageHtml += `<img src="../static/img/age/age_10.png">`;
        } else if (cardAges[1] === 20) {
            imageHtml += `<img src="../static/img/age/age_20.png">`;
        } else if (cardAges[1] === 30) {
            imageHtml += `<img src="../static/img/age/age_30.png">`;
        } else if (cardAges[1] === 40) {
            imageHtml += `<img src="../static/img/age/age_40.png">`;
        } else if (cardAges[1] === 50) {
            imageHtml += `<img src="../static/img/age/age_50.png">`;
        }
    }

    wordCard.innerHTML = `
    <div class="wordCardTop">
    ${imageHtml}
    </div>  
    <div class = "contentWrap">
    <div class="wordCardBottom">
    <p class="userWord">${wordData.title}</p>
        <div class="userWordLike">
            <img class="userWordLikeHeart" src="../static/img/imoge/heartred.png">
            <p class="userWordLikeNum">${wordData.likes}</p>
        </div>
    </div>
    </div>
    `;

    wordCard.addEventListener("click", function () {
        const index = wordData.id;
        console.log(index)
        localStorage.setItem('word_id', index);
        window.location.href = "/word/detail.html";
    });

    wordCardContainer.appendChild(wordCard);
}

function createQuestCard(questData){
    const questCardContainer = document.querySelector('.userQuestCardList');
    const questCard = document.createElement('li');
    questCard.classList.add("userQuestCard")

    questCard.innerHTML = `
    <div class="userQuestText">
        <p class="userQuestTitle">
            ${questData.title}
        </p>
        <p class="userQuestDate">
            ${questData.created_at}
        </p>
    </div>
    `;

    questCard.addEventListener("click", function () {
        const index = questData.id;
        console.log(index)
        localStorage.setItem('qnaqnaCard_id', index);
        window.location.href = "/qna/detail.html";
    });



    questCardContainer.appendChild(questCard);
}

function createRequestCard(requestData){
    const requestCardContainer = document.querySelector('.userRequestCardList');
    const requestCard = document.createElement('li');
    requestCard.classList.add("userRequestCard")

    requestCard.innerHTML = `
    <div class="userRequestText">
        <p class="userRequestTitle">
            ${requestData.title}
        </p>
        <p class="userRequestDate">
            ${requestData.created_at}
        </p>
    </div>
    `;

    requestCard.addEventListener("click", function () {
        const index = requestData.id;
        console.log(index)
        localStorage.setItem('qnafixCard_id', index);
        window.location.href = "wordfix/detail.html";
    });



    requestCardContainer.appendChild(requestCard);
}

function changeData(newName) {
    var requestData = {
        "age": 20,
        "nickname": newName,
        "image": "http://127.0.0.1:8000//media/user/1-all.jpg",
        "level": "돌멩이"
    };

    $.ajax({
        type: 'PUT',
        url: '/api/account/user/', // 슬래시 하나로 수정
        contentType: 'application/json',
        data: JSON.stringify(requestData), // 데이터를 JSON 문자열로 변환
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        },
        success: function(response) {
            alert('변경 성공');
            console.log("data : ", response);
            if(response.status === 401){
                refreshAccessToken(response)
                .then(
                    $.ajax({
                        type: 'PUT',
                        url: '/api/account/user/', // 슬래시 하나로 수정
                        contentType: 'application/json',
                        data: JSON.stringify(requestData), // 데이터를 JSON 문자열로 변환
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
                        },
                        success: function(response) {
                            changeName(response.nickname);
                        },
                        error: function(response){
                            console.log("토큰 재발급 실패")
                        }
                    })
                )
                .catch(
                    console.log("error")
                )
            }
            else{
                changeName(response.nickname);
            }
           
        },
        error: function(request, status, error) {
            alert('변경 실패');
        }
    });
}


function changeName(newName) {
    var myPageName = document.querySelector(".myPageName");
    var userWordName = document.querySelectorAll(".userWordName");

    $(myPageName).text(newName);
    $(userWordName).text(newName);
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
            // alert('유저 정보 불러오기 성공');
            // console.log("유저 data : ", response);
            if(response.status === 401){
                refreshAccessToken(response)
                .then(
                    $.ajax({
                        type: 'GET',
                        url: '/api/account/user/', // 슬래시 하나로 수정
                        contentType: 'application/json',
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
                        },
                        success: function(response) {
                            var user_age = response.age;
                            var user_nickname = response.nickname;
                            var user_image = response.image;
                            var user_level = response.level;
                            var user_point = response.point;

                            loadUserInfo(user_age, user_nickname, user_image, user_level, user_point);
                            userInfo(user_nickname, user_age);
                        },
                        error: function(response){
                            console.log("토큰 재발급 실패")
                        }
                    })
                )
                .catch(
                    console.log("error")
                )
            }
            else{
                var user_age = response.age;
                var user_nickname = response.nickname;
                var user_image = response.image;
                var user_level = response.level;
                var user_point = response.point;

                loadUserInfo(user_age, user_nickname, user_image, user_level, user_point);
                userInfo(user_nickname, user_age);
            }
        },
        error: function(request, status, error) {
            alert('불러오기 실패');
        }
    });
}

function loadUserInfo(age, nickname, image, level, point){
    const ageDiv = document.getElementById("myAge");
    const nameDiv = document.getElementById("myNickname");
    const imageDiv = document.getElementById("myProfile");
    const levelDiv = document.getElementById("myLevel");
    const pointDiv = document.getElementById("myPoint");


    let myPageAge = age+"대";
    let myPageName = nickname;
    let myPageProfile = image;
    let myPageLevel = level;
    let pointNum = point;

    ageDiv.innerText = myPageAge;
    nameDiv.innerText = myPageName;
    imageDiv.src = myPageProfile;
    levelDiv.innerText = myPageLevel;
    pointDiv.innerText = pointNum;
        
}

function userInfo(nickname, age){
    var infoNameInput = document.getElementById("inputName");
    var infoAgeInput = document.getElementById("inputAge");
    infoNameInput.value = nickname; 
    infoAgeInput.innerText = age+"대";
}

function getUserWordData(){
    $.ajax({
        type: 'GET',
        url: '/api/account/user/word/',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        },
        success: function(response) {
            // alert('단어 데이터 불러오기 성공');
            // console.log("단어 data : ", response);
            if(response.status === 401){
                refreshAccessToken(response)
                .then(
                    $.ajax({
                        type: 'GET',
                        url: '/api/account/user/word/', // 슬래시 하나로 수정
                        contentType: 'application/json',
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
                        },
                        success: function(response) {
                            let userWordData = response;
                            for (var i = 0; i < Math.min(userWordData.length,3); i++){
                                wordData = response[i]
                                createWordCard(wordData)
                            }
                        },
                        error: function(response){
                            console.log("토큰 재발급 실패")
                        }
                    })
                )
                .catch(
                    console.log("error")
                )
            }
            else{
                let userWordData = response;
                for (var i = 0; i < Math.min(userWordData.length,3); i++){
                    wordData = response[i]
                    createWordCard(wordData)
                }
            }
            
        },
        error: function(request, status, error) {
            alert('데이터 불러오기 실패');
        }
    });
}

function getUserQuestionData(){
    $.ajax({
        type: 'GET',
        url: '/api/account/user/question/',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        },
        success: function(response) {
            // alert('질문 데이터 불러오기 성공');
            // console.log("질문 data : ", response);
            if(response.status === 401){
                refreshAccessToken(response)
                .then(
                    $.ajax({
                        type: 'GET',
                        url: '/api/account/user/question/', // 슬래시 하나로 수정
                        contentType: 'application/json',
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
                        },
                        success: function(response) {
                            const userQuestData = response;
                            for (var i = 0; i < Math.min(userQuestData.length,10); i++){
                                myQuest = response[i]
                                createQuestCard(myQuest)
                            }
                        },
                        error: function(response){
                            console.log("토큰 재발급 실패")
                        }
                    })
                )
                .catch(
                    console.log("error")
                )
            }
            else{
                const userQuestData = response;
                for (var i = 0; i < Math.min(userQuestData.length,10); i++){
                    myQuest = response[i]
                    createQuestCard(myQuest)
                }
            }
            
        },
        error: function(request, status, error) {
            alert('질문 불러오기 실패');
        }
    });
}

function getUserReuestData(){
    $.ajax({
        type: 'GET',
        url: '/api/account/user/edit/',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        },
        success: function(response) {
            // alert('수정 요청 데이터 불러오기 성공');
            // console.log("수정 요청 data : ", response);
            if(response.status === 401){
                $.ajax({
                    type: 'GET',
                    url: '/api/account/user/edit/',
                    contentType: 'application/json',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
                    },
                    success: function(response) {
                        const userRequestData = response;
                        for (var i = 0; i < Math.min(userRequestData.length,10); i++){
                            myRequest = response[i]
                            createRequestCard(myRequest)
                        }
                    },
                    error: function(request, status, error){
                        alert("수정요청 불러오기 실패")
                    }
            })
            
            }
            else{
                const userRequestData = response;
                        for (var i = 0; i < Math.min(userRequestData.length,10); i++){
                            myRequest = response[i]
                            createRequestCard(myRequest)
                        }
            }
        },
        error: function(response) {
            alert('수정요청 불러오기 실패');
        }
    });
}

const wordBtn = document.getElementById("wordBtn");
const qnaBtn = document.getElementById("qnaBtn");
const requestBtn = document.getElementById("requestBtn");

// 단어 버튼 클릭 이벤트 핸들러
wordBtn.addEventListener("click", function() {
    window.location.href = '/User/wordlist.html'
});

// 질문 버튼 클릭 이벤트 핸들러
qnaBtn.addEventListener("click", function() {
    window.location.href = '/User/qnalist.html'
});

// 단어 버튼 클릭 이벤트 핸들러
requestBtn.addEventListener("click", function() {
    window.location.href = '/User/requestlist.html'
});

});

