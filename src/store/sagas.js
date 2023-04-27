import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import tasksSaga from "./tasks/saga"
import contactsSaga from "./contacts/saga"
import websitesSaga from "./websites/saga"
// import memberSaga from "./members/saga"
import memberSaga from "./auth/members/saga"



export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    memberSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    fork(LayoutSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(tasksSaga),
    fork(websitesSaga),

    fork(contactsSaga),
  ])
}
