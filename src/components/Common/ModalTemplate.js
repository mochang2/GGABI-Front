import React, { useState, useEffect, useRef } from "react"

// tooltip component
import { LightTooltipBorderBlack, MailReservationTooltip } from "./Tooltip"

// mailAPI
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// design
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { styled } from "@mui/material/styles"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { ContentState, convertToRaw, EditorState } from "draft-js"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane, faWindowClose, faCaretDown, faCaretUp, faTimes, faAngleDown } from  "@fortawesome/free-solid-svg-icons"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import { Button as ButtonReact, Col, Form, FormGroup as FormGroupReact, Input as InputReact, Label } from "reactstrap"

// commons
import { sortCmpFuncContact } from "../../pages/Email/CommonFunctions"



const byteFormatter = (byte) => {
  if (byte < 1024) { return byte.toString() + "B"; }
  else if (byte < 1024 * 1024) { return (byte / 1024).toFixed(2) + "KB"; }
  else if (byte < 1024 * 1024 * 1024) { return (byte / (1024 * 1024)).toFixed(2) + "MB"; }
  else { return (byte / (1024 * 1024 * 1024)).toFixed(2) + "GB"; }
}



const mailWriteModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  minHeight: 450,
  bgcolor: "#ffffff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "1rem 1.6rem",
};


const mailWriteModalStyleResponsive = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  minHeight: 450,
  bgcolor: "#ffffff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "0.5rem 0.8rem",
};

const mailReservationTooltipStyle = {
  position: 'absolute',
  bottom: '14%',
  left: '18%',
  bgcolor: 'background.paper',
  border: "1px solid black",
  boxShadow: 24,
  pt: 1,
  px: 2,
  pb: 1.5,
};

const progressCircleStyle = { 
  color: '#fff',
  zIndex: (theme) => theme.zIndex.drawer + 1,
};

const mailboxSwitchModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 280,
  width: "30%",
  bgcolor: "#ffffff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const formControlLabelStyle = {
  '& .css-1x2e00o-MuiSwitch-root': {
    position: "relative",
    right: "20px",
  },
  '& .css-ahj2mt-MuiTypography-root': {
    position: "relative",
    left: "40px",
  },
}


const IOSStyleSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


const Input = styled('input')({
  display: 'none',
});


const employeeManagementModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  minWidth: 400,
  height: 250,
  bgcolor: "#ffffff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const contactModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: 400,
  minHeight: 250,
  bgcolor: "#ffffff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const ModalTemplate = (props) => {
  return (
    <Modal
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box sx={props.style}>
        <Typography id="modal-modal-title" variant={props.modalTitleVariant}
        component={props.modalTitleComponent}>
          {props.modalTitle}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.modalContent}
        </Typography>
      </Box>
    </Modal>
  )
}



