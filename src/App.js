import PropTypes from 'prop-types'
import React from "react"

import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes, adminRoutes, adminRoutesWithoutLayout } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// 404 page
import Pages404 from './pages/Utility/pages-404'

// Import scss
import "./assets/scss/theme.scss"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

// Import Fack Backend
import fakeBackend from "./helpers/AuthType/fakeBackend"

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)


// http://minible-v-light.react.themesbrand.com/dashboard


const App = (props) => {
  function getLayout() {
    let layoutCls = VerticalLayout;

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }
  const Layout = getLayout();

  //// TODO: fetch user data(isLoggedIn === true, 본인 이메일, 관리자 여부, 메일 개수)
  // const fetchAPI = async() => { ~~ await if data => userLoggedIn = true;}
  const userData = {
    userMail: "myself@ggabi.co.kr",
    isAdmin: true,
    mailCount: {
      "inbox": 100, 
      "categoryPromotion": 22,
      "categorySocial": 11,
      "categoryUpdate": 33,
      "importantbox": 99,
      "sentbox": 200,
      "reservationbox": 150,
      "fromtomebox": 20,
      "temporarybox": 2,
      "trashbox": 22,
    },
    mailData: {
      1: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "rmwjr@ggabi.co.kr",     "to": "receiver@ggabi.co.kr", "subject": "개인정보 이용내역을 안내 드립니다.",                                                                     "date": "2021-10-28 21:28:01",},
      2: {"isDeleted": "false", "read": true,  "danger": "dangerous", "from": "wooricard@woori.co.kr", "to": "receiver@ggabi.co.kr", "subject": "[우리카드] 우리금융그룹 내 고객정보 제공안내",                                                           "date": "2021-10-11 21:28:01",},
      3: {"isDeleted": "false", "read": false, "danger": "normal",    "from": "aka123@upbit.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "[업비트] 개인정보 이용내역 안내",                                                                       "date": "2021-10-11 21:28:01",},
      4: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "tnseoqh@dma.co.kr",     "to": "receiver@ggabi.co.kr", "subject": "(광고) 디지털 미래를 위한 신기술, IT 전략, 디지털 업무 환경을 델 테크놀로지스 포럼 다시 보기로 만나보세요", "date": "2021-10-11 21:28:10",},
      5: {"isDeleted": "false", "read": true,  "danger": "warning",   "from": "rlaclwl@ro.com",        "to": "receiver@ggabi.co.kr", "subject": "[NH투자증권] 약관교부 및 위험고지사항 확인 안내문",                                                      "date": "2021-10-11 21:28:01",},
      6: {"isDeleted": "false", "read": false, "danger": "normal",    "from": "ksp9200@coupang.com",   "to": "receiver@ggabi.co.kr", "subject": "[쿠팡페이] 개인정보 이용내역 안내",                                                                     "date": "2021-10-07 21:28:02",},
      7: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "woxorgo@jandi.co.kr",   "to": "receiver@ggabi.co.kr", "subject": "잔디레터 | 재택해도 일잘러! 본인의 재택근무 유형은?",                                                    "date": "2021-10-07 21:28:03",},
      8: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "q1flxb3@dlrp.ad.com",   "to": "receiver@ggabi.co.kr", "subject": "(광고) 엔지니어와 개발자를 위한 행사, Arm DevSummit 등록 진행 중!",                                      "date": "2021-10-07 21:29:01",},
      9: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "admin11@ggabi.co.kr",   "to": "receiver@ggabi.co.kr", "subject": "새로운 환경에서 로그인 되었습니다.",                                                                     "date": "2021-10-07 21:30:01",},
     10: {"isDeleted": "false", "read": false, "danger": "normal",    "from": "koreaA@rokac.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "직장예비군 방침일부보류 해소 및 전출예정 안내",                                                           "date": "2021-10-07 21:28:01",},
     11: {"isDeleted": "false", "read": true,  "danger": "warning",   "from": "akwlakr@cjfja.com",     "to": "receiver@ggabi.co.kr", "subject": "리저스에서 안부의 인사를 전합니다.",                                                                     "date": "2021-10-07 21:28:01",},
     12: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "sender@ggabi.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "제목입니다",                                                                                           "date": "2021-10-07 21:28:01",},
     13: {"isDeleted": "false", "read": true,  "danger": "dangerous", "from": "sender@ggabi.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "제목입니다",                                                                                           "date": "2021-10-07 21:28:01",},
     14: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "sender@ggabi.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "제목입니다",                                                                                           "date": "2021-10-07 21:28:01",},
     15: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "sender@ggabi.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "제목입니다",                                                                                           "date": "2021-10-07 21:28:01",},
     16: {"isDeleted": "false", "read": false, "danger": "normal",    "from": "sender@ggabi.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "제목입니다",                                                                                           "date": "2021-10-07 21:28:01",},
     17: {"isDeleted": "false", "read": true,  "danger": "warning",   "from": "sender@ggabi.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "제목입니다",                                                                                           "date": "2021-10-07 21:28:01",},
     18: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "sender@ggabi.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "제목입니다",                                                                                           "date": "2021-10-07 21:28:01",},
     19: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "sender@ggabi.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "제목입니다",                                                                                           "date": "2021-10-07 21:28:01",},
     20: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "sender@ggabi.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "제목입니다",                                                                                           "date": "2021-10-07 21:28:01",},
     21: {"isDeleted": "false", "read": true,  "danger": "normal",    "from": "sender@ggabi.co.kr",    "to": "receiver@ggabi.co.kr", "subject": "제목입니다",                                                                                           "date": "2021-10-07 21:28:01",},
   },
    token: "q1w2e3r4",
    totalVolume: "5GB",
    usedVolume: "432MB",
  };


  return (
    <React.Fragment>
      <Router>

        <Switch>
          {authRoutes.map((route, index) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={index}
              isAuthProtected={false}
            />
          ))}

          {userRoutes.map((route, index) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={index}
              userData={userData}
              isAuthProtected={true}
              exact />
          ))}

          {adminRoutes.map((route, index) => (
            localStorage.getItem("authority") === "ROLE_ADMIN"
            ?
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={index}
              userData={userData}
              isAuthProtected={true}
              exact />
            :
            <Route>
              <Pages404 />
            </Route>
          ))}

          {adminRoutesWithoutLayout.map((route, index) => (
            localStorage.getItem("authority") === "ROLE_ADMIN"
            ?
            <Route path={route.path} component={route.component} />
            :
            <Route>
              <Pages404 />
            </Route>
          ))}

          <Route>
            <Pages404 />
          </Route>
        </Switch>

      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStatetoProps, null)(App);