import React, { useState, useEffect } from "react"

import { withRouter } from "react-router-dom"

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// dialog component
import DialogTemplate, { RejectApplicantDialog } from "../../components/Common/DialogTemplate"

// List component
import { AppliedList, RejectedList } from "../../components/Admin/AdminDetails/ApplicantList"

// design
import { Container, Row, Col, Card, CardBody, CardTitle, Button as ButtonReact, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap"


const ApplicantApproval = (props) => {
  
  // Search using name
  const [searchAppliedUsername, setSearchAppliedUsername] = useState("");
  const handleSearchAppliedUsername = (event) => {
    setSearchAppliedUsername(event.target.value);
  }

  
  // 0. 체크박스와 selectID 연동
  const [selectedApplicants, setSelectedApplicants] = useState("");
  const handleSelectedApplicants = (ids) => {
    const selectedIDs = new Set(ids);
    setSelectedApplicants(applicants.filter((row) => selectedIDs.has(row.id) ));
  }


  // 1. 승인
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [approvalDialogTitle, setApprovalDialogTitle] = useState("");
  const handleApprovalDialogOpen = () => { 
    const willBeAllowedNames = Object.keys(selectedApplicants).map((key) => selectedApplicants[key].username);
    if (willBeAllowedNames.length !== 0) { 
      setApprovalDialogOpen(true);
      setApprovalDialogTitle(
        <React.Fragment>
          <span id="first-name-in-dialog-title">
            <b>{willBeAllowedNames[0]}</b>
          </span>
          <span>
            &nbsp;외 {willBeAllowedNames.length - 1} 명을 승인하시겠습니까?
          </span>
        </React.Fragment>
      );
    }
    else { alert(`승인할 사원을 체크해주세요.`); }
  }
  const handleApprovalDialogClose = () => { setApprovalDialogOpen(false); }
  const handleApprovalAgree = (event) => {
    let role_change_body = [];
    for (const applicantsInfo of selectedApplicants) {
      role_change_body.push({ "id": applicantsInfo["id"], "authority": "ROLE_USER" });
    }

    axiosAPI.put("/api/admin", role_change_body)
      .then(response => {
        let count = 0;
        for (const i in response.data) {
          if (response.data[i]["status"] === "success") { count += 1; }
        }

        alert(`${count}명의 회원이 승인 완료되었습니다.`);
        setApprovalDialogOpen(false);
        document.location.reload();
      })
      .catch(error => { 
        errorLog(error);
      })
  }

  // 2. 거부
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [rejectionDialogTitle, setRejectionDialogTitle] = useState("");
  const handleRejectionDialogOpen = () => { 
    const willBeRejectedNames = Object.keys(selectedApplicants).map((key) => selectedApplicants[key].username);
    if (willBeRejectedNames.length !== 0) { 
      setRejectionDialogOpen(true);
      setRejectionDialogTitle(
        <React.Fragment>
          <span id="first-name-in-dialog-title">
            <b>{willBeRejectedNames[0]}</b>
          </span>
          <span>
            &nbsp;외 {willBeRejectedNames.length - 1} 명을 거절하시겠습니까?
          </span>
        </React.Fragment>
      );
    }
    else { alert(`거절할 사람을 체크해주세요.`); }
  }
  const handleRejectionDialogClose = () => { setRejectionDialogOpen(false); }
  const handleRejectionAgree = (event) => {
    let role_change_body = [];
    for (const applicantsInfo of selectedApplicants) {
      role_change_body.push({ "id": applicantsInfo["id"], "authority": "ROLE_REJECT" });
    }

    axiosAPI.put("/api/admin", role_change_body)
      .then(response => {
        let count = 0;
        for (const i in response.data) {
          if (response.data[i]["status"] === "success") { count += 1; }
        }

        alert(`${count}명의 회원이 승인 거절되었습니다.`);
        setApprovalDialogOpen(false);
        document.location.reload();
      })
      .catch(error => { 
        errorLog(error);
      })
  }


  // Search using name
  const [searchRejectedUsername, setSearchRejectedUsername] = useState("");
  const handleSearchRejectedUsername = (event) => {
    setSearchRejectedUsername(event.target.value);
  }

  
  // 0. 체크박스와 selectID 연동
  const [selectedRejectedPeople, setSelectedRejectedPeople] = useState("");
  const handleSelectedRejectedPeople = (ids) => {
    const selectedIDs = new Set(ids);
    setSelectedRejectedPeople(RejectedPeople.filter((row) => selectedIDs.has(row.id) ));
  }

  // 1. 복원
  const [restorationDialogOpen, setRestorationDialogOpen] = useState(false);
  const [restorationDialogTitle, setRestorationDialogTitle] = useState("");
  const handleRestorationDialogOpen = () => { 
    const willBeRestoredNames = Object.keys(selectedRejectedPeople).map((key) => selectedRejectedPeople[key].username);
    if (willBeRestoredNames.length !== 0) { 
      setRestorationDialogOpen(true);
      setRestorationDialogTitle(
        <React.Fragment>
          <span id="first-name-in-dialog-title">
            <b>{willBeRestoredNames[0]}</b>
          </span>
          <span>
            &nbsp;외 {willBeRestoredNames.length - 1} 명을 복원하시겠습니까?
          </span>
        </React.Fragment>
      );
    }
    else { alert(`복원할 사람을 체크해주세요.`); }
  }
  const handleRestorationDialogClose = () => { setRestorationDialogOpen(false); }
  const handleRestorationAgree = (event) => {
    let role_change_body = [];
    for (const rejectedInfo of selectedRejectedPeople) {
      role_change_body.push({ "id": rejectedInfo["id"], "authority": "ROLE_BEFORE" });
    }

    axiosAPI.put("/api/admin", role_change_body)
      .then(response => {
        let count = 0;
        for (const i in response.data) {
          if (response.data[i]["status"] === "success") { count += 1; }
        }

        alert(`${count}명의 회원이 복원되었습니다.`);
        setApprovalDialogOpen(false);
        document.location.reload();
      })
      .catch(error => { 
        errorLog(error);
      })
  }

  // 2. 삭제
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);
  const [deletionDialogTitle, setDeletionDialogTitle] = useState("");
  const handleDeletionDialogOpen = () => { 
    const willBeDeletedNames = Object.keys(selectedRejectedPeople).map((key) => selectedRejectedPeople[key].username);
    if (willBeDeletedNames.length !== 0) { 
      setDeletionDialogOpen(true);
      setDeletionDialogTitle(
        <React.Fragment>
          <span id="first-name-in-dialog-title">
            <b>{willBeDeletedNames[0]}</b>
          </span>
          <span>
            &nbsp;외 {willBeDeletedNames.length - 1} 명을 삭제하시겠습니까?
          </span>
        </React.Fragment>
      );
    }
    else { alert(`삭제할 사람을 체크해주세요.`); }
  }
  const handleDeletionDialogClose = () => { setDeletionDialogOpen(false); }
  const handleDeletionAgree = (event) => {  // 제출 이후에 page fresh 등을 통해 표 데이터 재구성 + textarea 지우기
    alert(`삭제 완료되었습니다.`);
    setDeletionDialogOpen(false);
  }


  const [applicants, setApplicants] = useState([]);
  const [RejectedPeople, setRejectedPeople] = useState([]);
  useEffect(() => {
    axiosAPI.get("/api/admin/ROLE_BEFORE")
      .then(response => {
        let temp = response.data;
        temp.sort((a,b) => {
          if (new Date(a["isCreated"]) < new Date(b["isCreated"])) {  return 1; }
          if (new Date(a["isCreated"]) > new Date(b["isCreated"])) { return -1; }
          return 0;
        })
        setApplicants(temp);
      })
      .catch(error => { 
        errorLog(error);
      })
    
    axiosAPI.get("/api/admin/ROLE_REJECT")
      .then(response => { 
        let temp = response.data;
        temp.sort((a,b) => {
          if (new Date(a["isCreated"]) < new Date(b["isCreated"])) {  return 1; }
          if (new Date(a["isCreated"]) > new Date(b["isCreated"])) { return -1; }
          return 0;
        })
        setRejectedPeople(temp);
      })
      .catch(error => { 
        errorLog(error);
      })
  }, [])


  return(
    <div className="page-content">
      <Container fluid={true}>
        <Row>
          <Col xs="12">

            <Card>
              <CardBody style={{padding: "1.25rem 1.25rem 0.75rem"}}>

                <CardTitle><div className="card-title-wrapper">신청자 목록(총 {applicants.length}명)</div></CardTitle>

                <hr style={{width: "100%", margin: "0.5rem"}}/>

                <div className="d-flex">
                  <ButtonReact color="info" className="employee-management-function-btn"
                  onClick={handleApprovalDialogOpen}>
                    승인
                  </ButtonReact>
                  <DialogTemplate open={approvalDialogOpen} handleClose={handleApprovalDialogClose} 
                  handleAgreement={handleApprovalAgree} dialogTitle={approvalDialogTitle} />

                  <ButtonReact color="danger" className="employee-management-function-btn"
                  onClick={handleRejectionDialogOpen}>
                    거절
                  </ButtonReact>
                  <RejectApplicantDialog open={rejectionDialogOpen} handleClose={handleRejectionDialogClose} 
                  handleAgreement={handleRejectionAgree} dialogTitle={rejectionDialogTitle} />

                  <InputGroup style={{maxWidth: "200px", marginLeft: "20px"}}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>아이디검색</InputGroupText>
                    </InputGroupAddon>
                    <Input value={searchAppliedUsername} onChange={handleSearchAppliedUsername} />
                  </InputGroup>
                </div>

              </CardBody>
              <CardBody>
                <div>
                  <AppliedList applicants={applicants} searchInput={searchAppliedUsername}
                  handleSelectedApplicants={handleSelectedApplicants} />
                </div>
              </CardBody>
            </Card>


          </Col>
        </Row>
      </Container>


      <Container fluid={true}>
        <Row>
          <Col xs="12">

            <Card>
              <CardBody style={{padding: "1.25rem 1.25rem 0.75rem"}}>

              <CardTitle><div className="card-title-wrapper">거절된 목록(총 {RejectedPeople.length}명)</div></CardTitle>

                <hr style={{width: "100%", margin: "0.5rem"}}/>

                <div className="d-flex">
                  <ButtonReact color="secondary" className="employee-management-function-btn"
                  onClick={handleRestorationDialogOpen} >
                    복원
                  </ButtonReact>
                  <DialogTemplate open={restorationDialogOpen} handleClose={handleRestorationDialogClose} 
                  handleAgreement={handleRestorationAgree} dialogTitle={restorationDialogTitle} />

                  <ButtonReact color="danger" className="employee-management-function-btn"
                  onClick={handleDeletionDialogOpen} style={{display: "none"}} >
                    삭제
                  </ButtonReact>
                  <DialogTemplate open={deletionDialogOpen} handleClose={handleDeletionDialogClose} 
                  handleAgreement={handleDeletionAgree} dialogTitle={deletionDialogTitle} />

                  <InputGroup style={{maxWidth: "200px", marginLeft: "20px"}}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>이름검색</InputGroupText>
                    </InputGroupAddon>
                    <Input value={searchRejectedUsername} onChange={handleSearchRejectedUsername} />
                  </InputGroup>
                </div>

              </CardBody>
              <CardBody>
                <div>
                  <RejectedList RejectedPeople={RejectedPeople} searchInput={searchRejectedUsername}
                  handleSelectedRejectedPeople={handleSelectedRejectedPeople} />
                </div>
              </CardBody>
            </Card>

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(ApplicantApproval)