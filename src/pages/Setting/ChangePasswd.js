import React from "react"

// sidebar
import SettingSidebar from "./SettingSidebar"

// design
import { Container, Row, Col, Card, CardTitle, CardSubtitle, CardBody } from "reactstrap"
import comingSoonImg from "../../assets/images/coming-soon-img.png"


const ChangePasswd = (props) => {
  return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col xl="2">
              <SettingSidebar />
            </Col>

            <Col xl="10">
              <Card>
                <CardTitle className="d-flex mt-5" style={{justifyContent: "center"}}>
                  비밀번호 변경 페이지
                </CardTitle>
                <CardSubtitle className="d-flex mt-5" style={{justifyContent: "center"}}>
                  준비중입니다
                </CardSubtitle>
                <CardBody>
                  <img src={comingSoonImg} alt="이미지" style={{width: "100%", height: "auto"}} />
                </CardBody>
              </Card>
            </Col>

          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default ChangePasswd