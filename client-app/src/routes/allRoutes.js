import React from "react"
import { Redirect } from "react-router-dom"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Dashboard2 from "../pages/Dashboard2.js/index.js"

import Webpages from "../pages/Webpages/Webpage"
import Members from "../pages/Members/Member"
import Profile from "../pages/Members/Profile"





import Updatebacklink from "../pages/Backlinks/Updatebacklink"
import Createbacklink from "../pages/Backlinks/Createbacklink"

import ContentSchedulers from "../pages/ContentSchedulers/ContentScheduler"

import Pageview from "../pages/Pageviews/Pageview"
import Createpageview from "../pages/Pageviews/Createpageview"
import Updatepageview from "../pages/Pageviews/Updatepageview"

import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"


// Authentication related pages
// import Profile from "../pages/Authentication/Profile"

import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

import Updatepage from "../pages/Webpages/Updatepage"
import Createpage from "../pages/Webpages/Createpage"

import Createmember from "../pages/Members/Createmember"
import Updatemember from "../pages/Members/Updatemember"

import AddSchedular from "../pages/ContentSchedulers/CreateScheduler"
import UpdateSchedular from "../pages/ContentSchedulers/UpdateScheduler"

import Backlink from "../pages/Backlinks/Backlink"
import Daybook from "../pages/Daybook/Daybook"
import Createdaybook from "../pages/Daybook/Createdaybook"
import Updatedaybook from "../pages/Daybook/Updatedaybook"
import Reports from "../pages/Daybook/Reports"



const userRoutes = [
  { path: "/EasyDM/dashboard", component: Dashboard },
  { path : '/EasyDM/dashboard2' , component : Dashboard2},

  { path: "/EasyDM/webpages", component: Webpages },
  { path: "/EasyDM/update_website", component: Updatepage },
  { path: "/EasyDM/create_website", component: Createpage },

  { path: "/EasyDM/members", component: Members },
  { path: "/EasyDM/profile", component: Profile },
  { path: "/EasyDM/create_member", component: Createmember },
  { path: "/EasyDM/update_member", component: Updatemember },

  { path: "/EasyDM/content_schedulers", component: ContentSchedulers },
  { path: "/EasyDM/create_scheduler", component: AddSchedular },
  { path: "/EasyDM/update_schedular", component: UpdateSchedular },


  { path: "/EasyDM/backlinks", component: Backlink },
  { path: "/EasyDM/create_backlink", component: Createbacklink },
  { path: "/EasyDM/update_backlink", component: Updatebacklink },


  { path: "/EasyDM/page_views", component: Pageview },
  // { path: "http://192.168.1.202/page_views", component: Pageview },

  { path: "/EasyDM/create_page_view", component: Createpageview },
  { path: "/EasyDM/update_page_view", component: Updatepageview },

  { path: "/EasyDM/daybooks", component: Daybook },
  { path: "/EasyDM/create_daybook", component:Createdaybook },
  { path: "/EasyDM/update_daybook", component: Updatedaybook },
  { path: "/EasyDM/daybooks_report", component: Reports },


  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/EasyDM/dashboard" /> },
  { path: "/*", exact: true, component: () => <Redirect to="/EasyDM/dashboard" /> },

]

const authRoutes = [

  { path: "/EasyDM/logout", component: Logout },
  { path: "/EasyDM/login", component: Login },
  { path: "/login", component: Login },
  { path: "/EasyDM/forgot-password", component: ForgetPwd },
  
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

]

export { userRoutes, authRoutes }