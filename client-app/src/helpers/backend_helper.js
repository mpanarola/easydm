import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// My APIs

export const getMembersDetails = id =>
  get(`${url.GET_MEMBER_DETAIL}/${id}`, { params: { id } })

export const GET_CONTENT_SCHEDULERS = () => get(url.GET_CONTENT_SCHEDULERS)
export const getContentSchedulerDetails = id =>
  get(`${url.GET_CONTENT_SCHEDULER_DETAIL}/${id}`, { params: { id } })

export const GET_BACK_LINKS = () => get(url.GET_BACK_LINKS)
// export const GET_BACK_LINK_DETAIL = () => get(url.GET_BACK_LINK_DETAIL)
export const getBacklinksDetails = id =>
  get(`${url.GET_BACK_LINK_DETAIL}/${id}`, { params: { id } })

export const GET_PAGE_VIEWS = () => get(url.GET_PAGE_VIEWS)

export const getPageviewsDetails = id =>
  get(`${url.GET_PAGE_VIEW_DETAIL}/${id}`, { params: { id } })

export const getUsers = () => get(url.GET_USERS)



/** MPA API Method */


const userLogin = data => post(url.USER_LOGIN, data)

export const getUserProfile = () => get(url.GET_USER_PROFILE)

export const userDashboard = () => get(url.USER_DASHBOARD)


// Members
const getAllMembers = data => post(url.GET_MEMBERS, data)
const addMember = data => post(url.ADD_MEMBER, data, { headers: { 'Content-Type': 'multipart/form-data' } })
const memberUpdate = (data, id) => put(`${url.UPDATE_MEMBER}/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
export const memberDelete = id =>
  del(`${url.DELETE_MEMBER}/${id}`, { headers: { id } })


// Websites
export const getWebsites = website => post(url.GET_WEBSITES, website)
export const addNewWebsite = website => post(url.ADD_NEW_WEBSITE, website)
export const updateWebsite = (website, id) => put(`${url.UPDATE_WEBSITE}/${id}`, website)
export const deleteWebsite = id =>
  del(`${url.DELETE_WEBSITE}/${id}`, { headers: { id } })
export const activityWebsite = (id) => get(`${url.VIEW_WEBSITE_ACTIVITY}/${id}`)
export const getWebsite = (id) => get(`${url.GET_WEBSITE_DETAIL}/${id}`)


// Content Schedulars
export const getContentSchedulars = schedular => post(url.GET_SCHEDULARS, schedular)
export const addNewSchedular = schedular => post(url.ADD_NEW_SCHEDULAR, schedular)
export const updateSchedular = (schedular, id) => put(`${url.UPDATE_SCHEDULAR}/${id}`, schedular)
// export const updateSchedular = (schedular, id) => put(`${url.UPDATE_SCHEDULAR}/${id}`, schedular )
export const deleteSchedular = id =>
  del(`${url.DELETE_SCHEDULAR}/${id}`, { headers: { id } })
export const activitySchedular = (id) => get(`${url.VIEW_SCHEDULAR_ACTIVITY}/${id}`)


// Back Links
export const getBackLinks = backlink => post(url.GET_BACKLINKS, backlink)
export const addBackLink = backlink => post(url.ADD_BACK_LINK, backlink)
export const updateBackLink = (backlink, id) => put(`${url.UPDATE_BACK_LINK}/${id}`, backlink)
export const checkBacklink = backlink => post(url.CHECK_BACK_LINK, backlink)
// export const updateSchedular = (schedular, id) => put(`${url.UPDATE_SCHEDULAR}/${id}`, schedular )
export const deleteBackLink = id =>
  del(`${url.DELETE_BACK_LINK}/${id}`, { headers: { id } })
export const activityBackLink = (id) => get(`${url.VIEW_BACK_LINK_ACTIVITY}/${id}`)
// export const performanceBackLink = () => get(`${url.VIEW_BACK_LINK_PERFORMANCE}` )
export const performanceBackLink = (id) => get(`${url.VIEW_BACK_LINK_PERFORMANCE}/${id}`)


// Page Views
export const getPageViews = views => post(url.GET_PAGEVIEWS, views)
export const addPageView = view => post(url.ADD_PAGE_VIEW, view)
export const updatePageView = (view, id) => put(`${url.UPDATE_PAGE_VIEW}/${id}`, view)
// export const updateSchedular = (schedular, id) => put(`${url.UPDATE_SCHEDULAR}/${id}`, schedular )
export const deletePageView = id =>
  del(`${url.DELETE_PAGE_VIEW}/${id}`, { headers: { id } })
export const activityPageView = (id) => get(`${url.VIEW_PAGE_VIEW_ACTIVITY}/${id}`)
// export const performancePageView = () => get(`${url.PAGE_VIEW_PERFORMANCE}` )
export const performancePageView = (id) => get(`${url.PAGE_VIEW_PERFORMANCE}/${id}`)



// Day Books
export const getAlldaybooks = (daybook) => post(url.GET_DAY_BOOKS, daybook)
export const getDaybooksDetails = id =>
  get(`${url.GET_DAY_BOOK_DETAIL}/${id}`, { params: { id } })

export const getDaybooksCurrentUser = (daybook) =>
post(`${url.GET_DAY_BOOK_CURRENT_USER}`, daybook)

export const addDaybook = daybook => post(url.ADD_DAY_BOOK, daybook)
export const updateDaybook = (daybook, id) => put(`${url.UPDATE_DAY_BOOK}/${id}`, daybook)
export const deleteDaybook = id =>
  del(`${url.DELETE_DAY_BOOK}/${id}`, { headers: { id } })
export const activityDaybook = (daybook) => post(`${url.VIEW_DAY_BOOK_ACTIVITY}`, daybook)


export {
  getLoggedInUser,
  isUserAuthenticated,
  userLogin,
  getAllMembers,
  addMember,
  memberUpdate,
  // memberDelete,
}
