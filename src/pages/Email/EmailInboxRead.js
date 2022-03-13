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

// tooltip component
import { LightTooltipBorder040404 } from "../../components/Common/Tooltip"

// design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt, faFileDownload, faChartPie, faReply, faReplyAll, 
  faCaretUp, faCaretDown, faTrashAlt, faBan, faExclamationTriangle, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import LinkTo from "../../routes/LinkTo"
import { Menu, MenuItem, Tooltip } from "@mui/material"
import { SRCDropdownStyle } from "./CommonStyles"

// formatter
import dayjs from "dayjs" // date
import { ChangeTagInMailContent } from "./CommonFunctions" // html content
import { formatSize } from "./CommonFunctions" // attachment size

// common functions
import { checkAsImportantMail, handleOnMouseLeave, handleOnMouseOver, trafficLightId } from "./CommonFunctions"

// prevent XSS from html string
import DOMPurify from "dompurify"



const EmailInboxRead = (props) => {

  // // BE 꺼져있을 때
  // const mailData = {    
  //   "id": 2, 
  //   "danger": "normal",
  //   "accuracy": "0.88",
  //   "from": "wooricard@woori.co.kr", 
  //   "to": "rmwjr5012@ggabi.co.kr", 
  //   "subject": "[우리카드] 우리금융그룹 내 고객정보 제공안내", 
  //   "date": "2021-10-11 21:28:01",
  //   "attachment": [["첨부파일1.png", "15.6KB"], ["첨부파일2.jpg", "9.1KB"], ["첨부파일3.zip", "20.4MB"]],
  //   "content": <div style={{backgroundColor:"white"}}><h4>우리금융그룹 내 고객정보 제공 안내</h4><p>안녕하세요 고객님.</p><p>우리카드를 항상 아끼고 사랑해 주시는 고객님께 깊은 감사를 드립니다.
  //   우리카드는 2019. 1. 11일 출범한 우리금융지주(우리은행, 우리카드, 우리종금 등)의 일원으로서 금융산업 발전에 일익을 담당하고자 노력하고 있습니다.
  //   금융지주회사법(제48조의2)상 금융그룹은 내부 경영관리 목적으로 그룹사간 고객정보의 제공 및 이용이 가능하고, 제공시 그 내역을 통지하도록 되어 있어 안내를 드립니다.
  //   그룹사간 고객정보 제공 및 이용은 신용위험관리, 고객 우대서비스 제공, 상품/서비스 개발 등의 목적으로만 이용되며, 마케팅 등 영업 목적으로는 이용되지 않습니다.</p></div> ,
  // };
  const mailId = document.location.href.split("/").at(-1);
  const [mailData, setMailData] = useState("");  // 처음 렌더링 될 때 에러를 방지하기 위해 undefined가 아닌 빈 스트링 넣어주기
  const previousMailMetaData = {
    "id": 1, "from": "sender@ggabi.co.kr", "to": "receiver@ggabi.co.kr", "subject": "제목입니다", "date": "2021-10-11 21:28:01"
  }
  const nextMailMetaData = {
    "id": 3, "from": "sender@ggabi.co.kr", "to": "receiver@ggabi.co.kr", "subject": "제목입니다히히", "date": "2021-10-11 21:29:01"
  }

  useEffect(() => {
    axiosAPI.get(`/api/mail/INBOX/${mailId}`)
      .then(response => {
        console.log(response.data)
        let temp = response.data;
        let danger = -1;
        for (const fileInfo of Object.values(temp["file"])) {
          if (fileInfo["danger"] > danger) { danger = fileInfo["danger"]; }
        }

        temp["danger"] = danger;

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
    console.log(value);
    console.log(mailData["file"][value]["url"]);
    // axiosAPI.get(mailData["file"][value]["url"], {
    //   responseType: "blob"
    // })
    //   .then(res => {
    //     const blob = new Blob([res.data], {type: res.headers["Content-Type"]});
    //     const fileName = decodeURIComponent(decodeURI(value).replace(/%2B/g, " "));

    //     if (window.navigator.msSaveOrOpenBlob) { // IE blob 분기 처리 에러 해결
    //       window.navigator.msSaveOrOpenBlob(blob, fileName);
    //     }
    //     else {
    //       let link = document.createElement("a");
    //       link.href = window.URL.createObjectURL(blob);  // blob 객체의 url 생성
    //       link.setAttribute("download", fileName);
    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link);
    //     }
    //   })
    //   .catch(err => console.log(err))
  }



  // delete a mail
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);
  const deletionDialogTitle = `메일을 삭제하시겠습니까?`;
  const handleDeletionDialogOpen = () => { setDeletionDialogOpen(true); }
  const handleDeletionDialogClose = () => { setDeletionDialogOpen(false); }
  const handleDeletionAgree = (event) => {
    axiosAPI.delete("/api/mail/INBOX", {
      data: {
        "mailIdList": [document.location.pathname.split("/").at(-1)],
      }
    })
      .then(response => {
        if (response.data["status"] === "success") {
          handleDeletionDialogClose();
          if (props.location.state !== undefined) {
            props.history.push(props.location.state.prevPath);
          }
          else {
            props.history.push(LinkTo.emailInbox);
          }
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



  return (
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
                      <Media body className="flex-1" style={{width: "95%"}}>
                        <h5 className="font-size-14 my-1 d-flex">
                          제목: &nbsp;&nbsp;<b>{mailData["subject"]}</b>
                          {mailData["danger"] === -1
                          ?
                          <div className="mail-traffic-light" 
                          id={trafficLightId(mailData["flag"], mailData["danger"])} /> 
                          :
                          <LightTooltipBorder040404 placement="bottom-end" arrow enterDelay={50} leaveDelay={200}
                          title={
                            <React.Fragment>
                              <div className="my-1 mx-1">
                                <span className="pe-2">
                                  {`[위험도: ${(mailData["danger"] * 100).toFixed(2)}%]`}
                                </span>
                                <Link to="#" style={{display: "none"}}>
                                  <FontAwesomeIcon icon={faExternalLinkAlt} size="sm"/>
                                  <span style={{fontSize: "12px"}}>자세히</span>
                                </Link>
                              </div>
                            </React.Fragment>
                          }>
                            <div className="mail-traffic-light" 
                            id={trafficLightId(mailData["flag"], mailData["danger"])} 
                            style={{cursor: "pointer"}} />
                          </LightTooltipBorder040404>}
                        </h5>

                        <small className="text-muted">
                          발신자:&nbsp;
                        </small>
                        <small className="text-muted mail-sender-string" onClick={handleAnchorElSenderOpen}
                        onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
                          {mailData["from"]}
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
                        <small className="text-muted mail-receiver-list" onClick={handleAnchorElReceiverOpen}
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
                            <React.Fragment key={index}>
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
                            {mailData["CC"].slice(0,1)}
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
                          {mailData["CC"].slice(1,).map((value, index) => {
                            return (
                              <React.Fragment key={index}>
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
                            {Object.keys(mailData["file"]).map((value, index) => {
                              return (
                                <li key={index}>
                                  <Link to="#" title="다운로드" onClick={(e) => downloadAttachment(e, value)}>
                                    <FontAwesomeIcon icon={faFileDownload} style={{margin: "0 4px 0 10px"}} />
                                  </Link>
                                  <LightTooltipBorder040404 arrow
                                  title={
                                    <React.Fragment>
                                      <p>{`분석여부: ${mailData["file"][value]["isAnalysed"]}`}</p>
                                      <p>
                                        {mailData["file"][value]["danger"] === -1 ?
                                        `위험도: 미분석`:
                                        `위험도: ${(mailData["file"][value]["danger"] * 100).toFixed(2)}%`}
                                      </p>
                                    </React.Fragment>
                                  } >
                                    <Link to="#">
                                      <FontAwesomeIcon icon={faChartPie} style={{margin: "0 10px 0 4px"}} />
                                    </Link>
                                  </LightTooltipBorder040404>

                                  <span className="text-font-nanumGothic">{decodeURIComponent(decodeURI(value).replace(/%2B/g, " "))}</span>
                                  <span className="text-font-nanumGothic">{` (${formatSize(mailData["file"][value]["size"])})`}</span>
                                </li>
                              )
                            })}
                          </ul>
                        }
                      </Media>
                    </Media>

                    {mailData["dangerURL"] ?
                    <div className="shortURL-warning-outer-wrapper">
                      <div className="shortURL-warning-inner-wrapper">
                        <FontAwesomeIcon icon={faExclamationTriangle} size="m" color="#FD472B" />
                        <span>해당 메일은 의심스러운 url이 포함된 메일입니다.&nbsp;&nbsp;</span>
                        <Tooltip arrow followCursor title={
                          <React.Fragment>
                          URL 리다이렉션이 포함된 링크로, <br/>
                          피싱 사이트로 유도될 가능성이 존재합니다.
                          </React.Fragment>
                        }>
                          <small className="text-muted shortURL-link">
                            자세히보기
                          </small>
                        </Tooltip>
                        <FontAwesomeIcon className="shortURL-link" icon={faCaretRight} size="sm" />
                      </div>
                    </div>
                    :
                    ""}


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

                      <div className="btn btn-warning waves-effect mx-sm-3" style={{display: "none"}}
                        onClick={() => {alert("스팸신고되었습니다!")}}>
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

export default withRouter(EmailInboxRead)
