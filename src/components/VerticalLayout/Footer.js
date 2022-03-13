import React from "react"

// common components
import TermsInFooter from "../Common/TermsInFooter"
import CorpInfoInFooter from "../Common/CorpInfoInFooter"

// design
import Divider from '@mui/material/Divider';

const Footer = () => {
  return (
    <div className="outer-footer-wrapper">
      <Divider />
      <div className="above-wrapper-in-main-content-footer wrapper-in-main-content-footer">
        <TermsInFooter />
      </div>

      <Divider />
      <div className="bottom-wrapper-in-main-content-footer wrapper-in-main-content-footer">
        <CorpInfoInFooter />
      </div>
    </div>
  )
}

export default Footer
