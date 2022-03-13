import React from "react"

// components
import HeaderInAuth from "../../components/Auth/Header/HeaderInAuth"
import LoginForm from "../../components/Auth/AuthDetails/LoginForm";
import FooterInAuth from "../../components/Auth/Footer/FooterInAuth"


const Login = (props) => {

  return (
    <div className="login-page-outer-wrapper" style={{backgroundColor: "white"}}>
      <HeaderInAuth />
      <LoginForm />
      <FooterInAuth />
    </div>
  )

}

export default Login