export const WriteMailModal = (props) => {

  // resize height
  const CCInputRef = useRef();
  const BCCInputRef = useRef();
  const editorRef = useRef();
  const arrowIconRef = useRef();
  const showCCBCCWrapper = (e) => {
    if (CCInputRef.current.style.display === "none") { 
      CCInputRef.current.style.display = "flex";
      BCCInputRef.current.style.display = "flex";
      arrowIconRef.current.firstChild.style.transform = "rotate(180deg)";
      editorRef.current.wrapper.style.height = "200px";
    }
    else {
      CCInputRef.current.style.display = "none";
      BCCInputRef.current.style.display = "none";
      arrowIconRef.current.firstChild.style.transform = "rotate(0deg)";
      editorRef.current.wrapper.style.height = "276px";
    }
  }



  // input state
  // receiver
  const [receiverState, setReceiverState] = useState(props.receiver);
  const handleReceiverState = (event) => { setReceiverState(event.target.value); }
  // reference
  const [referenceState, setReferenceState] = useState("");
  const handleReferenceState = (event) => { setReferenceState(event.target.value); }
  // hidden reference
  const [hiddenReferenceState, setHiddenReferenceState] = useState("");
  const handleHiddenReferenceState = (event) => { setHiddenReferenceState(event.target.value); }
  // approval
  const [approvalState, setApprovalState] = useState("");
  const handleApprovalState = (event) => { setApprovalState(event.target.value); }

  // subject
  const [subjectState, setSubjectState] = useState(props.subject);
  const handleSubjectState = (event) => { setSubjectState(event.target.value); }
  // attachment
  const attachementInputRef = useRef();
  const [attachmentState, setAttachmentState] = useState(null);   //// TODO: warning(state ?????? x??? ?????? ??????)
  const [attachmentNamesState, setAttachmentNamesState] = useState("");
  const handleAttachmentNameState = (event) => {
    const filesizeSum = Object.values(event.target.files)
    .map((value, index) => { 
      return value.size; 
    })
    .reduce((a,b) => {
      return a + b
    }, 0);

    if (filesizeSum >= 1024 * 1024 * 1024 * 1024) { alert(`???????????? ???????????? ?????? ?????????.`); }
    else {
      if (event.target.files.length !== 0) {
        setAttachmentState(event.target.files);
        setAttachmentNamesState([event.target.files[0].name, event.target.files.length - 1, filesizeSum]);
      }
    }
  }
  const clearAttachmentNameState = (e) => {
    e.preventDefault();
    setAttachmentState(null); // ?????? ???????????? ?????? state
    setAttachmentNamesState(""); // ???????????? ????????? ?????? ?????? state
    attachementInputRef.current.value = null; // input tag ?????????
    attachementInputRef.current.files = null; // input tag ?????????
  }
  // editor
  const [writeMailEditorState, setWriteMailEditorState] = useState(EditorState.createEmpty())
  const onWriteMailEditorStateChange = (writeMailEditorState) => { setWriteMailEditorState(writeMailEditorState); }

  useEffect(() => { // intialize to use reply btn in inbox
    setReceiverState(props.receiver);
    setSubjectState(props.subject);
    setWriteMailEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          htmlToDraft(props.content)
        )
      )
    );
  },[props.receiver, props.subject, props.content])


  // receiver contacts dropdown
  const [anchorElReceiver, setAnchorElReceiver] = useState(null);
  const anchorElReceiverOpen = Boolean(anchorElReceiver);
  const handleAnchorElReceiverOpen = (event) => { setAnchorElReceiver(event.currentTarget); }
  const handleAnchorElReceiveClose = () => { setAnchorElReceiver(null); }
  const appendContactsInReceiver = (event) => { setReceiverState(receiverState + " " + event.target.innerText.split(" ")[1]); }
  // reference contacts dropdown
  const [anchorElReference, setAnchorElReference] = useState(null);
  const anchorElReferenceOpen = Boolean(anchorElReference);
  const handleAnchorElReferenceOpen = (event) => { setAnchorElReference(event.currentTarget); }
  const handleAnchorElReferenceClose = () => { setAnchorElReference(null); }
  const appendContactsInReference = (event) => { setReferenceState(referenceState + " " + event.target.innerText.split(" ")[1]); }
  // hidden reference contacts dropdown
  const [anchorElHiddenReference, setAnchorElHiddenReference] = useState(null);
  const anchorElHiddenReferenceOpen = Boolean(anchorElHiddenReference);
  const handleAnchorElHiddenReferenceOpen = (event) => { setAnchorElHiddenReference(event.currentTarget); }
  const handleAnchorElHiddenReferenceClose = () => { setAnchorElHiddenReference(null); }
  const appendContactsInHiddenReference = (event) => { setHiddenReferenceState(hiddenReferenceState + " " + event.target.innerText.split(" ")[1]); }
  // approval contacts dropdown
  const [anchorElApproval, setAnchorElApproval] = useState(null);
  const anchorElApprovalOpen = Boolean(anchorElApproval);
  const handleAnchorElApprovalOpen = (event) => { setAnchorElApproval(event.currentTarget); }
  const handleAnchorElApprovalClose = () => { setAnchorElApproval(null); }
  const appendContactsInApproval = (event) => { setApprovalState(approvalState + " " + event.target.innerText.split(" ")[1]); }
  // get contacts
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    let tempFixed = [];
    axiosAPI.get(`/api/address/fixed`)
      .then(response => {
        for (let res of response.data) {
          res["email"] = `${res["username"]}@ggabi.co.kr`;
          tempFixed.push(res);
        }
        tempFixed.sort(sortCmpFuncContact);
        setContacts(tempFixed);
      })
      .catch(error => {
        errorLog(error);
      })
  }, [])


  // mailWrite set reservation time
  const [reservationTimeTooltipopen, setReservationTimeTooltipOpen] = useState(false);
  const handleReservationTimeTooltipClose = () => { setReservationTimeTooltipOpen(false); }
  const handleReservationTimeTooltipOpen = () => { setReservationTimeTooltipOpen(true); }
  
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationDateTime, setReservationDateTime] = useState("");   //// TODO: warning(state ?????? x??? ?????? ??????)
  const handleReservationDate = (event) => { setReservationDate(event.target.value); }
  const handleReservationTime = (event) => { setReservationTime(event.target.value); }
  const handleReservationDateTime = () => { 
    setReservationDateTime(`${reservationDate} ${reservationTime}:00`);
    alert(`?????? ????????? ?????????????????????.`);
    handleReservationTimeTooltipClose();
  }


  // backdrop(progress circle)
  const [progressCircleOpen, setProgressCircleOpen] = useState(false);
  const handleProgressCircleOpen = () => { setProgressCircleOpen(true); };
  const handleProgressCircleClose = () => { setProgressCircleOpen(false); };


  // mailWrite submit
  const mailWriteSubmit = (event) => {
    event.preventDefault();

    if (receiverState === "") { alert(`?????? ????????? ????????? ??????????????????.`); }
    else {
      var tempReceiver = receiverState.trim();
      while (tempReceiver.search("  ") !== -1) {
      // ???????????? 2??? ????????? ?????? 1?????? ????????? ?????? 
        tempReceiver = tempReceiver.replaceAll("  ", " ");
      }
      var tempReference = referenceState.trim();
      while (tempReference.search("  ") !== -1) {
        tempReference = tempReference.replaceAll("  ", " ");
      }
      var tempHiddenReference = hiddenReferenceState.trim();
      while (tempHiddenReference.search("  ") !== -1) {
        tempHiddenReference = tempHiddenReference.replaceAll("  ", " ");
      }
      var tempApproval = approvalState.trim();
      while (tempApproval.search("  ") !== -1) {
        tempApproval = tempApproval.replaceAll("  ", " ");
      }
      
      const formData = new FormData();
      formData.append("receiver", tempReceiver.split(" "));  // ???????????? ???????????? ??????
      formData.append("CC", tempReference === "" ? [] : tempReference.split(" "));
      formData.append("BCC", tempHiddenReference === "" ? [] : tempHiddenReference.split(" "));
      formData.append("subject", subjectState);
      formData.append("contents", draftToHtml(convertToRaw(writeMailEditorState.getCurrentContent())));  //HTML??? ?????? // contentsInXML, //
      //"reservation-time": reservationDateTime,  // ?????? ??? ?????? "" ??? ?????????.
      formData.append("approvalCheckMembers", tempApproval === "" ? [] : tempApproval.split(" "));

      if (attachmentState) {
        for (const attachment of attachmentState) {
          formData.append("attachments", attachment);
        }
      }
      else { formData.append("attachments", []); }

      handleProgressCircleOpen();

      axiosAPI.post("/api/mail/send", formData,{
        headers: {
          "Accept": "*/*",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(response => {
          handleProgressCircleClose();
          console.log(response["data"]);
          if (response["data"]["status"] === "fail") { alert(`?????? ????????? ??????????????????.`); }
          else if (response["data"]["status"] === "no member") { alert(`???????????? ?????? ?????????????????????.`); }
          else { alert(`?????? ????????? ?????????????????????.`); }
          props.handleClose();
        })
        .catch(error => {
          handleProgressCircleClose();
          console.log(error);
          if (error.response.status === "413") { alert(`????????? ?????? ????????? ????????? ??? ????????????.`); }
          else alert(`?????? ????????? ??????????????????.`);
        });
    }
  }



  return (
    <Modal open={props.open} onClose={props.handleClose} closeAfterTransition
    aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">

      <Box sx={document.body.offsetWidth > 566 ? mailWriteModalStyle : mailWriteModalStyleResponsive}>
        <div>

          <div className="write-mail-modal-inputs-wrapper">
            <label className="show-CC-BCC-wrapper" htmlFor="receiver" onClick={showCCBCCWrapper}>
              <b>?????? ??????</b>
              <span className="show-CC-BCC-span" ref={arrowIconRef}>
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
            </label>
            <input type="email" className="write-mail-modal-inputs" 
            placeholder="??? ??? ????????? ?????? ??????????????? ??????" name="receiver" 
            value={receiverState} onChange={handleReceiverState} />
            <span className="write-mail-modal-show-contacts" onClick={handleAnchorElReceiverOpen}>
              <FontAwesomeIcon icon={faCaretDown} />
            </span>

            <Menu id="basic-menu" anchorEl={anchorElReceiver} open={anchorElReceiverOpen} onClose={handleAnchorElReceiveClose}
            MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}>
              {contacts.map((value, index) => {
                return (
                  <MenuItem key={index} onClick={appendContactsInReceiver}>
                    {`${value.nickname} ${value.email}`}
                  </MenuItem>
                )
              })}
            </Menu>
          </div>

          <div className="write-mail-modal-inputs-wrapper" ref={CCInputRef} style={{display: "none"}}>
            <label htmlFor="reference" className="write-mail-modal-inputs-label">??????</label>
            <input type="email" className="write-mail-modal-inputs"
            placeholder="??? ??? ????????? ?????? ??????????????? ??????" name="reference" 
            value={referenceState} onChange={handleReferenceState} />
            <span className="write-mail-modal-show-contacts" onClick={handleAnchorElReferenceOpen}>
              <FontAwesomeIcon icon={faCaretDown} />
            </span>

            <Menu id="basic-menu" anchorEl={anchorElReference} open={anchorElReferenceOpen} onClose={handleAnchorElReferenceClose}
            MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}>
              {contacts.map((value, index) => {
                return (
                  <MenuItem key={index} onClick={appendContactsInReference}>
                    {`${value.nickname} ${value.email}`}
                  </MenuItem>
                )
              })}
            </Menu>
          </div>

          <div className="write-mail-modal-inputs-wrapper" ref={BCCInputRef} style={{display: "none"}}>
            <label htmlFor="hidden-reference" className="write-mail-modal-inputs-label">?????? ??????</label>
            <input type="email" className="write-mail-modal-inputs"
            placeholder="??? ??? ????????? ?????? ??????????????? ??????" name="hidden-reference" 
            value={hiddenReferenceState} onChange={handleHiddenReferenceState} />
            <span className="write-mail-modal-show-contacts" onClick={handleAnchorElHiddenReferenceOpen}>
              <FontAwesomeIcon icon={faCaretDown} />
            </span>

            <Menu id="basic-menu" anchorEl={anchorElHiddenReference} open={anchorElHiddenReferenceOpen} onClose={handleAnchorElHiddenReferenceClose}
            MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}>
              {contacts.map((value, index) => {
                return (
                  <MenuItem key={index} onClick={appendContactsInHiddenReference}>
                    {`${value.nickname} ${value.email}`}
                  </MenuItem>
                )
              })}
            </Menu>
          </div>

          <div className="write-mail-modal-inputs-wrapper">
            <label htmlFor="mail-approval"><b>?????????</b></label>
            <input type="email" className="write-mail-modal-inputs"
            placeholder="??? ??? ????????? ?????? ??????????????? ??????" name="hidden-reference"
            value={approvalState} onChange={handleApprovalState} />
            <span className="write-mail-modal-show-contacts" onClick={handleAnchorElApprovalOpen}>
              <FontAwesomeIcon icon={faCaretDown} />
            </span>

            <Menu id="basic-menu" anchorEl={anchorElApproval} open={anchorElApprovalOpen} onClose={handleAnchorElApprovalClose}
            MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}>
              {contacts.map((value, index) => {
                return (
                  <MenuItem key={index} onClick={appendContactsInApproval}>
                    {`${value.nickname} ${value.email}`}
                  </MenuItem>
                )
              })}
            </Menu>
          </div>

          <div className="write-mail-modal-inputs-wrapper">
            <label htmlFor="subject"><b>??????</b></label>
            <input type="text" className="write-mail-modal-inputs"
            name="subject" 
            value={subjectState} onChange={handleSubjectState} />
          </div>

          <div className="write-mail-modal-file-inputs-wrapper">
            <label htmlFor="attached-files" >
              <Input type="file" multiple id="attached-files" onChange={handleAttachmentNameState} ref={attachementInputRef} />
              <Button variant="contained" component="span" 
              sx={{marginTop:"5px", maxHeight:"25px"}}>
                ?????? ??????
              </Button>
              <span className="write-mail-modal-attachment-info" id="write-mail-modal-attachment-info">       
                {attachmentNamesState ?
                ` ${attachmentNamesState[0]} ??? ${attachmentNamesState[1]}??? ????????? (??? ??????: ${byteFormatter(attachmentNamesState[2])})`:
                "???????????? ??????(?????? 2GB?????? ?????? ??????)"
                }
                {attachmentNamesState ?
                <ButtonReact outline color="secondary" onClick={clearAttachmentNameState}
                style={{marginLeft: "0.2rem", padding: "0.2rem 0.5rem"}}>
                  <FontAwesomeIcon icon={faTimes} />
                </ButtonReact>
                :
                ""
                }
              </span>
            </label>
          </div>

          <Editor wrapperClassName="write-mail-editor-wrapper" // ???????????? ?????? ????????? ???????????? ?????????
          editorClassName="write-mail-editor" // ????????? ????????? ????????? ?????????
          toolbarClassName="toolbar-class" // ?????? ????????? ????????? ?????????
          toolbar={{ // ?????? ??????
            // inDropdown: ?????? ????????? ????????? ????????? ?????????????????? ??????????????????
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: false },
          }} 
          placeholder="????????? ??????????????????." localization={{ locale: 'ko' }} ref={editorRef}
          editorState={writeMailEditorState} onEditorStateChange={onWriteMailEditorStateChange} />

          <div className="d-flex write-mail-modal-bottom-wrapper">
            <div className="write-mail-reservation-time-wrapper">
              <ButtonGroup variant="outlined"
              onClick={handleReservationTimeTooltipOpen}>
                <Button>
                  ??????
                </Button>
                <Button style={{padding: "6px", minWidth: "12px"}}>
                  {reservationTimeTooltipopen ?
                  <FontAwesomeIcon icon={faCaretUp} /> :
                  <FontAwesomeIcon icon={faCaretDown} />}
                </Button>
              </ButtonGroup>

              <Modal hideBackdrop open={reservationTimeTooltipopen} onClose={handleReservationTimeTooltipClose}
               BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
                <Box sx={mailReservationTooltipStyle} id="mail-reservation-tooltip">
                  <MailReservationTooltip onClose={handleReservationTimeTooltipClose} 
                  reservationDate={reservationDate} handleReservationDate={handleReservationDate}
                  reservationTime={reservationTime} handleReservationTime={handleReservationTime}
                  handleReservationDateTime={handleReservationDateTime} />
                </Box>
              </Modal>
            </div>

            <div className="write-mail-btn-wrapper">
              <div className="write-mail-cancel-btn-wrapper" onClick={props.handleClose}>
                <div className="write-mail-cancel-btn">
                  ??????      
                  <FontAwesomeIcon icon={faWindowClose} style={{marginLeft: "0.4rem"}} />
                </div>
              </div>
              <div className="write-mail-send-btn-wrapper" >
                <button className="write-mail-send-btn" onClick={mailWriteSubmit}>
                  ?????????
                  <FontAwesomeIcon icon={faPaperPlane} style={{marginLeft: "0.4rem"}} />
                </button>
                <Backdrop sx={progressCircleStyle}
                open={progressCircleOpen} onClick={handleProgressCircleClose}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
            </div>
          </div>

        </div>
      </Box>

    </Modal>
  )
}

