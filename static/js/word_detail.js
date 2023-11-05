var userData;

function clearPlaceholder() {
    const searchInput = document.getElementById('searchInput');
    searchInput.placeholder = '';
}

  
// function toggleHeart(isLiked) {

//     const heartIcon = document.getElementById('heart_icon');

//     if (isLiked) {
//         heartIcon.classList.remove('fa-regular');
//         heartIcon.classList.add('fa-solid');
        
//     } else {
//         heartIcon.classList.remove('fa-solid');
//         heartIcon.classList.add('fa-regular');
//     }
// }

// function filledHeart(isLiked) {

//     const heartIcon = document.getElementById('heart_icon');

//     if (isLiked){
//         heartIcon.classList.remove('fa-solid');
//         heartIcon.classList.add('fa-regular');
//     } else {
//         heartIcon.classList.remove('fa-regular');
//         heartIcon.classList.add('fa-solid');
//     }

// }

// //단어장 담기 함수
// function toggleBookmark(isBookmarked) {
//     const bookmarkIcon = document.getElementById('bookmark_icon');
//     var bookmarkText = document.getElementById("bookmark_text");
//     if(isBookmarked){
//         bookmarkIcon.classList.add('fa-solid');
//         bookmarkIcon.classList.remove('fa-regular');
//         bookmarkText.textContent = "단어장에서 제거";

//     } else{
//         bookmarkIcon.classList.remove('fa-solid');
//         bookmarkIcon.classList.add('fa-regular');
//         bookmarkText.textContent = "단어장에 담기";
//     }
// }

// function filledBookmark(isBookmarked) {
//     const bookmarkIcon = document.getElementById('bookmark_icon');
//     var bookmarkText = document.getElementById("bookmark_text");
//     if(isBookmarked){
//         bookmarkIcon.classList.remove('fa-solid');
//         bookmarkIcon.classList.add('fa-regular');
//         bookmarkText.textContent = "단어장에 담기";
//     } else{
//         bookmarkIcon.classList.add('fa-solid');
//         bookmarkIcon.classList.remove('fa-regular');
//         bookmarkText.textContent = "단어장에서 제거";
//     }
// }

function initializeUI(isLiked, isBookmarked) {
    const heartIcon = document.getElementById('heart_icon');
    const bookmarkIcon = document.getElementById('bookmark_icon');
    const bookmarkText = document.getElementById("bookmark_text");

    if (isLiked) {
        heartIcon.classList.add('fa-solid');
        heartIcon.classList.remove('fa-regular');
    } else {
        heartIcon.classList.add('fa-regular');
        heartIcon.classList.remove('fa-solid');
    }
    console.log(isLiked);
    if (isBookmarked) {
        bookmarkIcon.classList.add('fa-solid');
        bookmarkIcon.classList.remove('fa-regular');
        bookmarkText.textContent = "단어장에서 제거";
    } else {
        bookmarkIcon.classList.remove('fa-solid');
        bookmarkIcon.classList.add('fa-regular');
        bookmarkText.textContent = "단어장에 담기";
    }
}

// Refresh Token 재발급 함수
function refreshAccessToken(response) {
    return new Promise((resolve, reject) => {
            console.log(response.refresh)
        $.ajax({
            type: 'POST',
            url: '/api/account/refresh/',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                refresh: response.refresh // response 객체에서 refresh token 가져옴
            }),
            success: function(res) {
                var access = res.access;
                var refresh = res.refresh;
                    
                localStorage.setItem('access', access);
                localStorage.setItem('refresh', refresh);
                resolve(access);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }
        });
    });
}  

