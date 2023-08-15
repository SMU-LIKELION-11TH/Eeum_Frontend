document.addEventListener("DOMContentLoaded", function() {

    // 선택 삭제 버튼 클릭 이벤트 핸들러
    const deleteSelectBtn = document.getElementById("deleteSelectBtn");
    const wordContainer = document.getElementById("wordContainer"); // 단어 카드 컨테이너 요소 추가

    deleteSelectBtn.addEventListener("click", function() {
        const selectedCards = $(".word.selected");

        if ($(deleteSelectBtn).val() === "삭제하기") {
            if (selectedCards.length > 0) {
                var deleteSelectAnswer = confirm('선택한 단어를 삭제하시겠습니까?');
                if (deleteSelectAnswer) {
                    selectedCards.remove(); // 선택된 카드 삭제
                }
            }

            selectedCards.removeClass("selected"); // 선택된 카드 상태 초기화
            $(deleteSelectBtn).val("선택삭제"); // 버튼 값을 다시 "선택삭제"로 변경
            $(deleteSelectBtn).css("background-color", ""); // 원래 색상으로 되돌리기
        } else {
            $(deleteSelectBtn).css("background-color", "#FFE173");
            $(deleteSelectBtn).val("삭제하기");
        }
    });

    // 단어 카드 클릭 이벤트 핸들러 (이벤트 위임)
    wordContainer.addEventListener("click", function(event) {
        const clickedCard = event.target.closest(".word");

        if (!clickedCard) return; // 클릭된 요소가 단어 카드가 아니면 종료

        if ($(deleteSelectBtn).val() === "삭제하기") {
            event.preventDefault(); // 클릭 이벤트 무시
        }
    });
});
