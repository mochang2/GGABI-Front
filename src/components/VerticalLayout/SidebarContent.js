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

  
  // simplebar style maxheight -> minheight로 바꿔서 footer의 여백을 없앰.
  return (
    <React.Fragment>
      
      <SimpleBar style={{ minHeight: "100%" }} ref={ref} className="sidebar-menu-scroll">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">

            <li className="menu-title">{props.t("앱")}</li>

            <li>
              <Link to={LinkTo} className="has-arrow waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-envelope.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("메일")}</span>
              </Link>
              <ul className="sub-menu">
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailWholebox}>{props.t("전체메일함")}</Link>
                </li>
                <li>
                  <Link to={LinkTo.emailInbox}>{props.t("받은메일함")}</Link>
                </li>
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailImportantbox}>{props.t("중요메일함")} </Link>
                </li>
                <li>
                  <Link to={LinkTo.emailSentbox}>{props.t("보낸메일함")} </Link>
                </li>
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailReservationbox}>{props.t("예약메일함")} </Link>
                </li>
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailFromToMebox}>{props.t("내게쓴메일함")} </Link>
                </li>
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailTemporarybox}>{props.t("임시메일함")} </Link>
                </li>
                <li style={{display: "none"}}>
                  <Link to={LinkTo.emailTrashbox}>{props.t("휴지통")} </Link>
                </li>
                <Divider />
                <li>
                  <Link to={LinkTo.emailWaitApproval}>{props.t("결재대기메일함")} </Link>
                </li>
                <li>
                  <Link to={LinkTo.emailRejectApproval}>{props.t("결재반려된메일함")} </Link>
                </li>
                <li>
                  <Link to={LinkTo.emailRequestApproval}>{props.t("결재요청된메일함")} </Link>
                </li>
                <li>
                  <Link to={LinkTo.emailEndApproval}>{props.t("결재완료된메일함")} </Link>
                </li>
              </ul>
            </li>

            <li style={{display: "none"}}>
              <Link to={LinkTo.calendarMonth} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-calendar.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("달력")}</span>
              </Link>
            </li>

            <li>
              <Link to={LinkTo} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-address-book.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("연락처")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={LinkTo.contactFixed}>{props.t("사내연락처")}</Link>
                </li>
                <li>
                  <Link to={LinkTo.ContactPersonal}>{props.t("개인연락처")}</Link>
                </li>
              </ul>
            </li>

            <li style={{display: "none"}}>
              <Link to="/#" className="has-arrow waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-sms.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("SMS")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={LinkTo.SMSInbox}>{props.t("받은메시지함")}</Link>
                </li>
                <li>
                  <Link to={LinkTo.SMSSentbox}>{props.t("보낸메시지함")} </Link>
                </li>
              </ul>
            </li>
            
            <li>
              <Link to={LinkTo.AllPostsList} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-clipboard.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("게시판")}</span>
              </Link>
            </li>

            <li style={{display: "none"}}>
              <Link to={LinkTo.attendanceCheck} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-id-card.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("근태관리")}</span>
              </Link>
            </li>

            <li style={{display: "none"}} className="menu-title">{props.t("기능")}</li>            

            <li style={{display: "none"}}>
              <Link to={LinkTo.utility} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-th.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("유틸리티")}</span>
              </Link>
            </li>

            {localStorage.getItem("authority") === "ROLE_ADMIN"
            ?
            <React.Fragment>
            <li className="menu-title">{props.t("관리")}</li>            

            <li>
              <Link to={LinkTo.applicantApproval} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-stamp-filled.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("승인")}</span>
              </Link>
            </li>

            <li>
              <Link to={LinkTo.employeeManagement} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-th-list-filled.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("사원관리")}</span>
              </Link>
            </li>

            <li style={{display: "none"}}>
              <Link to={LinkTo.analysis} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-pie-filled.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("분석")}</span>
              </Link>
            </li>

            <li style={{display: "none"}}>
              <Link to={LinkTo.blockMailServer} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-shield-alt-filled.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("차단")}</span>
              </Link>
            </li>

            <li>
              <Link to={LinkTo.gatherEmails} className="waves-effect groupware-link-wrapper">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-mail-bulk-filled.png"}
                alt="그룹웨어 이미지" className="groupware-favicon-img" />
                <span>{props.t("메일모아보기")}</span>
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