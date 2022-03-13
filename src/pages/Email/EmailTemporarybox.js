import React from "react"

import { Container, Row, Col } from "reactstrap"

//Import Email Sidebar
import EmailSideBar from "./EmailSidebar"



const EmailTemporarybox = (props) => {
  return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xs="12">
              <EmailSideBar userData={props.userData}/>
            </Col>
          </Row>
          
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EmailTemporarybox;