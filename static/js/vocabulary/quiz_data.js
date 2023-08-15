// var requestURL = "http://127.0.0.1:5500/templates/quiz.html#";
// var request = new XMLHttpRequest();
// request.open("GET", requestURL);
// request.responseType = "json";

// request.onload = function () {
//     var quizes = request.response;
//     showQuiz(quizes);
//   };

// request.send();

var data = {
  "quizes": [
    {
      "title": "4의 뜻은?",
      "choices": [
        {
          "choice": "4",
          "is_answer": true
        },
        {
          "choice": "5",
          "is_answer": false
        },
        {
          "choice": "3",
          "is_answer": false
        }
      ]
    },
    {
      "title": "3의 뜻은?",
      "choices": [
        {
          "choice": "5",
          "is_answer": false
        },
        {
          "choice": "3",
          "is_answer": true
        },
        {
          "choice": "7",
          "is_answer": false
        }
      ]
    },
    {
      "title": "5의 뜻은?",
      "choices": [
        {
          "choice": "1",
          "is_answer": false
        },
        {
          "choice": "1",
          "is_answer": false
        },
        {
          "choice": "5",
          "is_answer": true
        }
      ]
    },
    {
      "title": "6의 뜻은?",
      "choices": [
        {
          "choice": "1",
          "is_answer": false
        },
        {
          "choice": "6",
          "is_answer": true
        },
        {
          "choice": "8",
          "is_answer": false
        }
      ]
    },
    {
      "title": "7의 뜻은?",
      "choices": [
        {
          "choice": "8",
          "is_answer": false
        },
        {
          "choice": "7",
          "is_answer": true
        },
        {
          "choice": "3",
          "is_answer": false
        }
      ]
    }
  ],

  "words": [
    {
      "id": 3,
      "title": 3,
      "ages": [],
      "content": "방가방가",
      "likes": 0
    },
    {
      "id": 4,
      "title": 4,
      "ages": [],
      "content": "4",
      "likes": 0
    },
    {
      "id": 5,
      "title": 5,
      "ages": [],
      "content": "5",
      "likes": 0
    },
    {
      "id": 6,
      "title": 6,
      "ages": [],
      "content": "6",
      "likes": 0
    },
    {
      "id": 7,
      "title": 7,
      "ages": [],
      "content": "7",
      "likes": 0
    }
  ]
}

var reviewContainer = document.getElementById("review");
var quizContainer = document.getElementById('quiz');

var currentQuizIndex = 0;
var score = 0;
var buttonIds = ["A", "B", "C"];


function showQuiz(data) {
    var quizes = data.quizes;

    quizContainer.innerHTML = '';

    var quiz = quizes[currentQuizIndex];
    var choices = quiz.choices;

    var quizDiv = document.createElement('div');
    quizDiv.setAttribute("class", "quizWrap");

    var titleElement = document.createElement('p');
    titleElement.setAttribute("class", "quizQuestion");
    titleElement.textContent = quiz.title;
    quizDiv.appendChild(titleElement);

    var choiceContainer = document.createElement('ul');
    choiceContainer.setAttribute("class", "choiceContainer");

    for (var j = 0; j < choices.length; j++) {
        var choice = choices[j].choice;

        var choiceCard = document.createElement('li');

        var button = document.createElement('button');
        button.setAttribute("type", "button");
        button.setAttribute("class", "choiceCard");
        button.setAttribute("id", buttonIds[j]); // Set unique button id

        // 넘어가기
        button.addEventListener('click', onChoiceClick);

        var choiceTxt = document.createElement('p');
        choiceTxt.setAttribute("class", "choiceTxt");
        choiceTxt.textContent = choice;

        button.appendChild(choiceTxt);
        choiceCard.appendChild(button);
        choiceContainer.appendChild(choiceCard);
    }

    quizDiv.appendChild(choiceContainer);
    quizContainer.appendChild(quizDiv);
}

// function showReview(data){
//     var reviewData = data.words;
//     var reviewContainer = document.getElementById("review");

//     for(var i=0; i < reviewData.length; i++){
//         var words = reviewData[i];

//         //단어명
//         var wordName = document.createElement('li');
//         wordName.setAttribute("class", "word_name");
//         wordName.textContent = words.title; 

//         //단어 카드
//         var wordCard = document.createElement('ul');
//         wordCard.setAttribute("class", "word");

//         //단어 설명
//         var wordWhat = document.createElement('li');
//         wordWhat.setAttribute("class", "word_what");
//         wordWhat.textContent = words.content; 

//         //하트 수
//         var wordHeart = document.createElement('li');
//         wordHeart.setAttribute("class", "word_heart");
//         wordHeart.textContent = words.likes;


//         reviewContainer.appendChild(wordCard); 
//         wordCard.appendChild(wordName); 
//         wordCard.appendChild(wordWhat); 
//         wordCard.appendChild(wordHeart);
//     }

// }

    // 함수를 통해 단어 카드 생성
function showReview(data) {
      const reviewData = data.words;
    
      for (var i = 0; i < reviewData.length; i++){
        const wordItem = document.createElement("ul");
        wordItem.classList.add("word");
    
        // let imageHtml = `<img src="${data.image}">`;
    
        // if (data.image_snd) {
        //     imageHtml += `<img src="${data.image_snd}">`;
        // }
    
      wordItem.innerHTML = `
      <li class="word_name">
          <p>${reviewData.title}</p>
      </li>
      <li class="word_what"><p>${reviewData.content}</p></li>
      <li class="word_heart">
          <p>${reviewData.likes}</p>
      </li>
  `;

      // 클릭 이벤트 처리
      wordItem.addEventListener("click", function() {
          // 해당 단어 카드의 링크로 이동
          window.location.href = data.link;
      });
  
      reviewContainer.appendChild(wordItem);
    }
  }
  

// 선택지를 클릭했을 때 실행될 함수
function onChoiceClick(event) {
    var clickedChoice = event.target; // Get the clicked button
    var choiceIndex = buttonIds.indexOf(clickedChoice.id);
    var choices = data.quizes[currentQuizIndex].choices;
    var isCorrect = choices[choiceIndex].is_answer; // Check if the choice is correct

    // Add color to choice based on correctness
    if (isCorrect) {
        score++;
        clickedChoice.style.borderColor = '#87CEEB';
        clickedChoice.querySelector('.choiceTxt').style.color = '#1EBEFF';
    } else {
        clickedChoice.style.borderColor = '#FF83A8';
        clickedChoice.querySelector('.choiceTxt').style.color = '#F70A8D';
    }

    // Move to the next quiz or complete the quiz
    currentQuizIndex++;
    if (currentQuizIndex < data.quizes.length) {
        showQuiz(data);
    } else {
        document.body.style.backgroundColor = '#FFEEB0';
        completeQuiz();
    }
}

showQuiz(data);
showReview(data); // 기존 데이터로 단어 카드 생성
