import React, { useState, useEffect, useRef } from "react"

import { Link } from "react-router-dom"
import LinkTo from "../../../routes/LinkTo"

// api
import { axiosAPI, errorLog } from "../../../APIs/BaseAPI"

// agreement content
import { ContentForUsingGgabi, ContentForCollectingPersonalInfo, ContentForPromotion } from "./SignupAgreementContent"

// design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from  "@fortawesome/free-solid-svg-icons"
import Checkbox from "@mui/material/Checkbox"
import { pink } from "@mui/material/colors"


const checkboxStyle = {
  color: pink[800],
  '&.Mui-checked': {
    color: pink[600],
  },
  '& .MuiSvgIcon-root': { 
    fontSize: '18px'
  },
  padding: "0 9px !important"
};

const faviconStyle = {
  position: "relative", 
  bottom: "8px"
};

const departmentNames = [
  "보안", "회계", "개발", "영업", "인사", "재무"
];

const positionNames = [
  "사원", "대리", "과장", "차장", "부장", "사장"
];



const SignupFirstStep = (props) => {
    
  // checkbox
  const [checkAll, setCheckAll] = useState(false);
  const [checkFirst, setCheckFirst] = useState(false);
  const [checkSecond, setCheckSecond] = useState(false);
  const [checkThird, setCheckThird] = useState(false);

  const handleCheckAll = (event) => {
    setCheckAll(!checkAll);
    // all,1,2,3이 체크된 상태였다가 all 체크를 해제했을 때, 이 함수 내부에서는 set에 대해 반영이 안되어서 이런 조건을 씀
    if (checkAll && checkFirst && checkSecond && checkThird ) {
        setCheckFirst(false);
        setCheckSecond(false);
        setCheckThird(false);
    }
  }
  const handleCheckFirst = (event) => {
    setCheckFirst(!checkFirst);
    // all,1,2,3이 체크된 상태였다가 1 체크를 해제했을 때
    if (checkAll && checkFirst && checkSecond && checkThird ) {
        setCheckAll(false);
    }
  }
  const handleCheckSecond = (event) => {
    setCheckSecond(!checkSecond);
    // all,1,2,3이 체크된 상태였다가 2 체크를 해제했을 때
    if (checkAll && checkFirst && checkSecond && checkThird ) {
        setCheckAll(false);
    }
  }
  const handleCheckThird = (event) => {
    setCheckThird(!checkThird);
    // all,1,2,3이 체크된 상태였다가 3 체크를 해제했을 때
    if (checkAll && checkFirst && checkSecond && checkThird ) {
        setCheckAll(false);
    }
  }

  useEffect(() => {
    let checkCount = 0;
    let flag; // to present 3 boxes are checked

    const checkArray = [checkFirst, checkSecond, checkThird];
    for(let i in checkArray) {
        if(checkArray[i]) { checkCount += 1; }
    }
    // 하나하나 체크하여 1,2,3이 모두 체크됐다면
    if (checkCount === 3) { flag = true; }

    if (flag) { setCheckAll(true); }
    else {
      if (checkAll) { // 하나하나 체크하지 않았지만 all이 체크됐다면
        setCheckFirst(true);
        setCheckSecond(true);
        setCheckThird(true);
      }
    }
  }, [checkAll, checkFirst, checkSecond, checkThird]);


    // show and hide terms and conditions details
  const [showFirst, setShowFirst] = useState(false);
  const showFirstRef = useRef();
  const [showSecond, setShowSecond] = useState(false);
  const showSecondRef = useRef();
  const [showThird, setShowThird] = useState(false);
  const showThirdRef = useRef();

  const handleShowFirst = (event) => { setShowFirst(!showFirst); }
  const handleShowSecond = (event) => { setShowSecond(!showSecond); }
  const handleShowThird = (event) => { setShowThird(!showThird); }

  useEffect(() => {
    // show: true => flex style, show: false => none style
    if(!showFirst) { showFirstRef.current.style.display = "none"; }
    else { showFirstRef.current.style.display = "flex"; }

    if(!showSecond) { showSecondRef.current.style.display = "none"; }
    else { showSecondRef.current.style.display = "flex"; }

    if(!showThird) { showThirdRef.current.style.display = "none"; }
    else { showThirdRef.current.style.display = "flex"; }
  });


  // input value tracing
  const [idValue, setIdValue] = useState("");
  const handleIdValue = (event) => { setIdValue(event.target.value); }
  const [passwdValue, setPasswdValue] = useState(""); // handler는 아래에 따로 있음

  const [passwdConfirmValue, setPasswdConfirmValue] = useState(""); // handler는 아래에 따로 있음
  const [nicknameValue, setNicknameValue] = useState("");
  const handleNicknameValue = (event) => { setNicknameValue(event.target.value); }

  const [phoneNumValue, setPhoneNumValue] = useState("");
  const [birthdayValue, setBirthdayValue] = useState("");
  const handleBirthdayValue = (event) => { setBirthdayValue(event.target.value); }

  const [emailValue, setEmailValue] = useState(""); // handler는 아래에 따로 있음
  const [departmentValue, setDepartmentValue] = useState("");
  const handleDepartmentValue = (event) => { setDepartmentValue(event.target.value); }

  const [positionValue, setPositionValue] = useState("");
  const handlePositionValue = (event) => { setPositionValue(event.target.value); }
  const [genderValue, setGenderValue] = useState("");
  const handleGenderValue = (event) => { setGenderValue(event.target.value); }


  // inputs validation
  const [idInvalid, setIdInvalid] = useState(false);
  const idRule = new RegExp("[_]");
  const [passwdInvalid, setPasswdInvalid] = useState(false);
  const [passwdConfirmInvalid, setPasswdConfirmInvalid] = useState(false);
  const passwdRule = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$");
  const [phonenumInvalid, setPhonenumInvalid] = useState(false);
  const phonenumRule = new RegExp("^[0-9]{11}$");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const emailRule = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

  useEffect(() => {
    if (idValue.length === 0 || idValue.length > 20 || idRule.test(idValue)) { setIdInvalid(true); }
    else { setIdInvalid(false); }
  }, [idValue, idRule])
  const handlePasswdInvalid = (event) => {
    setPasswdValue(event.target.value);
    
    if (!passwdRule.test(inputPasswd.current.value)) { setPasswdInvalid(true); }
    else { setPasswdInvalid(false); }
  }
  const handlePasswdConfirmInvalid = (event) => {
    setPasswdConfirmValue(event.target.value);

    if (inputPasswd.current.value !== inputPasswdConfirm.current.value) { setPasswdConfirmInvalid(true); }
    else { setPasswdConfirmInvalid(false); }
  }
  const handlePhoneNumValue = (event) => {
    setPhoneNumValue(event.target.value);

    if (!phonenumRule.test(inputPhonenum.current.value)) { setPhonenumInvalid(true); }
    else { setPhonenumInvalid(false); }
  }
  const hanldeEmailInvalid = (event) => {
    setEmailValue(event.target.value);

    if (!emailRule.test(inputEmail.current.value) && inputEmail.current.value !== "") { setEmailInvalid(true); }
    else { setEmailInvalid(false); }
  }

  const inputPasswd = useRef();
  const inputPasswdConfirm = useRef();
  const inputPhonenum = useRef();
  const inputEmail = useRef();


  // signup form submit
  const submitSignupForm = async (event) => {
    event.preventDefault();

    if (idValue.length === 0 || passwdValue.length === 0 || passwdConfirmValue.length === 0 || 
      nicknameValue.length === 0 || phoneNumValue.length === 0 || birthdayValue.length === 0 ||
      departmentValue.length === 0 || positionValue.length === 0) {
      alert(`필수 입력칸에 입력이 되지 않았습니다.`);
    }
    else {
      axiosAPI.post("/api/auth/signup", {
        "username": idValue,
        "password": passwdValue,
        "nickname": nicknameValue,
        "phone"   : phoneNumValue,
        "birthday": birthdayValue,
        "email"   : emailValue,
        "gender"  : genderValue,
        "department": departmentValue,
        "position": positionValue,
        "authority": "ROLE_USER",

        headers: {
          'Content-Type': 'text/plain; charset=UTF-8',
        },
      })
      .then(response => {
        console.log(`response`, response.data);
        if (response.data["status"] === "fail") {
          alert(`${response.data["message"]}`);
        }
        else {
          props.setSignupSuccess(true);
        }
      })
      .catch(error => {
        alert(`회원가입에 실패하셨습니다. 회원가입 입력이 올바르지 않거나 네트워크 또는 서버 내부 오류입니다.`)
        errorLog(error);
      });
    }
  }
    
  
   
  return (
    <React.Fragment>
    <div className="terms-and-conditions-outer-wrapper">

      <div className="all-terms-and-conditions-wrapper">
        <span>
          깨비메일 이용약관, 개인정보 수집 및 이용, 프로모션 수신에 모두 동의합니다.
        </span>
        <Checkbox className="check-box" name="agree-with-terms"
        onChange={handleCheckAll} checked={checkAll} sx={checkboxStyle} />
      </div>

      <hr style={{margin: "5px 2px", }}/>

      <div className="first-terms-and-conditions-wrapper nth-terms-and-conditions-wrapper">
        <div className="show-details-and-checkbox-wrapper">
          <div className="show-terms-and-conditions-details-wrapper"
          onClick={handleShowFirst}>
            <p>
              <span>깨비메일 이용약관</span>
              <span className="necessary-or-optional-checkbox">&nbsp;&nbsp;*필수&nbsp;&nbsp;</span>
            </p>
            {showFirst ? 
            <FontAwesomeIcon icon={faChevronUp} style={faviconStyle} /> :
            <FontAwesomeIcon icon={faChevronDown} style={faviconStyle} /> }
          </div>
          <div className="terms-and-conditions-checkbox-wrapper">
            <Checkbox className="check-box" name="agree-with-terms" 
            required onChange={handleCheckFirst} checked={checkFirst} sx={checkboxStyle} />
          </div>
        </div>
        <div className="signup-agreement-content-wrapper"
        ref={showFirstRef}>
          <p className="signup-agreement-content">
            <ContentForUsingGgabi />
          </p>
        </div>
      </div>

      <div className="second-terms-and-conditions-wrapper nth-terms-and-conditions-wrapper">
        <div className="show-details-and-checkbox-wrapper">
          <div className="show-terms-and-conditions-details-wrapper"
          onClick={handleShowSecond}>
            <p>
              <span>개인정보 수집 및 이용에 대한 약관</span>
              <span className="necessary-or-optional-checkbox">&nbsp;&nbsp;*필수&nbsp;&nbsp;</span>
            </p>
            {showSecond ? 
            <FontAwesomeIcon icon={faChevronUp} style={faviconStyle} /> :
            <FontAwesomeIcon icon={faChevronDown} style={faviconStyle} /> }
          </div>
          <div className="check-agreement">
            <Checkbox className="check-box" type="checkbox" name="agree-with-terms"
            required onChange={handleCheckSecond} checked={checkSecond} sx={checkboxStyle} />
          </div>
        </div>
        <div className="signup-agreement-content-wrapper"
        ref={showSecondRef}>
          <p className="signup-agreement-content">
            <ContentForCollectingPersonalInfo />
          </p>
        </div>
      </div>

      <div className="third-terms-and-conditions-wrapper nth-terms-and-conditions-wrapper">
        <div className="show-details-and-checkbox-wrapper">
          <div className="show-terms-and-conditions-details-wrapper"
          onClick={handleShowThird}>
            <p>
              <span>프로모션 수신 약관</span>
              <span className="necessary-or-optional-checkbox">&nbsp;&nbsp;*선택&nbsp;&nbsp;</span>
            </p>
            {showThird ? 
            <FontAwesomeIcon icon={faChevronUp} style={faviconStyle} /> :
            <FontAwesomeIcon icon={faChevronDown} style={faviconStyle} /> }
          </div>
          <div className="check-agreement">
            <Checkbox className="check-box" name="agree-with-terms"
            onChange={handleCheckThird} checked={checkThird} sx={checkboxStyle} />
          </div>
        </div>
        <div className="signup-agreement-content-wrapper"
        ref={showThirdRef}>
          <p className="signup-agreement-content">
            <ContentForPromotion />
          </p>
        </div>
      </div>

    </div> 

    <hr style={{margin: "5px 2px 20px", border: "0", height: "2px", backgroundColor: "#e5e5e5"}} />

    <div className="signup-inputs-outer-wrapper">

      <div className="signup-id-inputs-wrapper signup-inputs-separate-wrapper">
        <div className="signup-id-inputs-upper-wrapper signup-inputs-upper-wrapper">
          <div className="signup-id-title-wrapper">
            <p>
              <span><b>아이디</b></span>
              <span className="necessary-or-optional-inputs">&nbsp;&nbsp;*필수</span>
            </p>
          </div>
          <div className="check-if-id-duplicated-wrapper check-if-duplicated-wrapper"
          style={{display: "none"}}>
            <span>중복확인</span>
          </div>
        </div>

        <div className="signup-id-inputs-middle-wrapper signup-inputs-middle-wrapper">
          {checkFirst && checkSecond 
          ?
          <input type="text" maxLength="20" name="username" placeholder=" 최대 20글자"
          className="signup-id-input signup-inputs" required value={idValue} onChange={handleIdValue} /> 
          :
          <input type="text" placeholder=" 최대 20글자"
          className="signup-id-input signup-inputs" disabled required />
          }
        </div>

        <div className="signup-id-inputs-bottom-wrapper signup-inputs-bottom-wrapper">
        </div>
      </div>


      <div className="signup-passwd-inputs-wrapper signup-inputs-separate-wrapper">
        <div className="signup-passwd-inputs-upper-wrapper signup-inputs-upper-wrapper">
          <p>
            <span><b>비밀번호</b></span>
            <span className="necessary-or-optional-inputs">&nbsp;&nbsp;*필수(8~20글자)</span>
          </p>
        </div>
        <div className="signup-passwd-inputs-middle-wrapper signup-inputs-middle-wrapper">
          {checkFirst && checkSecond 
          ?
          <input type="password" minLength="8" maxLength="20" name="passwd"
          className="signup-passwd-input signup-inputs" 
          ref={inputPasswd} onChange={handlePasswdInvalid}
          placeholder=" 영어 대소문사, 숫자, 특수문자 각각 1개 이상 포함"
          required value={passwdValue} /> 
          :
          <input type="password"
          className="signup-passwd-input signup-inputs" 
          placeholder=" 영어 대소문사, 숫자, 특수문자 각각 1개 이상 포함"
          disabled required />}
        </div>
        <div className="signup-passwd-inputs-bottom-wrapper signup-inputs-bottom-wrapper">
          {passwdInvalid ?
          "비밀번호 규칙에 맞게 작성해주세요" :
          ""}
        </div>
      </div>


      <div className="signup-passwdconfirm-inputs-wrapper signup-inputs-separate-wrapper">
        <div className="signup-passwdconfirm-inputs-upper-wrapper signup-inputs-upper-wrapper">
          <p>
            <span><b>비밀번호 확인</b></span>
            <span className="necessary-or-optional-inputs">&nbsp;&nbsp;*필수</span>
          </p>
        </div>
        <div className="signup-passwdconfirm-inputs-middle-wrapper signup-inputs-middle-wrapper">
          {checkFirst && checkSecond 
          ?
          <input type="password" minLength="8" maxLength="20" name="passwd-confirm"
          className="signup-passwd-input signup-inputs"
          ref={inputPasswdConfirm} onChange={handlePasswdConfirmInvalid}
          placeholder=" 비밀번호를 한 번 더 적어주세요" required value={passwdConfirmValue} /> 
          :
          <input type="password"
          className="signup-passwd-input signup-inputs"
          placeholder=" 비밀번호를 한 번 더 적어주세요" disabled required />}
        </div>
        <div className="signup-passwdconfirm-inputs-bottom-wrapper signup-inputs-bottom-wrapper">
          {passwdConfirmInvalid ?
          "비밀번호가 일치하지 않습니다" :
          ""}
        </div>
      </div>


      <div className="signup-nickname-inputs-wrapper signup-inputs-separate-wrapper">
        <div className="signup-nickname-inputs-upper-wrapper signup-inputs-upper-wrapper">
          <div className="signup-nickname-title-wrapper">
            <p>
              <span><b>이름</b></span>
              <span className="necessary-or-optional-inputs">&nbsp;&nbsp;*필수</span>
            </p>
          </div>
        </div>
        <div className="signup-nickname-inputs-middle-wrapper signup-inputs-middle-wrapper">
          {checkFirst && checkSecond 
          ?
          <input type="text" maxLength="20" name="nickname"
          className="signup-nickname-input signup-inputs" required value={nicknameValue} onChange={handleNicknameValue} />
          :
          <input type="text"
          className="signup-nickname-input signup-inputs" disabled required />}
        </div>
        <div className="signup-nickname-inputs-bottom-wrapper signup-inputs-bottom-wrapper">
        </div>
      </div>


      <div className="signup-phonenum-inputs-wrapper signup-inputs-separate-wrapper">
        <div className="signup-phonenum-inputs-upper-wrapper signup-inputs-upper-wrapper">
          <p>
            <span><b>전화번호</b></span>
            <span className="necessary-or-optional-inputs">&nbsp;&nbsp;*필수</span>
          </p>
        </div>
        <div className="signup-phonenum-inputs-middle-wrapper signup-inputs-middle-wrapper">
          {checkFirst && checkSecond
          ?
          <input type="tel" maxLength="11" name="phonenum"
          className="signup-phonenum-input signup-inputs"
          placeholder=" '-'없이 입력" required
          ref={inputPhonenum} value={phoneNumValue} onChange={handlePhoneNumValue} />
          :
          <input type="tel"
          className="signup-phonenum-input signup-inputs"
          placeholder=" '-'없이 입력" disabled required />}
        </div>
        <div className="signup-phonenum-inputs-bottom-wrapper signup-inputs-bottom-wrapper">
          {phonenumInvalid ?
          "전화번호 형식과 일치하지 않습니다":
          ""}
        </div>
      </div>


      <div className="signup-birthday-inputs-wrapper signup-inputs-separate-wrapper">
        <div className="signup-birthday-inputs-upper-wrapper signup-inputs-upper-wrapper">
          <p>
            <span><b>생년월일</b></span>
            <span className="necessary-or-optional-inputs">&nbsp;&nbsp;*필수</span>
          </p>
        </div>
        <div className="signup-birthday-inputs-middle-wrapper signup-inputs-middle-wrapper">
          {checkFirst && checkSecond
          ?
          <input type="date" name="birthday"
          className="signup-birthday-input signup-inputs" required
          value={birthdayValue} onChange={handleBirthdayValue} />
          :
          <input type="date"
          className="signup-birthday-input signup-inputs" disabled required />}
        </div>
        <div className="signup-birthday-inputs-bottom-wrapper">
        </div>
      </div>


      <div className="signup-department-inputs-wrapper signup-inputs-separate-wrapper">
        <div className="signup-department-inputs-upper-wrapper signup-inputs-upper-wrapper">
          <p>
            <span><b>부서</b></span>
            <span className="necessary-or-optional-inputs">&nbsp;&nbsp;*필수</span>
          </p>
        </div>
        <div className="signup-department-inputs-middle-wrapper signup-inputs-middle-wrapper">
          {checkFirst && checkSecond
          ?
          <select className="signup-department-input signup-inputs"
          value={departmentValue} onChange={handleDepartmentValue} required>
            <option value="" disabled>부서를 선택해주세요</option>
            {departmentNames.map((value, index) => {
              return (
                <option value={value}>{value}</option>
              )
            })}
          </select>
          :
          <select className="signup-department-input signup-inputs" disabled />}
        </div>
        <div className="signup-department-inputs-bottom-wrapper">
        </div>
      </div>


      <div className="signup-position-inputs-wrapper signup-inputs-separate-wrapper">
        <div className="signup-position-inputs-upper-wrapper signup-inputs-upper-wrapper">
          <p>
            <span><b>직책</b></span>
            <span className="necessary-or-optional-inputs">&nbsp;&nbsp;*필수</span>
          </p>
        </div>
        <div className="signup-position-inputs-middle-wrapper signup-inputs-middle-wrapper">
          {checkFirst && checkSecond
          ?
          <select className="signup-position-input signup-inputs"
          value={positionValue} onChange={handlePositionValue} required>
            <option value="" disabled>직책을 선택해주세요</option>
            {positionNames.map((value, index) => {
              return (
                <option value={value}>{value}</option>
              )
            })}
          </select>
          :
          <select className="signup-position-input signup-inputs" disabled />}
        </div>
        <div className="signup-position-inputs-bottom-wrapper">
        </div>
      </div>


      <div className="signup-email-inputs-wrapper signup-inputs-separate-wrapper">
        <div className="signup-email-inputs-upper-wrapper signup-inputs-upper-wrapper">
          <p>
            <span><b>이메일</b></span>
            <span className="necessary-or-optional-inputs">&nbsp;&nbsp;*선택</span>
          </p>
        </div>
        <div className="signup-email-inputs-middle-wrapper signup-inputs-middle-wrapper">
          {checkFirst && checkSecond
          ?
          <input type="email" name="email"
          className="signup-email-input signup-inputs" 
          ref={inputEmail} onChange={hanldeEmailInvalid}
          placeholder=" '@'를 포함하여 입력해주세요"
          value={emailValue} />
          :
          <input type="email"
          className="signup-email-input signup-inputs" 
          placeholder=" '@'를 포함하여 입력해주세요" disabled />
          }
        </div>
        <div className="signup-email-inputs-bottom-wrapper signup-inputs-bottom-wrapper">
          {emailInvalid ?
          "이메일 형식과 일치하지 않습니다":
          ""}
        </div>
      </div>


      <div className="signup-gender-inputs-wrapper signup-inputs-separate-wrapper">
        <div className="signup-gender-inputs-upper-wrapper signup-inputs-upper-wrapper">
          <p>
            <span><b>성별</b></span>
            <span className="necessary-or-optional-inputs">&nbsp;&nbsp;*선택</span>
          </p>
        </div>
        <div className="signup-gender-inputs-middle-wrapper signup-inputs-middle-wrapper">
          {checkFirst && checkSecond
          ?
          <>
          <div className="signup-gender-male-wrapper">          
            <input type="radio" id="male" name="gender" value="male" 
            className="signup-gender-input signup-inputs"
            onChange={handleGenderValue} />
            <label htmlFor="male">남자</label><br/>
          </div>
          <div className="signup-gender-female-wrapper">
            <input type="radio" id="female" name="gender" value="female"
            className="signup-gender-input signup-inputs"
            onChange={handleGenderValue} />
            <label htmlFor="female">여자</label><br/>
          </div>
          </>
          :
          <>
          <div className="signup-gender-male-wrapper">          
            <input type="radio" value="male" 
            className="signup-gender-input signup-inputs" disabled />
            <label htmlFor="male">남자</label><br/>
          </div>
          <div className="signup-gender-female-wrapper">
            <input type="radio" value="female"
            className="signup-gender-input signup-inputs" disabled />
            <label htmlFor="female">여자</label><br/>
          </div>
          </>
          }
        </div>
        <div className="signup-gender-inputs-bottom-wrapper">
        </div>
      </div>

    </div>
    
    <hr style={{margin: "3px 2px", border: "0", height: "2px", backgroundColor: "#e5e5e5"}} />
    
    <div className="signup-submit-and-signup-cancel-btn-wrapper">
      {checkFirst && checkSecond && !idInvalid && !passwdInvalid && !passwdConfirmInvalid && !phonenumInvalid && !emailInvalid
      ?
      <input type="submit" className="signup-submit-btn signup-related-btn"
      value="가입하기" id="signup-submit-btn" onClick={submitSignupForm} />
      :
      <input type="submit" className="signup-submit-btn signup-related-btn"
      value="가입하기" id="signup-submit-btn"
      onClick={(e) => {e.preventDefault(); alert(`입력이 유효하지 않습니다.`);}} />
      }
      <Link to={LinkTo.default} className="signup-cancel-btn signup-related-btn" >가입취소</Link>
    </div>
    
    </React.Fragment>
  )
}

export default SignupFirstStep
