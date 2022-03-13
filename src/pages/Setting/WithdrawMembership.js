import React, { useState, useEffect } from "react"

// router-dom
import { withRouter } from "react-router-dom"

// router
import LinkTo from "../../routes/LinkTo"

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// sidebar
import SettingSidebar from "./SettingSidebar"

// design
import { Container, Row, Col, Card, CardTitle, CardBody } from "reactstrap"



const WithdrawMembership = (props) => {

  // enable, disable btn
  const [withdrawalTextInvalid, setwithdrawalTextInvalid] = useState(true);

  // inputs
  const [withdrawalReason, setWithdrawalReason] = useState("");
  const handleWithdrawalReason = (event) => { setWithdrawalReason(event.target.value); }
  const [withdrawalText, setWithdrawalText] = useState("");
  const handleWithdrawalText = (event) => { 
    setWithdrawalText(event.target.value); 
  }

  useEffect(() => {
    if (withdrawalText === `${localStorage.getItem("user")}@ggabi.co.kr`) { setwithdrawalTextInvalid(false); }
    else {  setwithdrawalTextInvalid(true); }
  }, [withdrawalText])


  // click withdrawal btn
  const clickWithdrawalBtn = (event) => {
    axiosAPI.delete("/api/user")
      .then(response => {
        if (response.data["status"] === "success") { 
          alert(`회원 탈퇴에 성공하였습니다.`);
          props.history.push(LinkTo.logout);
        }
        else {
          console.log(response);
          alert(`회원 탈퇴에 실패하였습니다.`);
        }
      })
      .catch(error => {
        errorLog(error);
        alert(`회원 탈퇴에 실패하였습니다.`);
      })
  }



  return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col xl="2">
              <SettingSidebar />
            </Col>

            <Col xl="10">
              <Card className="p-5">
                <CardTitle className="withdraw-page-title">
                  회원탈퇴
                </CardTitle>

                <CardBody className="withdraw-letter withdraw-notice">
                  1. 회원을 탈퇴하면 그동한 회원들에게 제공되던 서비스와 기타 정보관련 서비스 등을 이용하는데 제한을 받게 됩니다. <br/>
                  2. 회원을 탈퇴하면 상담 내역을 포함한 회원에 대한 모든 정보가 삭제되며, 이후 복구가 불가능합니다. <br/>
                  3. 회원을 탈퇴하면 첨부파일을 포함하여 메일함에 있는 모든 메일 내용들이 지워집니다. 
                  다만, 송수신 이력에 대해서는 관리자가 여전히 가지고 있습니다. <br/>
                </CardBody>

                <CardBody className="d-flex withdraw-letter">
                  <span>탈퇴 사유</span>
                  <textarea rows="5" placeholder="선택 사항입니다."
                  value={withdrawalReason} onChange={handleWithdrawalReason} />
                </CardBody>

                <CardBody className="d-flex withdraw-letter">
                  <span>회원 탈퇴를 진행하고 싶으면 다음 글자를 따라 입력해주세요: 
                    <b>{localStorage.getItem("user")}@ggabi.co.kr 탈퇴합니다</b>
                  </span>
                  <input placeholder="example@ggabi.co.kr"
                  value={withdrawalText} onChange={handleWithdrawalText} />
                </CardBody>
                
                <CardBody className="withdraw-letter" >
                  {withdrawalTextInvalid ? 
                  <button className="inactive-btn">탈퇴</button> :
                  <button className="active-btn" onClick={clickWithdrawalBtn}>탈퇴</button>
                  }
                </CardBody>
              </Card>
            </Col>

          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(WithdrawMembership)