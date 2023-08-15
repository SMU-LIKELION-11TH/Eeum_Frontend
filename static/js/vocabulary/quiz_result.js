
// 퀴즈 완료 시 호출되는 함수
function completeQuiz() {
    // 퀴즈 섹션을 숨김
    document.getElementById('quiz').style.display = 'none';
    // 결과 섹션을 표시
    document.getElementById('result').removeAttribute('hidden');

    var totalScore = document.querySelector(".quizScore");
    var scoreContent = document.querySelector(".scoreContent");
    var expContent = document.querySelector(".expContent");
    
    totalScore.textContent = (score*20)+"점";
    scoreContent.textContent = "5문제 중 "+score+"문제 맞췄어요!";
    expContent.textContent = "(경험치 "+(score*10)+"이 적립되었습니다.)";
}
