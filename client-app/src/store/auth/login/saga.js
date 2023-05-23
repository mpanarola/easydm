import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  // postFakeLogin,
  // postJwtLogin,
  // postSocialLogin,
  userLogin,
} from "../../../helpers/backend_helper"

const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user } }) {
  // console.log('mmp 1==>', user);
  try {
        yield put(loginSuccess(user))
  } catch (error) {
    // console.log('errrrrrrr =>', error)
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
// console.log('log_out')
    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response = yield call(fireBaseBackend.logout)
    //   yield put(logoutUserSuccess(response))
    // }
    history.push("/easyDM/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

// function* socialLogin({ payload: { data, history, type } }) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const fireBaseBackend = getFirebaseBackend()
//       const response = yield call(
//         fireBaseBackend.socialLoginUser,
//         data,
//         type,
//       )
//       localStorage.setItem("authUser", JSON.stringify(response))
//       yield put(loginSuccess(response))
//     } else {
//       const response = yield call(postSocialLogin, data)
//       localStorage.setItem("authUser", JSON.stringify(response))
//       yield put(loginSuccess(response))
//     }
//     history.push("/dashboard")
//   } catch (error) {
//     yield put(apiError(error))
//   }
// }

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  // yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
