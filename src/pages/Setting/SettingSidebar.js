import React, { useRef } from "react"

// router
import { Link } from "react-router-dom"
import LinkTo from "../../routes/LinkTo"

// design
import { Card } from "reactstrap"


const SettingSidebar = (props) => {

  const urlPath = document.location.pathname.split("/").at(-1);
  const changePersonalInfoRef = useRef();
  const changePasswdRef = useRef();
  const withdrawMembershipRef = useRef();
  React.useEffect(() => {
    if (urlPath === LinkTo.changePersonalInfo.split("/").at(-1)) {
      changePersonalInfoRef.current.classList.add("active");
    }
    else if (urlPath === LinkTo.changePasswd.split("/").at(-1)) {
      changePasswdRef.current.classList.add("active");
    }
    else if (urlPath === LinkTo.withdrawMembership.split("/").at(-1)) {
      withdrawMembershipRef.current.classList.add("active");
    }
  })



  return (
    <React.Fragment>
      <Card>
        <div className="mail-list p-4 setting-list">
          <Link to={LinkTo.changePersonalInfo} className="d-flex"
          ref={changePersonalInfoRef} style={{justifyContent: "center"}}>
            계정정보변경
          </Link>

          <hr/>

          <Link to={LinkTo.changePasswd} className="d-flex"
          ref={changePasswdRef} style={{justifyContent: "center"}}>
            비밀번호변경
          </Link>

          <hr/>

          <Link to={LinkTo.withdrawMembership} className="d-flex"
          ref={withdrawMembershipRef} style={{justifyContent: "center"}}>
            회원탈퇴
          </Link>

        </div>
      </Card>
    </React.Fragment>
  )
}

export default SettingSidebar