import { GET_WEBSITE_SUCCESS, GET_WEBSITE_FAIL, ADD_NEW_WEBSITE, UPDATE_WEBSITE, DELETE_WEBSITE } from "./actionTypes"

const INIT_STATE = {
  websites: [],
  error: {},
}

const websites = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_WEBSITE_SUCCESS:
      return {
        ...state,
        websites: action.payload,
      }

    case GET_WEBSITE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

      case ADD_NEW_WEBSITE:
      return {
        ...state,
        websites: action.payload,
      }

      case UPDATE_WEBSITE:
      return {
        ...state,
        websites: action.payload,
      }

      case DELETE_WEBSITE:
      return {
        ...state,
        websites: action.payload,
      }

    default:
      return state
  }
}

export default websites
