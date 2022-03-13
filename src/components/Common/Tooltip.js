import React from "react"

// design
import { Button as ButtonReact } from "reactstrap"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/material/styles"
import { Container, Row, Col, Button } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"


// LightTooltip
// email, admin(gather company emails)
export const LightTooltipBorderBlack = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[4],
    fontSize: 14,
    border: "1px solid black",
  },
}));

//// TODO: Link 부분 클릭 시 화면이 이동하든가, 모달이 뜨는 식의 동작 추가해야 함.
export const LightTooltipBorder040404 = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
    border: "1px solid #040404"
  },
}));


// mail write modal
export const MailReservationTooltip = (props) => {
  return (
    <React.Fragment>
    <div className="mail-reservation-tooltip-date-time-wrapper">
      <input type="date" value={props.reservationDate} onChange={props.handleReservationDate} />
      <input type="time" value={props.reservationTime} onChange={props.handleReservationTime} />
    </div>
    <div className="mail-reservation-tooltip-bottom-wrapper d-flex">
      <ButtonReact onClick={props.onClose}>
        x
      </ButtonReact>
      <ButtonReact color="primary" onClick={props.handleReservationDateTime}>
        저장
      </ButtonReact>
    </div>
    </React.Fragment>
  )
}


// admin(gather company emails)
export const SearchTooltip = (props) => {

  const ShowConditionOptions = (column) => {
    if (column === "위험도") {
      return (
        <React.Fragment>
          <option value="">---------------</option>
          <option value="same">일치</option>
          <option value="not-same">일치하지않음</option>
        </React.Fragment>
      )
    }
    else if (column === "송신자") {
      return (
        <React.Fragment>
          <option value="">---------------</option>
          <option value="same">일치</option>
          <option value="not-same">일치하지않음</option>
          <option value="contain">포함</option>
          <option value="not-contain">포함하지않음</option>
        </React.Fragment>
      )
    }
    else if (column === "수신자") {
      return (
        <React.Fragment>
          <option value="">---------------</option>
          <option value="same">일치</option>
          <option value="not-same">일치하지않음</option>
          <option value="contain">포함</option>
          <option value="not-contain">포함하지않음</option>
        </React.Fragment>
      )
    }
    else if (column === "제목") {
      return (
        <React.Fragment>
          <option value="">---------------</option>
          <option value="same">일치</option>
          <option value="not-same">일치하지않음</option>
          <option value="contain">포함</option>
          <option value="not-contain">포함하지않음</option>
        </React.Fragment>
      )
    }
    // else if (column === "내용") {
    //   return (
    //     <React.Fragment>
    //       <option value="">---------------</option>
    //       <option value="same">일치</option>
    //       <option value="not-same">일치하지않음</option>
    //       <option value="contain">포함</option>
    //       <option value="not-contain">포함하지않음</option>
    //     </React.Fragment>
    //   )
    // }
    // else if (column === "용량") {
    //   return (
    //     <React.Fragment>
    //       <option value="">---------------</option>
    //       <option value="same">일치</option>
    //       <option value="greater-than-or-equal">이상</option>
    //       <option value="less-than-or-equal">이하</option>
    //       <option value="greater-than">초과</option>
    //       <option value="less-than">미만</option>
    //     </React.Fragment>
    //   )
    // }
    else if (column === "날짜") {
      return (
        <React.Fragment>
          <option value="">---------------</option>
          <option value="after-or-greater-than-or-equal">이후</option>
          <option value="before-or-less-than-or-equal">이전</option>
        </React.Fragment>
      )
    }
    else {
      return null;
    }
  }

  return (
    <div role="tooltip" className="search-tooltip-outer-wrapper">
      <div className="d-flex">

        <Container fluid>
          <Row>
            
            <Col sm="2" className="filter-column" style={{position: "relative"}}>
              <label data-shrink="true" htmlFor="column-name">열</label>
              <select id="column-name" value={props.columnSelection} onChange={props.handleColumnSelection} >
                {Object.keys(props.searchKeys).map((key, index) => {
                  return (
                    <React.Fragment key={index}>
                      <option value={key}>{key}</option>
                    </React.Fragment>
                  )
                })}
              </select>
              <span><FontAwesomeIcon icon={faCaretDown} /></span>
            </Col>
            
            <Col sm="3" className="filter-column">
              <label data-shrink="true" htmlFor="condition">조건</label>
              <select id="condition" value={props.conditionSelection} onChange={props.handleConditionSelection} >
                {ShowConditionOptions(props.columnSelection)}
              </select>
              <span><FontAwesomeIcon icon={faCaretDown} /></span>
            </Col>
        
            <Col sm="7" className="filter-column">
              <label data-shrink="true" htmlFor="input-value">값</label>
              <input type="text" id="input-value" value={props.inputValue} onChange={props.handleInputValue}
              placeholder={props.columnSelection === "날짜" ? "yyyy-mm-dd 형식" : "" } />
            </Col>

          </Row>
        </Container>
        
        <div>
          <Button color="secondary" style={{padding: "0.1rem 0.4rem"}}
          title="필터 종료" onClick={props.onClose}>
            X
          </Button>
        </div>

      </div>
    </div>
  )
}