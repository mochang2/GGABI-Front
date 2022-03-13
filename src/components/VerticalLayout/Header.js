import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";
import GroupwareDefaultRoutes from "../../routes/GroupwareDefaultRoutes"

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";

// logo
import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

// design
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import { styled, alpha } from "@mui/material/styles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

// modal Components
import ModalTemplate from "../Common/ModalTemplate"



// search
const selectStyle = {
  m: 1,
  minWidth: 120,
  justifyContent: "center",
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

  // modal
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


const Header = props => {
  const [URLPath, setURLPath] = useState(
    GroupwareDefaultRoutes.map((route, index) => {
      return (route.path)
    }).includes(document.location.pathname) ?
    document.location.pathname :
    ""
  );
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
  const [openSearchDetails, setOpenSearchDetails] = useState(false);
  const handleOpenSearchDetails = () => {
    causeBySelect = false;
    setOpenSearchDetails(true);
  }
  const handleCloseSearchDetails = () => {
    causeBySelect = false;
    setOpenSearchDetails(false);
  }
  

  function tToggle() {
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
  }



  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="20" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="20" />
                </span>
              </Link>
            </div>

            <button type="button" onClick={() => { tToggle(); }}
            className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
            id="vertical-menu-btn">
              <i className="fa fa-fw fa-bars" />
            </button>


            <FormControl sx={selectStyle} className="page-topbar-groupware-formcontrol">
              <Select onChange={handleGroupwareSelectChange} value={URLPath} style={{display: "none"}}
              inputProps={{ 'aria-label': 'Without label' }} >
                {GroupwareDefaultRoutes.map((routes, index) => {
                  return (
                    <MenuItem key={index} value={routes.path}>
                      {routes.groupwareName}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <Search style={{display: "none"}}>
              <SearchIconWrapper className="page-topbar-search-component">
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="검색" inputProps={{ 'aria-label': 'search' }} name="searchKeyword"
              value={searchKeyword} onChange={handleSearchboxValueChange} className="page-topbar-search-component"/>

              <div className="search-details-container page-topbar-search-component">
                <img src={process.env.PUBLIC_URL + "/favicons/fa-details.png"}
                alt="디테일 이미지" className="groupware-favicon-img" onClick={handleOpenSearchDetails} />
              </div>
              <ModalTemplate style={modal_style} open={openSearchDetails} handleClose={handleCloseSearchDetails}
              modalTitle={modalTitle} modalContent={modalContent}
              modalTitleVariant={modalTitleVariant} modalTitleComponent={modalTitleComponent} />
            </Search>
          </div>


          <div className="d-flex">

            <NotificationDropdown />

            <ProfileMenu />

            <div onClick={() => { props.showRightSidebarAction(!props.showRightSidebar); }}
            className="dropdown d-inline-block">
              <button type="button" className="btn header-item noti-icon right-bar-toggle waves-effect"
              style={{display: "none"}}>
                <FontAwesomeIcon icon={faCog} size="lg" />
              </button>
            </div>

          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
