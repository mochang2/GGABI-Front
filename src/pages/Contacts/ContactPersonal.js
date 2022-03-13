import React, { useState, useEffect } from "react"

// link
import { withRouter } from "react-router-dom"

// axiosAPI
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// design
import { Container, Row, Card } from "reactstrap"
import { Divider, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'

// commons
import { contactLeftbarMap, sortCmpFuncContact } from "./Commons"
import ContactGrid from "./ContactGrid"
import ContactsSidebar from "./ContactsSidebar"

// modal
import { ContactModal } from "../../components/Common/ModalTemplate"

// lodash - deep copy
import { cloneDeep } from "lodash"



const ContactPersonal = (props) => {

  //// TODO: axios api
  //// writer: localStorage.getItem("user")

  const [contactsData, setContactsData] = useState(contactLeftbarMap);
  const [renderPage, setRenderPage] = useState(true); // 연락처 생성, 삭제, 수정 이후 새로고침 없이 화면만 리로드
  // get data
  useEffect(() => {
    if (renderPage) {
      axiosAPI.get(`/api/address/personal?writer=${localStorage.getItem("user")}`)
        .then(response => {
          let temp = cloneDeep(contactLeftbarMap);
          for (const address of response.data){
            if (new RegExp("^[ㄱ|가-깋|ㄲ|까-낗].*$").test(address["nickname"]))
              temp["ㄱ"].push(address);
            else if (new RegExp("^[ㄴ|나-닣].*$").test(address["nickname"]))
              temp["ㄴ"].push(address);
            else if (new RegExp("^[ㄷ|다-딯|ㄸ|따-띻].*$").test(address["nickname"]))
              temp["ㄷ"].push(address);
            else if (new RegExp("^[ㄹ|라-맇].*$").test(address["nickname"]))
              temp["ㄹ"].push(address);
            else if (new RegExp("^[ㅁ|마-밓].*$").test(address["nickname"]))
              temp["ㅁ"].push(address);
            else if (new RegExp("^[ㅂ|바-빟|ㅃ|빠-삫].*$").test(address["nickname"]))
              temp["ㅂ"].push(address);
            else if (new RegExp("^[ㅅ|사-싷|ㅆ|싸-앃].*$").test(address["nickname"]))
              temp["ㅅ"].push(address);
            else if (new RegExp("^[ㅇ|아-잏].*$").test(address["nickname"]))
              temp["ㅇ"].push(address);
            else if (new RegExp("^[ㅈ|자-짛|ㅉ|짜-찧].*$").test(address["nickname"]))
              temp["ㅈ"].push(address);
            else if (new RegExp("^[ㅊ|차-칳].*$").test(address["nickname"]))
              temp["ㅊ"].push(address);
            else if (new RegExp("^[ㅋ|카-킿].*$").test(address["nickname"]))
              temp["ㅋ"].push(address);
            else if (new RegExp("^[ㅌ|타-팋].*$").test(address["nickname"]))
              temp["ㅌ"].push(address);
            else if (new RegExp("^[ㅍ|파-핗].*$").test(address["nickname"]))
              temp["ㅍ"].push(address);
            else if (new RegExp("^[ㅎ|하-힣].*$").test(address["nickname"]))
              temp["ㅎ"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "A")
              temp["A"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "B")
              temp["B"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "C")
              temp["C"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "D")
              temp["D"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "E")
              temp["E"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "F")
              temp["F"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "G")
              temp["G"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "H")
              temp["H"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "I")
              temp["I"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "J")
              temp["J"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "K")
              temp["K"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "L")
              temp["L"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "M")
              temp["M"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "N")
              temp["N"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "O")
              temp["O"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "P")
              temp["P"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "Q")
              temp["Q"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "R")
              temp["R"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "S")
              temp["S"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "T")
              temp["T"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "U")
              temp["U"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "V")
              temp["V"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "W")
              temp["W"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "X")
              temp["X"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "Y")
              temp["Y"].push(address);
            else if (address["nickname"].toUpperCase()[0] === "Z")
              temp["Z"].push(address);
            else
              temp["#"].push(address);
          }
          temp["ㄱ"].sort(sortCmpFuncContact);
          temp["ㄴ"].sort(sortCmpFuncContact);
          temp["ㄷ"].sort(sortCmpFuncContact);
          temp["ㄹ"].sort(sortCmpFuncContact);
          temp["ㅁ"].sort(sortCmpFuncContact);
          temp["ㅂ"].sort(sortCmpFuncContact);
          temp["ㅅ"].sort(sortCmpFuncContact);
          temp["ㅇ"].sort(sortCmpFuncContact);
          temp["ㅈ"].sort(sortCmpFuncContact);
          temp["ㅊ"].sort(sortCmpFuncContact);
          temp["ㅋ"].sort(sortCmpFuncContact);
          temp["ㅌ"].sort(sortCmpFuncContact);
          temp["ㅍ"].sort(sortCmpFuncContact);
          temp["ㅎ"].sort(sortCmpFuncContact);
          temp["A"].sort(sortCmpFuncContact);
          temp["B"].sort(sortCmpFuncContact);
          temp["C"].sort(sortCmpFuncContact);
          temp["D"].sort(sortCmpFuncContact);
          temp["E"].sort(sortCmpFuncContact);
          temp["F"].sort(sortCmpFuncContact);
          temp["G"].sort(sortCmpFuncContact);
          temp["H"].sort(sortCmpFuncContact);
          temp["I"].sort(sortCmpFuncContact);
          temp["J"].sort(sortCmpFuncContact);
          temp["K"].sort(sortCmpFuncContact);
          temp["L"].sort(sortCmpFuncContact);
          temp["M"].sort(sortCmpFuncContact);
          temp["N"].sort(sortCmpFuncContact);
          temp["O"].sort(sortCmpFuncContact);
          temp["P"].sort(sortCmpFuncContact);
          temp["Q"].sort(sortCmpFuncContact);
          temp["R"].sort(sortCmpFuncContact);
          temp["S"].sort(sortCmpFuncContact);
          temp["T"].sort(sortCmpFuncContact);
          temp["U"].sort(sortCmpFuncContact);
          temp["V"].sort(sortCmpFuncContact);
          temp["W"].sort(sortCmpFuncContact);
          temp["X"].sort(sortCmpFuncContact);
          temp["Y"].sort(sortCmpFuncContact);
          temp["Z"].sort(sortCmpFuncContact);
          temp["#"].sort(sortCmpFuncContact);
          setContactsData(temp);
        })
        .catch(error => {
          errorLog(error);
        })
    }
    setRenderPage(false);
  }, [renderPage])


  // create contact
  const [nicknameValue, setNicknameValue] = useState("");
  const [companyValue, setCompanyValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [positionValue, setPositionValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const handleNicknameValue = (e) => { setNicknameValue(e.target.value); }
  const handleCompanyValue = (e) => { setCompanyValue(e.target.value); }
  const handleDepartmentValue = (e) => { setDepartmentValue(e.target.value); }
  const handlePositionValue = (e) => { setPositionValue(e.target.value); }
  const handlePhoneValue = (e) => { setPhoneValue(e.target.value); }
  const handleEmailValue = (e) => { setEmailValue(e.target.value); }

  const [createContactModalOpen, setCreateContactModalOpen] = useState(false);
  const createContactModalTitle = "연락처 추가";

  const handleCreateContactModalOpen = () => { setCreateContactModalOpen(true); }
  const handleCreateContactModalClose = () => { setCreateContactModalOpen(false); }
  const handleCreateContactAgree = () => {
    if (nicknameValue === "") alert(`필수 입력칸이 입력되지 않았습니다.`);
    else if (phoneValue !== "" && !new RegExp("^[0-9]{10,11}$").test(phoneValue)) 
      alert(`전화번호 형식이 맞지 않습니다.`);
    else if (emailValue !== "" && !new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$").test(emailValue)) 
      alert(`이메일 형식이 맞지 않습니다.`);
    else {
      axiosAPI.post(`/api/address/personal`, {
        "writer": localStorage.getItem("user"),
        "nickname": nicknameValue,
        "phone": phoneValue,
        "email": emailValue,
        "department": departmentValue,
        "position": positionValue,
        "company": companyValue
      })
        .then(response => {
          alert(`연락처가 생성되었습니다.`);
          handleCreateContactModalClose();
          setRenderPage(true);
        })
        .catch(error => {
          errorLog(error);
          if (error.response !== undefined && error.response.status === 500) alert(`중복된 전화번호입니다.`);
        })
    }
  }



  return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid style={{position: "relative"}}>


          <Card className="contacts-leftbar-wrapper">
            <div className="create-btn-wrapper d-flex">
              <IconButton color="primary" onClick={handleCreateContactModalOpen}>
                <AddIcon />추가
              </IconButton>
              <ContactModal open={createContactModalOpen} handleClose={handleCreateContactModalClose}
              modalTitle={createContactModalTitle} action="추가" handleAgreement={handleCreateContactAgree}
              nicknameValue={nicknameValue} handleNicknameValue={handleNicknameValue}
              companyValue={companyValue} handleCompanyValue={handleCompanyValue}
              departmentValue={departmentValue} handleDepartmentValue={handleDepartmentValue}
              positionValue={positionValue} handlePositionValue={handlePositionValue}
              phoneValue={phoneValue} handlePhoneValue={handlePhoneValue}
              emailValue={emailValue} handleEmailValue={handleEmailValue} />
            </div>

            <Row className="side-wrapper">
              <ContactsSidebar contactsData={contactsData} />
            </Row>
          </Card>

          <Row className="contacts-content-wrapper mb-3">
              
            {contactsData["ㄱ"].length !== 0 ?
            <React.Fragment>
              <Divider id="ㄱ" />
              <h2>ㄱ</h2>
              {contactsData["ㄱ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㄴ"].length !== 0 ?
            <React.Fragment>
              <Divider id="ㄴ" />
              <h2>ㄴ</h2>
              {contactsData["ㄴ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㄷ"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="ㄷ" />
              <h2>ㄷ</h2>
              {contactsData["ㄷ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment> 
            : ""}
            {contactsData["ㄹ"].length !== 0 ?                  
            <React.Fragment>
              <Divider id="ㄹ" />
              <h2>ㄹ</h2>
              {contactsData["ㄹ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㅁ"].length !== 0 ?
            <React.Fragment>
              <Divider id="ㅁ" />
              <h2>ㅁ</h2>
              {contactsData["ㅁ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㅂ"].length !== 0 ?                  
            <React.Fragment>
              <Divider id="ㅂ" />
              <h2>ㅂ</h2>
              {contactsData["ㅂ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㅅ"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="ㅅ" />
              <h2>ㅅ</h2>
              {contactsData["ㅅ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㅇ"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="ㅇ" />
              <h2>ㅇ</h2>
              {contactsData["ㅇ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㅈ"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="ㅈ" />
              <h2>ㅈ</h2>
              {contactsData["ㅈ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㅊ"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="ㅊ" />
              <h2>ㅊ</h2>
              {contactsData["ㅊ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㅋ"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="ㅋ" />
              <h2>ㅋ</h2>
              {contactsData["ㅋ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㅌ"].length !== 0 ? 
            <React.Fragment>
              <Divider id="ㅌ" />
              <h2>ㅌ</h2>
              {contactsData["ㅌ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㅍ"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="ㅍ" />
              <h2>ㅍ</h2>
              {contactsData["ㅍ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["ㅎ"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="ㅎ" />
              <h2>ㅎ</h2>
              {contactsData["ㅎ"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["A"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="A" />
              <h2>A</h2>
              {contactsData["A"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["B"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="B" />
              <h2>B</h2>
              {contactsData["B"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["C"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="C" />
              <h2>C</h2>
              {contactsData["C"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["D"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="D" />
              <h2>D</h2>
              {contactsData["D"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["E"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="E" />
              <h2>E</h2>
              {contactsData["E"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["F"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="F" />
              <h2>F</h2>
              {contactsData["F"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["G"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="G" />
              <h2>G</h2>
              {contactsData["G"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["H"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="H" />
              <h2>H</h2>
              {contactsData["H"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["I"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="I" />
              <h2>I</h2>
              {contactsData["I"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["J"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="J" />
              <h2>J</h2>
              {contactsData["J"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["K"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="K" />
              <h2>K</h2>
              {contactsData["K"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["L"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="L" />
              <h2>L</h2>
              {contactsData["L"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["M"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="M" />
              <h2>M</h2>
              {contactsData["M"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["N"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="N" />
              <h2>N</h2>
              {contactsData["N"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["O"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="O" />
              <h2>O</h2>
              {contactsData["O"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["P"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="P" />
              <h2>P</h2>
              {contactsData["P"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["Q"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="Q" />
              <h2>Q</h2>
              {contactsData["Q"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["R"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="R" />
              <h2>R</h2>
              {contactsData["R"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["S"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="S" />
              <h2>S</h2>
              {contactsData["S"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["T"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="T" />
              <h2>T</h2>
              {contactsData["T"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["U"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="U" />
              <h2>U</h2>
              {contactsData["U"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["V"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="V" />
              <h2>V</h2>
              {contactsData["V"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["W"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="W" />
              <h2>W</h2>
              {contactsData["W"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["X"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="X" />
              <h2>X</h2>
              {contactsData["X"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["Y"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="Y" />
              <h2>Y</h2>
              {contactsData["Y"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["Z"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="Z" />
              <h2>Z</h2>
              {contactsData["Z"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}
            {contactsData["#"].length !== 0 ?                   
            <React.Fragment>
              <Divider id="#" />
              <h2>#</h2>
              {contactsData["#"].map((value, index) => {
                return (
                  <ContactGrid contact={value} variable={true} key={index} setRenderPage={setRenderPage} />
                )
              })}
            </React.Fragment>
            : ""}

          </Row>


        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(ContactPersonal)