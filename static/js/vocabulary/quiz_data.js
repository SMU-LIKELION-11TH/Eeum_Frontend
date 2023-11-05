
let quizData
let fullData = [];
let cardID = [];
let titleID = [];
let funcquizData = []

document.addEventListener("DOMContentLoaded", function() {
    var quizes = []

    if (localStorage.getItem("refresh") == null){
        alert("로그인이 필요한 서비스 입니다.")
        window.location.href="index.html";
    }

    const response = { 
        "refresh": localStorage.refresh
    }

    refreshAccessToken(response)
    getQuizData();


// Refresh Token 재발급 함수
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
                    console.log(access);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                }
            });
        });
    }

var reviewContainer = document.getElementById("review");
var quizContainer = document.getElementById('quiz');

var currentQuizIndex = 0
var score = 0;

function getQuizData(){
    $.ajax({
        type: 'GET',
        url: '/api/vocabulary/quiz/',
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access"));
        },
        success: function(response){
            alert('불러오기 성공');
            console.log("data : ", response);
            fullData = response.quizes;
            createQuizFunc()
        },
        error: function(request, status, error){
            alert('불러오기 실패');
            console.log(access_token)
        }
    });
}

function createChoiceCard(data, index) {
    for (var j=0; j<3; j++){
        var choiceContainer = document.getElementById('quiz'+index);
        const choiceCard = document.createElement('li');
        choiceCard.classList.add("choiceCard");
        if (data[j].is_answer){
            choiceCard.classList.add("answer");
        } else{
            choiceCard.classList.add("noAnswer");
        }

      
        choiceCard.innerHTML = `
        <button type="button" class="choiceBtn">
        <p>
        ${data[j].choice}
        </p>
        </button>
        `  

        choiceCard.addEventListener("click", function (){
            var choiceBtn = choiceCard.getElementsByClassName("choiceBtn")[0]
            if(choiceCard.classList.contains("answer")){
                score ++;
                choiceBtn.style.borderColor = "rgba(0,0,250,0.5)"
                console.log("정답")
                console.log(score)
            } else{
                choiceBtn.style.borderColor = "rgba(250,0,0,0.5)"
                console.log("오답")
            }

        if (index < 5){
            var nextIndex = document.getElementById("quiz"+(index+1));
            nextIndex.style.display = 'block';
            document.getElementById("quiz"+(index)).style.display = 'none';   
        } else {
            localStorage.setItem("point", score*10)
    
            $.ajax({
                type: 'POST',
                url: '/api/vocabulary/quiz/',
                contentType: 'application/json',
                data: JSON.stringify({
                    "point" : score*10
                }), // 데이터를 JSON 문자열로 변환
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access"));
                },
                success: function (response) {
                    if(response.status === 401){
                        refreshAccessToken(response)
                        .then(function (access_token) {
                                    $.ajax({
                                        type: 'POST',
                                        url: '/api/vocabulary/quiz/',
                                        contentType: 'application/json',
                                        data: JSON.stringify({
                                            "point": score*10
                                           }),
                                        beforeSend: function (xhr) {
                                            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("access"));
                                        },
                                        success: function (response) {
                                            console.log("토큰 재발급, 이동 완료")
                                            window.location.href = "quiz_complete.html";            
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
                            console.log("토큰 ok, 이동 완료")
                            window.location.href = "quiz_complete.html"; 
                        }
                        },
                        error: function (request, status, error) {
                            console.log('점수 보내기 실패')
                        },
                error: function(request, status, error) {
                    alert('보내기 실패');
                }
            });
        }

        });
      
        choiceContainer.appendChild(choiceCard);
    }
}

function createQuizTitle(data, index){
    var quizContainer = document.getElementById('quiz'+index);
    const quizCard = document.createElement('p');
    quizCard.classList.add("quizQuestion")
    quizCard.setAttribute("id", "title")
    quizCard.textContent = data;
  
    quizContainer.appendChild(quizCard);
  }  

function createQuizFunc(){
    for (var i=0; i <5; i++){
        createQuizTitle(fullData[i].title, i+1);
        createChoiceCard(fullData[i].choices, i+1);
    }
}

});