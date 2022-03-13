import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import contactsSaga from "./contacts/saga"

export default function* rootSaga() { // 비동기적으로 처리하기 위해 fork를 넣은 것이라고 함. like thread
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    fork(LayoutSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(contactsSaga),
  ])
}
