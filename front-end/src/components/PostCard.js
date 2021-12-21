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
  Avatar,
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

export default function PostCard({ post }) {
  // States
  const initialState = { comment: "", error: "" };
  const [state, setState] = useState(initialState);
  const [anchorEl, setAnchorEl] = useState(null);
  const [follow, setFollow] = useState(false);
  // Redux
  const UI = useSelector((state) => state.UI);
  const user = useSelector((state) => state.user);
  const disptach = useDispatch();
  const date = dayjs(post.createdAt).format("DD-MM-YYYY HH:mm:ss");
  const open = Boolean(anchorEl);

  // Submit a Comment
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.comment.trim() === "") {
      setState({ ...state, error: "The comment must not be empty!" });
      return;
    } else {
      disptach(submitComment(post.postId, { comment: state.comment }));
      if (!UI.errors && !UI.loading) {
        setState(initialState);
      }
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ mb: 5, mr: 5 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={post.userImage} />}
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
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
            follow={follow}
            setFollow={setFollow}
            follower={post.userHandle}
            userHandle={post.userHandle}
          />
        )}

        {user.authenticated && post.userHandle === user.credentials.handle && (
          <DeletePost postId={post.postId} setAnchorEl={setAnchorEl} />
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
          postId={post.postId}
          userHandle={post.userHandle}
          state={state}
          setState={setState}
          handleSubmit={handleSubmit}
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
