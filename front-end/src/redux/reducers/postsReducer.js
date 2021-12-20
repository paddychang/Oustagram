import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  POST_POST,
  SET_POST,
  SUBMIT_COMMENT,
  ADD_COMMENT_COUNT,
  UPDATA_POST_IMAGE,
} from "../types";

const initialState = {
  posts: [],
  post: {
    userHandle: "",
    createdAt: "",
    body: "",
    commentCount: 0,
    images: "",
    userImage: "",
    likeCount: 0,
    postId: "",
    comments: [],
  },
  loading: false,
};

let index = 0;
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };

    case LIKE_POST:
    case UNLIKE_POST:
      index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_POST:
      index = state.posts.findIndex((post) => post.postId === action.payload);
      state.posts.splice(index, 1);
      return {
        ...state,
      };
    case POST_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    case ADD_COMMENT_COUNT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.postId === action.postId
            ? { ...post, commentCount: post.commentCount + 1 }
            : post
        ),
      };
    case UPDATA_POST_IMAGE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.postId === action.payload.postId
            ? { ...post, imageUrl: action.payload.imageUrl }
            : post
        ),
      };
    default:
      return state;
  }
};

export default postReducer;
