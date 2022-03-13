import React, { useState, useEffect } from "react"

// link
import { Link } from "react-router-dom"
import LinkTo from "../../routes/LinkTo"

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// design
import { Container, Row, Col,Card } from "reactstrap"

// Sidebar
import EmailSideBar from "../Email/EmailSidebar"

// Toolbar
import EmailApprovalToolbar from "./EmailApprovalToolbar"

// pagination
import MailPagination from "../../components/Groupware/GroupwareDetails/Email/MailPagination"

// formatter
import { formatDate } from "../Email/CommonFunctions"



const EmailApprovalbox = (props) => {

  // set pathname as variable
  const path = document.location.pathname;


  // get mail data + pagination
  const [mailData, setMailData] = useState([]);
  const [mailCurrentPage, setMailCurrentPage] = useState(1);
  const [selectNum, setSelectNum] = useState(0);
  const handleMailPageChange = (mailPage) => { setMailCurrentPage(mailPage); }
  const handleSelectNumChange = (event) => { setSelectNum(parseInt(event.target.value)); }

  const indexOfLastMail = mailCurrentPage * selectNum;
  const indexOfFirstMail = indexOfLastMail - selectNum;
  const currentMailData = mailData.slice(indexOfFirstMail, indexOfLastMail);
  const mailDataLength = mailData.length;
  

  // TODO: axios api get data
  useEffect(() => {
    let url = "";
    const box = document.location.pathname;
    if (box === LinkTo.emailEndApproval) url = "end";
    else if (box === LinkTo.emailRejectApproval) url = "reject";
    else if (box === LinkTo.emailRequestApproval) url = "request";
    else if (box === LinkTo.emailWaitApproval) url = "wait";
    
    axiosAPI.get(`/api/mail/approval/${url}`)
      .then(response => {
        const keys = Object.keys(response.data);
        const toArray = Object.values(response.data);
        let temp = [];
        let index = 0;
        for (const i in toArray) {  // add key in json format
          temp.unshift(toArray[i]);
          temp[0]["id"] = keys[index];
          index += 1;        
        }

        setMailData(temp);
        setSelectNum(20);  // to fix parent btn error(해당 select가 한 번 바뀌어야 기능이 제대로 동작함)
      })
      .catch(error => {
        errorLog(error);
      })
  }, [props.userData.mailData])



  return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col xs="12">
              <EmailSideBar userData={props.userData} />
              
              <div className="email-rightbar mb-3">
                <Card>

                  <div className="email-approval-toolbar-wrapper d-flex">
                    <EmailApprovalToolbar selectNum={selectNum} setSelectNum={setSelectNum}
                    handleSelectNumChange={handleSelectNumChange} 
                    columnZeroTitle={path === LinkTo.emailEndApproval ||
                                    path === LinkTo.emailRequestApproval ?
                                    "발신자" : "수신자" } />
                  </div>

                  <ul className="message-list">
                    {currentMailData.map((mail, i) => {
                      const index = i + (mailCurrentPage - 1) * selectNum
                      return (
                        <React.Fragment key={index}>
                        <hr style={{border: "0", height: "0.5px", margin: "0"}}/>

                        <li>
                          <div className="col-mail-approval col-mail-approval-1">
                            <div className="sender-receiver">
                              {path === LinkTo.emailEndApproval ||
                              path === LinkTo.emailRequestApproval ?
                              mail.from : mail.to}
                            </div>
                          </div>

                          <div className="col-mail-approval col-mail-approval-2">
                            <Link className="subject"
                            to={path + "/" + mail.id.toString()}>
                              {mail.subject === null ? "빈 제목" : mail.subject}
                            </Link>
                            <div className="date-wrapper">
                              <Link to={path + "/" + mail.id.toString()}>
                                {formatDate(mail.date)}
                              </Link>
                            </div>
                          </div>

                        </li>
                        </React.Fragment>
                      )
                  })}
                  </ul>
                </Card>

                <Row>
                  <MailPagination itemsCountPerPage={selectNum} totalItemsCount={mailDataLength}
                  mailPage={mailCurrentPage} handleMailPageChange={handleMailPageChange} />
                </Row>
                
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EmailApprovalbox