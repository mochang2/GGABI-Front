import React , { useState, useEffect } from "react"
import { Container, Row, Col, Card, CardBody, Media } from "reactstrap"
import { Link, withRouter } from "react-router-dom"

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// import Email Sidebar
import EmailSideBar from "./EmailSidebar"

// write mail modal
import { WriteMailModal } from "../../components/Common/ModalTemplate"

// dialog component
import DialogTemplate from "../../components/Common/DialogTemplate"

// design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileDownload, faReply, faReplyAll, 
  faCaretUp, faCaretDown, faTrashAlt, faBan } from "@fortawesome/free-solid-svg-icons"
import LinkTo from "../../routes/LinkTo"
import { Menu, MenuItem } from "@mui/material"
import { SRCDropdownStyle } from "./CommonStyles"

// formatter
import dayjs from "dayjs" // date
import { ChangeTagInMailContent } from "./CommonFunctions" // html content
import { formatSize } from "./CommonFunctions" // attachment size

// common functions
import { checkAsImportantMail, handleOnMouseLeave, handleOnMouseOver } from "./CommonFunctions"

// prevent XSS from html string
import DOMPurify from "dompurify"



const EmailSentboxRead = (props) => {  

  // mail basic info
  const mailId = document.location.href.split("/").at(-1);
  const [mailData, setMailData] = useState("");  // 처음 렌더링 될 때 에러를 방지하기 위해 undefined가 아닌 빈 스트링 넣어주기
  const previousMailMetaData = {
    "id": 1, "from": "sender@ggabi.co.kr", "to": "receiver@ggabi.co.kr", "subject": "제목입니다", "date": "2021-10-11 21:28:01"
  }
  const nextMailMetaData = {
    "id": 3, "from": "sender@ggabi.co.kr", "to": "receiver@ggabi.co.kr", "subject": "제목입니다히히", "date": "2021-10-11 21:29:01"
  }

  useEffect(() => {
    axiosAPI.get(`/api/mail/Sent/${mailId}`)
      .then(response => {
        var temp = response.data;
        setMailData(temp);
      })
      .catch(error => {
        errorLog(error);
      })
  },[mailId])

  
  // sender dropdown open
  const [anchorElSender, setAnchorElSender] = useState(null);
  const anchorElSenderOpen = Boolean(anchorElSender);
  const handleAnchorElSenderOpen = (event) => { setAnchorElSender(event.currentTarget); }
  const handleAnchorElSenderClose = () => { setAnchorElSender(null); }

  // receiver dropdown open
  const [anchorElReceiver, setAnchorElReceiver] = useState(null);
  const [receiverMailAddress, setReceiverMailAddress] = useState("");
  const anchorElReceiverOpen = Boolean(anchorElReceiver);
  const handleAnchorElReceiverOpen = (event) => {
    setAnchorElReceiver(event.currentTarget);
    setReceiverMailAddress(event.currentTarget.innerText);
  }
  const handleAnchorElReceiverClose = () => { setAnchorElReceiver(null); }

  // CC dropdown open
  const [anchorElCC, setAnchorElCC] = useState(null);
  const [CCMailAddress, setCCMailAddress] = useState("");
  const anchorElCCOpen = Boolean(anchorElCC);
  const handleAnchorElCCOpen = (event) => {
    setAnchorElCC(event.currentTarget);
    setCCMailAddress(event.currentTarget.innerText);
  }
  const handleAnchorElCCClose = () => { setAnchorElCC(null); }


  // download attachments
  const downloadAttachment = (e, value) => {
    axiosAPI.get(mailData["file"][value]["url"], {
      responseType: "blob"
    })
      .then(res => {
        const blob = new Blob([res.data], {type: res.headers["Content-Type"]});
        const fileName = decodeURIComponent(decodeURI(value).replace(/%2B/g, " "));

        if (window.navigator.msSaveOrOpenBlob) { // IE blob 분기 처리 에러 해결
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        }
        else {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);  // blob 객체의 url 생성
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch(error => {
        errorLog(error);
      })
  }



  // delete a mail
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);
  const deletionDialogTitle = `메일을 삭제하시겠습니까?`;
  const handleDeletionDialogOpen = () => { setDeletionDialogOpen(true); }
  const handleDeletionDialogClose = () => { setDeletionDialogOpen(false); }
  const handleDeletionAgree = (event) => {
    axiosAPI.delete("/api/mail/Sent", {
      data: {
        "mailIdList": [document.location.pathname.split("/").at(-1)],
      }
    })
      .then(response => {
        if (response.data["status"] === "success") {
          handleDeletionDialogClose();
          props.history.push(LinkTo.emailSentbox);
        }
        else { 
          alert(`메일 삭제에 실패했습니다.`);
          handleDeletionDialogClose();
        }
      })
      .catch(error => {
        errorLog(error);
        alert(`메일 삭제에 실패했습니다.`);
        handleDeletionDialogClose();
      })
  }


  // write a mail
  const [mailToReceiverModalOpen, setMailToReceiverModalOpen] = useState(false);
  const [mailToCCModalOpen, setMailToCCModalOpen] = useState(false);

  const handleMailToReceiverModalOpen = () => { setMailToReceiverModalOpen(true); }
  const handleMailToReceiverModalClose = () => { setMailToReceiverModalOpen(false); }

  const handleMailToCCModalOpen = () => { setMailToCCModalOpen(true); }
  const handleMailToCCModalClose = () => { setMailToCCModalOpen(false); }


  const [replyToMailModalOpen, setReplyToMailModalOpen] = useState(false);
  const [deliverMailModalOpen, setDeliverMailModalOpen] = useState(false);

  const handleReplyToMailModalOpen = () => { setReplyToMailModalOpen(true); }
  const handleReplyToMailModalClose = () => { setReplyToMailModalOpen(false); }

  const handleDeliverMailModalOpen = () => { setDeliverMailModalOpen(true); }
  const handleDeliverMailModalClose = () => { setDeliverMailModalOpen(false); }



  return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col xs="12">
              {/* Render Email SideBar */}
              <EmailSideBar userData={props.userData}/>

              {mailData === "" ?
              "" :
              <div className="email-rightbar mb-3">
                <Card>

                  <CardBody>
                    <Media className="d-flex mb-4">
                      <Media body style={{marginRight: "0.5rem"}}>
                        <span className="star-toggle far fa-star" style={{cursor: "pointer"}} onClick={checkAsImportantMail} />
                      </Media>
                      <Media body className="flex-1" style={{width: "100%"}}>
                        <h5 className="font-size-14 my-1 d-flex">
                          제목: &nbsp;&nbsp;<b>{mailData["subject"]}</b>
                        </h5>

                        <small className="text-muted" onClick={handleAnchorElSenderOpen} style={{cursor: "pointer"}}
                        onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
                          발신자: &nbsp;{mailData["from"]}
                        </small>
                        <Menu id="basic-menu" anchorEl={anchorElSender} open={anchorElSenderOpen} onClose={handleAnchorElSenderClose}
                        MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        transformOrigin={{vertical: 'top', horizontal: 'right'}} 
                        sx={{'& .css-6hp17o-MuiList-root-MuiMenu-list' : {border: "0.5px solid black", padding: "4px 0"}}}>
                          <MenuItem sx={SRCDropdownStyle} onClick={handleReplyToMailModalOpen}>
                            메일쓰기
                          </MenuItem>
                          <MenuItem sx={SRCDropdownStyle} onClick={() => {alert(`차단 기능 넣기(data axios post)`)}}
                          style={{display:"none"}}>
                            차단하기
                          </MenuItem>
                          <MenuItem sx={SRCDropdownStyle} onClick={() => {alert(`주소록 추가 기능 넣기(data axios post)`)}}
                          style={{display:"none"}}>
                            주소록에 추가
                          </MenuItem>
                        </Menu>

                        <br />

                        <small className="text-muted">
                          수신자:&nbsp;
                        </small>
                        <small className="text-muted mail-receiver-list" onClick={handleAnchorElReceiverOpen} style={{cursor: "pointer"}}
                        onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
                          {mailData["to"].slice(0,1)}
                        </small>
                        <Menu id="basic-menu" anchorEl={anchorElReceiver} open={anchorElReceiverOpen} onClose={handleAnchorElReceiverClose}
                          MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                          transformOrigin={{vertical: 'top', horizontal: 'right'}} 
                          sx={{'& .css-6hp17o-MuiList-root-MuiMenu-list' : {border: "0.5px solid black", padding: "4px 0"}}}>
                            <MenuItem sx={SRCDropdownStyle} onClick={handleMailToReceiverModalOpen}>
                              메일쓰기
                            </MenuItem>
                          </Menu>
                        <WriteMailModal open={mailToReceiverModalOpen} handleClose={handleMailToReceiverModalClose} 
                        receiver={receiverMailAddress} content={""} subject={""} />
                        {mailData["to"].slice(1,).map((value, index) => {
                          return (
                            <React.Fragment>
                              <br/>
                              <small className="text-muted mail-receiver-list mail-receiver-list-not-first-child"
                              onClick={handleAnchorElReceiverOpen} onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
                                {value}
                              </small>
                              <Menu id="basic-menu" anchorEl={anchorElReceiver} open={anchorElReceiverOpen} onClose={handleAnchorElReceiverClose}
                              MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                              transformOrigin={{vertical: 'top', horizontal: 'right'}} 
                              sx={{'& .css-6hp17o-MuiList-root-MuiMenu-list' : {border: "0.5px solid black", padding: "4px 0"}}}>
                                <MenuItem sx={SRCDropdownStyle} onClick={handleMailToReceiverModalOpen}>
                                  메일쓰기
                                </MenuItem>
                              </Menu>
                              <WriteMailModal open={mailToReceiverModalOpen} handleClose={handleMailToReceiverModalClose} 
                              receiver={receiverMailAddress} content={""} subject={""} />
                            </React.Fragment>
                          )
                        })}


                        {mailData["CC"].length !== 0 ? 
                        <React.Fragment>
                          <br/>
                          <small className="text-muted">
                            참&nbsp;&nbsp;&nbsp;&nbsp;조:&nbsp;
                          </small>
                          <small className="text-muted mail-CC-list" onClick={handleAnchorElCCOpen}
                          onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
                            {mailData["to"].slice(0,1)}
                          </small>
                          <Menu id="basic-menu" anchorEl={anchorElCC} open={anchorElCCOpen} onClose={handleAnchorElCCClose}
                            MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            transformOrigin={{vertical: 'top', horizontal: 'right'}} 
                            sx={{'& .css-6hp17o-MuiList-root-MuiMenu-list' : {border: "0.5px solid black", padding: "4px 0"}}}>
                              <MenuItem sx={SRCDropdownStyle} onClick={handleMailToCCModalOpen}>
                                메일쓰기
                              </MenuItem>
                            </Menu>
                          <WriteMailModal open={mailToCCModalOpen} handleClose={handleMailToCCModalClose} 
                          receiver={CCMailAddress} content={""} subject={""} />
                          {mailData["CC"].slice(1,).map((value) => {
                            return (
                              <React.Fragment>
                                <br/>
                                <small className="text-muted mail-CC-list mail-CC-list-not-first-child"
                                onClick={handleAnchorElCCOpen} onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
                                  {value}
                                </small>
                                <Menu id="basic-menu" anchorEl={anchorElCC} open={anchorElCCOpen} onClose={handleAnchorElCCClose}
                                MenuListProps={{'aria-labelledby': 'basic-button'}} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                transformOrigin={{vertical: 'top', horizontal: 'right'}} 
                                sx={{'& .css-6hp17o-MuiList-root-MuiMenu-list' : {border: "0.5px solid black", padding: "4px 0"}}}>
                                  <MenuItem sx={SRCDropdownStyle} onClick={handleMailToCCModalOpen}>
                                    메일쓰기
                                  </MenuItem>
                                </Menu>
                                <WriteMailModal open={mailToCCModalOpen} handleClose={handleMailToCCModalClose} 
                                receiver={CCMailAddress} content={""} subject={""} />
                              </React.Fragment>
                            )
                          })}
                        </React.Fragment> :
                        ""}

                        <br />
                        <small className="text-muted" style={{fontFamily: "'Unica One', cursive", float:"right"}}>
                          {dayjs(mailData["date"]).format("YYYY-M-D H:m:s")}
                        </small>

                        <hr style={{border: "0", height: "1px", width: "100%", backgroundColor: "gainsboro"}}/>

                        {
                          Object.keys(mailData["file"]).length === 0 ?
                          "" :
                          <ul style={{listStyle: "none", padding: "3px", border: "0.5px solid gainsboro"}}>
                            {Object.keys(mailData["file"]).map((value) => {
                              return (
                                <li>
                                  <Link to="#" title="다운로드" onClick={(e) => downloadAttachment(e, value)}>
                                    <FontAwesomeIcon icon={faFileDownload} style={{margin: "0 5px 0 10px"}} />
                                  </Link>

                                  <span style={{fontFamily: "'Nanum Gothic', sans-serif"}}>{decodeURIComponent(decodeURI(value).replace(/%2B/g, " "))}</span>
                                  <span style={{fontFamily: "'Nanum Gothic', sans-serif"}}>{` (${formatSize(mailData["file"][value]["size"])})`}</span>
                                </li>
                              )
                            })}
                          </ul>
                        }
                      </Media>
                    </Media>
                    

                    <div className="mail-content-wrapper"
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(mailData["content"], {FORCE_BODY: true})}} />


                    <div className="waves-effect mt-4 mail-read-btn-placer">
                      <div className="btn btn-primary waves-effect mx-sm-1"
                      onClick={handleDeletionDialogOpen}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                        &nbsp;삭제
                      </div>
                      <DialogTemplate open={deletionDialogOpen} handleClose={handleDeletionDialogClose} 
                      handleAgreement={handleDeletionAgree} dialogTitle={deletionDialogTitle} />

                      <div className="btn btn-warning waves-effect mx-sm-3"
                        onClick={() => {alert("스팸신고되었습니다!")}} style={{display: "none"}}>
                        <FontAwesomeIcon icon={faBan} />
                        &nbsp;스팸신고
                      </div>

                      <div className="btn btn-secondary waves-effect mx-sm-1"
                      onClick={handleReplyToMailModalOpen}>
                        <FontAwesomeIcon icon={faReply} />
                        &nbsp;답장
                      </div>
                      <WriteMailModal open={replyToMailModalOpen} handleClose={handleReplyToMailModalClose} 
                      receiver={mailData["from"]} content={""} subject={`RE: ${mailData["subject"]}`} />

                      <div className="btn btn-secondary waves-effect mx-sm-1"
                      onClick={handleDeliverMailModalOpen}>
                        <FontAwesomeIcon icon={faReplyAll} />
                        &nbsp;전달
                      </div>
                      <WriteMailModal open={deliverMailModalOpen} handleClose={handleDeliverMailModalClose} 
                      receiver={""} content={ChangeTagInMailContent(mailData["content"])}
                      subject={`FW: ${mailData["subject"]}`} />
                    </div>

                  </CardBody>
                  
                </Card>

                <Card style={{display: "none"}}>

                  <CardBody>
                    <Media>
                      <Link to={LinkTo.emailInbox + "/" + previousMailMetaData["id"].toString()}>
                      <div className="fa-sm d-flex">
                        <div>
                          이전글&nbsp;
                          <FontAwesomeIcon icon={faCaretUp} />
                        </div>
                        <div className="previous-and-next-mail-wrapper">
                          <div>{previousMailMetaData["from"]}</div>
                          <div>{previousMailMetaData["subject"].length > 5 
                            ?
                            previousMailMetaData["subject"].substring(0,5) + "..."
                            :
                            previousMailMetaData["subject"]
                            }
                          </div>
                          <div>{previousMailMetaData["date"]}</div>
                        </div>
                      </div>
                      </Link>

                      <hr style={{margin: "2px 0"}}/>

                      <Link to={LinkTo.emailInbox + "/" + nextMailMetaData["id"].toString()}>
                      <div className="fa-sm d-flex">
                      <div>
                          다음글&nbsp;
                          <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                        <div className="previous-and-next-mail-wrapper">
                          <div>{nextMailMetaData["from"]}</div>
                          <div>{nextMailMetaData["subject"].length > 5 
                            ?
                            nextMailMetaData["subject"].substring(0,5) + "..."
                            :
                            nextMailMetaData["subject"]
                            }
                          </div>
                          <div>{nextMailMetaData["date"]}</div>
                        </div>
                      </div>
                      </Link>
                    </Media>
                  </CardBody>
                
                </Card>

              </div>
              }

              
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(EmailSentboxRead)