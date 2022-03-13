import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI";

// tooltip component
import { LightTooltipBorderBlack, SearchTooltip } from "../../components/Common/Tooltip";

// mailbox functions
import { formatDate } from "../Email/CommonFunctions";

// design
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileAlt } from "@fortawesome/free-solid-svg-icons"
import Tooltip from "@mui/material/Tooltip"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import HelpIcon from "@mui/icons-material/Help"
import IconButton from "@mui/material/IconButton"
import LinkTo from "../../routes/LinkTo";


const trafficLightId = (flag, danger, read) => {
  if (read === false) return ""; // 발신 메일

  if (flag === null || flag === undefined) return "undetermined";

  if (danger === -1) {
    if (flag === 0) return "undetermined";
    else if (flag === 1 || flag === 2) return "normal";
    else return "dangerous";
  }
  else {
    if (danger < 0.3) return "normal";
    else if (danger < 0.7) return "warning";
    else return "dangerous"
  }
}


const BootstrapButton = styled(Button)({
  boxShadow: "1px 1px #6857FF",
  textTransform: "none",
  fontSize: 16,
  padding: "4px 10px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#5b73e8",
  borderColor: "#5b73e8",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    backgroundColor: "#5273E8",
    borderColor: "#5b73e8",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.15rem #579FFF",
  },
});


