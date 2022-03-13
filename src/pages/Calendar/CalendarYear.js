import React, { useState } from "react"

// route
import { withRouter } from "react-router-dom"

// calendar
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import dayjs from "dayjs"

// design
import { Container, Row, Col, Card, CardBody, ButtonGroup, Button as ButtonReact } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import LinkTo from "../../routes/LinkTo"


const CalendarYear = (props) => {
  // Google calendar 연동은 구글 인증이 해결될 때까지 안 됨.

  // shown year
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const increaseYear = () => { setCurrentYear(currentYear + 1); }
  const decreaseYear = () => { setCurrentYear(currentYear - 1); }


  // https://www.npmjs.com/package/react-calendar
  // node_module/react-calendar/dist/Calendar.css 에 style sheet 있음
  // 각각의 "N월" 이렇게 표시된 부분 글씨체 바꿔야 함.
  return(
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Col>
          <Row xs={12}>

            <Card>
              <CardBody className="d-flex calendar-header-wrapper">
                <div>
                  <ButtonGroup>
                    <ButtonReact color="primary" onClick={decreaseYear}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </ButtonReact>
                    <ButtonReact color="primary" onClick={increaseYear}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </ButtonReact>
                  </ButtonGroup>

                  <ButtonGroup style={{marginLeft: "0.75rem"}}>
                    <ButtonReact color="primary">
                      저장
                    </ButtonReact>
                  </ButtonGroup>
                </div>

                <div className="calendar-header-current-year-label">
                  {`${currentYear}년`}
                </div>

                <div>
                  <ButtonGroup>
                    <ButtonReact style={{backgroundColor: "#495CBA", border: "1px solid #495CBA"}}>
                      년
                    </ButtonReact>
                    <ButtonReact color="primary" onClick={(e) => props.history.push(LinkTo.calendarMonth)}>
                      월
                    </ButtonReact>
                    <ButtonReact color="primary" onClick={(e) => props.history.push(LinkTo.calendarWeek)}>
                      주
                    </ButtonReact>
                    <ButtonReact color="primary" onClick={(e) => props.history.push(LinkTo.calendarDay)}>
                      일
                    </ButtonReact>
                  </ButtonGroup>
                </div>
              </CardBody>
              
              <CardBody style={{display: "inline-flex", flexWrap: "wrap", justifyContent: "space-around"}}>
                {
                  Array.from({length: 12}, (_, index) => {
                    return (
                      <Calendar calendarType="US" defaultView="month" activeStartDate={new Date(currentYear,index,1)}
                      formatDay={(locale, date) => dayjs(date).format('D')} locale="ko-KR"
                      formatMonthYear={(locale, date) => dayjs(date).format('M') + "월"}
                      view="month" />
                    )
                  })
                }
              </CardBody>
            </Card>

          </Row>
        </Col>
      </Container>
    </div>
    </React.Fragment>
  )
}

export default withRouter(CalendarYear)