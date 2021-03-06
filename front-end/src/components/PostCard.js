import React, { useState } from "react";
import dayjs from "dayjs";
// Redux
import { submitComment } from "redux/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";
// MUI
import {
  Card,
  Menu,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// Components
import CommentInput from "components/CommentInput";
import LikeButton from "components/LikeButton";
import DeletePost from "components/DeletePost";
import FollowButton from "./FollowButton";
import PostDialog from "./PostDialog";
import ProfileDialog from "./ProfileDialog";

export default function PostCard({ postId, post }) {
  // States
  const initialState = { comment: "", error: "" };
  const [state, setState] = useState(initialState);
  const [anchorEl, setAnchorEl] = useState(null);
  // Redux
  const UI = useSelector((state) => state.UI);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const date = dayjs(post.createdAt).format("DD-MM-YYYY HH:mm:ss");
  const open = Boolean(anchorEl);

  // Submit a Comment
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

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ mb: 5, mr: 5 }}>
      <CardHeader
        avatar={
          <ProfileDialog
            userHandle={post.userHandle}
            userImage={post.userImage}
            setAnchorEl={setAnchorEl}
          />
        }
        action={
          <IconButton aria-label="settings" onClick={(e) => handleClick(e)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.userHandle}
        subheader={date}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {post.userHandle !== user.credentials.handle && (
          <FollowButton
            setAnchorEl={setAnchorEl}
            userHandle={post.userHandle}
          />
        )}

        {user.authenticated && post.userHandle === user.credentials.handle && (
          <DeletePost
            postId={post.postId}
            setAnchorEl={setAnchorEl}
            check="postcard"
          />
        )}
      </Menu>
      <CardMedia
        component="img"
        height="460"
        image={post.imageUrl}
        alt="Post image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LikeButton postId={post.postId} />
        <PostDialog
          userHandle={post.userHandle}
          state={state}
          setState={setState}
          handleSubmit={handleSubmit}
          postId={postId}
        />
      </CardActions>
      <Typography variant="h5" color="secondary.light" sx={{ pl: 2 }}>
        {`${post.commentCount} Comments`}
      </Typography>
      <Typography variant="h5" color="secondary.light" sx={{ pl: 2 }}>
        {`${post.likeCount} likes`}
      </Typography>
      <CommentInput
        state={state}
        setState={setState}
        handleSubmit={handleSubmit}
      />
    </Card>
  );
}
