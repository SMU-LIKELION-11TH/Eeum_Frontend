Kakao.init('97a167bfd45fe1d3f9180e159b4a147d');

function onclickLogin() {
  Kakao.Auth.login({
    success: function(res) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function(result){
          var id = result.id;
          var age = result.kakao_account.age_range;

          $.ajax({
            type: 'POST',
            url: '/api/account/kakao/callback/',
            dataType: 'json',
            data: {
              'id': id,
              'age': age,
            },
        
            success: function(res){
              alert('로그인에 성공했습니다.');
              var access = res.access;
              var refresh = res.refresh;

              localStorage.setItem('access', access);
              localStorage.setItem('refresh', refresh);
              window.location.reload()
            },
        
            // error: function (jqXHR, textStatus, errorThrown) {
            //   alert('로그인에 실패했습니다.');
            //   console.log(jqXHR);
            // }
          })
        }
      })
    },
    
    fail: (err) => {
        console.error('카카오 로그인 실패:', err);
    }
  });
}