const GatherCompanyEmails = (props) => {
  
  const mailDataSearchKeys = {"위험도": "danger", "송신자": "from", "수신자": "to", "제목": "subject", /*"내용": "content", "용량": "volumn",*/ "날짜": "date"};
  const [allCompanyMailData, setAllCompanyMailData] = useState({});

  //// Search tooltip
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  }
  const handleTooltipClose = () => {
    setTooltipOpen(false);
  }

  // column selection
  const [tooltipColumnSelection, setTooltipColumnSelection] = useState("송신자");
  const handleTooltipColumnSelection = (event) => {
    setTooltipColumnSelection(event.target.value);
  }

  // condition selection
  const [tooltipConditionSelection, setTooltipConditionSelection] = useState("contain");
  const handleTooltipConditionSelection = (event) => {
    setTooltipConditionSelection(event.target.value);
  }

  // input value
  const [tooltipInputValue, setTooltipInputValue] = useState("");
  const handleTooltipInputValue = (event) => {
    setTooltipInputValue(event.target.value);
  }

  // actual filtering function
  const filterMailDataUsingTooltip = (maildata) => {
    if (tooltipConditionSelection === "same") {
      return maildata.filter( (mail) => mail[mailDataSearchKeys[tooltipColumnSelection]] === tooltipInputValue );
    }
    else if (tooltipConditionSelection === "not-same") {
      return maildata.filter( (mail) => mail[mailDataSearchKeys[tooltipColumnSelection]] !== tooltipInputValue );
    }
    else if (tooltipConditionSelection === "contain") {
      return maildata.filter( (mail) => mail[mailDataSearchKeys[tooltipColumnSelection]].includes(tooltipInputValue) );
    }
    else if (tooltipConditionSelection === "not-contain") {
      return maildata.filter( (mail) => !mail[mailDataSearchKeys[tooltipColumnSelection]].includes(tooltipInputValue) );  
    }
    else if (tooltipConditionSelection === "greater-than-or-equal") {
      return maildata.filter( (mail) => parseFloat(mail[mailDataSearchKeys[tooltipColumnSelection]].slice(0, -2)) >= parseFloat(tooltipInputValue) );
    }
    else if (tooltipConditionSelection === "less-than-or-equal") {
      return maildata.filter( (mail) => parseFloat(mail[mailDataSearchKeys[tooltipColumnSelection]].slice(0, -2)) <= parseFloat(tooltipInputValue) );
    }
    else if (tooltipConditionSelection === "greater-than") {
      return maildata.filter( (mail) => parseFloat(mail[mailDataSearchKeys[tooltipColumnSelection]].slice(0, -2)) > parseFloat(tooltipInputValue) );
    }
    else if (tooltipConditionSelection === "less-than") {      
      return maildata.filter( (mail) => parseFloat(mail[mailDataSearchKeys[tooltipColumnSelection]].slice(0, -2)) < parseFloat(tooltipInputValue) );
    }
    else if (tooltipConditionSelection === "after-or-greater-than-or-equal") {
      return maildata.filter( (mail) => new Date(mail[mailDataSearchKeys[tooltipColumnSelection]]) >= new Date(tooltipInputValue) );
    }
    else if (tooltipConditionSelection === "before-or-less-than-or-equal") {
      return maildata.filter( (mail) => new Date(mail[mailDataSearchKeys[tooltipColumnSelection]]) <= new Date(tooltipInputValue) );
    }
    else {
      return maildata;
    }
  }


  // open each mail analysis window
  const openEachMailAnalysis = (event, id) => {
    console.log(id);
    if (window.innerWidth > 410) {
      window.open(LinkTo.gatherEmails + "/" +  id, "메일 분석 요약", "width=400, height=300, resizable=no");
    }
    else {
      window.open(LinkTo.gatherEmails + "/" +  id, "메일 분석 요약", "width=300, height=300, resizable=no");
    }
  }


  useEffect(() => {
    axiosAPI.get("/api/admin/mail")
      .then(response => {
        console.log(response.data);
        const keys = Object.keys(response.data);
        const toArray = Object.values(response.data);  // json to array
        let temp = []
        for (const i in toArray) {
          temp.unshift(toArray[i]);
          temp[0]["id"] = keys[i];
          temp[0]["danger"] = trafficLightId(toArray[i]["spamFlag"], toArray[i]["danger"], toArray[i]["read"]);
        }
        temp.sort((a,b) => {
          if (new Date(a["date"]) < new Date(b["date"])) {  return 1; }
          if (new Date(a["date"]) > new Date(b["date"])) { return -1; }
          return 0;
        })
    
        setAllCompanyMailData(temp);
      })
      .catch(error => {
        errorLog(error);
      })


  }, [])
  


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <div className="d-flex" style={{marginBottom: "5px"}}>
                    <LightTooltipBorderBlack open={tooltipOpen} disableHoverListener={true} placement="bottom-start"
                    title={
                      <SearchTooltip onClose={handleTooltipClose} searchKeys={mailDataSearchKeys}
                      columnSelection={tooltipColumnSelection} handleColumnSelection={handleTooltipColumnSelection}
                      conditionSelection={tooltipConditionSelection} handleConditionSelection={handleTooltipConditionSelection}
                      inputValue={tooltipInputValue} handleInputValue={handleTooltipInputValue} />
                    }>
                      <BootstrapButton variant="contained" onFocus={handleTooltipOpen} >필터</BootstrapButton>
                    </LightTooltipBorderBlack>

                    <Tooltip title={"위험도 필터링은 빨간색이 dangerous, 노란색이 warning, 초록색이 normal입니다. 회색은 분석되지 않은 메일로 undetermined입니다."}>
                      <IconButton color="default">
                        <HelpIcon />
                      </IconButton>
                    </Tooltip>
                  </div>

                  <ul className="mail-list">
                    {allCompanyMailData.length !== undefined
                    ? 
                    filterMailDataUsingTooltip(allCompanyMailData).map((mail, index) => {
                      return (
                        <React.Fragment key={index}>
                        <hr style={{border: "0", height: "0.5px", margin: "0"}}/>

                        <li>

                          <div className="col-mail col-mail-1 d-flex">
                            <div className="traffic-light-sender-and-receiver-wrapper">
                              <div className="mail-traffic-light" id={mail.danger} />
                              <div className="sender-and-receiver">
                                <span>{mail.from}</span>
                                <span className="mail-receiver-span" style={{margin: "0 5px"}}>-></span>
                                <span className="mail-receiver-span">{mail.to}</span>
                              </div>
                            </div>

                            <div className="date-analysis-wrapper">
                              <span style={{display: "none"}}>{mail.volumn}</span>
                              <span>{formatDate(mail.date)}</span>
                              <FontAwesomeIcon className="mail-analysis-report-link" icon={faFileAlt} size="lg"
                              title="메일 분석" onClick={(e) => openEachMailAnalysis(e, mail.id)} />
                            </div>
                          </div>
                        

                          <div className="col-mail col-mail-2 d-flex">
                            <Link to="#" className="subject">
                              {mail.isReportedAsSpam !== undefined ? <span style={{color: "red"}}>[스팸]&nbsp;</span> : ""}
                              <span>{mail.subject}</span>
                            </Link>
                          </div>

                        </li>
                        </React.Fragment>
                      )
                    })
                    :
                    ""}
                  </ul>

                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(GatherCompanyEmails)