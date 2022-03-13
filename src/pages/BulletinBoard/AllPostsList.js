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
import { Button, FormControl, NativeSelect } from "@mui/material"
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone"
import { BootstrapInput } from "./CommonStyles"
// img
import Bearimg from "../../assets/images/board/board-list-bear.png"

// formatter
import { formatDate } from "../Email/CommonFunctions"  // date
import { sortCmpFuncPost } from "./CommonFunctions"



const AllPostsList = (props) => {

  // axios get all posts
  useEffect(() => {
    axiosAPI.get("/api/board/post")
      .then(response => {
        let temp = response.data;
        temp.sort(sortCmpFuncPost);
        setPostData(temp);  // 공지순 -> 시간순 정렬
      })
      .catch(error => {
        errorLog(error);
      })
    // responseData.sort(sortCmpFuncPost);
    // setPostData(responseData);
  }, [])


  // search option
  const [searchOption, setSearchOption] = useState("title");
  const handleSearchOptionChange = (event) => { setSearchOption(event.target.value); };


  // search text
  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (event) => { setSearchText(event.target.value); }


  // get mail data + pagination
  const [postData, setPostData] = useState([]);
  const [postCurrentPage, setPostCurrentPage] = useState(1);
  const [selectNum, setSelectNum] = useState(10);
  const handlePostPageChange = (postPage) => { setPostCurrentPage(postPage); }
  const handleSelectNumChange = (event) => { setSelectNum(parseInt(event.target.value)); }

  const indexOfLastPost = postCurrentPage * selectNum;
  const indexOfFirstPost = indexOfLastPost - selectNum;
  const filteredPostData = postData.filter((data) => { return data[searchOption].includes(searchText); })
  const currentPostData = filteredPostData.slice(indexOfFirstPost, indexOfLastPost);
  const postDataLength = filteredPostData.length;



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
                    <h2><b>전체게시글({postData.length}개)</b></h2>
                    <img src={Bearimg} alt="board-header-img" height="80" />
                  </div>
                </Card>


                <Card style={{marginBottom: "0.5rem"}}>
                  <div className="board-toolbar-wrapper d-flex">
                    <div className="toolbar-search-box-placer">
                      <InputGroup className="d-flex">
                        <FormControl sx={{ m: 0.8 }} variant="standard">
                          <NativeSelect value={searchOption} onChange={handleSearchOptionChange} input={<BootstrapInput />}>
                            <option value="title">제목</option>
                            <option value="writer">작성자</option>
                            <option value="board_name">게시판</option>
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
                    <div className="d-flex board-coluumn-title-placer">
                      <div className="title-wrapper">
                        <span>제목</span>
                      </div>
                      <div className="writer-board-date-wrapper">
                        <span className="writer-wrapper">작성자</span>
                        <span className="board-wrapper">게시판</span>
                        <span className="date-wrapper">작성날짜</span>
                      </div>
                    </div>
                  </div>

                  <div className="board-post-list-wrapper">
                    <ul className="post-list">
                      {currentPostData.map((post, i) => {
                        const newTitle = post.title === null ? "빈 제목" : post.title;
                        return (
                          <React.Fragment key={i}>
                          <hr className="divider"/>
                          <li>
                            <div className="col-post col-post-2" style={{left: "10px"}}>
                              <Link to={{ pathname: LinkTo.BoardPostsList + "/" + post.board.title + "/" + post.postId,
                              state: { bid: post.board.id, pid: post.postId }}} style={{fontFamily: "initial"}}
                              className="subject">
                                {post.is_notice === true ?
                                <b className="notice-title">[공지] {newTitle}</b> :
                                newTitle}
                              </Link>
                              <div className="writer-board-date-wrapper">
                                <Link to={{ pathname: LinkTo.BoardPostsList + "/" + post.board.title + "/" + post.postId,
                                state: { bid: post.board.id, pid: post.postId }}} className="d-flex">
                                  <span className="writer-wrapper">{post.writer}</span>
                                  <span className="board-wrapper"> {post.board.title}</span>
                                  <span className="date-wrapper">  {formatDate(post.isCreated)}</span>
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

export default withRouter(AllPostsList)