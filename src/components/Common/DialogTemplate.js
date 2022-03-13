import React, { useState, useEffect, useRef } from "react"

// design
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField } from "@mui/material"


const dialogStyle = {
  '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
    margin: 0,
  }
}

const DialogTemplate = (props) => {

  return(
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={dialogStyle}
    >
      <DialogTitle id="alert-dialog-title" sx={{display: "flex", justifyContent: "center"}}>
        {props.dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.dialogContent !== null ? props.dialogContent : ""}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleAgreement} autoFocus style={{border: "solid 1px black"}}>예</Button>
        <Button onClick={props.handleClose} style={{border: "solid 1px black"}}>아니오</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogTemplate


export const RejectApplicantDialog = (props) => {
 
  // textarea
  const [causedByTextareaValue, setCausedByTextareaValue] = useState(false);
  const [rejectionTextareaValue, setRejectionTextareaValue] = useState("");
  const handleRejectionTextareaValue =(event) => {
    setRejectionTextareaValue(event.target.value);
    setCausedByTextareaValue(true);
  }

  const textareaByteRef = useRef(); // classList: style => font color

  const [textareaByte, setTextareaByte] = useState(0);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  // 바이트 수 체크
  useEffect(() => {
    if (causedByTextareaValue) { // 화면에 바이트가 수(textareaByte)가 리렌더링 될 때는 변화하지 않도록 하기 위해
      const maxByte = 100;
      let byte_sum = 0;   // 여기서 setTextareaByte()를 하면 useEffect가 끝난 뒤 반영되므로 temp 변수 선언
      for(let i = 0; i < rejectionTextareaValue.length; i++){
        const uni_char = escape(rejectionTextareaValue.charAt(i)); // 유니코드로 변환
        if(uni_char.length > 4) { byte_sum += 2;}  // 한글 : 2Byte
        else { byte_sum += 1; }  // 영문, 숫자, 특수문자 : 1Byte

        if (byte_sum > maxByte) { // btn disable 여부, 현재 byte class 추가 / 삭제
          setDisableSubmitBtn(true);
          textareaByteRef.current.classList.remove("allowed")
          textareaByteRef.current.classList.add("not-allowed")
        }
        else { 
          setDisableSubmitBtn(false); 
          textareaByteRef.current.classList.remove("not-allowed")
          textareaByteRef.current.classList.add("allowed")
        }
      }

      setTextareaByte(byte_sum);
      setCausedByTextareaValue(false);
    }
  }, [rejectionTextareaValue, textareaByte, causedByTextareaValue])



  return(
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={dialogStyle}
    >
      <DialogTitle id="alert-dialog-title" sx={{display: "flex", justifyContent: "center"}}>
        {props.dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description"> 
          <table className="applicant-rejection-dialog-wrapper">
            <tr>
              <th className="applicant-rejection-title-wrapper">
                  거절사유<br/>
                  <sup>(<span ref={textareaByteRef}>{textareaByte}</span>/100bytes)</sup>
              </th>
              <td className="applicant-rejection-reason-wrapper">
                <textarea rows="5" id="applicant-rejection-reason" name="rejection-reason"
                value={rejectionTextareaValue} onChange={handleRejectionTextareaValue} />
              </td>
            </tr>
          </table>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleAgreement} autoFocus style={{border: "solid 1px black"}}
        disabled={disableSubmitBtn} >
          예
        </Button>
        <Button onClick={props.handleClose} style={{border: "solid 1px black"}}>
          아니오
        </Button>
      </DialogActions>
    </Dialog>
  )
}


// 외부에서 component를 import를 하는 것이 아니고
// 내부에서 직접 Dialog를 선언해서 사용하면 input이 자동으로 초기화됨.
export const CreateBulletinBoard = (props) => {
 
  // 이미 존재하는 게시판 이름들
  const [duplicatedName, setDuplicatedName] = useState(false);

  // input
  const handleNameInputValue =(event) => { props.setNameInputValue(event.target.value); }
  useEffect(() => {
    if (props.forbiddenNames.includes(props.nameInputValue)) setDuplicatedName(true);
    else setDuplicatedName(false);
  },[props.forbiddenNames, props.nameInputValue])



  return(
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={dialogStyle}
    >
      <DialogTitle id="alert-dialog-title d-flex" sx={{justifyContent: "center"}}>
        {props.dialogTitle}
      </DialogTitle>
      <DialogContent id="bulletin-board-creation-content">
        <DialogContentText id="alert-dialog-description">
          <TextField autoFocus margin="dense" id="name" variant="standard"
          label="마지막에 입력한 공백은 포함되지 않습니다."
          type="text" fullWidth value={props.nameInputValue} onChange={handleNameInputValue} />
          {duplicatedName ? 
          <span>중복되는 게시판 이름입니다.</span> :
          ""}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleAgreement} autoFocus style={{border: "solid 1px black"}}
        disabled={duplicatedName || props.nameInputValue === ""}>
          예
        </Button>
        <Button onClick={props.handleClose} style={{border: "solid 1px black"}}>
          아니오
        </Button>
      </DialogActions>
    </Dialog>
  )
}
