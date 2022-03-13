import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

// link
import LinkTo from "../../../routes/LinkTo"


const ProfileMenu = (props) => {
  
  const [menu, setMenu] = useState(false)

  const [username,] = useState("이")

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
        <DropdownToggle className="btn header-item" id="page-header-user-dropdown" tag="button">
          <span className="fw-medium font-size-15"
          style={{border: "1px solid gainsboro", borderRadius: "50%", padding: "6px 12px"}}>
              {username}
          </span>{" "}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile" style={{display: "none"}}>
            {" "}
            <i className="uil font-size-18 align-middle me-1 text-muted"></i>
            {props.t("프로필 보기")}{" "}
          </DropdownItem>
          <DropdownItem tag="a" href={LinkTo.setting}>
            <i className="uil font-size-18 align-middle me-1 text-muted"></i>
            {props.t("설정")}
            <span className="badge bg-soft-success rounded-pill mt-1 ms-2"></span>
          </DropdownItem>

          <div className="dropdown-divider" />

          <DropdownItem tag="a" href={LinkTo.logout} className="dropdown-item">
            <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
            <span>{props.t("로그아웃")}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