$(document).ready(function () {
    var jsonData;
    const heartIcon = document.getElementById('heart_icon');
    const bookmarkIcon = document.getElementById('bookmark_icon');
    const bookmarkText = document.getElementById("bookmark_text");


    var response = {
        "refresh": localStorage.getItem("refresh")
    };

    var iconContainer = $('.word_detail_iconcontainer') //아이콘 컨테이너 선언

    if(localStorage.getItem("refresh")){ //로그인을 했을 때,
        iconContainer.show();
    }else{
        iconContainer.hide();
    }

    //하트 클릭 이벤트
    $('#heart_icon').click(function (){
        var response = {
            "refresh": localStorage.getItem("refresh")
        }; //재발급
        
        $.ajax({
            type: "POST",
            url: "/api/word/like/",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            },
            data: JSON.stringify({ word_id: localStorage.getItem("word_id") }),
            contentType: 'application/json',
            success: function (response) {
                // 서버로부터의 응답을 처리
                if (response.status === 401) {
                    console.log("401")
                    refreshAccessToken(refresh)
                        .then(function (access_token) {
                            $.ajax({
                                type: 'POST',
                                url: '/api/word/like/',
                                contentType: 'application/json',
                                data: JSON.stringify({ word_id: localStorage.getItem("word_id") }),
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access"));
                                },
                                success: function (response) {
                                    document.getElementById("like_count").textContent = response.likes;
                                    console.log('성공')
                                },
                                error: function (request, status, error) {
                                    console.log('실패')
                                }
                            });
                        })
                        .catch(function (error) {
                            console.error('Refresh token 재발급 실패:', error);
                        });
                } else {
                    document.getElementById("like_count").textContent = response.likes;
                }
                console.log("데이터가 성공적으로 전송");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 404) {
                    console.error("Not found:", jqXHR.responseText);
                    alert("사용자가 존재하지 않습니다.");
                } else {
                    console.error("Error:", jqXHR.status, errorThrown);


                }
            }
        });

        if(heartIcon.classList.contains('fa-regular')){
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid');
        }else{
            heartIcon.classList.add('fa-regular');
            heartIcon.classList.remove('fa-solid');
        }
    })

    //단어장 담기 클릭 이벤트
    $('#bookmark_icon').click(function (){
        var response = {
            "refresh": localStorage.getItem("refresh")
        }; //재발급

        

        $.ajax({
            type: "POST",
            url: "/api/vocabulary/",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            },
            data: JSON.stringify({id:localStorage.getItem("word_id")}),
            contentType: 'application/json',
            success: function (response) {
                // 서버로부터의 응답을 처리
                if (response.status === 401) {
                    refreshAccessToken(response)
        .then(function (access_token) {
            $.ajax({
                type: 'POST',
                url: '/api/vocabulary/',
                contentType: 'application/json',
                data: JSON.stringify({id:localStorage.getItem("word_id")}),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access"));
                },
                success: function (response) {
                    console.log('성공')
                },
                error: function (request, status, error) {
                    console.log('실패')
                }
            });
        })
        .catch(function (error) {
            console.error('Refresh token 재발급 실패:', error);
        });
                }
                console.log("데이터가 성공적으로 전송");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 404) {
                    console.error("Not found:", jqXHR.responseText);
                    alert("사용자가 존재하지 않습니다.");
                } else {
                    console.error("Error:", jqXHR.status, errorThrown);
                    alert("이미 존재하는 단어입니다.");

                }
            }
        });
        if(bookmarkIcon.classList.contains('fa-regular')){
            bookmarkIcon.classList.remove('fa-regular');
            bookmarkIcon.classList.add('fa-solid');
            bookmarkText.textContent = "단어장에 제거"
        }else{
            bookmarkIcon.classList.add('fa-regular');
            bookmarkIcon.classList.remove('fa-solid');
            bookmarkText.textContent = "단어장에서 담기";
        }
    });

    

    

    function displayhrefElement(userData,jsonData){
        console.log(userData);
        if(userData.id === jsonData.author.id){
            console.log(userData.id);
            console.log("작성자 일 때")
            document.querySelector(".word_detail_hrefcontainer").style.display = "block"
        } else{
            document.querySelector(".word_detail_hrefcontainer").style.display = "none"
        }
    }

    function displayiconContainer(){
        if(localStorage.getItem(access)){
            document.querySelector(".word_detail_iconcontainer").style.display = "block"
        } else {
            document.querySelector(".word_detail_iconcontainer").style.display = "none"
        }
    }
    var headers
    if(localStorage.getItem('refresh')!== null){
        headers = {
            "Authorization" : "Bearer " + localStorage.getItem('access')
        }
    }
    else{
        headers = {}
    }
    $.ajax({
        type:"POST",
        url: "/api/word/detail/",
        headers: headers,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({word_id:localStorage.getItem("word_id")}),
        success: function(response){
            jsonData = response;
            console.log(jsonData);
            localStorage.setItem('title',jsonData.title)
            localStorage.setItem('mean',jsonData.mean);
            localStorage.setItem('content',jsonData.content);
            localStorage.setItem('image',jsonData.image);
            console.log(localStorage);
            createElement(jsonData);
            if(localStorage.getItem("refresh") !== null){
                $.ajax({
                    type:"GET",
                    url: "/api/account/user/",
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem('access')}`
                    },
                    dataType: 'json',
                    success: function(response){
                           // 서버로부터의 응답을 처리
                           if (response.status === 401) {
                            refreshAccessToken(response)
                            .then(function (access_token) {
                                $.ajax({
                                    type: 'GET',
                                    url: '/api/account/user/',
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access"));
                                    },
                                    success: function (response) {
                                        console.log('성공')
                                        userData = response;
                                        displayhrefElement(userData,jsonData);
                                        console.log(userData);
                                    },
                                    error: function (request, status, error) {
                                        console.log('실패')
                                    }
                                });
                            })
                            .catch(function (error) {
                                console.error('Refresh token 재발급 실패:', error);
                            });
                          } 
                          else{
                            userData = response;
                            displayhrefElement(userData,jsonData);
                            console.log(userData);
                          }
                         
                    },
                    error: function(xhr, status, error) {
                        console.log("데이터를 불러오지 못함");
                    }
                })
            } else{//로그인을 하지 않았을 경우에
                userData = {
                    "id" : 0
                }
            }
            
            //data localstorage에 저장
            localStorage.setItem('modifyData', JSON.stringify(jsonData));
            initializeUI(jsonData.is_likes, jsonData.is_vocabulary);
        }
    });
   

    function createElement(jsonData){
        // 단어와 단어 뜻 삽입
    document.getElementById("word_title").textContent = jsonData.title;
    document.getElementById("word_age_icon1").src = "/static/img/age/age_" + jsonData.age[0] + ".png";
    document.getElementById("word_age_icon2").src = "/static/img/age/age_" + jsonData.age[1] + ".png";
    if(jsonData.image != null){
        document.getElementById("word_img").src = jsonData.image;
    } else{
        document.getElementById("word_img").style.display = "none";
    }
    
    document.getElementById("word_mean").textContent = jsonData.mean;
    document.getElementById("word_detail_content").textContent = jsonData.content;

    // 좋아요 및 작성자 정보 삽입
    document.getElementById("like_count").textContent = jsonData.likes;
    document.querySelector(".word_detail_userinfo p").textContent = "작성자 : " + jsonData.author.nickname;
    var authorTitle = document.querySelector(".detail_tab#word_register_tab .tab_title");
    authorTitle.textContent = jsonData.author.nickname + " 님의 등록 단어";

    // 수정 요청 목록 삽입
    var editList = jsonData.edits;
    var editListContainer = document.querySelector(".detail_tab#changing_inform_tab .tab_content");
    for (var i = 0; i < Math.min(editList.length, 4); i++) {
        var editContainer = document.createElement("div");
        editContainer.className = "tab_content_container";

        var titleElement = document.createElement("div");
        titleElement.className = "tab_content_title";
        titleElement.textContent = editList[i].title;

        var dateElement = document.createElement("div");
        dateElement.className = "tab_content_date";
        dateElement.textContent = editList[i].created_at;

        editContainer.appendChild(titleElement);
        editContainer.appendChild(dateElement);
        editListContainer.appendChild(editContainer);
    }
    
    // 관련 질문 목록 삽입
    var questionList = jsonData.questions;
    var questionListContainer = document.querySelector(".detail_tab#relative_question_tab");
    for (var i = 0; i < Math.min(questionList.length, 4); i++){
        var questionContainer = document.createElement("div");
        questionContainer.className = "tab_content_container";

        var titleElement = document.createElement("div");
        titleElement.className = "tab_content_title";
        titleElement.textContent = questionList[i].title.slice(0, 9) + '...';;

        var dateElement = document.createElement("div");
        dateElement.className = "tab_content_date";
        dateElement.textContent = questionList[i].created_at;

        questionContainer.appendChild(titleElement);
        questionContainer.appendChild(dateElement);
        questionListContainer.appendChild(questionContainer);
    }

    // 등록한 단어 목록 삽입
    var wordList = jsonData.my_words;
    var wordListContainer = document.querySelector(".detail_tab#word_register_tab .tab_content");
    for (var i = 0; i < Math.min(wordList.length,4); i++) { //최대 4개의 list만 뜨게 제한
        var wordElement = document.createElement("p");
        wordElement.textContent = wordList[i];
        wordListContainer.appendChild(wordElement);
    }

    // 레벨에 따라 다른 div 생성 및 추가
    var userLevel = jsonData.author.level; // 레벨 정보 

    var userLevelContainer = document.querySelector(".word_detail_userlevel_container");    

    var levelDiv = document.createElement("div");
    levelDiv.id = "userlevel_" + userLevel;
    levelDiv.classList.add("word_detail_userlevel_container");

    var levelFrameImg = document.createElement("img");
    levelFrameImg.id = "userlevel_frame";
    levelFrameImg.src = "/static/img/icon/Frame " + userLevel + ".png";
    levelFrameImg.alt = userLevel + " 이미지";

    var levelIconImg = document.createElement("img");
    levelIconImg.id = "userlevel_icon";
    levelIconImg.src = "/static/img/icon/userlevel_icon_" + userLevel + ".png";
    levelIconImg.alt = userLevel + " 이미지";

    levelDiv.appendChild(levelFrameImg);
    levelDiv.appendChild(levelIconImg);

    userLevelContainer.parentNode.insertBefore(levelDiv, userLevelContainer.nextSibling);


    // "like_ages" 데이터를 기반으로 막대 그래프 생성
    var ctx = document.getElementById('like_ages_chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(jsonData.like_ages),
            datasets: [{
                label: '좋아요 연령 분석',
                data: Object.values(jsonData.like_ages),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    }
    
});