import React, { useState, useEffect, useRef } from "react"

import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import LinkTo from "../../routes/LinkTo"

import { Button, Card } from "reactstrap"

// modal components
import { WriteMailModal, WriteMailToMeModal } from "../../components/Common/ModalTemplate"
import { MailboxSwitchModal } from "../../components/Common/ModalTemplate"

// design
import Divider from "@mui/material/Divider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelopeSquare, faStar, faEnvelopeOpen, faEdit, faBackspace,
        faTrashAlt, faUserFriends, faExclamationCircle, faAd, faCogs, faEnvelopeOpenText, faHistory, faPause, faFlagCheckered, faCheckDouble } from "@fortawesome/free-solid-svg-icons"
import { faHandPaper } from "@fortawesome/free-regular-svg-icons"


const tempDisplayNone = {
  display: "none",
};


const EmailSideBar = (props) => {

  // write a mail
  const [writeMailModalOpen, setWriteMailModalOpen] = useState(false);
  const [writeMailToMeModalOpen, setWriteMailToMeModalOpen] = useState(false);

  const handleWriteMailModalOpen = () => {
      setWriteMailModalOpen(true);
  }
  const handleWriteMailModalClose = () => {
      setWriteMailModalOpen(false);
  }

  const handleWriteMailToMeModalOpen = () => {
      setWriteMailToMeModalOpen(true);
  }
  const handleWriteMailToMeModalClose = () => {
      setWriteMailToMeModalOpen(false);
  }


  // mail count sum
  const calculateWholeMailCount = (mailCountJson) => {
    return mailCountJson["inbox"] + mailCountJson["importantbox"] + mailCountJson["sentbox"] + 
    mailCountJson["reservationbox"] + mailCountJson["fromtomebox"] + mailCountJson["temporarybox"] + mailCountJson["trashbox"]
  }

  
  // mailbox active
  const wholeboxRef = useRef();
  const inboxRef = useRef();
  const categorySocialRef = useRef();
  const categoryAdRef = useRef();
  const categorySpamRef = useRef();
  const importantboxRef = useRef();
  const sentboxRef = useRef();
  const reservationboxRef = useRef();
  const fromtomeboxRef = useRef();
  const temporaryboxRef = useRef();
  const trashboxRef = useRef();
  const waitApprovalRef = useRef();
  const rejectApprovalRef = useRef();
  const requestApprovalRef = useRef();
  const endApprovalRef = useRef();

  useEffect(() => {
    const urlPath = document.location.pathname.split("/");
    const locationState = props.location.state;
    if ("/" + urlPath[1] + "/" + urlPath[2] === LinkTo.emailInbox) { 
      if (locationState !== undefined && locationState.prevPath === LinkTo.emailCategorySocial) {
        categorySocialRef.current.classList.add("active");
      }
      else if (locationState !== undefined && locationState.prevPath === LinkTo.emailCategoryAd) {
        categoryAdRef.current.classList.add("active");
      }
      else if (locationState !== undefined && locationState.prevPath === LinkTo.emailCategorySpam) {
        categorySpamRef.current.classList.add("active");
      }
      else {
        inboxRef.current.classList.add("active"); 
      }
    }
    else if ("/" + urlPath[1] + "/" + urlPath[2] === LinkTo.emailImportantbox) { 
      importantboxRef.current.classList.add("active"); 
    }
    else if ("/" + urlPath[1] + "/" + urlPath[2] === LinkTo.emailSentbox) { 
      sentboxRef.current.classList.add("active"); 
    }
    else if ("/" + urlPath[1] + "/" + urlPath[2] === LinkTo.emailReservationbox) { 
      reservationboxRef.current.classList.add("active"); 
    }
    else if ("/" + urlPath[1] + "/" + urlPath[2] === LinkTo.emailFromToMebox) { 
      fromtomeboxRef.current.classList.add("active"); 
    }
    else if ("/" + urlPath[1] + "/" + urlPath[2] === LinkTo.emailTemporarybox) { 
      temporaryboxRef.current.classList.add("active"); 
    }
    else if ("/" + urlPath[1] + "/" + urlPath[2] === LinkTo.emailTrashbox) { 
      trashboxRef.current.classList.add("active"); 
    }
    else if ("/" + urlPath[1] + "/" + urlPath[2] + "/" + urlPath[3] === LinkTo.emailWaitApproval) {
      waitApprovalRef.current.classList.add("active"); 
    }
    else if ("/" + urlPath[1] + "/" + urlPath[2] + "/" + urlPath[3] === LinkTo.emailRejectApproval) { 
      rejectApprovalRef.current.classList.add("active"); 
    }
    else if ("/" + urlPath[1] + "/" + urlPath[2] + "/" + urlPath[3] === LinkTo.emailRequestApproval) { 
      requestApprovalRef.current.classList.add("active"); 
    }
    else if ("/" + urlPath[1] + "/" + urlPath[2] + "/" + urlPath[3] === LinkTo.emailEndApproval) { 
      endApprovalRef.current.classList.add("active"); 
    }
    else if ("/" + urlPath[1] === LinkTo.emailWholebox) { 
      wholeboxRef.current.classList.add("active"); 
    }
  });
  


  // mail box show option modal
  const [mailboxOptionOpen, setMailboxOptionOpen] = useState(false);
  const handleMailboxOptionOpen = () => {
      setMailboxOptionOpen(true);
  }
  const handleMailboxOptionClose = () => {
      setMailboxOptionOpen(false);
  }

  // mail box show option function
  const [showMailboxState, setShowMailboxState] = useState({
    wholebox: true, inbox: true, importantbox: true, sentbox: true,
    reservationbox: true, fromtomebox: true, temporarybox: true, trashbox: true,
    waitbox: true, rejectbox: true, requestbox: true, endbox: true
  });
  const mailboxRefMapping = {
    wholebox: wholeboxRef, inbox: inboxRef, importantbox: importantboxRef, sentbox: sentboxRef,
    reservationbox: reservationboxRef, fromtomebox: fromtomeboxRef, temporarybox: temporaryboxRef, trashbox: trashboxRef,
    waitbox: waitApprovalRef, rejectbox: rejectApprovalRef, requestbox: requestApprovalRef, endbox: endApprovalRef
  }
  const handleShowMailboxState = (event) => {
    setShowMailboxState({...showMailboxState, [event.target.name]: event.target.checked});

    if (event.target.checked) { // on
      mailboxRefMapping[event.target.name].current.style.display = "block";
      if (event.target.name === "inbox") {
        categorySocialRef.current.style.display = "block";
        categoryAdRef.current.style.display = "block";
        categorySpamRef.current.style.display = "block";
      }
    }
    else { // off
      mailboxRefMapping[event.target.name].current.style.display = "none";
      if (event.target.name === "inbox") {
        categorySocialRef.current.style.display = "none";
        categoryAdRef.current.style.display = "none";
        categorySpamRef.current.style.display = "none";
      }
    }
  };


  return (
    <React.Fragment>
      <Card className="email-leftbar">
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
          <Button type="button" color="danger" className="btn-block waves-effect waves-light"
          onClick={handleWriteMailModalOpen} block>
            메일쓰기
          </Button>
          <WriteMailModal open={writeMailModalOpen}
          handleClose={handleWriteMailModalClose} receiver={""} content={""} />

          <Button type="button" color="danger" className="btn-block waves-effect waves-light"
          onClick={handleWriteMailToMeModalOpen} block>
            내게쓰기
          </Button>
          <WriteMailToMeModal open={writeMailToMeModalOpen}
          handleClose={handleWriteMailToMeModalClose} userMail={props.userData.userMail} />
        </div>
        
        <div className="mail-list mt-4">

          <Link to={LinkTo.emailWholebox} ref={wholeboxRef} style={tempDisplayNone}>
            <FontAwesomeIcon icon={faEnvelopeSquare} style={{marginRight: "10px"}} size="lg" />
            전체메일{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"(" + calculateWholeMailCount(props.userData.mailCount).toString() + ")"}
            </span>
          </Link>

          <Link to={LinkTo.emailInbox} ref={inboxRef}>
            <FontAwesomeIcon icon={faEnvelopeOpen} style={{marginRight: "10px"}} />
            받은메일{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"(" + props.userData.mailCount["inbox"].toString() + ")"}
            </span>
          </Link>
          <div className="mail-list mt-1 mb-1" style={{marginLeft: "16px"}}>
            <Link to={LinkTo.emailCategorySocial} ref={categorySocialRef}>
              <FontAwesomeIcon icon={faUserFriends} style={{marginRight: "7px", position: "relative", bottom: "1px"}} />
              <span className="mdi mdi-circle-outline text-success float-end" style={tempDisplayNone}></span>
              소셜
            </Link>
            <Link to={LinkTo.emailCategoryAd} ref={categoryAdRef}>
              <FontAwesomeIcon icon={faAd} style={{marginRight: "10px", position: "relative", bottom: "1px"}} />
              <span className="mdi mdi-circle-outline text-warning float-end" style={tempDisplayNone}></span>
              광고
            </Link>
            <Link to={LinkTo.emailCategorySpam} ref={categorySpamRef}>
              <FontAwesomeIcon icon={faExclamationCircle} style={{marginRight: "10px", position: "relative", bottom: "1px"}} />
              <span className="mdi mdi-circle-outline text-danger float-end" style={tempDisplayNone}></span>
              스팸
            </Link>
          </div>

          <Link to={LinkTo.emailImportantbox} ref={importantboxRef} style={tempDisplayNone}>
            <FontAwesomeIcon icon={faStar} style={{marginRight: "10px"}} />
            중요메일{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"(" + props.userData.mailCount["importantbox"].toString() + ")"}
            </span>
          </Link>

          <Link to={LinkTo.emailSentbox} ref={sentboxRef}>
            <FontAwesomeIcon icon={faEnvelopeOpenText} style={{marginRight: "12px"}} />
            보낸메일{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"(" + props.userData.mailCount["sentbox"].toString() + ")"}
            </span>
          </Link>

          <Link to={LinkTo.emailReservationbox} ref={reservationboxRef} style={tempDisplayNone}>
            <FontAwesomeIcon icon={faEdit} style={{marginRight: "10px"}} />
            예약메일{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"(" + props.userData.mailCount["reservationbox"].toString() + ")"}
            </span>
          </Link>
          
          <Link to={LinkTo.emailFromToMebox} ref={fromtomeboxRef} style={tempDisplayNone}>
            <FontAwesomeIcon icon={faHistory} style={{marginRight: "10px"}} />
            내게쓴메일{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"(" + props.userData.mailCount["fromtomebox"].toString() + ")"}
            </span>
          </Link>

          <Link to={LinkTo.emailTemporarybox} ref={temporaryboxRef} style={tempDisplayNone}>
            <FontAwesomeIcon icon={faBackspace} style={{marginRight: "8px"}} />
            임시메일{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"(" + props.userData.mailCount["temporarybox"].toString() + ")"}
            </span>
          </Link>

          <Link to={LinkTo.emailTrashbox} ref={trashboxRef} style={tempDisplayNone}>
            <FontAwesomeIcon icon={faTrashAlt} style={{marginRight: "10px"}} />
            {" "}휴지통{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"(" + props.userData.mailCount["trashbox"].toString() + ")"}
            </span>
          </Link>

          <Divider />

          <Link to={LinkTo.emailWaitApproval} ref={waitApprovalRef}>
            <FontAwesomeIcon icon={faPause} style={{marginRight: "10px"}} />
            {" "}결재대기메일{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"()"}
            </span>
          </Link>

          <Link to={LinkTo.emailRejectApproval} ref={rejectApprovalRef}>
            <FontAwesomeIcon icon={faHandPaper} style={{marginRight: "10px"}} />
            {" "}결재반려된메일{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"()"}
            </span>
          </Link>

          <Link to={LinkTo.emailRequestApproval} ref={requestApprovalRef}>
            <FontAwesomeIcon icon={faCheckDouble} style={{marginRight: "10px"}} />
            {" "}결재요청된메일{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"()"}
            </span>
          </Link>

          <Link to={LinkTo.emailEndApproval} ref={endApprovalRef}>
            <FontAwesomeIcon icon={faFlagCheckered} style={{marginRight: "10px"}} />
            {" "}결재완료된메일{" "}
            <span className="ml-1 float-end" style={tempDisplayNone}>
              {"()"}
            </span>
          </Link>

        </div>

        <Divider />

        <div className="mailbox-option-wrapper">
          <div className="mailbox-volume-placer">
            <span style={{display: "none"}}>
              {`용량: ${props.userData["usedVolume"]} / ${props.userData["totalVolume"]}`}
            </span>
          </div>
          <div className="mailbox-option-placer">
            <FontAwesomeIcon icon={faCogs} size="lg" className="mailbox-option-favicon" style={{cursor: "pointer"}}
            onClick={handleMailboxOptionOpen} />                            
            <MailboxSwitchModal open={mailboxOptionOpen} handleClose={handleMailboxOptionClose}
            showMailboxState={showMailboxState} handleShowMailboxState={handleShowMailboxState} />
          </div>
        </div>

      </Card>


    </React.Fragment>
  )
}

export default withRouter(EmailSideBar)


