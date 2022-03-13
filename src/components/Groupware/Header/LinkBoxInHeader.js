import React from "react"

// router
import { Link } from "react-router-dom"
import LinkTo from "../../../routes/LinkTo"

// design
import "./linkBoxInHeader.css"

const LinkBoxInHeader = (props) => {
    return (
        <div className="linkbox-wrapper">
            <div className="linkboxes-placer">
                <Link to={LinkTo.login}
                className="login-link-wrapper link-text-wrapper"
                >
                    로그인
                </Link>
                <Link to={LinkTo.signup}
                className="signup-link-wrapper link-text-wrapper"
                >
                    회원가입
                </Link>
            </div>
        </div>
    )
}

export default LinkBoxInHeader