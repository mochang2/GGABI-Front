import React, { useState, useEffect } from "react"

import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

//Import Email Sidebar
import EmailSideBar from "./EmailSidebar"

//Import Email Topbar
import EmailToolbar from "./EmailSentboxToolbar"

// pagination
import MailPagination from "../../components/Groupware/GroupwareDetails/Email/MailPagination"

// design
import { Container, Row, Col, Card } from "reactstrap"
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import LinkTo from "../../routes/LinkTo"
import { checkboxStyle } from "./CommonStyles"

// formatter
import { formatDate } from "./CommonFunctions" // date

// common functions
import { mapMailCheckedAndMailData, checkAsImportantMail } from "./CommonFunctions"


const EmailInbox = (props) => {

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
  

  // mail checkbox
  const [mailChecked, setMailChecked] = useState([]);

  const handleParentCheckbox = (event) => {
    setMailChecked(Array.from({length: mailDataLength}, (_,i) => i >= indexOfFirstMail && i < indexOfLastMail ? event.target.checked : mailChecked[i]));
  };
  const parentCheckboxChecked = () => {
    let res = true;
    for (const i in mailChecked.slice(indexOfFirstMail, indexOfLastMail)) {
      res = res && mailChecked[parseInt(i) + (mailCurrentPage - 1) * selectNum];
    }
    return res;
  }

  
  useEffect(() => {
    axiosAPI.get("/api/mail/Sent")
      .then(response => {
        const keys = Object.keys(response.data);
        const toArray = Object.values(response.data);  // json to array
        let temp = [];
        let index = 0;
        for (const i in toArray) {  // add key in json format
          temp.unshift(toArray[i]);
          temp[0]["id"] = keys[index];
          index += 1;
        }
        setMailData(temp);
        setMailChecked(toArray.map(() => false));
        setSelectNum(20);
      })
      .catch(error => {
        errorLog(error);
      });
  }, [props.userData.mailData])  // 무한 렌더링 되는 것을 막으려고



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col xs="12">
              <EmailSideBar userData={props.userData}/>
              
              <div className="email-rightbar mb-3">
                <Card>

                  <div className="d-flex">
                    <FormControlLabel
                      label="" sx={{marginLeft: '0 !important', marginBottom: '0 !important', paddingLeft: '8px'}}
                      control={
                      <Checkbox checked={parentCheckboxChecked()} onChange={handleParentCheckbox}
                      sx={checkboxStyle} size="sm" />
                      }
                    />

                    <EmailToolbar selectNum={selectNum} setSelectNum={setSelectNum} handleSelectNumChange={handleSelectNumChange}
                    mailData={mailData} setMailData={setMailData} mailChecked={mailChecked} setMailChecked={setMailChecked}
                    mailIds={mapMailCheckedAndMailData(mailChecked,mailDataLength).map(index => mailData[index]["id"])}
                    mailSenders={mapMailCheckedAndMailData(mailChecked,mailDataLength).map(index => mailData[index]["from"])}
                    mailSubjects={mapMailCheckedAndMailData(mailChecked,mailDataLength).map(index => mailData[index]["subject"])} />
                  </div>

                  <ul className="message-list">
                    {currentMailData.map((mail, i) => {
                      const index = i + (mailCurrentPage - 1) * selectNum
                      return (
                        <React.Fragment key={index}>
                        <hr style={{border: "0", height: "0.5px", margin: "0"}}/>

                        <li>
                          <div className="col-mail col-mail-1">
                            <div className="checkbox-wrapper-mail">
                              <FormControlLabel label={""}
                              control={
                                <Checkbox checked={mailChecked[index]} 
                                onChange={() => {
                                  setMailChecked(Array.from({length: mailDataLength}, 
                                    (_,i) => i === index ? !mailChecked[i] : mailChecked[i]
                                  ));
                                }} sx={checkboxStyle} size="sm" />
                              }/>
                            </div>

                            <div className="title">
                              {mail.to}
                            </div>
                            <span className="star-toggle far fa-star"
                            onClick={checkAsImportantMail} />
                          </div>

                          <div className="col-mail col-mail-2">
                            <Link className="subject"
                            to={{pathname:LinkTo.emailSentbox + "/" + mail.id.toString(),
                            state: { prevPath: document.location.pathname }}}>
                              {mail.subject}
                            </Link>
                            <div className="date-analysis-wrapper">
                              <Link to={{pathname:LinkTo.emailSentbox + "/" + mail.id.toString(),
                                    state: { prevPath: document.location.pathname }}}>
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

export default withRouter(EmailInbox)
