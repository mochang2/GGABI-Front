import React from "react"

// router
import LinkTo from "../../routes/LinkTo"

// design
import "./TermsInFooter.css"


const TermsInFooter = (props) => {

  return (
    <React.Fragment>
      <span className="text-opening-modal-in-footer"
      onClick={(e) => window.open(LinkTo.useGgabi)}>
        이용약관
      </span>

      <span className="text-opening-modal-in-footer"
      onClick={(e) => window.open(LinkTo.collectPersonalInfo) }>
        개인정보처리방침
      </span>

      <span className="text-opening-modal-in-footer"
      onClick={(e) => alert(`아직 고객센터는 없습니다.`)}>
        고객센터
      </span>
    </React.Fragment>
  )
}

export default TermsInFooter

