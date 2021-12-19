import React, { useState } from "react";
import dayjs from "dayjs";
// Redux
import { submitComment } from "redux/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";
// MUI
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// Assets
import postCardStyles from "assets/jss/components/postCardStyles";
import noImg from "assets/img/no-img.png";
import PostDialog from "./PostDialog";
// Components
import CommentInput from "components/CommentInput";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard({ post }) {
  const classes = postCardStyles();
  const [expanded, setExpanded] = useState(false);
  const initialState = { comment: "", error: "" };
  const [state, setState] = useState(initialState);
  const UI = useSelector((state) => state.UI);
  const disptach = useDispatch();
  const date = dayjs(post.createdAt).format("DD-MM-YYYY HH:mm:ss");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  return (
    <Card sx={{ mb: 5, mr: 5 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={noImg} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.userHandle}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="460"
        image={post.images}
        alt="Post image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
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
