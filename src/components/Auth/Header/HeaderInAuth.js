import React from "react"

import { Link } from "react-router-dom"
import LinkTo from "../../../routes/LinkTo"

// design
import "./headerInAuth.css"

const HeaderInAuth = (props) => {
  return (
      
    <div className="outer-wrapper-in-auth-header">

      <div className="home-btn d-none d-sm-block">
        <Link to={LinkTo.emailInbox} className="text-dark">
          <i className="mdi mdi-home-variant h2"></i>
        </Link>
      </div>

      <div className="inner-wrapper-in-auth-header">
        <img src={process.env.PUBLIC_URL + "/Logo_Calligraphy.png"}
        alt="로고 이미지" onClick={() => document.location.href=LinkTo.emailInbox} 
        className="logo-img-in-header"/>
      </div>
    
    </div>
  )
}

export default HeaderInAuth