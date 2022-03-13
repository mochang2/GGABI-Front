import React, {useEffect} from "react"
import { withRouter } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

//Import Images
import errorImg from "../../assets/images/404-error.png"


const Pages404 = (props) => {
  useEffect(() => {
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });
  
  return (
    <React.Fragment>
      <div className="my-5 pt-sm-5">
        <Container>
          <Row>
            <Col md={12}>
              <div className="text-center">
                <div>
                  <Row className="row justify-content-center">
                    <Col sm={4}>
                      <div className="error-img">
                        <img src={errorImg} alt="" className="img-fluid mx-auto d-block" />
                      </div>
                    </Col>
                  </Row>
                </div>
                <h4 className="text-uppercase mt-4">죄송합니다. 페이지를 찾을 수 없습니다.</h4>
                <p className="text-muted">이전 페이지로 돌아가고 싶으시면 아래 "돌아가기" 버튼을 눌러주세요</p>
                <div className="mt-5">
                  <button className="btn btn-primary waves-effect waves-light" onClick={props.history.goBack}>돌아가기</button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Pages404)
