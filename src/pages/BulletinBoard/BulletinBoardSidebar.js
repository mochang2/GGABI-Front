import React, { useState, useEffect } from "react"

// import { debounce } from "lodash"

// axios API
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// route
import LinkTo from "../../routes/LinkTo"
import { withRouter, Link } from "react-router-dom"

// design
import { Card, Button as ButtonReact  } from "reactstrap"
import { Button, Divider, Menu, MenuItem, Popover, TextField } from "@mui/material"
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone"
import { styled } from "@mui/material/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faCropAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { SRCDropdownStyle } from "../Email/CommonStyles"

// dialog component
import DialogTemplate, { CreateBulletinBoard } from "../../components/Common/DialogTemplate"

// jquery
// import $ from "jquery"


const ColoredTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});


const activeClassName = (title) => {
  const pathName = decodeURI(document.location.pathname.split("/")[3]); // "", notice, list, 게시판이름, post id
  let className = "link-to-other-boards";
  if (pathName === title) className += " active";

  return className;
}



const BulletinBoardSidebar = (props) => {

  // get axios api
  const [renderPage, setRenderPage] = useState(true); // 게시판 생성, 삭제, 수정 이후 새로고침 없이 화면만 리로드
  const [boardList, setBoardList] = useState(null);
  const [boardNamesList, setBoardNamesList] = useState([]);
  useEffect(() => {
    if (renderPage){
      axiosAPI.get("/api/board")
      .then(response => {
        console.log(response.data);
        response.data.reverse();
        setBoardList(response.data);
        
        let temp = Array.from(response.data, x => x.title);
        temp.push("전체게시글");
        setBoardNamesList(temp);
      })
      .catch(error => {
        errorLog(error);
      })
    }
    setRenderPage(false);
  },[renderPage])


  // // floating banner
  // const [dimensions, setDimensions] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });
  // useEffect(() => {
  //   const handleResize = debounce(() => {
  //     setDimensions({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //   }, 100)
  //   window.addEventListener("resize", handleResize);
  //   if ($(".board-leftbar").css("position") === "absolute") {
  //     let floatPosition = parseInt($(".board-leftbar").css("top"))

  //     // scroll 인식
  //     $(window).scroll(() => {
  //       if (props.userInteracted === false) {
  //         let currentTop = $(window).scrollTop();
  //         let bannerTop = currentTop + floatPosition + "px";
    
  //         $(".board-leftbar").stop().animate({
  //           "top" : bannerTop
  //         }, 300);
  //       }

  //     }).scroll();
  //   }
  //   else {
  //     $(window).off("scroll");
  //   }

  //   return _ => { window.removeEventListener("resize", handleResize); }
  // })


  // admin function toggle btn(edit, delete)
  const [selectedBoard, setSelectedBoard] = useState({});
  const [anchorAdminFunc, setAnchorAdminFunc] = useState(null);
  const anchorAdminFuncOpen = Boolean(anchorAdminFunc);
  const handleAnchorAdminFuncOpen = (event, id, title) => {
    // props.setUserInteracted(true);
    setSelectedBoard({"id": id, "title": title});
    setBoardNewName(title);  // "이름변경" 버튼을 누르기 전에 미리 초기화
    setAnchorAdminFunc(event.currentTarget);
  }
  const handleAnchorAdminFuncClose = () => { setAnchorAdminFunc(null); }


  // edit bulletin board
  const [boardNewName, setBoardNewName] = useState("");
  const handleBoardNewName = (event) => { setBoardNewName(event.currentTarget.value); }

  const [editAnchorEl, setEditAnchorEl] = useState(null);
  const handleEditAnchorElClick = (event) => {
    setEditAnchorEl(event.currentTarget);
  };
  const handleEditAnchorClose = () => { setEditAnchorEl(null); };
  const editAnchorElOpen = Boolean(editAnchorEl);
  const editAnchorElId = editAnchorElOpen ? "simple-popover" : undefined;

  const [duplicatedName, setDuplicatedName] = useState(false);
  useEffect(() => {
    if (boardNamesList.includes(boardNewName)) setDuplicatedName(true);
    else setDuplicatedName(false);
  }, [boardNamesList, boardNewName])

  const submitBoardNewName = (event) => {
    axiosAPI.put(`/api/admin/board/${selectedBoard["id"]}`, {
      "title": boardNewName
    })
      .then(response => {
        alert(`게시판 이름이 변경되었습니다.`);
        setAnchorAdminFunc(null);
        handleEditAnchorClose();
        setRenderPage(true);
      })
      .catch(error => {
        alert(`게시판 이름이 변경되지 않았습니다.`)
        errorLog(error);
      })
  }


  // delete bulletin board
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);
  const deletionDialogTitle = `${selectedBoard["title"]}을 삭제하시겠습니까?`;
  const handleDeletionDialogOpen = () => { 
    setAnchorAdminFunc(null);
    setDeletionDialogOpen(true);
  }
  const handleDeletionDialogClose = () => { setDeletionDialogOpen(false); }
  const handleDeletionAgree = () => {
    axiosAPI.delete(`/api/admin/board/${selectedBoard["id"]}`)
      .then(response => {
        handleDeletionDialogClose();
        alert(`해당 게시판이 삭제되었습니다.`);
        setRenderPage(true);
      })
      .catch(error => {
        alert(`게시판이 생성되지 않았습니다.`)
        errorLog(error);
      })
  }


  // creat bulletin board
  const [creationDialogOpen, setCreationDialogOpen] = useState(false);
  const [boardNameInputValue, setBoardNameInputValue] = useState("");
  const creationDialogTitle = `생성하고 싶은 게시판 이름을 입력해주세요.`;
  const handleCreationDialogOpen = (e) => { setCreationDialogOpen(true); }
  const handleCreationDialogClose = (e) => { setCreationDialogOpen(false); }
  const handleCreationAgree = (e) => {
    axiosAPI.post("/api/admin/board", {
      "title": boardNameInputValue
    })
      .then(response => {
        console.log(response.data);
        handleCreationDialogClose();
        alert(`게시판이 생성되었습니다.`);
        setRenderPage(true);
      })
      .catch(error => {
        alert(`게시판이 생성되지 않았습니다.`)
        errorLog(error);
      })
  }



  return(
    <React.Fragment>
      <Card className="board-leftbar">
        <div className="write-a-post-btn-wrapper">
          <Link to={{ pathname: LinkTo.WritePost, state: { method: "post" }}}>
            <ButtonReact type="button" className="btn-block waves-light write-a-post-btn">
              글쓰기
            </ButtonReact>
          </Link>
        </div>
        
        <div className="board-name-list-wrapper mt-4">

          <ul id="board-name-ulist">
            <li>
              <div className="link-to-other-boards">
                <Link to={LinkTo.AllPostsList}>
                  <div className="boardList-board-title-wrapper">
                    <b style={{color: "black"}}>전체게시글{" "}</b>
                  </div>
                  <div className="boardList-icon-wrapper" />
                </Link>
              </div>
            </li>

            {boardList === null ?
            "" :
            boardList.map((board, i) => {
              return (
                <React.Fragment key={i}>

                <hr className="divider"/>
                <li style={{position: "relative"}}>
                  <div className={activeClassName(board.title)}>

                    <Link to={{ pathname: LinkTo.BoardPostsList + "/" + board.title,
                    state: { bid: board.id }}} >                    
                      <div className="boardList-board-title-wrapper">
                        {board.title}{" "}
                      </div>

                      <div className="boardList-icon-wrapper">
                        <FontAwesomeIcon icon={faChevronRight} />
                      </div>
                    </Link>

                    {localStorage.getItem(["authority"]) === "ROLE_ADMIN" ?
                    <div className="boardList-admin-only-function-wrapper" 
                    onClick={(e) => handleAnchorAdminFuncOpen(e, board.id, board.title)}>
                      <FontAwesomeIcon icon={faEllipsisV} />  
                    </div>
                    : ""}
                  </div>
                </li>

                </React.Fragment>
              )
            })}

            <Menu id="basic-menu" anchorEl={anchorAdminFunc} open={anchorAdminFuncOpen} onClose={handleAnchorAdminFuncClose}
            MenuListProps={{"aria-labelledby": "basic-button"}} anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            transformOrigin={{vertical: "top", horizontal: "right"}} 
            sx={{"& .css-6hp17o-MuiList-root-MuiMenu-list" : {border: "0.5px solid black", padding: "8px 0", minWidth: "8rem"}}}>
              <MenuItem sx={SRCDropdownStyle} onClick={handleEditAnchorElClick}>
                이름변경
              </MenuItem>
              <Divider />
              <MenuItem sx={SRCDropdownStyle} onClick={handleDeletionDialogOpen}>
                삭제하기
              </MenuItem>
            </Menu>

            <Popover id={editAnchorElId} open={editAnchorElOpen} anchorEl={editAnchorEl} onClose={handleEditAnchorClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            transformOrigin={{ vertical: "bottom", horizontal: "center" }}>
              <div className="d-flex" style={{justifyContent: "center", alignItems: "center"}}>
                <ColoredTextField variant="filled" defaultValue={selectedBoard["title"]} label="새 이름"
                onChange={handleBoardNewName} error={duplicatedName} 
                helperText={duplicatedName ? "중복되는 게시판 이름입니다." : ""}/>
                <Button endIcon={<EditTwoToneIcon />} sx={{color: "black"}}
                disabled={duplicatedName || boardNewName === ""} onClick={submitBoardNewName}>
                  변경
                </Button>
              </div>
            </Popover>

            <DialogTemplate open={deletionDialogOpen} handleClose={handleDeletionDialogClose} 
            handleAgreement={handleDeletionAgree} dialogTitle={deletionDialogTitle} />
          </ul>

        </div>
        
        {boardList !== null && localStorage.getItem(["authority"]) === "ROLE_ADMIN" ? 
        <React.Fragment>

        <div className="boardList-create-board-wrapper">
          <span className="boardList-create-board-placer" onClick={handleCreationDialogOpen}>
            {" "}게시판 생성{" "}
            <FontAwesomeIcon icon={faCropAlt} />
          </span>
        </div>
        <CreateBulletinBoard open={creationDialogOpen} handleClose={handleCreationDialogClose}
        nameInputValue={boardNameInputValue} setNameInputValue={setBoardNameInputValue}
        handleAgreement={handleCreationAgree} dialogTitle={creationDialogTitle} forbiddenNames={boardNamesList} />

        </React.Fragment>
        : ""}

        {/*<div style={{display: "none"}}>Rendered at {dimensions.width} x {dimensions.height}</div>*/}

      </Card>
    </React.Fragment>
  )
}

export default withRouter(BulletinBoardSidebar)