document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 12; // 페이지당 보여줄 아이템 개수
    const wordContainer = document.getElementById("wordContainer");
    const paginationContainer = document.getElementById("paginationContainer");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const wordsData = [
        // 데이터 배열
        // (여기에 데이터를 추가해주세요)
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
        {
            index: 14,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 15,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 16,
            name: "~라고 할뻔",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "하고싶은 말 뒤에 쓴다",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 17,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 18,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 19,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            image_snd: "/static/img/age/age_30.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },
        {
            index: 20,
            name: "차도남",
            image: "/static/img/age/age_10.png",
            what: "차가운 도시 남자",
            heart_img: "/static/img/imoge/heartred.png",
            heart: 24,
        },

    ];

    function createWordCard(data) {
        const wordItem = document.createElement("ul");
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

        // 클릭 이벤트 처리
        wordItem.addEventListener("click", function() {
            // 해당 단어 카드의 링크로 이동
            window.location.href = data.link;
        });
    
        wordContainer.appendChild(wordItem);
    }
    function displayPageItems(pageNumber) {
        console.log(pageNumber);
        // 해당 페이지의 아이템들을 보여주는 함수
        wordContainer.innerHTML = ''; // 기존 아이템 제거

        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = wordsData.slice(startIndex, endIndex);

        pageItems.forEach(data => {
            createWordCard(data);
        });
    }

    function createPaginationButtons(totalPages, currentPage) {
        // 페이지네이션 버튼 생성 함수
        let paginationHtml = '';

        paginationHtml += '<button id="prevButton" class="pag_btn">&lt;</button>';
        
        const startPage = Math.max(currentPage - 2, 1);
        const endPage = Math.min(startPage + 4, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                paginationHtml += `<button class="pag_btn current">${i}</button>`;
            } else {
                paginationHtml += `<button class="pag_btn">${i}</button>`;
            }
        }

        paginationHtml += '<button id="nextButton" class="pag_btn">&gt;</button>';

        paginationContainer.innerHTML = paginationHtml;

        const pageButtons = paginationContainer.querySelectorAll(".pag_btn");

        pageButtons.forEach((button, currentPage) => {
            button.addEventListener("click", function() {
                if (button.textContent === "<") {
                    currentPage = Math.max(currentPage - 1, 1);
                } else if (button.textContent === ">") {
                    currentPage = Math.min(currentPage + 1, totalPages);
                } else {
                    currentPage = parseInt(button.textContent);
                }

                createPaginationButtons(totalPages, currentPage);
                displayPageItems(currentPage);
            });
        });
    }
    
    function initializePagination() {
        const totalPages = Math.ceil(wordsData.length / itemsPerPage);
        let currentPage = 1;
    
        sortingSelect.addEventListener("change", function() {
            const selectedOption = sortingSelect.value;
    
            if (selectedOption === "popularity") {
                wordsData.sort((a, b) => b.heart - a.heart);
            } else if (selectedOption === "recency") {
                wordsData.sort((a, b) => a.index - b.index);
            }
    
            createPaginationButtons(totalPages, currentPage);
            displayPageItems(currentPage);
        });
    
        createPaginationButtons(totalPages, currentPage);
        displayPageItems(currentPage);
    }
    
    

    initializePagination(); // 초기 페이지 설정 함수 호출
});



//==========================================================
// const itemsPerPage = 12; // 페이지당 보여줄 아이템 개수
// const wordContainer = document.getElementById("wordContainer");
// const paginationContainer = document.getElementById("paginationContainer");
// const prevButton = document.getElementById("prevButton");
// const nextButton = document.getElementById("nextButton");

// function createWordCard_snd(item) {
//     console.log(item)
//     $.each(item, function (index, data) {
//         const wordItem = document.createElement("ul");
//         wordItem.classList.add("word");

//         const age = data.age; // Assume age is an array containing age values

//         let imageHtml = ""; // Initialize imageHtml variable

