function onclickLogin() {
    fetch('http://127.0.0.1:5500/templates/landing.html', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error('400 에러 발생: Bad Request');
      } else if (response.status === 401) {
        throw new Error('401 에러 발생: Unauthorized');
      } else if (response.status === 429) {
        throw new Error('429 에러 발생: Too Many Requests');
      }
      console.log('SUCCESS', response);
      alert("로그인이 완료되었습니다")
      window.location.replace('/main')
    })
    .catch((error) => console.log('ERROR', error));

}