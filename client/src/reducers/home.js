import {
  HOME_PAGE_LOADED,
  PHOTO_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
} from '../constants/types'

export default (state = {}, action) => {
  switch (action.type) {

    case HOME_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags
      }

    case PHOTO_PAGE_LOADED:
      return {
        ...state,
        photo: action.payload
      }

    case HOME_PAGE_UNLOADED:
      return {}

    default:
      return state
  }

}
