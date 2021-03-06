import PropTypes from "prop-types"
import React, { useCallback, useEffect, useRef } from "react"

// router, link
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import LinkTo from "../../routes/LinkTo"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"

//i18n
import { withTranslation } from "react-i18next"
import { Divider } from "@mui/material"


const SidebarContent = props => {
  const ref = useRef(); // select DOM

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  },[]);  

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    new MetisMenu("#side-menu")
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }

  }, [props.location.pathname,activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  
  // simplebar style maxheight -> minheight??? ????????? footer??? ????????? ??????.
  return (
    <React.Fragment>
      
      <SimpleBar style={{ minHeight: "100%" }} ref={ref} className="sidebar-menu-scroll">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">

            <li className="menu-title">{props.t("???")}</li>

            <li>
              <Link to={LinkTo} className="has-arrow waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-envelope.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("??????")}</span>
              </Link>
              <ul className="sub-menu">
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailWholebox}>{props.t("???????????????")}</Link>
                </li>
                <li>
                  <Link to={LinkTo.emailInbox}>{props.t("???????????????")}</Link>
                </li>
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailImportantbox}>{props.t("???????????????")} </Link>
                </li>
                <li>
                  <Link to={LinkTo.emailSentbox}>{props.t("???????????????")} </Link>
                </li>
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailReservationbox}>{props.t("???????????????")} </Link>
                </li>
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailFromToMebox}>{props.t("??????????????????")} </Link>
                </li>
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailTemporarybox}>{props.t("???????????????")} </Link>
                </li>
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailTrashbox}>{props.t("?????????")} </Link>
                </li>
                <Divider />
                <li>
                  <Link to={LinkTo.emailWaitApproval}>{props.t("?????????????????????")} </Link>
                </li>
                <li>
                  <Link to={LinkTo.emailRejectApproval}>{props.t("????????????????????????")} </Link>
                </li>
                <li>
                  <Link to={LinkTo.emailRequestApproval}>{props.t("????????????????????????")} </Link>
                </li>
                <li>
                  <Link to={LinkTo.emailEndApproval}>{props.t("????????????????????????")} </Link>
                </li>
              </ul>
            </li>

            <li style={{display: "none"}}>
              <Link to={LinkTo.calendarMonth} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-calendar.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("??????")}</span>
              </Link>
            </li>

            <li>
              <Link to={LinkTo} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-address-book.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("?????????")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={LinkTo.contactFixed}>{props.t("???????????????")}</Link>
                </li>
                <li>
                  <Link to={LinkTo.ContactPersonal}>{props.t("???????????????")}</Link>
                </li>
              </ul>
            </li>

            <li style={{display: "none"}}>
              <Link to="/#" className="has-arrow waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-sms.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("SMS")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={LinkTo.SMSInbox}>{props.t("??????????????????")}</Link>
                </li>
                <li>
                  <Link to={LinkTo.SMSSentbox}>{props.t("??????????????????")} </Link>
                </li>
              </ul>
            </li>
            
            <li>
              <Link to={LinkTo.AllPostsList} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-clipboard.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("?????????")}</span>
              </Link>
            </li>

            <li style={{display: "none"}}>
              <Link to={LinkTo.attendanceCheck} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-id-card.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("????????????")}</span>
              </Link>
            </li>

            <li style={{display: "none"}} className="menu-title">{props.t("??????")}</li>            

            <li style={{display: "none"}}>
              <Link to={LinkTo.utility} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-th.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("????????????")}</span>
              </Link>
            </li>

            {localStorage.getItem("authority") === "ROLE_ADMIN"
            ?
            <React.Fragment>
            <li className="menu-title">{props.t("??????")}</li>            

            <li>
              <Link to={LinkTo.applicantApproval} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-stamp-filled.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("??????")}</span>
              </Link>
            </li>

            <li>
              <Link to={LinkTo.employeeManagement} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-th-list-filled.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("????????????")}</span>
              </Link>
            </li>

            <li style={{display: "none"}}>
              <Link to={LinkTo.analysis} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-pie-filled.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("??????")}</span>
              </Link>
            </li>

            <li style={{display: "none"}}>
              <Link to={LinkTo.blockMailServer} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-shield-alt-filled.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("??????")}</span>
              </Link>
            </li>

            <li>
              <Link to={LinkTo.gatherEmails} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-mail-bulk-filled.png"}
                alt="???????????? ?????????" className="groupware-favicon-img" />
                <span>{props.t("??????????????????")}</span>
              </Link>
            </li>
            </React.Fragment>
            :
            ""}
          </ul>
        </div>
      </SimpleBar>

    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))