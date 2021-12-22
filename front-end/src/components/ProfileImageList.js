import React, { useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { submitComment } from "redux/actions/postsActions";
// MUI
import { ImageListItem, Box } from "@mui/material";
// Components
import PostDialog from "./PostDialog";
import DeletePost from "components/DeletePost";

export default function ProfileImageList({ post }) {
  const initialState = { comment: "", error: "" };
  const [state, setState] = useState(initialState);
  const UI = useSelector((state) => state.UI);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.comment.trim() === "") {
      setState({ ...state, error: "The comment must not be empty!" });
      return;
    } else {
      dispatch(submitComment(post.postId, { comment: state.comment }));
      if (!UI.errors && !UI.loading) {
        setState(initialState);
      }
    }
  };

  return (
    <ImageListItem key={post.imageUrl}>
      <img
        src={post.imageUrl}
        alt="Images Grid"
        loading="lazy"
        style={{
          objectFit: "cover",
          height: 250,
          width: 350,
          display: "block",
        }}
      />
      <Box
        comp="div"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: 50,
          width: 150,
          m: "0 auto",
        }}
      >
        <PostDialog
          userHandle={post.userHandle}
          state={state}
          setState={setState}
          handleSubmit={handleSubmit}
          postId={post.postId}
        />
        <DeletePost postId={post.postId} check="profilelist" />
      </Box>
    </ImageListItem>
  );
}
