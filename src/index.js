import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"

// 웹애플리케이션에서 상태를 모니터 화면으로 출력하는 것은 온전히 리액트가 담당한다.
// 애플리케이션의 상태관리는 리덕스가 담당한다.
// 나머지 외부 입력(사용자 입력 및 기타 이벤트들)을 받아서 어떻게 처리할 지에 
// 대한 모든 복잡한 과정들은(비동기 비즈니스 로직 처리) saga 에서 온전히 담당을 하게 된다.
import { Provider } from "react-redux"
import store from "./store"

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()  // register -> serviceWorker 사용
