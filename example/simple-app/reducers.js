import { combineReducers } from '../../redux'
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from './actions'

function selectedSubreddit(state = 'reactjs', action) {
  const { type } = action

  if (type === SELECT_SUBREDDIT) {
    return action.subreddit
  }

  return state
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
  action
) {
  const { type } = action

  if (type === INVALIDATE_SUBREDDIT) {
    return {
      ...state,
      didInvalidate: true,
    }
  }

  if (type === REQUEST_POSTS) {
    return {
      ...state,
      isFetching: true,
      didInvalidate: false,
    }
  }

  if (type === RECEIVE_POSTS) {
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.posts,
      lastUpdated: action.receivedAt,
    }
  }

  return state
}

function postsBySubreddit(state = {}, action) {
  const { type } = action

  if (
    type === INVALIDATE_SUBREDDIT ||
    type === RECEIVE_POSTS ||
    type === REQUEST_POSTS
  ) {
    return {
      ...state,
      [action.subreddit]: posts(state[action.subreddit], action),
    }
  }

  return state
}

const rootReducer = combineReducers({
  postsBySubreddit: [
    postsBySubreddit,
    [INVALIDATE_SUBREDDIT, RECEIVE_POSTS, REQUEST_POSTS],
  ],
  selectedSubreddit: [selectedSubreddit, [SELECT_SUBREDDIT]],
})

export default rootReducer
