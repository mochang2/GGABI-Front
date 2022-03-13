import React, { useState } from "react"

// link
import { withRouter } from "react-router-dom"

// axios
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// design
import { Card, CardBody, DropdownToggle, Col, UncontrolledDropdown,
        DropdownMenu, DropdownItem } from "reactstrap"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ContactPhoneTwoToneIcon from "@mui/icons-material/ContactPhoneTwoTone"
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone"

// formatter
import { formatPhone } from "./Commons"

// modal
import { WriteMailModal, ContactModal } from "../../components/Common/ModalTemplate"

// dialog
import DialogTemplate from "../../components/Common/DialogTemplate"



const CardContact = (props) => {

  // action - selected contact id
  const [selectedContact, setSelectedContact] = useState(-1);


  // revise contact
  const [nicknameValue, setNicknameValue] = useState(props.contact.nickname);
  const [companyValue, setCompanyValue] = useState(props.contact.company);
  const [departmentValue, setDepartmentValue] = useState(props.contact.department);
  const [positionValue, setPositionValue] = useState(props.contact.position);
  const [phoneValue, setPhoneValue] = useState(props.contact.phone);
  const [emailValue, setEmailValue] = useState(props.contact.email === undefined ? "" : props.contact.email);

  const handleNicknameValue = (e) => { setNicknameValue(e.target.value); }
  const handleCompanyValue = (e) => { setCompanyValue(e.target.value); }
  const handleDepartmentValue = (e) => { setDepartmentValue(e.target.value); }
  const handlePositionValue = (e) => { setPositionValue(e.target.value); }
  const handlePhoneValue = (e) => { setPhoneValue(e.target.value); }
  const handleEmailValue = (e) => { setEmailValue(e.target.value); }

  const [reviseContactModalOpen, setReviseContactModalOpen] = useState(false);
  const reviseContactModalTitle = "연락처 수정";

  const handleReviseContactModalOpen = (e, id) => { 
    setReviseContactModalOpen(true);
    setSelectedContact(id);
  }
  const handleReviseContactModalClose = () => { setReviseContactModalOpen(false); }
  const handleReviseContactAgree = () => {
    if (nicknameValue === "") alert(`필수 입력칸이 입력되지 않았습니다.`);
    else if (phoneValue !== "" && !new RegExp("^[0-9]{10,11}$").test(phoneValue)) 
      alert(`전화번호 형식이 맞지 않습니다.`);
    else if (emailValue !== "" && !new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$").test(emailValue)) 
      alert(`이메일 형식이 맞지 않습니다.`);
    else {
      axiosAPI.put(`/api/address/personal`, {
        "writer": localStorage.getItem("user"),
        "id": selectedContact,
        "nickname": nicknameValue,
        "phone": phoneValue,
        "email": emailValue,
        "department": departmentValue,
        "position": positionValue,
        "company": companyValue
      })
        .then(response => {
          alert(`연락처가 수정되었습니다.`);
          handleReviseContactModalClose();
          props.setRenderPage(true);
        })
        .catch(error => {
          errorLog(error);
          if (error.response !== undefined && error.response.status === 500) alert(`중복된 전화번호입니다.`);
          else alert(`수정에 실패했습니다.`);
        })
    }
  }


  // delete contact
  const [deleteContactDialogOpen, setDeleteContactDialogOpen] = useState(false);
  const handleDeleteContactDialogOpen = (e, id) => { 
    setDeleteContactDialogOpen(true);
    setSelectedContact(id);
  }
  const handleDeleteContactDialogClose = () => { setDeleteContactDialogOpen(false); }
  const handleDeleteContactAgree = (event) => {
    const formData = new FormData();
    formData.append("mid", [selectedContact.toString()]);
    axiosAPI.post(`/api/address/personal/delete`, formData)
      .then(response => {
        alert(`삭제 완료되었습니다.`);
        handleDeleteContactDialogClose();
        props.setRenderPage(true);
      })
      .catch(error => {
        errorLog(error);
        alert(`삭제에 실패했습니다.`);
        handleDeleteContactDialogClose();
      })
  }


  // mail modal
  const [mailModalOpen, setMailModalOpen] = useState(false);
  const handleMailModalOpen = () => { setMailModalOpen(true); }
  const handleMailModalClose = () => { setMailModalOpen(false); }


  return (
    <Col xl="3" sm="6">
      <Card className="text-center">
        <CardBody>
          {props.variable ?
          <React.Fragment>
            <UncontrolledDropdown className="float-end">
              <DropdownToggle tag="a" className="text-body font-size-16" caret>
                <FontAwesomeIcon icon={faEllipsisH} style={{cursor: "pointer"}} />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-right" style={{inset: "0px auto auto 0px"}}>
                <DropdownItem onClick={(e) => handleReviseContactModalOpen(e, props.contact.id)}>수정</DropdownItem>
                <DropdownItem onClick={(e) => handleDeleteContactDialogOpen(e, props.contact.id)}>삭제</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <div className="clearfix"></div>

            <ContactModal open={reviseContactModalOpen} handleClose={handleReviseContactModalClose}
            modalTitle={reviseContactModalTitle} action="수정" handleAgreement={handleReviseContactAgree}
            nicknameValue={nicknameValue} handleNicknameValue={handleNicknameValue}
            companyValue={companyValue} handleCompanyValue={handleCompanyValue}
            departmentValue={departmentValue} handleDepartmentValue={handleDepartmentValue}
            positionValue={positionValue} handlePositionValue={handlePositionValue}
            phoneValue={phoneValue} handlePhoneValue={handlePhoneValue}
            emailValue={emailValue} handleEmailValue={handleEmailValue} />

            <DialogTemplate open={deleteContactDialogOpen} handleClose={handleDeleteContactDialogClose} 
            handleAgreement={handleDeleteContactAgree} dialogTitle={"정말로 삭제하시겠습니까?"} />
          </React.Fragment>
          : ""}
          
          {!props.img ?
          <div className="avatar-lg mx-auto mb-4">
            <div className="avatar-title bg-soft-primary rounded-circle text-primary">
              <i className="mdi mdi-account-circle display-4 m-0 text-primary"></i>
            </div>
          </div>
          :
          <div className="mb-4">
            <img className="avatar-lg rounded-circle img-thumbnail" src={props.img} alt="" />
          </div>}

          <h5 className="font-size-16 mb-1">
            <b>{props.contact.nickname}</b>
          </h5>
          <p className="text-muted mb-2">
            {props.contact.company === "" ?
            "회사가 입력되지 않았습니다."
            : props.contact.company}
          </p>
          <p className="text-muted mb-2">
            {props.contact.department === "" ?
            "부서가 입력되지 않았습니다."
            : props.contact.department}
          </p>
          <p className="text-muted mb-2">
            {props.contact.position === "" ?
            "직책이 입력되지 않았습니다."
            : props.contact.position}
          </p>
        </CardBody>


        <div className="contact-grid-detail-wrapper text-start mx-3">
          <div className="phone-info-wrapper">
            <ContactPhoneTwoToneIcon />
            {props.contact.phone === "" ?
            "X"
            : formatPhone(props.contact.phone)}
          </div>

          <div className="email-info-wrapper">
            <EmailTwoToneIcon />
            {props.contact.email === "" ?
            "X" 
            :
            <React.Fragment>
            <span onClick={handleMailModalOpen}>
              {props.contact.email}
            </span>
            
            <WriteMailModal open={mailModalOpen} handleClose={handleMailModalClose} 
            receiver={props.contact.email} content={""} />
            </React.Fragment> }
          </div>
        </div>
      </Card>
    </Col>
  )
};

export default withRouter(CardContact)
