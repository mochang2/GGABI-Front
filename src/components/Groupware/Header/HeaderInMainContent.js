import React from "react"

// header component
import LinkBoxInHeader from "./LinkBoxInHeader"
import ProfileBoxInHeader from "./ProfileBoxInHeader"
import SearchBoxInHeader from "./SearchBoxInHeader"

// design
import "./headerInMainContent.css"

const HeaderInMainContent = (props) => {

    //// TODO: 로그인 했는지 안 했는지 알 필요 있음(fetch user.id 같은 거)
    // const userLoggedInAPI ...
    // temp variable
    const userLoggedIn = props.userLoggedIn;

    return (
        <div className="main-content-header-container">
            <SearchBoxInHeader />
            { userLoggedIn ?
            <ProfileBoxInHeader /> :
            <LinkBoxInHeader /> }
        </div>
    )
}

export default HeaderInMainContent