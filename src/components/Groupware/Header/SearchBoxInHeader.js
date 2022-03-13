import React, { useState, useEffect, useRef } from "react"

// Groupware Default Routes list
import GroupwareDefaultRoutes from "../../../routes/GroupwareDefaultRoutes"

// Modal Component
import ModalTemplate from "../../Common/ModalTemplate"

// design
import "./searchBoxInHeader.css"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import { styled, alpha } from "@mui/material/styles"


const select_style = {
    m: 1,
    minWidth: 120
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    display: 'flex',
    alignItems: 'center',
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-root': {
            width: '80%',
        },
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {  // responsive
                width: '90%',
            },
        },
    })
);

const modalTitle = "검색 상세 Title";
const modalContent = "검색 상세 Content";
const modalTitleVariant = "h6";
const modalTitleComponent = "h2";

const modal_style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    width: "50%",
    minWidth: 200,
    bgcolor: "#ffffff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

let causeBySelect = false;

const SearchBoxInHeader = (props) => {

    // select
    const [URLPath, setURLPath] = useState("/email/inbox");
    const mounted = useRef();

    useEffect( () => {
        if (!mounted.current) {
            mounted.current = true;
        } else if (causeBySelect) {
            document.location.href = URLPath;
        }
    });

    const handleGroupwareSelectChange = (event) => {
        causeBySelect = true;
        setURLPath(event.target.value);
    };

    // search
    //// TODO: need to test
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSearchboxValueChange = (event) =>{
        event.preventDefault();
        causeBySelect = false;
        setSearchKeyword(event.target.value);
    }

    // modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        causeBySelect = false;
        setOpen(true);
    }
    const handleClose = () => {
        causeBySelect = false;
        setOpen(false);
    }

    return (
        <div className="searchbox-wrapper">
            <FormControl sx={select_style}>
                <Select onChange={handleGroupwareSelectChange} value={URLPath}
                inputProps={{ 'aria-label': 'Without label' }}>
                    {GroupwareDefaultRoutes.map((routes, index) => {
                        return (
                            <MenuItem key={index} value={routes.path}>
                                {routes.groupwareName}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="검색"
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={searchKeyword}
                onChange={handleSearchboxValueChange}
                />

                <div className="search-details-container">
                    <img src={process.env.PUBLIC_URL + "/favicons/fa-details.png"}
                    alt="디테일 이미지" className="favicon-png" onClick={handleOpen} />
                </div>
                <ModalTemplate style={modal_style} open={open} handleClose={handleClose}
                modalTitle={modalTitle} modalContent={modalContent}
                modalTitleVariant={modalTitleVariant}    modalTitleComponent={modalTitleComponent} />
            </Search>
        </div>
    )
}

export default SearchBoxInHeader