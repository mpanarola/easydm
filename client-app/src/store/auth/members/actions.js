import { DELETE_MEMBER } from "../../../helpers/url_helper"
import {
  UPDATE_MEMBERS,
  GET_MEMBER_SUCCESSFUL,
  UPDATE_MEMBER_SUCCESSFUL,
  UPDATE_MEMBER_FAILED,
  DELETE_MEMBER_SUCCESSFUL,
  DELETE_MEMBER_FAILED,
  GET_MEMBERS,
  GET_MEMBER_FAILED,
} from "./actionTypes"

export const getMembers = member => {
  return {
    type: GET_MEMBERS,
    payload: { member },
  }
}

export const getMembersSuccessful = member => {
  return {
    type: GET_MEMBER_SUCCESSFUL,
    payload: member,
  }
}

export const getMembersFailed = member => {
  return {
    type: GET_MEMBER_FAILED,
    payload: member,
  }
}




export const updateMembers = member => {
  return {
    type: UPDATE_MEMBERS,
    payload: { member },
  }
}

export const updateMemberSuccessful = member => {
  return {
    type: UPDATE_MEMBER_SUCCESSFUL,
    payload: member,
  }
}

export const updateMemberFailed = member => {
  return {
    type: UPDATE_MEMBER_FAILED,
    payload: member,
  }
}



export const deleteMembers = member => {
  return {
    type: DELETE_MEMBER,
    payload: { member },
  }
}

export const deleteMemberSuccessful = member => {
  return {
    type: DELETE_MEMBER_SUCCESSFUL,
    payload: member,
  }
}

export const deleteMemberFailed = member => {
  return {
    type: DELETE_MEMBER_FAILED,
    payload: member,
  }
}