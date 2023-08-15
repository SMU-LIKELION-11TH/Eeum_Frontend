//질문 넘어가기에 대한 js
$(document).ready(function () {
    $(".nextButton").on("click", function () {
        var currentQuestion = $(this).closest(".word_register_question");
        var nextQuestion = $(this).data("next");

        currentQuestion.hide();
        $(nextQuestion).show();

        if (nextQuestion === "#q2") {
            var wordToDefine = $('#word_register_input').val();
            $('#wordToDefine').text(wordToDefine);
        }
        if (nextQuestion === "#q3") {
            var wordToDefine = $('#word_register_input').val();
            $('#wordToDefine2').text(wordToDefine);
        }
        if (nextQuestion === "#q4") {
            var wordToDefine = $('#word_register_input').val();
            $('#wordToDefine3').text(wordToDefine);
        }
    });
    $(".backButton").click(function() {
        // 현재 표시되고 있는 단계를 숨깁니다.
        var currentStep = $(".word_register_question:visible");
        currentStep.hide();

        // 이전 단계를 보이도록 설정합니다.
        currentStep.prev(".word_register_question").show();
    });

    // 질문 1 입력값 감지하여 버튼 활성화/비활성화
    $('#word_register_input').on('input', function () {
        var inputVal = $(this).val(); // 입력된 텍스트 값
        var nextButton = $('#word_register_nextbtn');

        // 텍스트 값이 비어있지 않다면 버튼 활성화, 비어있다면 비활성화
        if (inputVal.trim() !== '') { //trim 함수는 비어있는지 확인해주는 함수 
            nextButton.prop('disabled', false);
        } else {
            nextButton.prop('disabled', true);
        }
    });
    // 질문 2 체크 박스 선택 최대 2개 제한 및 버튼 활성화/비활성화
    var maxChecked = 2; // 최대 선택 가능한 체크 박스 개수
    var checkboxes = $("input[name='age']");
    var nextButton = $("#word_register_nextbtn1");

    checkboxes.on("click", function() {
        var checkedCount = checkboxes.filter(":checked").length;

        if (checkedCount > maxChecked) {
            checkboxes.not(":checked").prop("disabled", true);
        } else {
            checkboxes.prop("disabled", false);
        }

        if (checkedCount > 0) {
            nextButton.prop("disabled", false); // 버튼 활성화
        } else {
            nextButton.prop("disabled", true); // 버튼 비활성화
        }

        if (checkedCount === 3) {
            // 세 번째 체크박스가 선택되었을 때 해제하고 알림창을 띄웁니다.
            alert("최대 2개까지 선택해주시기 바랍니다.");
            checkboxes.filter(":checked").last().prop("checked", false);   
          }
    });

    // 질문 3 입력값 감지하여 버튼 활성화/비활성화
     // 텍스트 영역에 입력이 있을 때
     $('#q3_word_register_textarea').on('input', function () {
        var inputVal = $(this).val(); // 입력된 텍스트 값
        var nextButton = $('#word_register_nextbtn2');
        
        // 입력된 텍스트 길이 계산
        var textLength = inputVal.length;
        var maxLength = 40; // 최대 길이
        
        // 텍스트 길이 정보 업데이트
        $('.q3_text-length-cnt').text(textLength);
        $('.q3_text-length-total').text(maxLength);

        // 텍스트 값이 비어있거나 최대 길이를 넘지 않을 때 버튼 활성화
        if (textLength <= maxLength && textLength > 0) {
            nextButton.prop('disabled', false);
        } else {
            nextButton.prop('disabled', true);
        }
    });
    // 질문 4 입력값 감지하여 버튼 활성화/비활성화
    // 텍스트 영역에 입력이 있을 때
    $('#q4_word_register_textarea').on('input', function () {
        var inputVal = $(this).val(); // 입력된 텍스트 값
        var nextButton = $('#word_register_nextbtn3');
        
        // 입력된 텍스트 길이 계산
        var textLength = inputVal.length;
        var maxLength = 300; // 최대 길이
        
        // 텍스트 길이 정보 업데이트
        $('.q4_text-length-cnt').text(textLength);
        $('.q4_text-length-total').text(maxLength);

        // 텍스트 값이 최대 길이를 넘지 않으면 버튼 활성화
        if (textLength <= maxLength && textLength > 0) {
            nextButton.prop('disabled', false);
        } else {
            nextButton.prop('disabled', true);
        }
    });
    $('#word_register_submitbtn').click(function () {
        var answer1 = $('#word_register_input').val();
        var answer2 = [];
        $("input[name='age']:checked").each(function () {
            answer2.push($(this).val());
        });
        var answer3 = $('#q3_word_register_textarea').val();
        var answer4 = $('#q4_word_register_textarea').val();
        var answer5 = $('#image-input')[0]; // 이미지 관련 데이터를 추가
        console.log(answer5);
        var formData = new FormData();
    
        formData.append("title", answer1);
        formData.append("age", JSON.stringify(answer2));
        formData.append("mean", answer3);
        formData.append("content", answer4);
        formData.append("image", answer5.files[0]);
    
        $.ajax({
            type: "POST",
            url: "http://3.34.3.84/api/word/create/", // 실제 URL로 변경해야 합니다.
            data: formData,
            processData: false, // 필요한 경우 FormData 처리 방지
            contentType: 'multipart/form-data', // 필요한 경우 Content-Type 설정 방지
            success: function (response) {
                // 서버로부터의 응답을 처리
                console.log("데이터가 성공적으로 전송");
                window.location.href = "/templates/word/register_complete";
            },
            error: function (xhr, status, error) {
                console.log('이미지 업로드 중 오류 발생:', error);
                // 오류 처리
            }
        });
    });
    
    
    // $('#word_register_submitbtn').click(function (formData) {
    //     var answer1 = $('#word_register_input').val();
    //     var answer2 = [];
    //     $("input[name='age']:checked").each(function () {
    //         answer2.push($(this).val());
    //     });
    //     var answer3 = $('#q3_word_register_textarea').val();
    //     var answer4 = $('#q4_word_register_textarea').val();
    //     var answer5 = []
    //     var registerdata = {
    //         title: answer1,
    //         age: answer2,
    //         mean: answer3,
    //         content: answer4,
    //         image: answer5
    //     };

    //     $.ajax({
    //         type: "POST",
    //         url: "#",
    //         data: JSON.stringify(registerdata),
    //         contentType: 'application/JSON',
    //         success: function (response) {
    //             // 서버로부터의 응답을 처리
    //             console.log("데이터가 성공적으로 전송");
    //             window.location.href = "/templates/word/register_complete"
    //         },
    //         error: function (error) {
    //             console.log("데이터 전송 중 오류가 발생");
    //         }
    //     });
    // });
});

