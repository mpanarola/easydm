import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"
import { websites } from "../common/data"

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

// Register Method
const postFakeRegister = (data) => post(url.POST_FAKE_REGISTER, data)

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data)

// get Products
export const getProducts = () => get(url.GET_PRODUCTS)

// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } })

// get Events
export const getEvents = () => get(url.GET_EVENTS)

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event)

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } })

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES)

// get chats
export const getChats = () => get(url.GET_CHATS)

// get groups
export const getGroups = () => get(url.GET_GROUPS)

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS)

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message)

// get project
export const getProjects = () => get(url.GET_PROJECTS)

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

// get tasks
export const getTasks = () => get(url.GET_TASKS)



// get websites


export const getMembersDetails = id =>
  get(`${url.GET_MEMBER_DETAIL}/${id}`, { params: { id } })
  



// get websites
export const GET_CONTENT_SCHEDULERS = () => get(url.GET_CONTENT_SCHEDULERS)
export const getContentSchedulerDetails = id =>
  get(`${url.GET_CONTENT_SCHEDULER_DETAIL}/${id}`, { params: { id } })


// get websites
export const GET_BACK_LINKS = () => get(url.GET_BACK_LINKS)
// export const GET_BACK_LINK_DETAIL = () => get(url.GET_BACK_LINK_DETAIL)
export const getBacklinksDetails = id =>
  get(`${url.GET_BACK_LINK_DETAIL}/${id}`, { params: { id } })


// get websites
export const GET_PAGE_VIEWS = () => get(url.GET_PAGE_VIEWS)

export const getPageviewsDetails = id =>
  get(`${url.GET_PAGE_VIEW_DETAIL}/${id}`, { params: { id } })


// get websites
export const GET_DAY_BOOKS = () => get(url.GET_DAY_BOOKS)
// export const GET_DAY_BOOK_DETAIL = () => get(url.GET_DAY_BOOK_DETAIL)
export const getDaybooksDetails = id =>
  get(`${url.GET_DAY_BOOK_DETAIL}/${id}`, { params: { id } })


// get contacts
export const getUsers = () => get(url.GET_USERS)



// export const getUserProfile = () => get(url.GET_USER_PROFILE)


/** MPA API Method */

const userLogin = data => post(url.USER_LOGIN, data)
// const addMember = data => post(url.ADD_MEMBER, data)

export const getUserProfile = () => get(url.GET_USER_PROFILE)

const getAllMembers = data => post(url.GET_MEMBERS, data)
const addMember = data => post(url.ADD_MEMBER, data, {headers: {'Content-Type': 'multipart/form-data'}})
const memberUpdate = (data, id) => put(`${url.UPDATE_MEMBER}/${id}`, data, {headers: {'Content-Type': 'multipart/form-data'}})
export const memberDelete = id =>
  del(`${url.DELETE_MEMBER}/${id}`, { headers: { id } })

  

// const getAllWebsites = data => post(url.GET_WEBSITES, data)
// const addWebsite = data => post(url.ADD_MEMBER, data, {headers: {'Content-Type': 'multipart/form-data'}})
// const webisteUpdate = (data, id) => put(`${url.UPDATE_MEMBER}/${id}`, data, {headers: {'Content-Type': 'multipart/form-data'}})



export const getWebsites = website =>   post(url.GET_WEBSITES, website)
export const addNewWebsite = website => post(url.ADD_NEW_WEBSITE, website)
export const updateWebsite = (website, id) => put(`${url.UPDATE_WEBSITE}/${id}`, website )
export const deleteWebsite = id =>
  del(`${url.DELETE_WEBSITE}/${id}`, { headers: { id } })
export const activityWebsite = (id) => get(`${url.VIEW_WEBSITE_ACTIVITY}/${id}` )
export const getWebsite = (id) => get(`${url.GET_WEBSITE_DETAIL}/${id}` )



export const getContentSchedulars = schedular =>   post(url.GET_SCHEDULARS, schedular)
export const addNewSchedular = schedular => post(url.ADD_NEW_SCHEDULAR, schedular)
export const updateSchedular = (schedular, id) => put(`${url.UPDATE_SCHEDULAR}/${id}`, schedular )
// export const updateSchedular = (schedular, id) => put(`${url.UPDATE_SCHEDULAR}/${id}`, schedular )
export const deleteSchedular = id =>
  del(`${url.DELETE_SCHEDULAR}/${id}`, { headers: { id } })
export const activitySchedular = (id) => get(`${url.VIEW_SCHEDULAR_ACTIVITY}/${id}` )



export const getBackLinks = backlink =>   post(url.GET_BACKLINKS, backlink)
export const addBackLink = backlink => post(url.ADD_BACK_LINK, backlink)
export const updateBackLink = (backlink, id) => put(`${url.UPDATE_BACK_LINK}/${id}`, backlink )
// export const updateSchedular = (schedular, id) => put(`${url.UPDATE_SCHEDULAR}/${id}`, schedular )
export const deleteBackLink = id =>
  del(`${url.DELETE_BACK_LINK}/${id}`, { headers: { id } })
export const activityBackLink = (id) => get(`${url.VIEW_BACK_LINK_ACTIVITY}/${id}` )
export const performanceBackLink = () => get(`${url.VIEW_BACK_LINK_PERFORMANCE}` )
// export const performanceBackLink = (id) => get(`${url.VIEW_BACK_LINK_PERFORMANCE}/${id}` )





export const getPageViews = views =>   post(url.GET_PAGEVIEWS, views)
export const addPageView = view => post(url.ADD_BACK_LINK, view)
export const updatePageView = (view, id) => put(`${url.UPDATE_BACK_LINK}/${id}`, view )
// export const updateSchedular = (schedular, id) => put(`${url.UPDATE_SCHEDULAR}/${id}`, schedular )
export const deletePageView = id =>
  del(`${url.DELETE_BACK_LINK}/${id}`, { headers: { id } })
export const activityPageView = (id) => get(`${url.VIEW_BACK_LINK_ACTIVITY}/${id}` )
export const performancePageView = () => get(`${url.PAGE_VIEW_PERFORMANCE}` )

// export const performancePageView = (id) => get(`${url.PAGE_VIEW_PERFORMANCE}/${id}` )

  



export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,


  userLogin,
  getAllMembers,
  addMember,
  memberUpdate,
  // memberDelete,


}
