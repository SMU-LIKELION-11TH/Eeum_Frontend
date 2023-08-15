// .navList 내부의 모든 li 요소를 가져옵니다.
const liElements = document.querySelectorAll('.navList li');

// 각 li 요소에 클릭 이벤트 리스너를 추가합니다.
liElements.forEach(li => {
    li.addEventListener('click', () => {
        // 모든 li 요소에서 "selected" 클래스를 제거합니다.
        liElements.forEach(el => el.classList.remove('selected'));

        // 클릭된 li 요소에 "selected" 클래스를 추가합니다.
        li.classList.add('selected');
    });
});