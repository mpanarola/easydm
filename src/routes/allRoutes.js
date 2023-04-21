import React from "react"
import { Redirect } from "react-router-dom"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Dashboard2 from "../pages/Dashboard2.js/index.js"

import Webpages from "../pages/Webpages/Webpage"
import Members from "../pages/Members/Member"

import Updatebacklink from "../pages/Backlinks/Updatebacklink"
import Createbacklink from "../pages/Backlinks/Createbacklink"

import ContentSchedulers from "../pages/ContentSchedulers/ContentScheduler"

import Pageview from "../pages/Pageviews/Pageview"
import Createpageview from "../pages/Pageviews/Createpageview"
import Updatepageview from "../pages/Pageviews/Updatepageview"

import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"


// Authentication related pages
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



const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path : '/dashboard2' , component : Dashboard2},

  { path: "/webpages", component: Webpages },
  { path: "/members", component: Members },
  { path: "/content_schedulers", component: ContentSchedulers },


  { path: "/update_website", component: Updatepage },
  { path: "/create_website", component: Createpage },


  { path: "/create_member", component: Createmember },
  { path: "/update_member", component: Updatemember },


  { path: "/create_scheduler", component: AddSchedular },
  { path: "/update_schedular", component: UpdateSchedular },


  { path: "/backlinks", component: Backlink },
  { path: "/create_backlink", component: Createbacklink },
  { path: "/update_backlink", component: Updatebacklink },


  { path: "/page_views", component: Pageview },
  { path: "/create_page_view", component: Createpageview },
  { path: "/update_page_view", component: Updatepageview },

  { path: "/daybooks", component: Daybook },
  { path: "/create_daybook", component:Createdaybook },
  { path: "/update_daybook", component: Updatedaybook },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

]

export { userRoutes, authRoutes }