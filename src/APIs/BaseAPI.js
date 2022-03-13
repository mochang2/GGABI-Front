import axios from "axios"

// apply base url for axios
const API_URL = "https://www.ggabi.co.kr"
// const API_URL = "http://54.180.152.22:8080"

export const axiosAPI = axios.create({
  baseURL: API_URL,
})

// Authorization token 초기화
axiosAPI.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("JWTToken")}`;

/* 1. 요청 인터셉터  2개의 콜백 함수를 받습니다. */
axiosAPI.interceptors.request.use(
  function (config) {
      // 요청 성공 직전 호출됩니다.
      // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
      return config;
  }, 
  function (error) {
      // 요청 에러 직전 호출됩니다.
      return Promise.reject(error);
  }
);

/* 2. 응답 인터셉터  2개의 콜백 함수를 받습니다. */
axiosAPI.interceptors.response.use(
  function (response) {
  /*
      http status가 200인 경우
      응답 성공 직전 호출됩니다. 
      .then() 으로 이어집니다.
  */
      return response;
  },

  function (error) {
  /*
      http status가 200이 아닌 경우
      응답 에러 직전 호출됩니다.
      .catch() 으로 이어집니다.    
  */
      return Promise.reject(error);
  }
);



// common function
export const errorLog = (error) => {
  if (error.response) { // 요청은 이뤄짐
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  }
  else if (error.request) console.log(error.request);
  else console.log('Error', error.message); // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
}