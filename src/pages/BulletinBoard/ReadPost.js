import React, { useState, useEffect } from "react"

import { withRouter, Link } from "react-router-dom"
import LinkTo from "../../routes/LinkTo"

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// dialog
import DialogTemplate from "../../components/Common/DialogTemplate"

// design
import { Button as ButtonReact, Container, Row, Col, Card } from "reactstrap"
import { Button, Popover } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileDownload, faComment } from "@fortawesome/free-solid-svg-icons"
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded"
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded"

//Import Bulletin Board Sidebar
import BulletinBoardSideBar from "./BulletinBoardSidebar"

// formatter
import dayjs from "dayjs" // date
import { formatSize } from "../Email/CommonFunctions"
import { sortCmpFuncComment } from "./CommonFunctions"

// prevent XSS from html string
import DOMPurify from "dompurify"



const ReadPost = (props) => {

  // axios get all posts
  const [renderPage, setRenderPage] = useState(true); // 게시판 생성, 삭제, 수정 이후 새로고침 없이 화면만 리로드
  const [bid, setBid] = useState(0);
  const [pid, setPid] = useState(0);
  const [postData, setPostData] = useState(null);
  const [coComments, setCoComments] = useState({});  // co-comment object
  const [showCoCommentTextarea, setShowCoCommentTextarea] = useState([]);  // show co-comment textarea

  useEffect(() => {
    if (props.location.state === undefined) {
      alert(`URL로 접근을 차단합니다.`);
      props.history.goBack();
    }
    setBid(props.location.state.bid);
    setPid(props.location.state.pid);
    if (renderPage){
      axiosAPI.get(`/api/board/${props.location.state.bid}/${props.location.state.pid}`)
      .then(response => {
        console.log(response.data);
        let data = response.data;
        data["comment"].sort(sortCmpFuncComment);
        setPostData(data);
    
        let temp = {};
        for (const comment of data["comment"].filter((comment) => comment["parentId"] !== null)) {
          if (Object.keys(temp).includes(comment["parentId"].toString())) 
            temp[comment["parentId"]].push(comment);
          else 
            temp[comment["parentId"]] = [comment];
        }
        setCoComments(temp);
    
        setShowCoCommentTextarea(
          Array.from({length: data["comment"].filter((comment) => comment["parentId"] === null).length}, () => false)
        );

        setCommentTextarea("");
        setCoCommentTextarea("");
        setRenderPage(false);
      })
      .catch(error => {
        errorLog(error);
      })
    }
  }, [props.location.state, props.history, renderPage])


  // download attachments
  const downloadAttachment = (e, value) => {
    console.log(value);
    console.log(bid);
    console.log(pid);
    axiosAPI.get(`${value["filePath"]}`, {
      responseType: "blob"
    })
      .then(res => {
        const blob = new Blob([res.data], {type: res.headers["Content-Type"]});
        const fileName = decodeURIComponent(decodeURI(value["origFilename"]).replace(/%2B/g, " "));

        if (window.navigator.msSaveOrOpenBlob) { // IE blob 분기 처리 에러 해결
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        }
        else {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);  // blob 객체의 url 생성
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch(error =>{
        errorLog(error);
      })
  }


  // track comments textarea
  const [commentTextarea, setCommentTextarea] = useState("");
  const [coCommentTextarea, setCoCommentTextarea] = useState("");
  const handleCommentTextareaChange = (event) => { setCommentTextarea(event.target.value); }
  const handleCoCommentTextareaChange = (event) => { setCoCommentTextarea(event.target.value); }
  const handleShowCoCommentTextarea = (e, index) => { 
    setCoCommentTextarea("");  // 초기화
    setShowCoCommentTextarea(showCoCommentTextarea => ({  // 해당 index만 true, false가 바뀜. 나머지는 전부 false로
      ...false,
      [index]: !showCoCommentTextarea[index]
    }));
  }


  // delete post
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false);
  const handleDeletePostDialogOpen = () => { setDeletePostDialogOpen(true); }
  const handleDeletePostDialogClose = () => { setDeletePostDialogOpen(false); }
  const handleDeletePostAgree = (event) => {
    axiosAPI.delete(`/api/board/${bid}/${pid}`)
      .then(response => {
        alert(`삭제 완료되었습니다.`);
        props.history.push({
          pathname: LinkTo.BoardPostsList + "/" + decodeURI(document.location.pathname.split("/")[3]),
          state: { bid: bid }
        });
        setDeletePostDialogOpen(false);
      })
      .catch(error => {
        errorLog(error);
      })
  }


  const [selectedCid, setSelectedCid] = useState(0);
  // delete comment
  const [deleteCommentDialogOpen, setDeleteCommentDialogOpen] = useState(false);
  const handleDeleteCommentDialogOpen = (event, cid) => { 
    setDeleteCommentDialogOpen(true);
    setSelectedCid(cid);
  }
  const handleDeleteCommentDialogClose = () => { setDeleteCommentDialogOpen(false); }
  const handleDeleteCommentAgree = () => {
    console.log(selectedCid);
    axiosAPI.delete(`/api/board/${bid}/${pid}/${selectedCid}`)
      .then(response => {
        alert(`댓글이 삭제되었습니다.`);
        setDeleteCommentDialogOpen(false);
        setRenderPage(true);
      })
      .catch(error => {
        errorLog(error);
      });
  }


  // create comment
  const createComment = (e) => {
    if (commentTextarea.length === 0){
      alert(`글을 입력해주세요.`);
    }
    else{
      axiosAPI.post(`/api/board/${bid}/${pid}`, {
        content: commentTextarea,
        parentId: null,
        writer: localStorage.getItem("user")
      })
        .then(response => {
          alert(`댓글이 생성되었습니다.`);
          setRenderPage(true);
        })
        .catch(error => {
          errorLog(error);
        });
    }
  }

  // 글 없이는 생성 못하게 막기.
  
  // create co-comment
  const createCoComment = (e, parent_id) => {
    if (coCommentTextarea.length === 0) {
      alert(`글을 입력해주세요.`);
    }
    else {
      axiosAPI.post(`/api/board/${bid}/${pid}`, {
        content: coCommentTextarea,
        parentId: parent_id,
        writer: localStorage.getItem("user")
      })
        .then(response => {
          alert(`답글이 생성되었습니다.`);
          setRenderPage(true);
        })
        .catch(error => {
          errorLog(error);
        });
    }
  }


  // revise comment, co-comment
  const [newCommentContent, setNewCommentContent] = useState("");
  const handleNewCommentContentChange = (event) => { setNewCommentContent(event.target.value); }

  const [editAnchorEl, setEditAnchorEl] = useState(null);
  const handleEditAnchorElClick = (event, commentData) => { 
    setNewCommentContent(commentData["content"]);
    setSelectedCid(commentData["id"]);
    setEditAnchorEl(event.currentTarget);
  };
  const handleEditAnchorClose = () => { setEditAnchorEl(null); };
  const editAnchorElOpen = Boolean(editAnchorEl);
  const editAnchorElId = editAnchorElOpen ? "simple-popover" : undefined;

  const reviseComment = (e) => {
    if (newCommentContent.length === 0) {
      alert(`글을 입력해주세요.`);
    }
    else{
      axiosAPI.put(`/api/board/${bid}/${pid}/${selectedCid}`,{
        "content": newCommentContent
      })
        .then(response => {
          alert(`댓글이 수정되었습니다.`);
          handleEditAnchorClose();
          setRenderPage(true);
        })
        .catch(error => {
          errorLog(error);
        })
    }
  }



  return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col xs="12" style={{position:"relative"}}>
              <BulletinBoardSideBar />

              <div className="board-rightbar mb-3">
                <Card style={{padding: "16px"}}>
                  {postData === null ? ""
                  :
                  <div className="read-post-inner-wrapper">
                    <div className="upper-function-wrapper d-flex mb-4">
                      <Link to={{ pathname: LinkTo.BoardPostsList + "/" + decodeURI(document.location.pathname.split("/")[3]),
                      state: { bid: bid }}}>
                        <button>
                          목록
                        </button>
                      </Link>
                    </div>

                    <div className="read-post-header-wrapper mb-2 mx-1">
                      <div className="board-name-wrapper d-flex mb-1">
                        <small className="text-muted">
                          {decodeURI(document.location.pathname.split("/")[3])}
                        </small>
                      </div>
                      <div className="title-wrapper">
                        <h5>
                          {postData.postlist["is_notice"] === true ? 
                          <span className="notice-title">[공지]{" "}</span>
                          : ""}
                          {postData.postlist["title"]}
                        </h5>
                      </div>
                      <div className="writer-hits-wrapper mb-1">
                        <span>
                          {postData.postlist["writerName"]}
                        </span>
                        <span className="text-muted hits-placer num-font-initial">
                          조회수: {postData.postlist["hits"]}
                        </span>
                      </div>
                      <div className="comments-count-date-wrapper d-flex">
                        <span className="comments-count-wrapper">
                          <small>댓글 <b className="num-font-initial">{postData["comment"].length}</b>개</small>
                        </span>
                        <span className="date-wrapper">
                          <small className="num-font-initial">
                            {dayjs(postData.postlist["isCreated"]).format("YYYY-MM-DD H:m:s")}
                          </small>
                        </span>
                      </div>
                    </div>

                    <hr className="divider"/>

                    <div className="read-post-attachment-content-wrapper mt-2 mb-4">
                      {
                        postData["attachment"].length === 0 ?
                        "" :
                        <ul>
                          {postData["attachment"].map((value, index) => {
                            return (
                              <li key={index}>
                                <FontAwesomeIcon icon={faFileDownload} title="다운로드" onClick={(e) => downloadAttachment(e, value)}
                                style={{margin: "0 4px 0 10px", color: "#5B73E8", cursor: "pointer"}} />

                                <span className="text-font-nanumGothic">
                                  {decodeURIComponent(decodeURI(value["origFilename"]).replace(/%2B/g, " "))}
                                </span>
                                <span className="text-font-nanumGothic">
                                  {` (${formatSize(value["size"])})`}
                                </span>
                              </li>
                            )
                          })}
                        </ul>
                      }
                      <div style={{minHeight: "25rem", padding: "0.3rem"}}
                      dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(postData["content"], {FORCE_BODY: true})}} />
                    </div>

                    <div className="comments-wrapper mb-4">
                      <div className="comments-cnt-wrapper d-flex mb-2">
                        <FontAwesomeIcon icon={faComment} style={{margin: "0 4px"}} />
                        <small>댓글 <b className="num-font-initial">{postData["comment"].length}</b>개</small>
                      </div>
                      <hr className="divider" />
                      <div className="comments-list-wrapper mt-1">
                        {postData["comment"].length === 0 ? ""
                        :
                        <ul>
                          {postData["comment"].filter((comment) => comment["parentId"] === null)
                          .map((value, index) => {
                            // TODO: comments writer == login user => 수정 / 삭제 보이게
                            return (
                              <li className="comment-wrapper mb-1" key={index}>
                                <div className="writer-comment-function-wrapper d-flex">
                                  <span className="writer-wrapper">
                                    <b>{value["writerName"]}</b>
                                  </span>
                                  {localStorage.getItem("authority") === "ROLE_ADMIN" ||
                                  localStorage.getItem("user") === value["writer"] ?
                                  <span className="comment-function-wrapper">
                                    <span className="edit" onClick={(e) => handleEditAnchorElClick(e, value)}>
                                      수정{" "}
                                    </span>
                                    |
                                    <span className="delete"
                                    onClick={(e) => handleDeleteCommentDialogOpen(e, value["id"])}>
                                      {" "}삭제
                                    </span>
                                  </span>
                                  : ""}
                                </div>
                                <div className="content-wrapper mt-1">
                                  {value["content"]}
                                </div>
                                <div className="date-co-comment-wrapper">
                                  <small className="text-muted num-font-initial">
                                    {dayjs(value["isCreated"]).format("YYYY-MM-DD H:m:s")}
                                  </small>
                                  <small className="write-co-comment-wrapper text-muted"
                                  onClick={(e) => handleShowCoCommentTextarea(e, index)}>
                                    답글쓰기
                                  </small>
                                </div>
                                <hr className="divider" />

                                {Object.keys(coComments).includes(value["id"].toString()) ?
                                <ul>
                                  {coComments[value["id"].toString()].map((v, i) => {
                                    return (
                                      <li className="co-comment-wrapper comment-wrapper mt-1" key={index}>
                                        <div className="co-comment-sign-wrapper">
                                          ㄴ
                                        </div>
                                        <div className="writer-comment-function-wrapper d-flex">
                                          <span className="writer-wrapper">
                                            <b>{v["writerName"]}</b>
                                          </span>
                                          {localStorage.getItem("authority") === "ROLE_ADMIN" ||
                                          localStorage.getItem("user") === value["writer"] ?
                                          <span className="comment-function-wrapper">
                                            <span className="edit" onClick={(e) => handleEditAnchorElClick(e, v)}>
                                              수정{" "}
                                            </span>
                                            |
                                            <span className="delete"
                                            onClick={(e) => handleDeleteCommentDialogOpen(e, v["id"])}>
                                              {" "}삭제
                                            </span>
                                          </span>
                                          : ""}
                                        </div>
                                        <div className="content-wrapper mt-1">
                                          {v["content"]}
                                        </div>
                                        <div className="date-co-comment-wrapper">
                                          <small className="text-muted num-font-initial">
                                            {dayjs(v["isCreated"]).format("YYYY-MM-DD H:m:s")}
                                          </small>
                                        </div>
                                        <hr className="divider" />
                                      </li>
                                    )
                                  })}
                                </ul>
                                : ""}

                                {showCoCommentTextarea[index] ?
                                <div className="co-comment-input-submit-btn-wrapper d-flex my-3">
                                  <textarea rows="5" placeholder="답글을 입력하세요"
                                  value={coCommentTextarea} onChange={handleCoCommentTextareaChange} />
                                  <Button color="inherit" variant="outlined" onClick={(e) => createCoComment(e, value["id"])}>
                                    제출
                                  </Button>
                                </div>
                                : ""}
                              </li>
                            )
                          })}
                        </ul>
                        }

                        <Popover id={editAnchorElId} open={editAnchorElOpen} anchorEl={editAnchorEl} onClose={handleEditAnchorClose}
                        anchorOrigin={{ vertical: "center", horizontal: "left" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}>
                          <div className="d-flex comment-input-submit-btn-wrapper"
                          style={{justifyContent: "center", alignItems: "center", width: window.innerWidth * 0.7}}>
                            <textarea rows="4" className="comment-textarea"
                            defaultValue={newCommentContent} onChange={handleNewCommentContentChange} />
                            <Button color="inherit" variant="outlined" sx={{height: "110px"}}
                            onClick={reviseComment}>
                              제출
                            </Button>
                          </div>
                        </Popover>

                        <DialogTemplate open={deleteCommentDialogOpen} handleClose={handleDeleteCommentDialogClose} 
                        handleAgreement={handleDeleteCommentAgree} dialogTitle={"정말로 삭제하시겠습니까?"} />
                      </div>


                      <div className="comment-input-submit-btn-wrapper d-flex">
                        <textarea rows="5" placeholder="댓글을 입력하세요"
                        value={commentTextarea} onChange={handleCommentTextareaChange} />
                        <Button color="inherit" variant="outlined" onClick={createComment}>
                          제출
                        </Button>
                      </div>
                    </div>

                    <div className="bottom-function-wrapper mb-3 d-flex">
                      <div className="arrow-btn-placer">
                        <Button color="inherit" variant="outlined" startIcon={<ArrowDropDownRoundedIcon />} >
                          다음
                        </Button>
                        <Button color="inherit" variant="outlined" startIcon={<ArrowDropUpRoundedIcon />} >
                          이전
                        </Button>
                      </div>
                      <div className="bottom-function-placer">
                        {localStorage.getItem(["authority"]) === "ROLE_ADMIN" || 
                        localStorage.getItem("user") === postData.postlist["writer"] ?
                        <React.Fragment>
                        <ButtonReact color="secondary" variant="contained" onClick={handleDeletePostDialogOpen}>
                          삭제
                        </ButtonReact>
                        <Link onClick={(e) => alert(`수정을 원하시면 첨부파일은 다시 첨부해주세요.`)}
                        to={{pathname: LinkTo.WritePost,
                        state: { method: "put", bid: bid, title: postData.postlist["title"], pid: pid,
                        isNotice: postData.postlist["is_notice"], content: postData["content"] }}}>
                          <ButtonReact color="secondary" variant="contained">
                            수정
                          </ButtonReact>
                        </Link>
                        </React.Fragment>
                        : ""}
                        <Link to={{ pathname: LinkTo.BoardPostsList + "/" + decodeURI(document.location.pathname.split("/")[3]),
                        state: { bid: bid }}}>
                          <ButtonReact id="to-list-btn">
                            목록
                          </ButtonReact>
                        </Link>
                      </div>

                      <DialogTemplate open={deletePostDialogOpen} handleClose={handleDeletePostDialogClose} 
                      handleAgreement={handleDeletePostAgree} dialogTitle={"정말로 삭제하시겠습니까?"} />
                    </div>
                  </div>
                  }
                </Card>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(ReadPost)