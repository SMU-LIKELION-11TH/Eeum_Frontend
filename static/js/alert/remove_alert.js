//카드 클릭 시 알림 처리 (alcheck값 변경)

//읽은 알림 배경 색 변경
$(".alcheck:contains('읽음')").closest(".alertCard").css("background-color", "#FAFAFA");

// 선택 삭제 버튼 클릭 이벤트 핸들러
const deleteSelectBtn = document.getElementById("deleteSelectBtn");

deleteSelectBtn.addEventListener("click", function() {
    const selectedCards = $(".alertCard.selected");

    if ($(deleteSelectBtn).val() === "삭제하기") {
        if (selectedCards.length > 0) {
            var deleteSelectAnswer = confirm('선택한 알림을 삭제하시겠습니까?');
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

//전체 삭제 버튼 클릭 이벤트 핸들러
const deleteAllBtn = document.getElementById("deleteAllBtn");

deleteAllBtn.addEventListener("click", function(){
    const alertCard = document.querySelectorAll(".alertCard");
    var deleteAllAnswer = confirm('알림을 모두 삭제하시겠습니까?');

    if(deleteAllAnswer){
        alertCard.forEach(function(card){
            card.remove();
        });
    }

});

// 알림 카드 클릭 이벤트 핸들러
$(".alertCard").click(function() {
    if ($(deleteSelectBtn).val() === "삭제하기") {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $(this).addClass("selected");
        }
    }
});