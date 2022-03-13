import React from "react"

// design
import "./corpInfoInFooter.css"

const CorpInfoInFooter = (props) => {
  return (
    <React.Fragment>
    <img src={process.env.PUBLIC_URL + "/Logo_Calligraphy.png"}
    alt="로고 캘리그라피" className="logo-img-in-footer" 
    onClick={() => {document.location.href="/"}}/>

    <div className="corp-info-text-wrapper-in-footer">
      Copyright ©️ GGABI corp. All Rights Reserved.
    </div>
    </React.Fragment>
  )
}

export default CorpInfoInFooter