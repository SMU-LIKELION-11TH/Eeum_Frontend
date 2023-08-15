    $.ajax({
      url: `http://3.34.3.84/api/word/all/`,
      type: "GET",
      contentType: "application/json",
    //   headers: {
    //     Authorization: `Bearer ${jwtToken}`,
    //   },
      success: function (data) {
        console.log(JSON.stringify(data));
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 401) {
          console.error("Unauthorized:", jqXHR.responseText);
          alert("접근 권한이 없습니다.");
          window.location.href = "./login.html";
        } else if (jqXHR.status === 404) {
          console.error("Not found:", jqXHR.responseText);
          alert("사용자가 존재하지 않습니다.");
        } else {
          console.error("Error:", jqXHR.status, errorThrown);
          alert("서버 에러");
        }
      },
    });
