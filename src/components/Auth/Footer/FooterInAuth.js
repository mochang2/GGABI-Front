import React from "react"

// common components
import TermsInFooter from "../../Common/TermsInFooter"
import CorpInfoInFooter from "../../Common/CorpInfoInFooter"

// design
import "./footerInAuth.css"
// import Divider from '@mui/material/Divider';

const style = {
  backgroundColor: "inherit",
  width: "100%",
};

const FooterInAuth = (props) => {
  return (
    <div style={style} className="outer-footer-wrapper">
      <div className="above-wrapper-in-auth-footer wrapper-in-auth-footer">
        <TermsInFooter />
      </div>

      <div className="bottom-wrapper-in-auth-footer wrapper-in-auth-footer">
        <CorpInfoInFooter />
      </div>
    </div>
  )
}

export default FooterInAuth