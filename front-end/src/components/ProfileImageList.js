import React, { useState } from "react";
import { useParams } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { submitComment } from "redux/actions/postsActions";
// MUI
import { ImageListItem, Box } from "@mui/material";
// Components
import PostDialog from "./PostDialog";
import DeletePost from "components/DeletePost";

export default function ProfileImageList({ post, setAnchorEl }) {
  const initialState = { comment: "", error: "" };
  const [state, setState] = useState(initialState);
  const UI = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.user.credentials);
  const params = useParams();

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
        {params.handle === credentials.handle && (
          <DeletePost
            postId={post.postId}
            check="profilelist"
            setAnchorEl={setAnchorEl}
          />
        )}
      </Box>
    </ImageListItem>
  );
}
