import axios from "axios"
import { ADD_NEW_WEBSITE, GET_WEBSITES, GET_WEBSITE_FAIL, GET_WEBSITE_SUCCESS, DELETE_WEBSITE, UPDATE_WEBSITE,
   ADD_WEBSITE_SUCCESS, ADD_WEBSITE_FAIL, UPDATE_WEBSITE_SUCCESS, UPDATE_WEBSITE_FAIL, DELETE_WEBSITE_SUCCESS, DELETE_WEBSITE_FAIL
   } from "./actionTypes"

export const getWebsites = () => ({
  type: GET_WEBSITES,
})



export const getWebsitesSuccess = websites => ({
  type: GET_WEBSITE_SUCCESS,
  payload: websites,
})

export const getWebsitesFail = error => ({
  type: GET_WEBSITE_FAIL,
  payload: error,
})



export const AddWebsite = websites => ({
  type: ADD_NEW_WEBSITE,
  payload: websites,
})

export const updateWebsite = websites => ({
  type: UPDATE_WEBSITE,
  payload: websites,
})

export const deleteWebsite = websites => ({
  type: DELETE_WEBSITE,
  payload: websites,
})



export const addWebsitesSuccess = websites => ({
  type: ADD_WEBSITE_SUCCESS,
  payload: websites,
})

export const addWebsitesFail = error => ({
  type: ADD_WEBSITE_FAIL,
  payload: error,
})

export const updateWebsitesSuccess = websites => ({
  type: UPDATE_WEBSITE_SUCCESS,
  payload: websites,
})

export const updateWebsitesFail = error => ({
  type: UPDATE_WEBSITE_FAIL,
  payload: error,
})

export const deleteWebsitesSuccess = websites => ({
  type: DELETE_WEBSITE_SUCCESS,
  payload: websites,
})

export const deleteWebsitesFail = error => ({
  type: DELETE_WEBSITE_FAIL,
  payload: error,
})