import React , { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// import Email Sidebar
import EmailSideBar from "../Email/EmailSidebar"

// design
import { Container, Row, Col, Card, CardBody, Media } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faHandPaper } from "@fortawesome/free-solid-svg-icons"

// formatter
import dayjs from "dayjs" // date
import { formatSize } from "../Email/CommonFunctions"

// prevent XSS from html string
import DOMPurify from "dompurify"



const RequestApprovalRead = (props) => {

  const mailId = document.location.href.split("/").at(-1);
  const [mailData, setMailData] = useState(""); 

  useEffect(() => {
    axiosAPI.get(`/api/mail/approval/request/${mailId}`)
      .then(response => {
        console.log(response.data);
        setMailData(response.data);
      })
      .catch(error => {
        errorLog(error);
      })
  }, [mailId])


  // 결재 / 반려
  const handleApprovalBtn = (e) => {
    axiosAPI.post(`/api/mail/approval/change/request/${mailId}`, {
      "request" : "accept"
    })
      .then(response => {
        if (response.data.status === "success") alert(`메일이 결재되었습니다.`)
        else alert(`메일 결재에 실패했습니다.`)
      })
      .catch(error => {
        errorLog(error);
        alert(`메일 결재에 실패했습니다.`);
      })
  }
  const handleRejectionBtn = (e) => {
    axiosAPI.post(`/api/mail/approval/change/request/${mailId}`, {
      "request" : "refuse"
    })
      .then(response => {
        if (response.data.status === "success") alert(`메일 결재를 반려했습니다.`)
        else alert(`반려에 실패했습니다.`)
      })
      .catch(error => {
        errorLog(error);
        alert(`반려에 실패했습니다.`);
      })
  }


  
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
                      <Media body className="flex-1 ms-3" style={{width: "95%"}}>
                        <h5 className="font-size-14 my-1 d-flex">
                          제목: &nbsp;&nbsp;<b>{mailData["subject"]}</b>
                        </h5>

                        <small className="text-muted">
                          발신자:&nbsp;
                        </small>
                        <small className="text-muted mail-sender-string cursor-default">
                        {mailData["nickname"]} ({mailData["from"]})
                        </small>

                        <br />

                        <small className="text-muted">
                          수신자:&nbsp;
                        </small>
                        <small className="text-muted mail-receiver-list cursor-default">
                          {mailData["to"].slice(0,1)}
                        </small>
                        {mailData["to"].slice(1,).map((value, index) => {
                          return (
                            <React.Fragment key={index}>
                              <br/>
                              <small className="text-muted mail-receiver-list mail-receiver-list-not-first-child cursor-default">
                                {value}
                              </small>
                            </React.Fragment>
                          )
                        })}
                        

                        {mailData["cc"] === [""] ? 
                        <React.Fragment>
                          <br/>
                          <small className="text-muted">
                            참&nbsp;&nbsp;&nbsp;&nbsp;조:&nbsp;
                          </small>
                          <small className="text-muted mail-CC-list cursor-default">
                            {mailData["cc"].slice(0,1)}
                          </small>
                          {mailData["cc"].slice(1,).map((value, index) => {
                            return (
                              <React.Fragment key={index}>
                                <br/>
                                <small className="text-muted mail-CC-list mail-CC-list-not-first-child cursor-default">
                                  {value}
                                </small>
                              </React.Fragment>
                            )
                          })}
                        </React.Fragment>
                        : ""}


                        {mailData["acceptMember"].length !== 0 ? 
                        <React.Fragment>
                          <br/>
                          <small className="text-muted">
                            결재자:&nbsp;
                          </small>
                          <small className="text-muted mail-CC-list cursor-default">
                            {mailData["acceptMember"][0]["approvalMember"]}
                            ({mailData["acceptMember"][0]["department"]}&nbsp;
                            {mailData["acceptMember"][0]["position"]})
                          </small>
                          {mailData["acceptMember"].slice(1,).map((value, index) => {
                            return (
                              <React.Fragment key={index}>
                                <br/>
                                <small className="text-muted mail-CC-list mail-CC-list-not-first-child cursor-default">
                                  {value["approvalMember"]}
                                  ({value["department"]}&nbsp;
                                  {value["position"]})
                                </small>
                              </React.Fragment>
                            )
                          })}
                        </React.Fragment>
                        : ""}


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
                                <li key={index} style={{margin: "0 4px 0 10px"}}>
                                  <span className="text-font-nanumGothic">{decodeURIComponent(decodeURI(value).replace(/%2B/g, " "))}</span>
                                  <span className="text-font-nanumGothic">{` (${formatSize(mailData["file"][value]["size"])})`}</span>
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
                      <div className="btn btn-secondary waves-effect mx-sm-1" onClick={handleRejectionBtn}>
                        <FontAwesomeIcon icon={faHandPaper} />
                        &nbsp;반려
                      </div>

                      <div className="btn btn-primary waves-effect mx-sm-1" onClick={handleApprovalBtn}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        &nbsp;결재
                      </div>
                    </div>

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

export default withRouter(RequestApprovalRead)
