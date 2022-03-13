import React from "react"

// route
import { Link } from "react-router-dom";
import LinkTo from "../../routes/LinkTo"

// design
import { Container, Row, Col, Card, CardTitle, CardBody } from "reactstrap"
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { ContentForPromotion } from "../../components/Auth/AuthDetails/SignupAgreementContent"



const ReceivePromotion = (props) => {
  return (
    <div className="terms-and-conditions-outer-wrapper">
      <div className="d-flex terms-and-conditions-inner-wrapper">
        <Container fluid>
          <Row>
            <Col xs="12">
              <div className="d-flex terms-and-conditions-above-wrapper">
                <img src={process.env.PUBLIC_URL + "/Logo_Calligraphy.png"}
                alt="로고 이미지" onClick={() => document.location.href=LinkTo.emailInbox} 
                className="logo-img-in-header"/>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs="12">
              <Card className="terms-and-conditions-nav-bar-wrapper">
                <Breadcrumbs aria-label="breadcrumb" separator="|">
                  <Link to={LinkTo.useGgabi} className="inactive">
                    깨비메일 이용약관
                  </Link>
                  <Link to={LinkTo.collectPersonalInfo} className="inactive">
                    개인정보 수집 및 이용에 대한 약관
                  </Link>
                  <Link to="#" className="active">
                    프로모션 수신 약관
                  </Link>
                </Breadcrumbs>
              </Card>

              <Card className="terms-and-conditions-body-wrapper">
                <div className="d-flex terms-and-conditions-title">
                  <CardTitle>
                    프로모션 수신 약관
                  </CardTitle>
                </div>
                <hr />
                <CardBody>
                  <ContentForPromotion />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default ReceivePromotion;