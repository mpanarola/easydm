import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_WEBSITES, ADD_NEW_WEBSITE, UPDATE_WEBSITE, DELETE_WEBSITE } from "./actionTypes"
import { getWebsitesSuccess, getWebsitesFail, addWebsitesSuccess, addWebsitesFail, updateWebsitesSuccess, updateWebsitesFail , deleteWebsitesSuccess
  , deleteWebsitesFail, 
  updateWebsite,
  deleteWebsite} from "./actions"

//Include Both Helper File with needed methods
import { addNewWebsite, getWebsites } from "../../helpers/backend_helper"

function* fetchWebsites() {
  try {
    const response = yield call(getWebsites)
    yield put(getWebsitesSuccess(response))
  } catch (error) {
    yield put(getWebsitesFail(error))
  }
}






function* onAddNewWebsite({ payload: website }) {
  try {
    const response = yield call(addNewWebsite, website)
    yield put(addWebsitesSuccess(response))
  } catch (error) {
    yield put(addWebsitesFail(error))
  }
}

function* onUpdateWebsite({ payload: website }) {
  try {
    const response = yield call(updateWebsite, website)
    yield put(updateWebsitesSuccess(response))
  } catch (error) {
    yield put(updateWebsitesFail(error))
  }
}

function* onDeleteWebsite({ payload: website }) {
  try {
    const response = yield call(deleteWebsite, website)
    yield put(deleteWebsitesSuccess(response))
  } catch (error) {
    yield put(deleteWebsitesFail(error))
  }
}


function* websitesSaga() {
  yield takeEvery(GET_WEBSITES, fetchWebsites)
  yield takeEvery(ADD_NEW_WEBSITE, onAddNewWebsite)
  yield takeEvery(UPDATE_WEBSITE, onUpdateWebsite)
  yield takeEvery(DELETE_WEBSITE, onDeleteWebsite)
  // yield takeEvery(GET_CATEGORIES, onGetCategories)
}




export default websitesSaga
