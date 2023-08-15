// 'image-input' 요소에 변경 이벤트 리스너를 추가
document.getElementById('image-input').addEventListener('change', function (event) {
    const file = event.target.files[0]; // 선택된 파일을 가져옴
    const previewImage = document.getElementById('preview-image'); 
    const previewContainer = document.getElementById('preview-container'); 

    if (file) { // 파일이 선택되었을 경우
        const reader = new FileReader(); // FileReader 객체를 생성합니다.

        // 파일 읽기가 완료되면 실행되는 함수
        reader.onload = function () {
            previewImage.style.backgroundImage = `url(${reader.result})`; // 미리보기 이미지의 배경 이미지를 설정합니다.
            previewImage.classList.remove('empty-preview'); // 'empty-preview' 클래스를 제거합니다.

            uploadedimage = reader.result; // 업로드된 이미지를 저장합니다.
        };

        reader.readAsDataURL(file); // 파일을 Data URL 형태로 읽습니다.
    } else { // 파일이 선택되지 않았을 경우
        previewImage.style.backgroundImage = ''; // 미리보기 이미지의 배경 이미지를 제거합
        previewImage.classList.add('empty-preview'); // 'empty-preview' 클래스를 추가
    }
});

// 이미지 삭제 함수
function deleteImage() {
    const previewImage = document.getElementById('preview-image'); 
    const imageInput = document.getElementById('image-input'); 
    imageInput.value = ''; // 이미지 입력 요소의 값(value)을 초기화
    previewImage.style.backgroundImage = ''; // 미리보기 이미지의 배경 이미지를 제거
    previewImage.classList.add('empty-preview'); // 'empty-preview' 클래스를 추가

    uploadedimage = null; // 업로드된 이미지를 초기화합니다.
}
