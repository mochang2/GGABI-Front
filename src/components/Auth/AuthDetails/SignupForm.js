import React, { useRef, useEffect, useState } from "react";

// signup contents component
import SignupFirstStep from "./SignupFirstStep"
import SignupSecondStep from "./SignupSecondStep"

// design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleRight } from  "@fortawesome/free-solid-svg-icons"

const SignupForm = (props) => {
  
const [signupSuccess, setSignupSuccess] = useState(false);

// presents signup step
const firstStepRef = useRef();
const secondStepRef = useRef();

useEffect(() => {
  if (signupSuccess) {
    firstStepRef.current.classList.remove("signup-step-active-li");
    secondStepRef.current.classList.add("signup-step-active-li");
  }
  else {
    firstStepRef.current.classList.add("signup-step-active-li");
    secondStepRef.current.classList.remove("signup-step-active-li");
  }
});


  return (
    <div className="signup-form-outer-wrapper">
      <div className="signup-form-inner-wrapper">
        <div className="signup-step-wrapper">
          <hr style={{border: "0", height: "2px", backgroundColor: "black"}} />
          <ul className="signup-status-bar-ul">
            <li className="signup-first-step-li signup-step-active-li" ref={firstStepRef}>
              <label><b>가입정보입력</b></label>
            </li>
            <FontAwesomeIcon icon={faArrowCircleRight} />
            <li className="signup-second-step-li" ref={secondStepRef}>
              <label><b>회원가입완료</b></label>
            </li>
          </ul>
          <hr style={{border: "0", height: "2px"}} />
        </div>
        <form action="" method="POST" encType="application/x-www-form-urlencoded" id="signup-form">
          {!signupSuccess ?
          <SignupFirstStep setSignupSuccess={setSignupSuccess} /> :
          <SignupSecondStep />}
        </form>
      </div> 
    </div>
  )
}

export default SignupForm