//         if (age[0] === 10) {
//             imageHtml += `<img src="../static/img/age/age_10.png">`;
//         } else if (age[0] === 20) {
//             imageHtml += `<img src="../static/img/age/age_20.png">`;
//         } else if (age[0] === 30) {
//             imageHtml += `<img src="../static/img/age/age_30.png">`;
//         } else if (age[0] === 40) {
//             imageHtml += `<img src="../static/img/age/age_40.png">`;
//         } else if (age[0] === 50) {
//             imageHtml += `<img src="../static/img/age/age_50.png">`;
//         }

//         if (age[1]) {
//             if (age[1] === 10) {
//                 imageHtml += `<img src="../static/img/age/age_10.png">`;
//             } else if (age[1] === 20) {
//                 imageHtml += `<img src="../static/img/age/age_20.png">`;
//             } else if (age[1] === 30) {
//                 imageHtml += `<img src="../static/img/age/age_30.png">`;
//             } else if (age[1] === 40) {
//                 imageHtml += `<img src="../static/img/age/age_40.png">`;
//             } else if (age[1] === 50) {
//                 imageHtml += `<img src="../static/img/age/age_50.png">`;
//             }
//         }

//         wordItem.innerHTML = `
//             <li class="word_name">
//                 <p>${data.title}</p>
//                 <div class="img_container">
//                     ${imageHtml}
//                 </div>
//             </li>
//             <li class="word_what"><p>${data.mean}</p></li>
//             <li class="word_heart">
//                 <img src="${data.heart_img}">
//                 <p>${data.likes}</p>
//             </li>
//         `;

//         // 클릭 이벤트 처리
//         wordItem.addEventListener("click", function () {
//             // 해당 단어 카드의 링크로 이동
//             if (data.link) {
//                 window.location.href = data.link;
//             }
//         });



//         wordContainer.appendChild(wordItem);
//     })


// }

// function displayPageItems(pageNumber) {
//     // 해당 페이지의 아이템들을 보여주는 함수
//     wordContainer.innerHTML = ''; // 기존 아이템 제거

//     const startIndex = (pageNumber - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const pageItems = wordsData.slice(startIndex, endIndex);

//     pageItems.forEach(data => {
//         createWordCard(data);
//     });
// }

function createPaginationButtons(data) {
    // 페이지네이션 버튼 생성 함수
    let currentPage = 1;
    let totalPages = data.lenghth;
    let paginationHtml = '';

    paginationHtml += '<button id="prevButton" class="pag_btn">&lt;</button>';

    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHtml += `<button class="pag_btn current">${i}</button>`;
        } else {
            paginationHtml += `<button class="pag_btn">${i}</button>`;
        }
    }

    paginationHtml += '<button id="nextButton" class="pag_btn">&gt;</button>';

    paginationContainer.innerHTML = paginationHtml;

    const pageButtons = paginationContainer.querySelectorAll(".pag_btn");

    pageButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            if (button.textContent === "<") {
                currentPage = Math.max(currentPage - 1, 1);
            } else if (button.textContent === ">") {
                currentPage = Math.min(currentPage + 1, totalPages);
            } else {
                currentPage = parseInt(button.textContent);
            }

            createPaginationButtons(totalPages, currentPage);
            displayPageItems(currentPage);
        });
    });
}
// 최신순 정리 부분
function initializePagination() {
    const totalPages = Math.ceil(data.lenghth / itemsPerPage);
    let currentPage = 1;

    sortingSelect.addEventListener("change", function () {
        const selectedOption = sortingSelect.value;

        if (selectedOption === "popularity") {
            wordsData.sort((a, b) => b.heart - a.heart);
        } else if (selectedOption === "recency") {
            wordsData.sort((a, b) => a.index - b.index);
        }

        createPaginationButtons(totalPages, currentPage);
        displayPageItems(currentPage);
    });

    createPaginationButtons(totalPages, currentPage);
    displayPageItems(currentPage);
}



// initializePagination();

//ajax 시작=========================================
$.ajax({
    url: '/api/word/all/',
    type: "GET",
    dataType: "JSON",
    headers: {},

    success: function (result) {
        console.log(JSON.stringify(result));
        createWordCard_snd(result.data.word);
        createWordCard_snd(result.data);
        createPaginationButtons(result.data.word);
        initializePagination();
    },

    error: function (xhr, textStatus, thrownError) {
        alert(
            "Could not send URL to Django. Error: " +
            xhr.status +
            ": " +
            xhr.responseText
        );
    },
})
//ajax 끝===========================================


