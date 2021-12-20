import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  SET_FOLLOWED,
  SET_UNFOLLOWED,
} from "../types";
import axios from "axios";
import { SET_AUTHENTICATED } from "redux/types";

export const loginUser = (userData, navigate) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signin", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
    })
    .then(() => {
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: CLEAR_ERRORS });
      navigate("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signupUser = (newUserData, navigate) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
    })
    .then(() => {
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: CLEAR_ERRORS });
      navigate("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const setFollowed = (follower) => (dispatch) => {
  axios
    .post(`/user/${follower}/follow`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_FOLLOWED,
        payload: res.data.newFollower,
      });
    })
    .catch((err) => console.log(err));
};

export const setUnfollowed = (follower) => (dispatch) => {
  console.log("action check", follower);
  dispatch({ type: LOADING_USER });
  axios
    .post(`/user/${follower}/unfollow`)
    .then((res) => {
      console.log("return data ", res.data);
      dispatch({ type: SET_UNFOLLOWED, payload: follower });
    })
    .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post("/notifications", notificationIds)
    .then(() => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
