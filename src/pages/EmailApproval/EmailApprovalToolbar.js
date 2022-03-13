import React from "react"


const EmailApprovalToolbar = (props) => {

  return (
    <React.Fragment>

    <div className="column-0-title-wrapper d-flex">
      <b>{props.columnZeroTitle}</b>
    </div>

    <div className="selectnum-wrapper d-flex">
      <div className="mail-num-in-one-view-wrapper">
        <select name="mail-num-in-one-view" id="mail-num-in-one-view" onChange={props.handleSelectNumChange}
        value={props.selectNum}>
          <option value={1}>1</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span>개씩 보기</span>
      </div>
    </div>

    </React.Fragment>
  )
}

export default EmailApprovalToolbar
