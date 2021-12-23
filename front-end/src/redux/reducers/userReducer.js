import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
  SET_UNFOLLOWED,
  SET_FOLLOWED,
  SET_PROFILE_POSTS,
  SET_CLIKCED_USER,
  DELETE_POST_FOR_USER_PROFILE,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  followers: [],
  posts: [],
  clickedUser: {
    posts: [],
    followers: [],
    user: {},
  },
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
        loading: false,
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
        loading: false,
        likes: state.likes.filter((like) => like.screamId !== payload.screamId),
      };

    case SET_FOLLOWED:
      return {
        ...state,
        loading: false,
        followers: [...state.followers, { ...payload }],
      };
    case SET_UNFOLLOWED:
      return {
        ...state,
        loading: false,
        followers: state.followers.filter((f) => f.follower !== payload),
      };
    case SET_PROFILE_POSTS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, { ...payload }],
      };

    case DELETE_POST_FOR_USER_PROFILE:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.postId !== payload),
      };

    case SET_CLIKCED_USER:
      return {
        ...state,
        loading: false,
        clickedUser: { ...payload },
      };
    default:
      return state;
  }
};

export default userReducer;
