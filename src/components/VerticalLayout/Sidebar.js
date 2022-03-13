import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

const Sidebar = props => {

  // 제일 아래 div data-simplebar 의 className="h-100"을 빼고 style로 치환하니 footer 아래 공백 생기는 것이 사라짐

  function tToggle() {
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
  }

  return (
    <React.Fragment>
      <div className="vertical-menu">

        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm" >
              <img src={logoSm} alt="" width="40" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="50" />
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

        <button
          onClick={() => { tToggle(); }}
          type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
          <i className="fa fa-fw fa-bars"></i>
        </button>
        
        <div data-simplebar style={{height: "90%"}}>
          {props.type !== "condensed" ? <SidebarContent userData={props.userData} /> : <SidebarContent userData={props.userData} />}
        </div>
        
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));