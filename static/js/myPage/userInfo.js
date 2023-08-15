// 수정 버튼 클릭 이벤트 핸들러
const editBtn = document.getElementById("editBtn");
var inputBox = document.getElementById("inputBox");
var inputValue = inputBox.value;

editBtn.addEventListener("click", function(){
    inputBox.readOnly = !inputBox.readOnly;

    if(inputBox.readOnly){
        $(editBtn).css("background-color", "#FFFFFF");
        $(editBtn).val("수정");
    } else{
        $(editBtn).css("background-color", "#FFE173");
        $(editBtn).val("저장");
    }
});

// 닉네임 변경
var myPageName = document.querySelector(".myPageName");
var userWordName = document.querySelectorAll(".userWordName")

inputBox.addEventListener("change", function(){
    var newName = inputBox.value;
    console.log(newName);
    $(myPageName).text(newName);
    $(userWordName).text(newName);
});



