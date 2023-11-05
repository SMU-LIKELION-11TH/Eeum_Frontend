function searchWithInput() {
    if (searchInput.value === "") {
        window.location.href = "/dictionary/list.html";
        localStorage.clear();
    } else {
        window.location.href = "/dictionary/detail.html";
        //ajax시작===================================================
        $.ajax({
            url: '/api/search/word/',
            type: "POST",
            data: {
                "keyword": searchInput.value,
            },
            headers: {},

            success: function (result) {
                console.log(JSON.stringify(result));
                console.log(result);
                data = result;
                createPaginationButtons(Math.ceil(data.length / itemsPerPage), initialPageNumber); // 초기 페이지는 1로 설정
                displayPageItems(initialPageNumber, data);
                console.log(initialPageNumber);

            },

            error: function (xhr) {
                alert(
                    "Could not send URL to Django. Error: " +
                    xhr.status +
                    ": " +
                    xhr.responseText
                );
            },
        });

        //ajax 끝===================================================
    }
};
