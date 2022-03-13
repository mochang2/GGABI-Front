import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, withRouter } from "react-router-dom";
import LinkTo from "../LinkTo";
import { axiosAPI } from "../../APIs/BaseAPI";

const Authmiddleware = ({component: Component, layout: Layout, isAuthProtected, ...rest}) => {
  
  // Layout에 주는 게 ...props였는데 ...rest로 바꾸니까 데이터가 전달되어서 바꿈

  React.useEffect(() => { // 페이지 refresh해도 정상적으로 동작할 수 있도록

    // LoginForm.js에서 f5가 눌러져서 setTimeout이 동작 안 할 경우를 대비하여 추가한 코드
    if (localStorage.getItem("JWTTokenExpireTime") && localStorage.getItem("JWTTokenExpireTime") < Date.now()) {
      alert(`로그인 세션이 만료되었습니다. 다시 로그인 해주세요.`);
      rest.history.push(LinkTo.logout);
    }

    // axios header에서 토큰을 추가하기 위해
    if (localStorage.getItem("JWTToken") && axiosAPI.defaults.headers.common["Authorization"] === "") {
      axiosAPI.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("JWTToken")}`;
    }
  })


  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthProtected && !localStorage.getItem("user")) {
          return (
            <Redirect to={{ pathname: LinkTo.login, state: { from: props.location } }} />
          );
        }

        return (
          <Layout {...rest} >
            <Component {...rest} />
          </Layout>
        );
      }}
    />
  )

  // return ( // BE 꺼져있을 때
  //   <Route
  //     {...rest}
  //     render={props => {
  //       if (false) {
  //         return (
  //           <Redirect to={{ pathname: LinkTo.login, state: { from: props.location } }} />
  //         );
  //       }

  //       return (
  //         <Layout {...rest} >
  //           <Component {...rest} />
  //         </Layout>
  //       );
  //     }}
  //   />
  // )
};

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default withRouter(Authmiddleware);
