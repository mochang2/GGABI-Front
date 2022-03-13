import React, { useState } from "react"
import PropTypes from 'prop-types'

import { Link } from "react-router-dom"
import LinkTo from "../../../routes/LinkTo"

// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

// api
import { axiosAPI, errorLog } from "../../../APIs/BaseAPI"

// design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faChevronCircleRight } from  "@fortawesome/free-solid-svg-icons"



const LoginForm = (props) => {

  // input value
  const [idState, setIdState] = useState("");
  const handleIdState = (event) => { setIdState(event.target.value); }
  const [passwdState, setPasswdState] = useState("");
  const handlePasswdState = (event) => { setPasswdState(event.target.value); }
  const [loginErrorState, setLoginErrorState] = useState(false);


  // 토큰 시간 지나면 자동 로그아웃
  const tokenExpiredLogout = () => {
    alert(`로그인 세션이 만료되었습니다. 다시 로그인 해주세요.`);
    props.history.push(LinkTo.logout);
  }

  
  // TODO: error return from BE when login info is incorrect
  const SubmitLoginForm = (event) => {
    event.preventDefault();

    axiosAPI.post("/api/auth/login", {
      "username": idState,
      "password": passwdState,
      headers: {
        // encType="application/x-www-form-urlencoded" 
      },
    })
      .then(response => {
        if (response.data["authority"] === "ROLE_ADMIN" || response.data["authority"] === "ROLE_USER") {
          const { accessToken } = response.data;
          const { accessTokenExpiresIn } = response.data;
          const { authority } = response.data;
          axiosAPI.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; // axios header에 Token 삽입
          localStorage.setItem("JWTToken", accessToken);  // locaStorage에 차례로 저장
          localStorage.setItem("JWTTokenExpireTime", accessTokenExpiresIn);
          localStorage.setItem("user", idState);
          localStorage.setItem("authority", authority);
          
          setLoginErrorState(false);
          setTimeout(tokenExpiredLogout, 24 * 60 * 60 * 1000);  // 토큰 시간 지나면 자동 로그아웃
          // f5를 눌러서 setTimeout이 작동 안 할 경우 Authmiddleware.js의 userEffect가 동작할 예정

          props.history.push(LinkTo.emailInbox); // redirect to main page
        }
        else {
          alert(`관리자의 승인이 나지 않은 아이디입니다. 관리자의 승인을 기다려주세요.`);
        }
      })
      .catch(error => {
        alert(`로그인에 실패하였습니다.`);
        setLoginErrorState(true);
        errorLog(error);
      });
  }



  return (
    <div className="login-form-outer-wrapper">
        
      <div className="screen">
        <div className="screen-content">
          <form className="login" id="login-form">
            <div className="login-field">
              <FontAwesomeIcon icon={faUser} className="login-icon" />
              <input type="text" className="login-input" placeholder="아이디" name="username" 
              value={idState} onChange={handleIdState} />
            </div>
            <div className="login-field">
              <FontAwesomeIcon icon={faLock} className="login-icon" />
              <input type="password" className="login-input" placeholder="비밀번호" name="password"
              value={passwdState} onChange={handlePasswdState} />
              <br />
              <Link to={LinkTo.findPasswd} className="remind-password">비밀번호찾기</Link>
            </div>
            <button className="button login-submit" onClick={SubmitLoginForm}>
              <div className="login-error-wrapper">
                <span className="button-text">로그인</span>
                {loginErrorState
                ?
                <div className="login-error">로그인 정보가 일치하지 않습니다</div>
                :
                ""
                }
              </div>
              <FontAwesomeIcon icon={faChevronCircleRight} className="button-icon" />
            </button>
          </form>
          <div className="yet-member">
              <h6 style={{color: "#e5e5e5"}}>아직 회원이 아니신가요?</h6>
              <Link to={LinkTo.signup} className="signup-link">회원가입</Link>
          </div>
        </div>
        <div className="screen-background">
            <span className="screen-background-shape screen-background-shape4"></span>
            <span className="screen-background-shape screen-background-shape3"></span>
            <span className="screen-background-shape screen-background-shape2"></span>
            <span className="screen-background-shape screen-background-shape1"></span>
        </div>
      </div>
        
    </div>
  )
}


export default withRouter(connect(null, null)(LoginForm))

LoginForm.propTypes = {
  history: PropTypes.object,
}