const itemsPerPage = 12; // 페이지당 보여줄 아이템 개수
let initialPageNumber = 1;
const wordContainer = document.getElementById("wordContainer");
const paginationContainer = document.getElementById("paginationContainer");


function createPaginationButtons(totalPages, currentPage) {
    let paginationHtml = '';

    paginationHtml += '<button id="prevButton" class="pag_btn">&lt;</button>';

    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHtml += `<button class="pag_btn current">${i}</button>`;
        } else {
            paginationHtml += `<button class="pag_btn">${i}</button>`;
        }
    }

    paginationHtml += '<button id="nextButton" class="pag_btn">&gt;</button>';

    paginationContainer.innerHTML = paginationHtml;

    const pageButtons = paginationContainer.querySelectorAll(".pag_btn");


    pageButtons.forEach((button, ) => {
        button.addEventListener("click", function () {
            if (button.textContent === "<") {
                currentPage = Math.max(currentPage - 1, 1);
            } else if (button.textContent === ">") {
                currentPage = Math.min(currentPage + 1, totalPages);
            } else {
                currentPage = parseInt(button.textContent);
            }

            createPaginationButtons(totalPages, currentPage);
            displayPageItems(currentPage, data);
        });
    });
}


function createWordCard_snd(item) {

    const data = item;
    const wordItem = document.createElement("ul");
    wordItem.classList.add("word");

    const age = data.age; // Assume age is an array containing age values

    let imageHtml = ""; // Initialize imageHtml variable

    if (age[0] === 10) {
        imageHtml += `<img src="../static/img/age/age_10.png">`;
    } else if (age[0] === 20) {
        imageHtml += `<img src="../static/img/age/age_20.png">`;
    } else if (age[0] === 30) {
        imageHtml += `<img src="../static/img/age/age_30.png">`;
    } else if (age[0] === 40) {
        imageHtml += `<img src="../static/img/age/age_40.png">`;
    } else if (age[0] === 50) {
        imageHtml += `<img src="../static/img/age/age_50.png">`;
    }

    if (age[1]) {
        if (age[1] === 10) {
            imageHtml += `<img src="../static/img/age/age_10.png">`;
        } else if (age[1] === 20) {
            imageHtml += `<img src="../static/img/age/age_20.png">`;
        } else if (age[1] === 30) {
            imageHtml += `<img src="../static/img/age/age_30.png">`;
        } else if (age[1] === 40) {
            imageHtml += `<img src="../static/img/age/age_40.png">`;
        } else if (age[1] === 50) {
            imageHtml += `<img src="../static/img/age/age_50.png">`;
        }
    }

    wordItem.innerHTML = `
            <li class="word_name">
                <p>${data.title}</p>
                <div class="img_container">
                    ${imageHtml}
                </div>
            </li>
            <li class="word_what"><p>${data.mean}</p></li>
            <li class="word_heart">
                <img src="../static/img/imoge/heartred.png">
                <p>${data.likes}</p>
            </li>
        `;

    // 클릭 이벤트 처리
    wordItem.addEventListener("click", function () {
        // 해당 단어 카드의 링크로 이동
        if (data.link) {
            window.location.href = data.link;
        }
    });
    console.log(wordItem);

    wordContainer.appendChild(wordItem);
}   

function displayPageItems(pageNumber, data) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    wordContainer.innerHTML = ""; // 기존 아이템 초기화

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        createWordCard_snd(data[i]);
    }
}

// ajax 시작=========================================
$.ajax({
    url: '/api/word/all/',
    type: "GET",
    dataType: "JSON",
    headers: {},
    success: function (result) {
        console.log(JSON.stringify(result));
        console.log(result);
        const data = result.data.word;
        createPaginationButtons(Math.ceil(data.length / itemsPerPage), initialPageNumber); // 초기 페이지는 1로 설정
        displayPageItems(initialPageNumber, data);
        console.log(initialPageNumber);
    },
    error: function (xhr, textStatus, thrownError) {
        alert(
            "Could not send URL to Django. Error: " +
            xhr.status +
            ": " +
            xhr.responseText
        );
    },
})
// ajax 끝===========================================
