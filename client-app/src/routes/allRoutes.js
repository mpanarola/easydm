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
  { path: "/easyDM/dashboard", component: Dashboard },
  { path : '/easyDM/dashboard2' , component : Dashboard2},

  { path: "/easyDM/webpages", component: Webpages },
  { path: "/easyDM/update_website", component: Updatepage },
  { path: "/easyDM/create_website", component: Createpage },

  { path: "/easyDM/members", component: Members },
  { path: "/easyDM/profile", component: Profile },
  { path: "/easyDM/create_member", component: Createmember },
  { path: "/easyDM/update_member", component: Updatemember },

  { path: "/easyDM/content_schedulers", component: ContentSchedulers },
  { path: "/easyDM/create_scheduler", component: AddSchedular },
  { path: "/easyDM/update_schedular", component: UpdateSchedular },


  { path: "/easyDM/backlinks", component: Backlink },
  { path: "/easyDM/create_backlink", component: Createbacklink },
  { path: "/easyDM/update_backlink", component: Updatebacklink },


  { path: "/easyDM/page_views", component: Pageview },
  // { path: "http://192.168.1.202/page_views", component: Pageview },

  { path: "/easyDM/create_page_view", component: Createpageview },
  { path: "/easyDM/update_page_view", component: Updatepageview },

  { path: "/easyDM/daybooks", component: Daybook },
  { path: "/easyDM/create_daybook", component:Createdaybook },
  { path: "/easyDM/update_daybook", component: Updatedaybook },
  { path: "/easyDM/daybooks_report", component: Reports },


  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/easyDM/dashboard" /> },
  { path: "/*", exact: true, component: () => <Redirect to="/easyDMdashboard" /> },

]

const authRoutes = [

  { path: "/logout", component: Logout },
  { path: "/easyDM/login", component: Login },
  { path: "/login", component: Login },
  { path: "/easyDM/forgot-password", component: ForgetPwd },
  
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

]

export { userRoutes, authRoutes }