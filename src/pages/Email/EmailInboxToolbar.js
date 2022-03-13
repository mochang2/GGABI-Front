import React, { useState } from "react"
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// modal component
import { WriteMailModal } from "../../components/Common/ModalTemplate"

// dialog component
import DialogTemplate from "../../components/Common/DialogTemplate"

// design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import { toolBarBtnStyle, toolBarSpanInBtnStyle } from "./CommonStyles"

// formatter
import { ChangeTagInMailContent, reRenderCurrentMailData } from "./CommonFunctions" // html content



const renderMailReadBtn = (mailReads) => {
  if (mailReads.length === 0) return true;  // 1개도 선택 안 되어 있을 때
  for (const mailRead of mailReads) {
    if (mailRead === false) return true;
  }
  return false;
}



const EmailToolbar = (props) => {


  // mail functions
  const ClickReadBtn = () => {
    if (props.mailIds.length === 0) { alert(`메일을 선택해주세요.`); }
    else {
      axiosAPI.put("/api/mail/INBOX", {
        "mailIdList": props.mailIds,
        "seen": true
      })
        .then(response => {
          // BE와 통신 없이 바로 화면에서 바꾸기
          if (response.data["status"] === "success"){
            let temp = props.mailData;
            for (const i in Object.keys(temp)) {
              if (props.mailChecked[i] === true) {
                temp[i]["read"] = true;
              }
            }
            props.setMailData(temp);
            reRenderCurrentMailData(props.setSelectNum, props.selectNum);
          }
          else { alert(`안읽음 처리에 실패했습니다.`); }
        })
        .catch(error => {
          errorLog(error);
          alert(`읽음 처리에 실패했습니다.`);
        })
    }
  }
  const ClickUnreadBtn = () => {
    if (props.mailIds.length === 0) { alert(`메일을 선택해주세요.`); }
    else {
      axiosAPI.put("/api/mail/INBOX", {
        "mailIdList": props.mailIds,
        "seen": false
      })
      .then(response => {
        if (response.data["status"] === "success") { 
          let temp = props.mailData;
          for (const i in Object.keys(temp)) {
            if (props.mailChecked[i] === true) {
              temp[i]["read"] = false;
            }
          }
          props.setMailData(temp);
          reRenderCurrentMailData(props.setSelectNum, props.selectNum);
        }
        else { alert(`안읽음 처리에 실패했습니다.`); }
      })
      .catch(error => {
        errorLog(error);
        alert(`안읽음 처리에 실패했습니다.`);
      })
    }
  }


  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);
  const deletionDialogTitle = `${props.mailIds.length}개의 메일을 삭제하시겠습니까?`;
  const handleDeletionDialogOpen = () => { setDeletionDialogOpen(true); }
  const handleDeletionDialogClose = () => { setDeletionDialogOpen(false); }
  const handleDeletionAgree = (event) => {
    axiosAPI.delete("/api/mail/INBOX", {
      data: {
        "mailIdList": props.mailIds,
      }
    })
      .then(response => {
        if (response.data["status"] === "success") {
          let temp = [];
          for (const i in Object.keys(props.mailData)) {
            if (props.mailChecked[i] === false) {
              temp.push(props.mailData[i]);
            }
          }
          props.setMailChecked(temp.map(() => false));
          props.setMailData(temp);
          reRenderCurrentMailData(props.setSelectNum, props.selectNum);
        }
        else { alert(`메일 삭제에 실패했습니다.`); }
      })
      .catch(error => {
        errorLog(error);
        alert(`메일 삭제에 실패했습니다.`);
      })
    handleDeletionDialogClose();
  }
  const ClickDeleteBtn = () => {
    if (props.mailIds.length === 0) { alert(`메일을 선택해주세요.`); }
    else { handleDeletionDialogOpen(); }
  }


  const ClickSpamReportBtn = () => {
    //// TODO: axios post data(mailDataId)
    alert(`${props.mailIds} 해당 메일을 스팸처리했습니다.`)
  }

  const [replyMailModalOpen, setReplyMailModalOpen] = useState(false);
  const handleReplyMailModalOpen = () => { setReplyMailModalOpen(true); }
  const handleReplyMailModalClose = () => { setReplyMailModalOpen(false); }
  const ClickReplyBtn = () => {
    if (props.mailSenders.length !== 1) {
      alert(`답장은 하나의 메일에 대해서밖에 동작하지 않습니다.`);
    }
    else {
      handleReplyMailModalOpen();
    }
  }

  const [transferMailModalOpen, setTransferMailModalOpen] = useState(false);
  const handleTransferMailModalOpen = () => { setTransferMailModalOpen(true); }
  const handleTransferMailModalClose = () => { setTransferMailModalOpen(false); }
  const [transferMailContent, setTransferMailContent] = useState("");
  const ClickTransferBtn = () => {
    // mail modal 띄우는데, split 적용
    //// 네이버 같은 경우 두 개 이상을 전달한다고 하면 첨부파일에 eml을 첨부시킴 이건 진욱이랑 이야기 필요
    if (props.mailIds.length !== 1) {
      alert(`현재 버전에서는 하나의 메일에 대해서밖에 동작하지 않습니다.`);
    }
    else {
      axiosAPI.get(`/api/mail/INBOX/${props.mailIds[0]}`)
        .then(response => {
          setTransferMailContent(
            ChangeTagInMailContent(
              response.data["content"]
            )
          );
        })
        .then(() => {
          handleTransferMailModalOpen();
        })
        .catch(error => {
          errorLog(error);
        })
    }
  }

  const ClickDownloadBtn = () => {
    //// TODO: axios post data(mailDataId)
    alert(`${props.mailIds} 해당 메일을 다운로드합니다.`)
  }

  const ClickAppendToContactsBtn = () => {
    //// TODO: axios post data(mailDataId)
    alert(`${props.mailSenders} 해당 메일 발신자를 주소록에 추가했습니다.`)
  }

  const ClickFilterSenderBtn = () => {
    //// TODO: axios post data(mailDataId)
    alert(`${props.mailSenders} 해당 메일 발신자가 보낸 메일만 보여줍니다.`)
  }

  const ClickDesignateAsImportantBtn = () => {
    //// TODO: axios post data(mailDataId)
    alert(`${props.mailIds} 해당 메일을 중요 메일함으로 이동했습니다.`)
  }

  const ClickUndesignateAsImportantBtn = () => {
    //// TODO: axios post data(mailDataId)
    alert(`${props.mailIds} 해당 메일을 중요 메일함에서 삭제했습니다.`)
  }

    
  // mail function more
  const [more_Menu, setmore_Menu] = useState(false)



  return (
    <div className="email-toolbar-wrapper">
      <div>
        <div className="btn-toolbar p-3" role="toolbar">
          <div className="me-2 mb-2 mb-sm-0">
            <Button type="button" color="primary" className="waves-light waves-effect mb-sm-0" style={toolBarBtnStyle}
            onClick={renderMailReadBtn(props.mailReads) ? ClickReadBtn : ClickUnreadBtn}>
              {
              renderMailReadBtn(props.mailReads) ?
              <span style={toolBarSpanInBtnStyle}>읽음</span> :
              <span style={toolBarSpanInBtnStyle}>안읽음</span>
              }
            </Button>

            <Button type="button" color="primary" className="waves-light waves-effect mb-sm-0" style={toolBarBtnStyle}
            onClick={ClickDeleteBtn}>
              <span style={toolBarSpanInBtnStyle}>삭제</span>
            </Button>
            <DialogTemplate open={deletionDialogOpen} handleClose={handleDeletionDialogClose} 
            handleAgreement={handleDeletionAgree} dialogTitle={deletionDialogTitle} />

            <Button type="button" color="primary" className="waves-light waves-effect mb-sm-0" 
            style={{borderRadius: 0, display: "none"}}
            onClick={ClickSpamReportBtn} >
              <span style={toolBarSpanInBtnStyle}>스팸신고</span>
            </Button>

            <Button type="button" color="primary" className="waves-light waves-effect mb-sm-0" style={toolBarBtnStyle}
            onClick={ClickReplyBtn}>
              <span style={toolBarSpanInBtnStyle}>답장</span>
            </Button>
            <WriteMailModal open={replyMailModalOpen} handleClose={handleReplyMailModalClose} 
            receiver={props.mailSenders.join("")} content={""} subject={`RE: ${props.mailSubjects.join("")}`} />

            <Button type="button" color="primary" className="waves-light waves-effect mb-sm-0" style={toolBarBtnStyle}
            onClick={ClickTransferBtn}>
              <span style={toolBarSpanInBtnStyle}>전달</span>
            </Button>
            <WriteMailModal open={transferMailModalOpen} handleClose={handleTransferMailModalClose} 
            receiver={""} content={transferMailContent} subject={`FW: ${props.mailSubjects.join("")}`} />

            <Dropdown isOpen={more_Menu} toggle={() => { setmore_Menu(!more_Menu) }} className="btn-group mb-sm-0"
            style={{display: "none"}}>
              <DropdownToggle className="btn btn-primary waves-light waves-effect dropdown-toggle" tag="div">
                <FontAwesomeIcon icon={faEllipsisH} />
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem to="#" onClick={ClickDownloadBtn}>PC에 저장하기</DropdownItem>
                <DropdownItem to="#" onClick={ClickAppendToContactsBtn}>발신자 주소록에 추가</DropdownItem>
                <DropdownItem to="#" onClick={ClickFilterSenderBtn}>해당 발신자 메일만 보기</DropdownItem>
                <DropdownItem to="#" onClick={ClickDesignateAsImportantBtn}>중요 메일로 지정</DropdownItem>
                <DropdownItem to="#" onClick={ClickUndesignateAsImportantBtn}>중요 메일 해제</DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </div>  
        </div>
      </div>

      <div className="mail-num-in-one-view-wrapper" style={{maxHeight:"30px", marginRight: "10px"}}>
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
  )
}

export default EmailToolbar
