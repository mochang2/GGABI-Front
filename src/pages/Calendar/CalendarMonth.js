import React from "react"

// route
import { withRouter } from "react-router-dom"
import LinkTo from "../../routes/LinkTo"

// full calendar
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"
import localeKo from "@fullcalendar/core/locales/ko"

// design
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import "@fullcalendar/bootstrap/main.css" /* natural color for navlinks */


const CalendarMonth = (props) => {
  // Google calendar 연동은 구글 인증이 해결될 때까지 안 됨.

  const events = [
    {
      id: 1,
      title: 'event 1 이름',
      start: '2021-10-14T10:00:00',
      end: '2021-10-14T12:00:00',
      className: "calendar-department-schedule text-dark",
    },
    {
      id: 2,
      title: 'event 2 이름',
      start: '2021-11-25T13:00:00',
      end: '2021-11-25T18:00:00',
      className: "calendar-personal-schedule text-dark",
    },
    { 
      id: 3, 
      title: 'event 3 이름', 
      start: '2021-12-17', 
      end: '2021-12-20',
      className: "calendar-team-schedule text-dark",
    },
    {
      id: 4,
      title: 'event 4 이름',
      start: '2021-11-14T10:00:00',
      end: '2021-11-14T12:00:00',
      className: "calendar-department-schedule text-dark",
    },
    { 
      id: 5, 
      title: 'event 5 이름', 
      start: '2021-11-17', 
      end: '2021-11-20',
      className: "calendar-team-schedule text-dark",
    },
  ];


  // 색의 종류는 1.eventColor 2.eventBackgroundColor 3.eventTextColor 4.eventBorderColor가 있음. 4는 안 씀.
  // 1. render에서 eventColor는 event의 동그라미 색깔을 의미
  // 2. eventBackgroundColor는 className으로 색 지정
  //    개인 일정(calendar-personal-schedule), 팀 일정(calendar-team-schedule), 부서 일정(calendar-department-schedule) 3가지로 나눔.
  // 3. 하루 내의 일정은 className text-dark로 글자색을 바꿀 수 있지만, 여러 날에 걸친 일정은 render 부분의 eventTextColor에서 설정해줘야 함.
  //    글자 색은 text-dark 클래스 또는 eventTextColor에서 "#343a40" 로 통일

  // https://fullcalendar.io/docs/event-object
  // https://wickedmagic.tistory.com/501
  // retnder에서 eventMouseEnter={(e) => e.el.style.backgroundColor="inherit"} 와 eventMouseLeave를 이용하면 hover시 event를 바꿔줄 수 있음.
  // scss/custom/plugin/_calendar.scss에 style sheet

  // 각각의 월 달력에서 "N일" 글씨체 바꿔야 함. Week / Day는 timegrid "오전/오후 N시" 글씨체 바꿔야 함.
  return(
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Col>
          <Row xs={12}>

            <Card>
              <CardBody>
                <FullCalendar plugins={[dayGridPlugin, interactionPlugin, BootstrapTheme]}
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
                  weekBtn: {
                    text: "주",
                    click: () => {
                      props.history.push(LinkTo.calendarWeek)
                    }
                  },
                  dayBtn: {
                    text: "일",
                    click: () => {
                      props.history.push(LinkTo.calendarDay)
                    }
                  }
                }}
                locale={localeKo} initialView="dayGridMonth" timeZone="Asia/Seoul" themeSystem="bootstrap"
                headerToolbar={{start:"prev,next storeBtn", center:"title", end:"yearBtn,dayGridMonth,weekBtn,dayBtn"}}
                editable={true} selectable={true} handleWindowResize={true} events={events}
                eventColor="#ffffff" eventTextColor="#343a40" />
              </CardBody>
            </Card>

          </Row>
        </Col>
      </Container>
    </div>
    </React.Fragment>
  )
}

export default withRouter(CalendarMonth)