export const WriteMailToMeModal = (props) => {

  // resize height
  const CCInputRef = useRef();
  const BCCInputRef = useRef();
  const editorRef = useRef();
  const arrowIconRef = useRef();
  const showCCBCCWrapper = (e) => {
    if (CCInputRef.current.style.display === "none") { 
      CCInputRef.current.style.display = "flex";
      BCCInputRef.current.style.display = "flex";
      arrowIconRef.current.firstChild.style.transform = "rotate(180deg)";
      editorRef.current.wrapper.style.height = "200px";
    }
    else {
      CCInputRef.current.style.display = "none";
      BCCInputRef.current.style.display = "none";
      arrowIconRef.current.firstChild.style.transform = "rotate(0deg)";
      editorRef.current.wrapper.style.height = "276px";
    }
  }

  
  // input state
  // receiver(me)
  const [receiverState,] = useState(props.userMail);
  // reference
  const [referenceState, setReferenceState] = useState("");
  const handleReferenceState = (event) => { setReferenceState(event.target.value); }
  // hidden reference
  const [hiddenReferenceState, setHiddenReferenceState] = useState("");
  const handleHiddenReferenceState = (event) => { setHiddenReferenceState(event.target.value); }
  // approval
  const [approvalState, setApprovalState] = useState("");
  const handleApprovalState = (event) => { setApprovalState(event.target.value); }

  // subject
  const [subjectState, setSubjectState] = useState("");
  const handleSubjectState = (event) => { setSubjectState(event.target.value); }
  // attachment
  const attachementInputRef = useRef();
  const [attachmentState, setAttachmentState] = useState(null);   //// TODO: warning(state ?????? x??? ?????? ??????)
  const [attachmentNamesState, setAttachmentNamesState] = useState("");
  const handleAttachmentNameState = (event) => {
    const filesizeSum = Object.values(event.target.files)
    .map((value, index) => { 
      return value.size; 
    })
    .reduce((a,b) => {
      return a + b
    }, 0);

    if (filesizeSum >= 1024 * 1024 * 1024 * 1024) { alert(`???????????? ???????????? ?????? ?????????.`); }
    else {
      if (event.target.files.length !== 0) {
        setAttachmentState(event.target.files);
        setAttachmentNamesState([event.target.files[0].name, event.target.files.length - 1, filesizeSum]);
      }
    }
  }
  const clearAttachmentNameState = (e) => {
    e.preventDefault();
    setAttachmentState(null); // ?????? ???????????? ?????? state
    setAttachmentNamesState(""); // ???????????? ????????? ?????? ?????? state
    attachementInputRef.current.value = null; // input tag ?????????
    attachementInputRef.current.files = null; // input tag ?????????
  }


  // reference contacts dropdown
  const [anchorElReference, setAnchorElReference] = useState(null);
  const anchorElReferenceOpen = Boolean(anchorElReference);
  const handleAnchorElReferenceOpen = (event) => { setAnchorElReference(event.currentTarget); }
  const handleAnchorElReferenceClose = () => { setAnchorElReference(null); }
  const appendContactsInReference = (event) => { setReferenceState(referenceState + " " + event.target.innerText.split(" ")[1]); }
  // hidden reference contacts dropdown
  const [anchorElHiddenReference, setAnchorElHiddenReference] = useState(null);
  const anchorElHiddenReferenceOpen = Boolean(anchorElHiddenReference);
  const handleAnchorElHiddenReferenceOpen = (event) => { setAnchorElHiddenReference(event.currentTarget); }
  const handleAnchorElHiddenReferenceClose = () => { setAnchorElHiddenReference(null); }
  const appendContactsInHiddenReference = (event) => { setHiddenReferenceState(hiddenReferenceState + " " + event.target.innerText.split(" ")[1]); }
  // approval contacts dropdown
  const [anchorElApproval, setAnchorElApproval] = useState(null);
  const anchorElApprovalOpen = Boolean(anchorElApproval);
  const handleAnchorElApprovalOpen = (event) => { setAnchorElApproval(event.currentTarget); }
  const handleAnchorElApprovalClose = () => { setAnchorElApproval(null); }
  const appendContactsInApproval = (event) => { setApprovalState(approvalState + " " + event.target.innerText.split(" ")[1]); }
  // get contacts
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    let tempFixed = [];
    axiosAPI.get(`/api/address/fixed`)
      .then(response => {
        for (let res of response.data) {
          res["email"] = `${res["username"]}@ggabi.co.kr`;
          tempFixed.push(res);
        }
        tempFixed.sort(sortCmpFuncContact);
        setContacts(tempFixed);
      })
      .catch(error => {
        errorLog(error);
      })
  }, [])


  // editor
  const [writeMailEditorState, setWriteMailEditorState] = useState(EditorState.createEmpty());
  const onWriteMailEditorStateChange = (writeMailEditorState) => { setWriteMailEditorState(writeMailEditorState); }


  // mailWrite set reservation time
  const [reservationTimeTooltipopen, setReservationTimeTooltipOpen] = useState(false);
  const handleReservationTimeTooltipClose = () => { setReservationTimeTooltipOpen(false); }
  const handleReservationTimeTooltipOpen = () => { setReservationTimeTooltipOpen(true); }

  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationDateTime, setReservationDateTime] = useState("");   //// TODO: warning(state ?????? x??? ?????? ??????)
  const handleReservationDate = (event) => { setReservationDate(event.target.value); }
  const handleReservationTime = (event) => { setReservationTime(event.target.value); }
  const handleReservationDateTime = () => { 
    setReservationDateTime(`${reservationDate} ${reservationTime}:00`);
    alert(`?????? ????????? ?????????????????????.`);
    handleReservationTimeTooltipClose();
  }


  // backdrop(progress circle)
  const [progressCircleOpen, setProgressCircleOpen] = useState(false);
  const handleProgressCircleOpen = () => { setProgressCircleOpen(true); };
  const handleProgressCircleClose = () => { setProgressCircleOpen(false); };

  
  // TODO: mail submit
  const mailWriteSubmit = (event) => {
    event.preventDefault();

    var tempReference = referenceState.trim();
    while (tempReference.search("  ") !== -1) {
      // ???????????? 2??? ????????? ?????? 1?????? ????????? ?????? 
      tempReference = tempReference.replaceAll("  ", " ");
    }
    var tempHiddenReference = hiddenReferenceState.trim();
    while (tempHiddenReference.search("  ") !== -1) {
      tempHiddenReference = tempHiddenReference.replaceAll("  ", " ");
    }
    var tempApproval = approvalState.trim();
    while (tempApproval.search("  ") !== -1) {
      tempApproval = tempApproval.replaceAll("  ", " ");
    }

    const formData = new FormData();
    formData.append("receiver", [`${localStorage.getItem("user")}@ggabi.co.kr`]);
    formData.append("CC", tempReference === "" ? [] : tempReference.split(" "));
    formData.append("BCC", tempHiddenReference === "" ? [] : tempHiddenReference.split(" "));
    formData.append("subject", subjectState);
    formData.append("contents", draftToHtml(convertToRaw(writeMailEditorState.getCurrentContent())));  //HTML??? ?????? // contentsInXML, //
    //"reservation-time": reservationDateTime,  // ?????? ??? ?????? "" ??? ?????????.
    formData.append("approvalCheckMembers", tempApproval === "" ? [] : tempApproval.split(" "));

    if (attachmentState) {
      for (const attachment of attachmentState) {
        formData.append("attachments", attachment);
      }
    }
    else { formData.append("attachments", []); }

    handleProgressCircleOpen();

    axiosAPI.post("/api/mail/send", formData,{
      headers: {
        "Accept": "*/*",
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response => {
      handleProgressCircleClose();
      console.log(response["data"]);
      if (response["data"]["status"] === "fail") { alert(`?????? ????????? ??????????????????.`); }
      else if (response["data"]["status"] === "no member") { alert(`???????????? ?????? ?????????????????????.`); }
      else { alert(`?????? ????????? ?????????????????????.`); }
      props.handleClose();
    })
      .catch(error => {
        handleProgressCircleClose();
        console.log(error);
        if (error.response.status === "413") { alert(`????????? ?????? ????????? ????????? ??? ????????????.`); }
        else alert(`?????? ????????? ??????????????????.`);
      });
  }



  return (
    <Modal open={props.open} onClose={props.handleClose}
    aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">

      <Box sx={document.body.offsetWidth > 566 ? mailWriteModalStyle : mailWriteModalStyleResponsive}>
        <div>

            <Typography sx={{display:"none"}}>
              <label htmlFor="receiver">?????? ??????</label>
              <input type="email" className="write-mail-modal-inputs" 
              name="receiver" value={receiverState} />
            </Typography>

            <div className="write-mail-modal-inputs-wrapper">
              <label className="show-CC-BCC-wrapper" htmlFor="receiver" onClick={showCCBCCWrapper}>
                <b>?????????</b>
                <span className="show-CC-BCC-span" ref={arrowIconRef}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
              </label>
              <input type="email" className="write-mail-modal-inputs"
              placeholder="??? ??? ????????? ?????? ??????????????? ??????" name="hidden-reference"
              value={approvalState} onChange={handleApprovalState} />
              <span className="write-mail-modal-show-contacts" onClick={handleAnchorElApprovalOpen}>
                <FontAwesomeIcon icon={faCaretDown} />
              </span>

              <Menu id="basic-menu" anchorEl={anchorElApproval} open={anchorElApprovalOpen} onClose={handleAnchorElApprovalClose}
              MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
              transformOrigin={{vertical: 'top', horizontal: 'right'}}>
                {contacts.map((value, index) => {
                  return (
                    <MenuItem key={index} onClick={appendContactsInApproval}>
                      {`${value.nickname} ${value.email}`}
                    </MenuItem>
                  )
                })}
              </Menu>
            </div>

            <div className="write-mail-modal-inputs-wrapper" ref={CCInputRef} style={{display: "none"}}>
              <label htmlFor="reference" className="write-mail-modal-inputs-label">??????</label>
              <input type="email" className="write-mail-modal-inputs"
              placeholder="??? ??? ????????? ?????? ??????????????? ??????" name="reference" 
              value={referenceState} onChange={handleReferenceState} />
              <span className="write-mail-modal-show-contacts" onClick={handleAnchorElReferenceOpen}>
                <FontAwesomeIcon icon={faCaretDown} />
              </span>

              <Menu id="basic-menu" anchorEl={anchorElReference} open={anchorElReferenceOpen} onClose={handleAnchorElReferenceClose}
              MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
              transformOrigin={{vertical: 'top', horizontal: 'right'}}>
                {contacts.map((value, index) => {
                  return (
                    <MenuItem key={index} onClick={appendContactsInReference}>
                      {`${value.nickname} ${value.email}`}
                    </MenuItem>
                  )
                })}
              </Menu>
            </div>

            <div className="write-mail-modal-inputs-wrapper" ref={BCCInputRef} style={{display: "none"}}>
              <label htmlFor="hidden-reference" className="write-mail-modal-inputs-label">?????? ??????</label>
              <input type="email" className="write-mail-modal-inputs"
              placeholder="??? ??? ????????? ?????? ??????????????? ??????" name="hidden-reference" 
              value={hiddenReferenceState} onChange={handleHiddenReferenceState} />
              <span className="write-mail-modal-show-contacts" onClick={handleAnchorElHiddenReferenceOpen}>
                <FontAwesomeIcon icon={faCaretDown} />
              </span>

              <Menu id="basic-menu" anchorEl={anchorElHiddenReference} open={anchorElHiddenReferenceOpen} onClose={handleAnchorElHiddenReferenceClose}
              MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
              transformOrigin={{vertical: 'top', horizontal: 'right'}}>
                {contacts.map((value, index) => {
                  return (
                  <MenuItem key={index} onClick={appendContactsInHiddenReference}>
                    {`${value.nickname} ${value.email}`}
                  </MenuItem>
                  )
                })}
              </Menu>
            </div>

            <div className="write-mail-modal-inputs-wrapper">
              <label htmlFor="subject"><b>??????</b></label>
              <input type="text" className="write-mail-modal-inputs"
              name="subject" 
              value={subjectState} onChange={handleSubjectState} />
            </div>

            <div className="write-mail-modal-file-inputs-wrapper">
              <label htmlFor="attached-files" >
                <Input type="file" multiple id="attached-files" onChange={handleAttachmentNameState} ref={attachementInputRef} />
                <Button variant="contained" component="span" 
                sx={{marginTop:"5px", maxHeight:"25px"}}>
                  ?????? ??????
                </Button>
                <span className="write-mail-modal-attachment-info" id="write-mail-modal-attachment-info">       
                  {attachmentNamesState ?
                  ` ${attachmentNamesState[0]} ??? ${attachmentNamesState[1]}??? ????????? (??? ??????: ${byteFormatter(attachmentNamesState[2])})`:
                  "???????????? ??????(?????? 2GB?????? ?????? ??????)"
                  }
                  {attachmentNamesState ?
                  <ButtonReact outline color="secondary" onClick={clearAttachmentNameState}
                  style={{marginLeft: "0.2rem", padding: "0.2rem 0.5rem"}}>
                    <FontAwesomeIcon icon={faTimes} />
                  </ButtonReact>
                  :
                  ""
                  }
                </span>
              </label>
            </div>

            <Editor wrapperClassName="write-mail-editor-wrapper" // ???????????? ?????? ????????? ???????????? ?????????
            editorClassName="write-mail-editor" // ????????? ????????? ????????? ?????????
            toolbarClassName="toolbar-class" // ?????? ????????? ????????? ?????????
            toolbar={{ // ?????? ??????
              // inDropdown: ?????? ????????? ????????? ????????? ?????????????????? ??????????????????
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: false },
            }} 
            placeholder="????????? ??????????????????." localization={{ locale: 'ko' }} ref={editorRef}
            editorState={writeMailEditorState} onEditorStateChange={onWriteMailEditorStateChange} />


            <div className="d-flex write-mail-modal-bottom-wrapper">
              <div className="write-mail-reservation-time-wrapper">
                <LightTooltipBorderBlack onClose={handleReservationTimeTooltipClose} open={reservationTimeTooltipopen}
                disableFocusListener disableHoverListener disableTouchListener placement="right-end"
                title={
                  <MailReservationTooltip onClose={handleReservationTimeTooltipClose} 
                  reservationDate={reservationDate} handleReservationDate={handleReservationDate}
                  reservationTime={reservationTime} handleReservationTime={handleReservationTime}
                  handleReservationDateTime={handleReservationDateTime} />
                }>
                  <ButtonGroup variant="outlined"
                  onClick={handleReservationTimeTooltipOpen}>
                    <Button>
                      ??????
                    </Button>
                    <Button style={{padding: "6px", minWidth: "12px"}}>
                      {reservationTimeTooltipopen ?
                      <FontAwesomeIcon icon={faCaretUp} /> :
                      <FontAwesomeIcon icon={faCaretDown} />
                      }
                    </Button>
                  </ButtonGroup>
                </LightTooltipBorderBlack>
              </div>

              <div className="write-mail-btn-wrapper">
                <div className="write-mail-cancel-btn-wrapper" onClick={props.handleClose}>
                  <div className="write-mail-cancel-btn">
                    ??????
                    <FontAwesomeIcon icon={faWindowClose} style={{marginLeft: "0.4rem"}}/>
                  </div>
                </div>
                <div className="write-mail-send-btn-wrapper" >
                  <button className="write-mail-send-btn" onClick={mailWriteSubmit}>
                    ?????????
                    <FontAwesomeIcon icon={faPaperPlane} style={{marginLeft: "0.4rem"}} />
                  </button>
                  <Backdrop sx={progressCircleStyle}
                  open={progressCircleOpen} onClick={handleProgressCircleClose}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </div>
              </div>
            </div>
            
        </div>
      </Box>

    </Modal>
  )
}


