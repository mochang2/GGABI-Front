import React from "react"

// route
import { withRouter } from "react-router-dom"
import LinkTo from "../../routes/LinkTo"

// full calendar
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"
import localeKo from "@fullcalendar/core/locales/ko"

// design
import { Container, Row, Col, Card, CardBody } from "reactstrap"


const CalendarDay = (props) => {
  // Google calendar 연동은 구글 인증이 해결될 때까지 안 됨.
  
  return(
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Col>
          <Row xs={12}>

            <Card>
              <CardBody>
                <FullCalendar plugins={[timeGridPlugin, interactionPlugin, BootstrapTheme]}
                customButtons={{
                  storeBtn: {
                    text: "저장",
                    click: () => {
                      alert(`저장 기능 만들기`);
                    }
                  },
                  yearBtn: {
                    text: "년",
                    click: () => {
                      props.history.push(LinkTo.calendarYear)
                    }
                  },
                  monthBtn: {
                    text: "월",
                    click: () => {
                      props.history.push(LinkTo.calendarMonth)
                    }
                  },
                  weekBtn: {
                    text: "주",
                    click: () => {
                      props.history.push(LinkTo.calendarWeek)
                    }
                  }
                }}
                locale={localeKo} initialView="timeGridDay" timeZone="Asia/Seoul" themeSystem="bootstrap"
                headerToolbar={{start:"prev,next storeBtn", center:"title", end:"yearBtn,monthBtn,weekBtn,timeGridDay"}}
                editable={true} selectable={true} allDaySlot={false} handleWindowResize={true} />
              </CardBody>
            </Card>

          </Row>
        </Col>
      </Container>
    </div>
    </React.Fragment>
  )
}

export default withRouter(CalendarDay)