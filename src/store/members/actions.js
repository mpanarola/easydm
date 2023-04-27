import axios from "axios"
import { UPDATE_MEMBER, UPDATE_MEMBER_SUCCESS, UPDATE_MEMBER_FAIL, DELETE_MEMBER, DELETE_MEMBER_SUCCESS, DELETE_MEMBER_FAIL,
   GET_MEMBERS, GET_MEMBER_SUCCESSFUL, GET_MEMBER_FAILED
   } from "./actionTypes"


   export const getMembers = () => ({
    type: GET_MEMBERS,
  })
  
  export const getMembersSuccess = members => ({
    type: GET_MEMBER_SUCCESSFUL,
    payload: members,
  })
  
  export const getMembersFail = error => ({
    type: GET_MEMBER_FAILED,
    payload: error,
  })



   export const updateMember = () => ({
  type: UPDATE_MEMBER,
})

export const updateMemberSuccess = member => ({
  type: UPDATE_MEMBER_SUCCESS,
  payload: member,
})

export const updateMemberFail = error => ({
  type: UPDATE_MEMBER_FAIL,
  payload: error,
})



export const deleteMember = member => ({
  type: DELETE_MEMBER,
  payload: member,
})


export const deleteMemberSuccess = member => ({
  type: DELETE_MEMBER_SUCCESS,
  payload: member,
})

export const deleteMemberFail = error => ({
  type: DELETE_MEMBER_FAIL,
  payload: error,
})