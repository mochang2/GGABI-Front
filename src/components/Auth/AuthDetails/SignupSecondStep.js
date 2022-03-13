import React from "react"

import { Link } from "react-router-dom"
import LinkTo from "../../../routes/LinkTo"


const SignupSecondStep = (props) => {
    return (
        <>
        <div className="signup-success-wrapper">
            <div className="signup-success-logo-wrapper">
                <img src={process.env.PUBLIC_URL + "/Logo.png"} alt="로고 이미지" className="signup-success-logo-img" />
            </div>
            <div className="signup-submit-and-signup-cancel-btn-wrapper">
                <Link to={LinkTo.login} className="signup-submit-btn signup-related-btn" >로그인하기</Link>
                <Link to={LinkTo.default} className="signup-cancel-btn signup-related-btn" >메인홈으로</Link>
            </div>
        </div>
        </>
    )
}

export default SignupSecondStep