import React, { /*useState*/ } from "react"

// datagrid component
import { DataGrid, jaJP } from "@mui/x-data-grid" // @mui/x-data-grid/dist/ 에서 jaJP에 해당하는 것을 직접 한국어로 바꿈

// design
// import { Button as ButtonReact } from "reactstrap"
import { makeStyles } from "@mui/styles"

// date formatter
import { formatDate } from "../../../pages/Email/CommonFunctions"


// datagrid design
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
    "& .super-app-theme--data-cell": {
      marginLeft: "-20px",
      marginRight: "20px",
    },
    "& .super-app-theme--header": {
      fontSize: "14px",
      color: "#f8fafc",
      backgroundColor: "#4f81bd",
      textDecoration: "underline",
    },
    "& .super-app-theme--border": {
      fontWeight: 600,
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


export const AppliedList = (props) => {

  // data columns
  const AppliedListColumns = [
    {field: "username",     headerName: "아이디",   type: "string", width: 150, headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--border"},
    {field: "nickname",     headerName: "닉네임",   type: "string", width: 200, headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--border"},
    {field: "department",   headerName: "부서",     type: "string", width: 120, headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell"},
    {field: "position",     headerName: "직책",     type: "string", width: 120, headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell"},
    {field: "birthday",     headerName: "생년월일", type: "date",   width: 200, headerAlign: "center", headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--data-cell", align:"center",
    renderCell: (params: GridRenderCellParams) => (
      formatDate(params.value)
    )},
    {field: "phone",        headerName: "전화번호", type: "string", width: 140, headerAlign: "center", headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--border"},
    {field: "isCreated",    headerName: "가입날짜", type: "date",  width: 200, headerAlign: "center", headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--data-cell", align:"center",
    renderCell: (params: GridRenderCellParams) => (
      formatDate(params.value)
    )},
  ]


  const classes = useStyles();

  return(
    <div style={{ height: 500, width: "100%", display: "flex" }} className={classes.root}>
      <DataGrid 
      rows={props.applicants.filter((applicant) => {return applicant.username.includes(props.searchInput)})} 
      columns={AppliedListColumns} pageSize={props.applicants.length} checkboxSelection={true}
      hideFooterPagination={true} disableMultipleColumnsSorting={true} 
      onSelectionModelChange={props.handleSelectedApplicants} localeText={jaJP.props.MuiDataGrid.localeText} />
    </div>
  )
}


export const RejectedList = (props) => {

  // const [rejectedReasonWidth, setRejectedReasonWidth] = useState(400);
  // const [showDetailsOpen, setShowDetailedOpen] = useState(true);
  // const computeMaxLength = (array) => {
  //   return Math.max(...array.map((value, index) => value.rejectedReason.length));
  // }
  // const handleShowDetailsOpen = () => {
  //   setShowDetailedOpen(!showDetailsOpen);
  //   setRejectedReasonWidth(computeMaxLength(props.RejectedPeople) * 16);
  // }
  // const handleShowDetailsClose = () => {
  //   setShowDetailedOpen(!showDetailsOpen);
  //   setRejectedReasonWidth(400);
  // }

  // const formatRejectedReason = (reason) => {
  //   if (reason.length > 25) {
  //     return (
  //       showDetailsOpen 
  //       ? 
  //       <span>
  //         {reason.slice(0,25) + "..."} 
  //         <ButtonReact outline style={{ fontSize: "12px", marginLeft: "12px", marginTop: "-4px", padding: "4px 8px" }}
  //         onClick={handleShowDetailsOpen} title={reason}>
  //           자세히
  //         </ButtonReact>
  //       </span>
  //       :
  //       <span>
  //         {reason} 
  //         <ButtonReact outline style={{ fontSize: "12px", marginLeft: "12px", marginTop: "-4px", padding: "4px 8px" }}
  //         onClick={handleShowDetailsClose}>
  //           간단히
  //         </ButtonReact>
  //       </span>
  //     )
  //   }
  //   return (
  //     <span>{reason}</span>
  //   )
  // };
  
    // data columns
  const rejectedListColumns = [
    {field: "username",     headerName: "아이디",   type: "string", width: 150,       headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--border"},
    {field: "nickname",     headerName: "닉네임",   type: "string", width: 200,       headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--border"},
    {field: "department",   headerName: "부서",     type: "string", width: 120,       headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell"},
    {field: "position",     headerName: "직책",     type: "string", width: 120,       headerAlign: "left",  headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell"},
    {field: "birthday",     headerName: "생년월일", type: "date",   width: 200,       headerAlign: "center", headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--data-cell", align:"center",
    renderCell: (params: GridRenderCellParams) => (
      formatDate(params.value)
    )},
    {field: "phone",        headerName: "전화번호", type: "string", width: 140,       headerAlign: "center", headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--border"},
    {field: "isCreated",    headerName: "가입날짜", type: "date",  width: 200,       headerAlign: "center", headerClassName: "super-app-theme--header", cellClassName: "super-app-theme--cell super-app-theme--data-cell", align:"center",
    renderCell: (params: GridRenderCellParams) => (
      formatDate(params.value)
    )},
  ]


  const classes = useStyles();

  return(
    <div style={{ height: 500, width: "100%", display: "flex" }} className={classes.root}>
      <DataGrid 
      rows={props.RejectedPeople.filter((people) => {return people.username.includes(props.searchInput)})} 
      columns={rejectedListColumns} pageSize={props.RejectedPeople.length} checkboxSelection={true}
      hideFooterPagination={true} disableMultipleColumnsSorting={true} 
      onSelectionModelChange={props.handleSelectedRejectedPeople} localeText={jaJP.props.MuiDataGrid.localeText} />
    </div>
  )
}