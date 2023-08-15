function searchWithInput() {
    const searchInput = document.getElementById("searchInput").value;

    if (searchInput.trim() === "") {
        // 검색어가 없을 때 기존 메인 페이지로 이동
        window.location.href = "/templates/main_templates/main.html";
    } else {
        // 검색어가 있을 때 검색 결과 페이지로 이동
        window.location.href = `/templates/main_templates/main_dictionary_view.html?query=${encodeURIComponent(searchInput)}`;
    }
}

// search_results.js
document.addEventListener("DOMContentLoaded", function() {
    const wordContainer = document.getElementById("wordContainer");
    const paginationContainer = document.getElementById("paginationContainer");
    

    // 검색 결과 데이터
    const searchData = [
        // 검색 결과 데이터 배열
        {
            index: 1,
            name: "~라고 할뻔",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "하고싶은 말 뒤에 쓴다",
            heart: 30,
            heart_img: "/static/img/imoge/heartred.png",
            link: "practice.html"
        },
        {
            index: 2,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_20.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 21,
        },
        {
            index: 3,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 25,
        },
        {
            index: 4,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 27,
        },
        {
            index: 5,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 29,
        },
        {
            index: 6,
            name: "~라고 할뻔",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "하고싶은 말 뒤에 쓴다",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 28,
        },
        {
            index: 7,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 8,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 9,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 10,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 11,
            name: "~라고 할뻔",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "하고싶은 말 뒤에 쓴다",
            heart: 24,
            heart_img: "/static/img/imoge/heartred.png",
            link: "practice.html"
        },
        {
            index: 12,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 13,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
    ];

    // 페이지네이션을 위한 설정
    const itemsPerPage = 12; // 한 페이지당 표시할 아이템 수
    let currentPage = 1; // 현재 페이지

    // 검색 결과 데이터를 페이지네이션에 맞게 나누는 함수
    function paginateData(data, currentPage) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }

    // 페이지네이션 버튼 생성 함수
    function createPaginationButtons(totalPages) {
        paginationContainer.innerHTML = ""; // 기존 버튼 초기화

        for (let page = 1; page <= totalPages; page++) {
            const button = document.createElement("button");
            button.textContent = page;
            button.addEventListener("click", () => {
                currentPage = page;
                updateResults();
            });
            paginationContainer.appendChild(button);
        }
    }

    // 검색 결과 표시 함수
    function updateResults() {
        wordContainer.innerHTML = ""; // 기존 결과 초기화

        const paginatedData = paginateData(searchData, currentPage);
        paginatedData.forEach(data => {
            const wordItem = document.createElement("div");
            wordItem.classList.add("word");
    
            let imageHtml = `<img src="${data.image}">`;
        
            if (data.image_snd) {
                imageHtml += `<img src="${data.image_snd}">`;
            }
        
            wordItem.innerHTML = `
                <li class="word_name">
                    <p>${data.name}</p>
                    <div class="img_container">
                        ${imageHtml}
                    </div>
                </li>
                <li class="word_what"><p>${data.what}</p></li>
                <li class="word_heart">
                    <img src="${data.heart_img}">
                    <p>${data.heart}</p>
                </li>
            `;

            wordContainer.appendChild(wordItem);
        });

        // 총 페이지 수 계산
        const totalPages = Math.ceil(searchData.length / itemsPerPage);

        // 페이지네이션 버튼 생성
        createPaginationButtons(totalPages);
    }

    // 초기화 및 첫 번째 페이지 결과 표시
    updateResults();
});
