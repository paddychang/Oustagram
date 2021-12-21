import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
  SET_UNFOLLOWED,
  SET_FOLLOWED,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  followers: [],
  posts: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: payload.screamId,
          },
        ],
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter((like) => like.screamId !== payload.screamId),
      };

    case SET_FOLLOWED:
      return {
        ...state,
        followers: [...state.followers, { ...payload }],
      };
    case SET_UNFOLLOWED:
      return {
        ...state,
        followers: state.likes.filter((f) => f.follower !== payload.follower),
      };
    default:
      return state;
  }
};

export default userReducer;
