import React, { useState, useEffect } from "react"

import { withRouter } from "react-router-dom"

// link
import LinkTo from "../../routes/LinkTo"

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// design
import { Button as ButtonReact, Container, Row, Col, Card, Input } from "reactstrap"
import { Button } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
// img
import Penimg from "../../assets/images/board/write-post-pen.png"

// formatter
import { formatSize } from "../Email/CommonFunctions"

// draft editor
import { Editor } from "react-draft-wysiwyg"
import { ContentState, convertToRaw, EditorState } from "draft-js"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"


// 뒤로가기 말고, home 버튼을 눌러도 경고 표시가 뜨도록 바꿔야 함.



const WritePost = (props) => {

  // select option을 위한 board list
  const [boardList, setBoardList] = useState(null);
  useEffect(() => {
    axiosAPI.get("/api/board")
    .then(response => {
      response.data.reverse();
      setBoardList(response.data);
    })
    .catch(error => {
      errorLog(error);
    })
  }, [])


  //// input on change
  // select board
  const [selectBoard, setSelectBoard] = useState(
    props.location.state.bid === undefined || props.location.state.bid === null ? "" : props.location.state.bid
  );
  const handleSelectBoard = (event) => { setSelectBoard(event.target.value); }

  // checkbox(is notice)
  const [isNoticeChecked, setIsNoticeChecked] = useState(
    props.location.state.isNotice === undefined || props.location.state.isNotice === null  ? false : props.location.state.isNotice
  );
  const handleIsNoticeChecked = (event) => { setIsNoticeChecked(!isNoticeChecked); }

  // title
  const [titleInput, setTitleInput] = useState(
    props.location.state.title === undefined || props.location.state.title === null  ? "" : props.location.state.title
  );
  const handleTitleInput = (event) => { setTitleInput(event.target.value); }

  // attachments
  const [attachmentsInput, setAttachmentsInput] = useState([]);
  const [attachmentSize, setAttachmentSize] = useState(0);
  const handleAttachmentSize = (event) => {
    var tempSum = 0;
    for (const file of event.target.files) tempSum += file.size;

    if (attachmentSize + tempSum < 2 * 1024 * 1024 * 1024) {
      setAttachmentSize(attachmentSize + tempSum);
      const fileArray = Array.from(event.target.files);

      var newFileArray = [];
      for (const file of fileArray) {
        if (!attachmentsInput.includes(file)) newFileArray.push(file);
      }
      setAttachmentsInput(attachmentsInput.concat(newFileArray));
    }
    else alert(`첨부 가능한 최대 용량을 초과했습니다.`);
  }
  const deleteAttachment = (event, index) => {
    setAttachmentSize(attachmentSize - attachmentsInput[index].size);
    setAttachmentsInput(attachmentsInput.filter((value, i) => { 
      return index !== i;
    }));
  }

  // content 
  const [writeMailEditorState, setWriteMailEditorState] = useState(
    props.location.state.bid === undefined || props.location.state.bid === null ?
    EditorState.createEmpty() :
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        htmlToDraft(props.location.state.content)
      )
    )
  );
  const onWriteMailEditorStateChange = (writeMailEditorState) => { setWriteMailEditorState(writeMailEditorState); }


  // 입력이 됐다면 refresh나 뒤로 가기 방지
  const [mounted, setMounted] = useState(false);
  useEffect(() => {    
    if (!mounted) setMounted(true);

    window.onpopstate = (event) => {
      if (selectBoard !== "" || titleInput !== "" || attachmentSize !== 0 ||
      writeMailEditorState.getCurrentContent().hasText() === true){
        alert(`변경 사항이 저장되지 않습니다.`);
      }
    }

    const preventDefaultBeforeUnload = (event) => {
      if (selectBoard !== "" || titleInput !== "" || attachmentSize !== 0 ||
      writeMailEditorState.getCurrentContent().hasText() === true){
        event.preventDefault();
        event.returnValue = '';
      }
    }
    
    window.addEventListener("beforeunload", preventDefaultBeforeUnload);
    return _ => { window.removeEventListener("beforeunload", preventDefaultBeforeUnload); }

  }, [mounted, props.history, selectBoard, titleInput, attachmentSize, writeMailEditorState]);


  // cancel
  const cancelPost = (event) => {
    props.history.goBack();
  }


  // submit
  const submitPost = (event) => {
    if (selectBoard === "") { alert(`게시판을 선택해주세요`); }
    else if (titleInput === "") { alert(`제목을 입력해주세요`); }
    else {
      const formData = new FormData();
      formData.append("writer", localStorage.getItem("user"));
      formData.append("title", titleInput);
      formData.append("is_notice", isNoticeChecked);
      formData.append("content", draftToHtml(convertToRaw(writeMailEditorState.getCurrentContent())));
      if (attachmentsInput.length !== 0) {
        for (const attachment of attachmentsInput) {
          formData.append("file", attachment);
        }
      }
      else { formData.append("file", []); }


      if (props.location.state.method.toLowerCase() === "put") {
        axiosAPI.put(`/api/board/${props.location.state.bid}/${props.location.state.pid}`, formData, {
        })
        .then(response => {
          alert(`게시글이 수정되었습니다.`);
          let temp = [];
          temp = boardList.filter(x => x["id"] === selectBoard);
          props.history.push({
            pathname: LinkTo.BoardPostsList + "/" + temp[0]["title"] + "/" + props.location.state.pid,
            state: { bid: selectBoard, pid: props.location.state.pid }
          });
        })
        .catch(error => {
          if (error.response) { // 요청은 이뤄짐
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.status === "413") { alert(`용량이 커서 생성할 수 없습니다.`); }
          }
          else if (error.request) console.log(error.request);
          else console.log('Error', error.message); // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        });
      }
      else { // (props.location.state.method.toLowerCase() === "post")
        axiosAPI.post(`/api/board/${selectBoard}`, formData, {
        })
          .then(response => {
            alert(`게시글이 생성되었습니다.`);
            let temp = [];
            temp = boardList.filter(x => x["id"].toString() === selectBoard);
            props.history.push({
              pathname: LinkTo.BoardPostsList + "/" + temp[0]["title"],
              state: { bid: selectBoard }
            });
          })
          .catch(error => {
            if (error.response) { // 요청은 이뤄짐
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              if (error.response.status === "413") { alert(`용량이 커서 생성할 수 없습니다.`); }
            }
            else if (error.request) console.log(error.request);
            else console.log('Error', error.message); // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          });
      }
    }
  }

  

  return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col xs="12">

              <div className="mb-3">

                <Card>
                  <div className="board-header" style={{padding: "0 0 0 2%"}}>
                    <h2><b>게시판 글쓰기</b></h2>
                    <img src={Penimg} alt="board-header-img" height="80" />
                  </div>
                </Card> 


                <Card className="write-a-post">

                  <div className="classification-wrapper mb-1">
                    <div className="board-select-wrapper mb-2">
                      <select value={selectBoard} onChange={handleSelectBoard}>
                        <option value="" disabled selected>---게시판을 선택해주세요---</option>
                        {boardList !== null ?
                        boardList.map((value, index) => {
                          return (
                            <option key={index} value={value.id}>{value.title}</option>
                          )
                        })
                        : ""}
                      </select>
                    </div>
                    <div className="checkAsNotice-title-wrapper d-flex">
                      <div className="checkbox-wrapper d-flex">
                        <input type="checkbox" id="is-notice" className="is-notice-input"
                        defaultChecked={isNoticeChecked} onChange={handleIsNoticeChecked} />
                        <label htmlFor="is-notice">공지사항</label>
                      </div>
                      <Input className="title-input" type="text" placeholder="제목을 입력해주세요"
                      value={titleInput} onChange={handleTitleInput} />
                    </div>
                  </div>

                  <hr />

                  <div className="body-wrapper">
                    <div className="attachment-wrapper">
                      <label htmlFor="attached-files" >
                        <Input type="file" multiple id="attached-files" onChange={handleAttachmentSize} />
                        <Button variant="contained" component="span" color="primary">
                          파일 첨부
                        </Button>
                        <span className="info-whether-is-attachment">
                          {attachmentSize === 0?    
                          "첨부파일 없음(최대 2GB까지 첨부 가능)" :
                          formatSize(attachmentSize) + " 첨부됨"}
                        </span>
                      </label>

                      {attachmentsInput.length !== 0 ?
                      <div className="attachment-info-wrapper">
                        {attachmentsInput.map((attachment, index) => {
                          return (
                            <div key={index} className="each-attachment-placer d-flex">
                              <div className="attachement-name-wrapper num-font-initial">
                                {attachment.name}
                              </div>
                              <div className="attachement-size-cancel-btn-wrapper">
                                <span className="num-font-initial">{formatSize(attachment.size)}</span>
                                <ButtonReact outline color="secondary" onClick={(e) => deleteAttachment(e, index)}>
                                  <FontAwesomeIcon icon={faTimes} />
                                </ButtonReact>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      : ""}
                    </div>

                    <div className="content-wrapper">
                      <Editor wrapperClassName="write-mail-editor-wrapper"  
                      editorClassName="write-mail-editor"
                      toolbarClassName="toolbar-class"
                      toolbar={{
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: false },
                      }} 
                      placeholder="내용을 작성해주세요." localization={{ locale: 'ko' }}
                      editorState={writeMailEditorState} onEditorStateChange={onWriteMailEditorStateChange} />
                    </div>
                  </div>

                  <hr />

                  <div className="btn-wrapper d-flex">
                    <div className="btn-placer d-flex">
                      <div className="cancel-btn" onClick={cancelPost}>
                        취소
                      </div>
                      <div class="create-post-btn" onClick={submitPost}>
                        <div>등록</div>
                        <div>등록</div>
                      </div>
                    </div>
                  </div>

                </Card>   

              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(WritePost)