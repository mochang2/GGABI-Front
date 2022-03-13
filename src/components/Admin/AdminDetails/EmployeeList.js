import React from "react"

// datagrid component
import { DataGrid, jaJP } from "@mui/x-data-grid" // @mui/x-data-grid/dist/ 에서 jaJP에 해당하는 것을 직접 한국어로 바꿈

// reactstrap
import {  Button as ButtonReact } from "reactstrap"

// design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons"
import { makeStyles } from "@mui/styles"
// import clsx from "clsx"

// formatter
import { formatPhone } from "../../../pages/Contacts/Commons"
import dayjs from "dayjs"


// data grid
const columns = [
  {field: "nickname",     headerName: "이름",     type: "string", width: 120, headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell"},
  {field: "username",     headerName: "아이디",   type: "string", width: 130, headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--border"},
  {field: "department",   headerName: "부서",     type: "string", width: 120, headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell"},
  {field: "position",     headerName: "직책",     type: "string", width: 120, headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell"},
  {field: "birthday",     headerName: "생년월일", type: "date",   width: 140, headerAlign: "center", headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell",
    renderCell: (params: GridRenderCellParams) => (dayjs(params.value).format("YYYY-MM-DD"))},
  {field: "email",        headerName: "이메일",   type: "email",  width: 180, headerAlign: "center", headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--border"},
  {field: "phone",        headerName: "전화번호", type: "string", width: 140, headerAlign: "center", headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell",
    renderCell: (params: GridRenderCellParams) => (formatPhone(params.value))},
  {field: "status",       headerName: "상태",     type: "string", width: 130, headerAlign: "center", headerClassName: "super-app-theme--header",
    // cellClassName: (params) =>
    //   clsx("super-app", {
    //     active: params.value === "active",
    //     inactive: params.value === "inactive",
    //   }),
    renderCell: (params: GridRenderCellParams) => (
      params.value === "active" ?
        <ButtonReact variant="contained" color="success" size="small" style={{ padding: 8, marginLeft: 6 }}>
          active
        </ButtonReact>
      :
        <ButtonReact variant="contained" color="danger" size="small" style={{ padding: 8 }}>
          inactive
        </ButtonReact>
    )},
  {field: "details",      headerName: "자세히",   type: "string", width: 140,                        headerClassName: "super-app-theme--header",
    renderCell: (params: GridRenderCellParams) => (
      <ButtonReact outline color="primary" style={{ fontSize: "12px", marginLeft: "12px", padding: "4px 8px" }} 
      onClick={() => {alert(`당신은${params.value} ~~정보를 보고 있습니다`)}} >
        <FontAwesomeIcon icon={faExpandArrowsAlt} />
      </ButtonReact>
  )},
]


// // datagrid design
const useStyles = makeStyles({
  root: {
    "& .super-app-theme--cell": {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "'Segoe UI'",
        "Roboto",
        "'Helvetica Neue'",
        "Arial",
        "sans-serif",
      ].join(","),
    },
    "& .super-app-theme--header": {
      color: "#2f3974",
      backgroundColor: "#cfcfcf",
      textDecoration: "underline",
    },
    "& .super-app-theme--border": {
      fontWeight: 500,
    },
    "& .super-app.active": {
      backgroundColor: "rgba(157, 255, 118, 0.49)",
      color: "#1a3e72",
    },
    "& .super-app.inactive": {
      backgroundColor: "#d47483",
      color: "#1a3e72",
    },
  },
});



const EmployeeList = (props) => {

  const classes = useStyles();

  return(
    <div style={{ height: 650, width: "100%", display: "flex" }} className={classes.root}>
      <DataGrid 
      rows={props.employees.filter((employee) => {return employee.nickname.includes(props.searchInput)})} 
      columns={columns} pageSize={props.employees.length} checkboxSelection={true}
      hideFooterPagination={true} disableMultipleColumnsSorting={true} 
      onSelectionModelChange={props.handleSelectionModelChange} localeText={jaJP.props.MuiDataGrid.localeText} />
    </div>
  )
}

export default EmployeeList