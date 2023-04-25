import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//contacts
import contacts from "./contacts/reducer"

//tasks
import tasks from "./tasks/reducer"

import websites from "./websites/reducer"

// import members from "./members/reducer"

// import contents_schedulars from "./contents_schedulars/reducer"

// // import back_links from "./back_links/reducer"

// import page_views from "./page_views/reducer"

// import day_books from "./day_books/reducer"


const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  tasks,
  contacts,
  websites,
  // members,
  // contents_schedulars,
  // back_links,
  // page_views,
  // day_books,


})

export default rootReducer
