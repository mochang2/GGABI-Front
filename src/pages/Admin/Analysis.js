import React from "react"

// chart components
import RatioOfMaliciousMail from "../../components/Admin/AdminDetails/RatioOfMaliciousMail"
import RatioOfFilteredMails from "../../components/Admin/AdminDetails/RatioOfFilteredMails"

// design
import { Container, Row, Col } from "reactstrap"

const Analysis = (props) => {

  return(
      <div className="page-content">
          <Container fluid>
            <Row>

              <Col xl={7}>
                <RatioOfMaliciousMail />
              </Col>

              <Col xl={5}>
                <RatioOfFilteredMails />
              </Col>


            </Row>
          </Container>
      </div>
  )
}

export default Analysis