// 질문 3 타이핑 수 제한
const q3_textarea = document.getElementById('q3_word_register_textarea');
const q3_textLengthCnt = document.querySelector('.q3_text-length-cnt');
const q3_maxLength = 40;

q3_textarea.addEventListener('input', function () {
    const q3_textLength = q3_textarea.value.length;
    q3_textLengthCnt.textContent = q3_textLength;

    // 입력 글자 수가 최대 글자 수를 초과할 경우 자르기
    if (q3_textLength > q3_maxLength) {
        q3_textarea.value = q3_textarea.value.slice(0, q3_maxLength);
        q3_textLengthCnt.textContent = q3_maxLength;
    }
});

// 질문 4 타이핑 수 제한
const q4_textarea = document.getElementById('q4_word_register_textarea');
const q4_textLengthCnt = document.querySelector('.q4_text-length-cnt');
const q4_maxLength = 300;

q4_textarea.addEventListener('input', function () {
    const q4_textLength = q4_textarea.value.length;
    q4_textLengthCnt.textContent = q4_textLength;

    // 입력 글자 수가 최대 글자 수를 초과할 경우 자르기
    if (q4_textLength > q4_maxLength) {
        q4_textarea.value = q4_textarea.value.slice(0, q4_maxLength);
        q4_textLengthCnt.textContent = q4_maxLength;
    }
});



