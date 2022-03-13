import React, { useState, useEffect } from "react"

// axios API
import { axiosAPI, errorLog } from "../../APIs/BaseAPI"

// employee component
import EmployeeList from "../../components/Admin/AdminDetails/EmployeeList"

// dialog component
import DialogTemplate from "../../components/Common/DialogTemplate"

// modal component
import { EmployeeManagementModal } from "../../components/Common/ModalTemplate"

// design
import { Container, Row, Col, Card, CardBody, CardTitle, Button as ButtonReact, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import { styled, alpha } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"


// searchbox 
const Search = styled("div")(({ theme }) => ({
  border: "1px solid beige",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: "10px",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.5, 1, 0.5, 0.5),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));


// const employees = [
//   {id: 1,  nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 2,  nickname: "김진욱", username: "rlawlsdnr", department: "홍보", position: "사장", /*birthday: "1951-02-30",*/ email: "def@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "inactive", details: ""},
//   {id: 3,  nickname: "심규보", username: "tlarbqh",   department: "인사", position: "부장", /*birthday: "1953-04-28",*/ email: "ghi@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 4,  nickname: "강지형", username: "rkdwlgud",  department: "개발", position: "차장", /*birthday: "1954-11-30",*/ email: "jkl@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "inactive", details: ""},
//   {id: 5,  nickname: "손수민", username: "thstnals",  department: "회계", position: "사원", /*birthday: "1955-12-31",*/ email: "mno@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 6,  nickname: "이창모", username: "dlckdah2",  department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 7,  nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 8,  nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 9,  nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 10, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 11, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 12, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 13, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 14, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 15, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 16, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 17, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 18, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 19, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 20, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
//   {id: 21, nickname: "이창모", username: "dlckdah",   department: "보안", position: "대리", /*birthday: "1950-01-30",*/ email: "abc@ggaib.co.kr", phone: "010-1234-5678", parentId: 0, company: "ggabi", isCreated: "1234123" }, // status: "active", details: ""},
// ]


const departments = ["보안", "회계", "개발", "영업", "인사", "재무"];
const positions = ["사원", "대리", "과장", "차장", "부장", "사장"];



const EmployeeManagement = (props) => {

  //// TODO: data fetch
  const [employeeData, setEmployeeData] = useState([]);
  const [renderPage, setRenderPage] = useState(true);
  useEffect(() => {
    if (renderPage) {
      axiosAPI.get(`/api/address/fixed`)
        .then(response => {
          let temp = response.data;
          for (const employee of temp) {
            employee["status"] = "inactive";
            employee["details"] = "";
          }
          setEmployeeData(temp);
        })
        .catch(error => {
          errorLog(error);
        })
    }
    setRenderPage(false);
  }, [renderPage])



  // name search
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (event) => { setSearchInput(event.target.value); }


  // responsive: more functions dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => { setDropdownOpen(!dropdownOpen); }


  // 체크박스와 selectID 연동
  const [selectedRowData, setSelectRowData] = useState([]);
  const handleSelectionModelChange = (ids) => {
    const selectedIDs = new Set(ids);
    setSelectRowData(employeeData.filter((row) => selectedIDs.has(row.id) ));
  }


  // 삭제
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);
  const [deletionDialogTitle, setDeletionDialogTitle] = useState("");

  const handleDeletionDialogOpen = () => { 
    const willBeDeletedNames = Object.keys(selectedRowData).map((key) => selectedRowData[key].nickname);
    if (willBeDeletedNames.length !== 0) { 
      setDeletionDialogOpen(true);
      setDeletionDialogTitle(
        <React.Fragment>
          <span id="first-name-in-dialog-title">
            <b>{willBeDeletedNames[0]}</b>
          </span>
          <span>
            &nbsp;외 {willBeDeletedNames.length - 1} 명을 삭제하시겠습니까?
          </span>
        </React.Fragment>
      );
    }
    else { alert(`삭제할 사원을 체크해주세요.`); }
  }
  const handleDeletionDialogClose = () => { setDeletionDialogOpen(false); }
  const handleDeletionAgree = (event) => {
    const formData = new FormData();
    formData.append("mid", selectedRowData.map(value => value.id.toString()));
    axiosAPI.post(`/api/admin/user`, formData)
      .then(response => {
        alert(`삭제가 완료되었습니다.`);
        handleDeletionDialogClose();
        setRenderPage(true);
      })
      .catch(error => {
        errorLog(error);
        alert(`삭제에 실패했습니다.`);
        handleDeletionDialogClose();
      })
  }


  // 부서이동, 직책변경 set select option
  const [selectOption, setSelectOption] = useState("");
  const handleSelectOption = (event) => { setSelectOption(event.target.value); }


  // 부서이동
  const [moveDepartmentModalOpen, setMoveDepartmentModalOpen] = useState(false);
  const moveDepartmentModalTitle = "부서변경";
  const moveDepartmentModalContent = "부서를 선택해주세요";
  const moveDepartmentInputLabel = "부서";

  const handleMoveDepartmentModalOpen = () => {
    const willBeMovedNames = Object.keys(selectedRowData).map((key) => selectedRowData[key].nickname);
    if (willBeMovedNames.length !== 0) { setMoveDepartmentModalOpen(true); }
    else { alert(`부서를 이동할 사원을 체크해주세요.`); }
  }
  const handleMoveDepartmentModalClose = () => { setMoveDepartmentModalOpen(false); }
  const handleMoveDepartmentAgree = () => { 
    if (selectOption === "") alert(`부서가 선택되지 않았습니다.`);
    else {
    const formData = new FormData();
    formData.append("mid", selectedRowData.map(value => value.id.toString()));
    formData.append("department", selectOption);
    axiosAPI.put(`/api/admin/user/department`, formData)
      .then(response => {
        alert(`부서 이동이 완료되었습니다.`);
        handleMoveDepartmentModalClose();
        setRenderPage(true);
        const temp = searchInput;  // 체크박스 해제하기 위한 야매코드
        setSearchInput("_");
        setSearchInput(temp);
      })
      .catch(error => {
        errorLog(error);
        alert(`부서 이동에 실패했습니다.`);
        handleMoveDepartmentModalClose();
      })
    }
  }


  // 직책변경
  const [changePositionModalOpen, setChangePositionModalOpen] = useState(false);
  const changePositionModalTitle = "직책변경";
  const changePositionModalContent = "직책을 선택해주세요";
  const changePositionInputLabel = "직책"

  const handleChangePositionModalOpen = () => {
    const willBeChangedNames = Object.keys(selectedRowData).map((key) => selectedRowData[key].nickname);
    if (willBeChangedNames.length !== 0) { setChangePositionModalOpen(true); }
    else { alert(`직책을 변경할 사원을 체크해주세요.`); }
  }
  const handleChangePositionModalClose = () => { setChangePositionModalOpen(false); }
  const handleChangePositionAgree = () => { 
    if (selectOption === "") alert(`직책이 선택되지 않았습니다.`);
    else {
      const formData = new FormData();
      formData.append("mid", selectedRowData.map(value => value.id.toString()));
      formData.append("position", selectOption);
      axiosAPI.put(`/api/admin/user/position`, formData)
        .then(response => {
          alert(`직책 변경이 완료되었습니다.`);
          handleChangePositionModalClose();
          setRenderPage(true);
          const temp = searchInput;  // 체크박스 해제하기 위한 야매코드
          setSearchInput("_");
          setSearchInput(temp);
        })
        .catch(error => {
          errorLog(error);
          alert(`직책 변경에 실패했습니다.`);
          handleChangePositionModalClose();
        })
    }
  }


  // TODO: handleInitializationAgree 기능 추가(axios data post)
  // 초기화
  const [initializationDialogOpen, setInitializationDialogOpen] = useState(false);
  const [initializationDialogTitle, setInitializationDialogTitle] = useState("");

  const handleInitializationDialogOpen = () => { 
    const willBeInitailzedNames = Object.keys(selectedRowData).map((key) => selectedRowData[key].nickname);
    if (willBeInitailzedNames.length !== 0) { 
      setInitializationDialogOpen(true);
      setInitializationDialogTitle(
        <React.Fragment>
          <span id="first-name-in-dialog-title">
            <b>{willBeInitailzedNames[0]}</b>
          </span>
          <span>
            &nbsp;외 {willBeInitailzedNames.length - 1} 명의 비밀번호를 초기화하시겠습니까?
          </span>
        </React.Fragment>
      );
    }
    else { alert(`비밀번호를 초기화할 사원을 체크해주세요.`); }
  }
  const handleInitializationDialogClose = () => { setInitializationDialogOpen(false); }
  const handleInitializationAgree = () => { 
    alert(`비밀번호 초기화가 완료되었습니다.`);
    setInitializationDialogOpen(false);
  }


  
  return(
    <div className="page-content">
      <Container fluid={true}>
        <Row>
          <Col xs="12">

            {employeeData === null ?
            "" :
            <React.Fragment>

            <Card className="mb-2">
              <CardBody className="pb-3">

                <CardTitle><div className="card-title-wrapper">사원 목록(총 {employeeData.length}명)</div></CardTitle>

                <hr className="m-2" style={{width: "100%"}}/>

                <div className="d-flex">
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="이름 검색" inputProps={{ "aria-label": "search" }}
                    value={searchInput} onChange={handleSearchInput} />
                  </Search>

                  <ButtonReact color="primary" className="employee-management-function-btn" onClick={handleDeletionDialogOpen}>삭제</ButtonReact>
                  <DialogTemplate open={deletionDialogOpen} handleClose={handleDeletionDialogClose} 
                  handleAgreement={handleDeletionAgree} dialogTitle={deletionDialogTitle} />

                  <ButtonReact color="primary" className="employee-management-function-btn" onClick={handleMoveDepartmentModalOpen}>부서이동</ButtonReact>
                  <EmployeeManagementModal open={moveDepartmentModalOpen} handleClose={handleMoveDepartmentModalClose}
                  modalTitle={moveDepartmentModalTitle} modalContent={moveDepartmentModalContent} inputLabel={moveDepartmentInputLabel}
                  handleAgreement={handleMoveDepartmentAgree} selectionList={departments}
                  selectOption={selectOption} handleSelectOption={handleSelectOption} />

                  <ButtonReact color="primary" className="employee-management-function-btn" onClick={handleChangePositionModalOpen}>직책변경</ButtonReact>
                  <EmployeeManagementModal open={changePositionModalOpen} handleClose={handleChangePositionModalClose}
                  modalTitle={changePositionModalTitle} modalContent={changePositionModalContent} inputLabel={changePositionInputLabel}
                  handleAgreement={handleChangePositionAgree} selectionList={positions}
                  selectOption={selectOption} handleSelectOption={handleSelectOption} />

                  <ButtonReact color="primary" className="employee-management-function-btn" onClick={handleInitializationDialogOpen}>초기화</ButtonReact>
                  <DialogTemplate open={initializationDialogOpen} handleClose={handleInitializationDialogClose}
                  handleAgreement={handleInitializationAgree} dialogTitle={initializationDialogTitle} />


                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle color="primary" className="employee-management-more-btn"><FontAwesomeIcon icon={faEllipsisH} /></DropdownToggle>

                    <DropdownMenu>
                      <DropdownItem onClick={handleDeletionDialogOpen}>삭제</DropdownItem>
                      <DropdownItem divider/>
                      <DropdownItem onClick={handleMoveDepartmentModalOpen}>부서이동</DropdownItem>
                      <DropdownItem divider/>
                      <DropdownItem onClick={handleChangePositionModalOpen}>직책변경</DropdownItem>
                      <DropdownItem divider/>
                      <DropdownItem onClick={handleInitializationDialogOpen}>초기화</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

              </CardBody>
            </Card>

    
            <Card className="mb-2">
              <EmployeeList employees={employeeData} searchInput={searchInput}
              handleSelectionModelChange={handleSelectionModelChange} />
            </Card>
            
            </React.Fragment>}
            
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EmployeeManagement