export const MailboxSwitchModal = (props) => {

  return (
    <Modal open={props.open} onClose={props.handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={mailboxSwitchModalStyle}>

        <Typography variant="h6" component="h2" sx={{ mb: 2 }} align="center">
          ???????????? on/off ?????????
        </Typography>

        <Typography id="modal-modal-description" align="center">
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;????????????" sx={{display: "none"}} 
              control={<IOSStyleSwitch checked={props.showMailboxState.wholebox}
              onChange={props.handleShowMailboxState} name="wholebox" />} />

              <FormControlLabel label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;????????????" sx={formControlLabelStyle} 
              control={<IOSStyleSwitch checked={props.showMailboxState.inbox}
              onChange={props.handleShowMailboxState} name="inbox" />} />

              <FormControlLabel label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;????????????" sx={{display: "none"}}  
              control={<IOSStyleSwitch checked={props.showMailboxState.importantbox}
              onChange={props.handleShowMailboxState} name="importantbox" />} />

              <FormControlLabel label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;????????????" sx={formControlLabelStyle} 
              control={<IOSStyleSwitch checked={props.showMailboxState.sentbox}
              onChange={props.handleShowMailboxState} name="sentbox" />} />

              <FormControlLabel label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;????????????" sx={{display: "none"}} 
              control={<IOSStyleSwitch checked={props.showMailboxState.reservationbox}
              onChange={props.handleShowMailboxState} name="reservationbox" />} />

              <FormControlLabel label="&nbsp;???????????????" sx={{display: "none"}} 
              control={<IOSStyleSwitch checked={props.showMailboxState.fromtomebox}
              onChange={props.handleShowMailboxState} name="fromtomebox" />} />

              <FormControlLabel label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;????????????" sx={{display: "none"}} 
              control={<IOSStyleSwitch checked={props.showMailboxState.temporarybox}
              onChange={props.handleShowMailboxState} name="temporarybox" />} />

              <FormControlLabel label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?????????" sx={{display: "none"}} 
              control={<IOSStyleSwitch checked={props.showMailboxState.trashbox}
              onChange={props.handleShowMailboxState} name="trashbox" />} />

              <FormControlLabel label="&nbsp;&nbsp;??????????????????" sx={formControlLabelStyle} 
              control={<IOSStyleSwitch checked={props.showMailboxState.waitbox}
              onChange={props.handleShowMailboxState} name="waitbox" />} />

              <FormControlLabel label="?????????????????????" sx={formControlLabelStyle} 
              control={<IOSStyleSwitch checked={props.showMailboxState.rejectbox}
              onChange={props.handleShowMailboxState} name="rejectbox" />} />

              <FormControlLabel label="?????????????????????" sx={formControlLabelStyle} 
              control={<IOSStyleSwitch checked={props.showMailboxState.requestbox}
              onChange={props.handleShowMailboxState} name="requestbox" />} />

              <FormControlLabel label="?????????????????????" sx={formControlLabelStyle} 
              control={<IOSStyleSwitch checked={props.showMailboxState.endbox}
              onChange={props.handleShowMailboxState} name="endbox" />} />

            </FormGroup>
          </FormControl>
        </Typography>
      </Box>
    </Modal>
  )
}



export const EmployeeManagementModal = (props) => {

  return (
    <Modal open={props.open} onClose={props.handleClose}
    aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">

      <Box sx={employeeManagementModalStyle}>
        <div>

          <Typography id="modal-modal-title" variant="h6">
            {props.modalTitle}
          </Typography>
          <Typography id="modal-modal-description">
            {props.modalContent}
          </Typography>

          <div className="form-inputs-select-btn-wrapper d-flex">
            <div className="left-wrapper">
              <select value={props.selectOption} onChange={props.handleSelectOption}>
                <option value="">--???????????????--</option>
                {props.selectionList.map((option) => {
                  return (
                    <option value={option}>{option}</option>
                  )
                })}
              </select>
              <span><FontAwesomeIcon icon={faCaretDown} /></span>
            </div>

            <div className="right-wrapper btn-wrapper d-flex">
              <Button onClick={props.handleAgreement} className="submit-btn" color="success">
                ??????
              </Button>
              <Button onClick={props.handleClose} className="cancel-btn" color="error">
                ??????
              </Button>
            </div>
          </div>

        </div>
      </Box>

    </Modal>
  )
}



export const ContactModal = (props) => {
  
  return (
    <Modal open={props.open} onClose={props.handleClose}
    aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">

      <Box sx={contactModalStyle}>
        <div>

          <Typography id="modal-modal-title" variant="h6" className="mb-2">
            {props.modalTitle}
          </Typography>

          <div className="form-inputs-select-btn-wrapper">
            <div className="form-inputs-wrapper">
              <Form>
                <FormGroupReact row>
                  <Label for="nickname" sm={2}>
                    ??? ???
                  </Label>
                  <Col sm={10}>
                    <InputReact id="nickname" type="text" placeholder="?????? ?????????" className="num-font-initial"
                    value={props.nicknameValue} onChange={props.handleNicknameValue} />
                  </Col>
                </FormGroupReact>

                <FormGroupReact row>
                  <Label for="company" sm={2}>
                    ??? ???
                  </Label>
                  <Col sm={10}>
                    <InputReact id="company" type="text" className="num-font-initial"
                    value={props.companyValue} onChange={props.handleCompanyValue} />
                  </Col>
                </FormGroupReact>

                <FormGroupReact row>
                  <Label for="department" sm={2}>
                    ??? ???
                  </Label>
                  <Col sm={10}>
                    <InputReact id="department" type="text" className="num-font-initial"
                    value={props.departmentValue} onChange={props.handleDepartmentValue} />
                  </Col>
                </FormGroupReact>

                <FormGroupReact row>
                  <Label for="position" sm={2}>
                    ??? ???
                  </Label>
                  <Col sm={10}>
                    <InputReact id="position" type="text" className="num-font-initial"
                    value={props.positionValue} onChange={props.handlePositionValue} />
                  </Col>
                </FormGroupReact>

                <FormGroupReact row>
                  <Label for="phone" sm={2}>
                    ??? ???
                  </Label>
                  <Col sm={10}>
                    <InputReact id="phone" type="tel" placeholder="-?????? ??????(??????X)" className="num-font-initial"
                    value={props.phoneValue} onChange={props.handlePhoneValue} />
                  </Col>
                </FormGroupReact>

                <FormGroupReact row>
                  <Label for="email" sm={2}>
                    ??? ??? ???
                  </Label>
                  <Col sm={10}>
                    <InputReact id="email" type="email" placeholder="@???????????? ??????" className="num-font-initial"
                    value={props.emailValue} onChange={props.handleEmailValue} />
                  </Col>
                </FormGroupReact>
              </Form>
            </div>

            <div className="btn-wrapper float-end mt-2">
              <Button onClick={props.handleAgreement} className="submit-btn" color="success">
                {props.action}
              </Button>
              <Button onClick={props.handleClose} className="cancel-btn" color="error">
                ??????
              </Button>
            </div>
          </div>

        </div>
      </Box>

    </Modal>
  )
}


export default ModalTemplate