import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { UPDATE_MEMBERS } from "./actionTypes"
import { updateMemberSuccessful, updateMemberFailed, deleteMemberSuccessful, deleteMemberFailed } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import { DELETE_MEMBER } from "../../../helpers/url_helper"
// import {
//   postFakeRegister,
//   postJwtRegister,
// } from "../../../helpers/backend_helper"

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* updateMember({ payload: { user } }) {
  try {
    yield put(updateMemberSuccessful(user))
} catch (error) {
// console.log('errrrrrrr =>', error)
yield put(updateMemberFailed(error))
}

  // try {
  //   if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //     const response = yield call(
  //       fireBaseBackend.registerUser,
  //       user.email,
  //       user.password
  //     )
  //     yield put(registerUserSuccessful(response))
  //   } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
  //     const response = yield call(postJwtRegister, "/post-jwt-register", user)
  //     console.log(response)
  //     yield put(registerUserSuccessful(response))
  //   } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
  //     const response = yield call(postFakeRegister, user)
  //     yield put(registerUserSuccessful(response))
  //   }
  // } catch (error) {
  //   yield put(registerUserFailed(error))
  // }
}

export function* watchMemberUpdate() {
  yield takeEvery(UPDATE_MEMBERS, updateMember)
}



function*  deleteMember({ payload: { user } }) {
  try {
    yield put(deleteMemberSuccessful(user))
} catch (error) {
// console.log('errrrrrrr =>', error)
yield put(deleteMemberFailed(error))
}
}

export function* watchMemberDelete() {
  yield takeEvery(DELETE_MEMBER, deleteMember)
}




function* memberSaga() {
  yield all([fork(watchMemberUpdate)])
  yield all([fork(watchMemberDelete)])

}

export default memberSaga
