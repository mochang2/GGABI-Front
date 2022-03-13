import React , { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// import Email Sidebar
import EmailSideBar from "../Email/EmailSidebar"

// design
import { Container, Row, Col, Card, CardBody, Media } from "reactstrap"

// formatter
import dayjs from "dayjs" // date
import { formatSize } from "../Email/CommonFunctions"

// prevent XSS from html string
import DOMPurify from "dompurify"



const RejectApprovalRead = (props) => {

  const mailId = document.location.href.split("/").at(-1);
  const [mailData, setMailData] = useState(""); 

  useEffect(() => {
    axiosAPI.get(`/api/mail/approval/reject/${mailId}`)
      .then(response => {
        console.log(response.data);
        setMailData(response.data);
      })
      .catch(error => {
        errorLog(error);
      })
  }, [mailId])


  
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
                          본 인 ({mailData["from"]})
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


                        <br/>
                        <small className="text-muted">
                          결재자:&nbsp;
                        </small>
                        <small className="text-muted mail-CC-list cursor-default">
                          {mailData["acceptMember"][0]["approvalMember"]}&nbsp;
                          ({mailData["acceptMember"][0]["department"]}&nbsp;
                          {mailData["acceptMember"][0]["position"]})&nbsp;
                          {mailData["acceptMember"][0]["doApproval"] ? 
                          <span className="approved">[승인]&nbsp;</span> : 
                          <span className="rejected">[반려]&nbsp;</span>}
                        </small>
                        {mailData["acceptMember"].slice(1,).map((value, index) => {
                          return (
                            <React.Fragment key={index}>
                              <br/>
                              <small className="text-muted mail-CC-list mail-CC-list-not-first-child cursor-default">
                                {value["approvalMember"]}&nbsp;
                                ({value["department"]}&nbsp;
                                {value["position"]})&nbsp;
                                {value["doApproval"] ? 
                                <span className="approved">[승인]&nbsp;</span> : 
                                <span className="rejected">[반려]&nbsp;</span>}
                              </small>
                            </React.Fragment>
                          )
                        })}


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

export default withRouter(RejectApprovalRead)
