import React, { useState, useEffect } from "react"

import { withRouter, Link } from "react-router-dom"
import LinkTo from "../../routes/LinkTo"

// axios api
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

//Import Bulletin Board Sidebar
import BulletinBoardSideBar from "./BulletinBoardSidebar"

// pagination
import MailPagination from "../../components/Groupware/GroupwareDetails/Email/MailPagination"

// design
import { Container, Row, Col, Card, InputGroup, Input } from "reactstrap"
import { Button, Checkbox, FormControlLabel, FormControl, NativeSelect } from "@mui/material"
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone"
import { BootstrapInput, checkboxStyle } from "./CommonStyles"
// img
import Pigimg from "../../assets/images/board/board-list-pig.png"

// formatter
import { formatDate } from "../Email/CommonFunctions"  // date
import { sortCmpFuncPost } from "./CommonFunctions"



const BoardPostsList = (props) => {

  // post checkbox
  const [postChecked, setPostChecked] = useState([]);

  const handleParentCheckbox = (event) => {
    setPostChecked(Array.from({length: postDataLength}, (_,i) => i >= indexOfFirstPost && i < indexOfLastPost ? event.target.checked : postChecked[i]));
  };
  const parentCheckboxChecked = () => {
    let res = true;
    for (const i in postChecked.slice(indexOfFirstPost, indexOfLastPost)) {
      res = res && postChecked[parseInt(i) + (postCurrentPage - 1) * selectNum];
    }
    return res;
  }

  const [bid, setBid] = useState(0);

  // axios get all posts
  useEffect(() => {
    if (props.location.state === undefined) {
      alert(`URL로 접근을 차단합니다.`);
      props.history.goBack();
    }
    setBid(props.location.state.bid);
    axiosAPI.get(`/api/board/${props.location.state.bid}`)
      .then(response => {
        let temp = response.data.postList;
        temp.sort(sortCmpFuncPost);
        setPostData(temp);  // 공지순 -> 시간순 정렬
        setPostChecked(Array.from(temp, (data) => false));
        setSelectNum(10);
      })
      .catch(error => {
        errorLog(error);
      })
  }, [props.location.state, props.history])


  // search option
  const [searchOption, setSearchOption] = useState("title");
  const handleSearchOptionChange = (event) => { setSearchOption(event.target.value); };


  // search text
  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    setPostChecked(Array.from(postData, (data) => false));
  }


  // get post data + pagination
  const [postData, setPostData] = useState([]);
  const [postCurrentPage, setPostCurrentPage] = useState(1);
  const [selectNum, setSelectNum] = useState(0);
  const handlePostPageChange = (postPage) => {
    setPostCurrentPage(postPage);
  }
  const handleSelectNumChange = (event) => { 
    setSelectNum(parseInt(event.target.value));
  }

  const indexOfLastPost = postCurrentPage * selectNum;
  const indexOfFirstPost = indexOfLastPost - selectNum;
  const filteredPostData = postData.filter((data) => { return data[searchOption].includes(searchText); })
  const currentPostData = filteredPostData.slice(indexOfFirstPost, indexOfLastPost);
  const postDataLength = filteredPostData.length;


  const deletePosts = (e) => {
    // 버그 발생 시
    // 1. array 하나 선언
    // 2. 체크박스의 e.target.checked를 체크하고 해당 checked가 true인 놈은 arrya에 추가 false는 빼기
    // 3. 부모 체크박스도 확인.
    // 4. submit
    if (filteredPostData.length > 0 && filteredPostData.length === postChecked.length) {
      let temp = [];
      for (const i in postChecked) {
        if (postChecked[i] === true) { 
          temp.push(filteredPostData[i].postId.toString());
        }
      }
      if (temp.length === 0) alert(`삭제할 게시글을 선택해주세요.`);
      else{
        const formData = new FormData();
        formData.append("pid", temp);

        axiosAPI.post(`/api/admin/board/${bid}/post`, formData)
          .then(response => {
            alert(`해당 게시글들이 삭제됐습니다.`);
            window.location.reload();
          })
          .catch(error => {
            errorLog(error)
          });
      }
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
                <Card>
                  <div className="board-header">
                    <h2><b>{decodeURI(document.location.pathname.split("/").at(-1))}</b></h2>
                    <img src={Pigimg} alt="board-header-img" height="80" />
                  </div>
                </Card>

                <Card style={{marginBottom: "0.5rem"}}>
                  <div className="board-toolbar-wrapper d-flex">
                    {localStorage.getItem(["authority"]) === "ROLE_ADMIN" ?
                      <div className="toolbar-deletion-btn-placer">
                        <Button color="inherit" variant="outlined" onClick={deletePosts}>
                          삭제
                        </Button>
                      </div>
                    : ""}

                    <div className="toolbar-search-box-placer">
                      <InputGroup className="d-flex">
                        <FormControl sx={{ m: 0.8 }} variant="standard">
                          <NativeSelect value={searchOption} onChange={handleSearchOptionChange} input={<BootstrapInput />}>
                            <option value="title">제목</option>
                            <option value="writer">작성자</option>
                          </NativeSelect>
                        </FormControl>
                        <Input placeholder="검색어 입력" value={searchText} onChange={handleSearchTextChange} />
                      </InputGroup>
                    </div>

                    <div className="toolbar-write-btn-placer">
                      <Link to={{pathname: LinkTo.WritePost, state: { method: "post" }}}>
                        <Button color="inherit" variant="outlined" endIcon={<DriveFileRenameOutlineTwoToneIcon />}>
                          글쓰기
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>

                <Card>

                  <div className="board-column-title-wrapper">
                    <div className="d-flex board-coluumn-title-placer"
                    style={{alignItems: "center", minHeight: "48px"}}>
                      {localStorage.getItem("authority") === "ROLE_ADMIN" ? 
                      <div className="parent-checkbox-wrapper">                      
                        <FormControlLabel
                        label="" sx={{marginLeft: '0 !important', marginBottom: '0 !important', paddingLeft: '0'}}
                        control={
                        <Checkbox checked={parentCheckboxChecked()} onChange={handleParentCheckbox} 
                        size="sm" sx={checkboxStyle} />
                        } />
                      </div>
                      : ""}

                      <div className="title-wrapper title-wrapper-not-all">
                        <span>제목</span>
                      </div>
                      <div className="writer-date-hits-wrapper">
                        <span>작성자</span>
                        <span style={{position: "relative", left: "16px"}}>작성날짜</span>
                        <span style={{position: "absolute", right: "10px"}}>조회수</span>
                      </div>
                    </div>
                  </div>

                  <div className="board-post-list-wrapper">
                    <ul className="post-list">
                      {currentPostData.map((post, i) => {
                        const index = i + (postCurrentPage - 1) * selectNum;
                        const newTitle = post.title === null ? "빈 제목" : post.title;
                        return (
                          <React.Fragment key={index}>
                          <hr className="divider"/>

                          <li>
                            <div className="col-post col-post-1">
                              <div className="checkbox-wrapper-post">
                                {localStorage.getItem("authority") === "ROLE_ADMIN" ||
                                post.writer === localStorage.getItem("user")
                                ? 
                                <FormControlLabel label={""}
                                control={
                                  <Checkbox checked={postChecked[index]} 
                                  onChange={(e) => {
                                    setPostChecked(Array.from({length: postDataLength}, 
                                      (_,i) => i !== index ? postChecked[i] : !postChecked[i]
                                    ));
                                  }} sx={checkboxStyle} size="sm" />
                                }/>
                                : ""}
                              </div>
                            </div>

                            <div className="col-post col-post-2">
                              <Link to={{ pathname: document.location.pathname + "/" + post.postId,
                              state: { bid: bid, pid: post.postId }}} className="subject"
                              style={{fontFamily: "initial"}}>
                                {post.is_notice === true ?
                                <b className="notice-title">[공지] {newTitle}</b> :
                                newTitle}
                              </Link>
                              <div className="writer-board-date-wrapper-not-all">
                                <Link to={{ pathname: document.location.pathname + "/" + post.postId,
                              state: { bid: bid, pid: post.postId }}} className="d-flex">
                                  <span className="writer-wrapper">{post.writer}</span>
                                  <span className="date-wrapper">  {formatDate(post.isCreated)}</span>
                                  <span className="hits-wrapper">  {post.hits}</span>
                                </Link>
                              </div>
                            </div>

                          </li>
                          </React.Fragment>
                        )
                      })}
                    </ul>
                  </div>

                  <div className="board-pagination-wrapper">
                    <div className="mail-num-in-one-view-wrapper">
                      <select name="mail-num-in-one-view" id="mail-num-in-one-view"
                      onChange={handleSelectNumChange} value={selectNum}>
                        <option value={1}>1</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                      <span>개씩 보기</span>
                    </div>

                    <MailPagination itemsCountPerPage={selectNum} totalItemsCount={postDataLength}
                    mailPage={postCurrentPage} handleMailPageChange={handlePostPageChange} />
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

export default withRouter(BoardPostsList)