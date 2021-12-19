import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Box,
  Container,
  Avatar,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import UnfoldMore from "@mui/icons-material/UnfoldMore";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

// Redux stuff
import { getPost, clearErrors } from "redux/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";
// Asseets
import postDialogStyles from "assets/jss/components/postDialogStyles";
// // Componetns
// import Comments from "./Comments";
// import CommentForm from "./CommentForm";
import UserAvatar from "components/UserAvatar";
import CommentInput from "components/CommentInput";

const PostDialog = ({ postId, userHandle, handleSubmit }) => {
  const classes = postDialogStyles();
  const [state, setState] = useState({
    open: false,
    oldPath: "",
    newPath: "",
  });
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.post);
  const { loading } = useSelector((state) => state.UI.loading);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getPost(postId));
    };
    fetchData();
  }, []);

  const handleOpen = () => {
    let oldPath = window.location.pathname;

    const newPath = `/users/${userHandle}/post/${postId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    setState({ open: true, oldPath, newPath });
  };

  const handleClose = () => {
    window.history.pushState(null, null, state.oldPath);
    setState({ ...state, open: false });
    clearErrors();
  };

  return (
    <>
      <IconButton aria-label="chat" onClick={handleOpen}>
        <ChatBubbleOutlineIcon />
      </IconButton>
      <Dialog open={state.open} onClose={handleClose} maxWidth="xl">
        <Grid container space={1}>
          <Grid item sx={4}>
            <Box
              sx={{
                width: 600,
                height: 1000,
                background: "#000",
                display: "flex",
              }}
            >
              <img
                src={post.images}
                alt="post images"
                className={classes.images}
              />
            </Box>
          </Grid>
          <Grid item sx={8}>
            <Box
              sx={{
                width: 720,
                height: 1000,
              }}
            >
              <DialogContent dividers>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: 60,
                  }}
                >
                  <UserAvatar
                    userImage={post.userImage}
                    handle={post.handle}
                    location={post.location}
                  />
                  {/* <IconButton>
                      <Avatar
                        aria-label="recipe"
                        src={post.userImage}
                        sx={{ width: 50, height: 50, mr: 2 }}
                      />
                    </IconButton>
                    <div>
                      <Typography variant="h1" sx={{ mb: 0.5 }}>
                        name
                      </Typography>
                      <Typography variant="h3" color="gray">
                        Melbourne
                      </Typography>
                    </div> */}
                  <Button onClick={handleClose}>
                    <CloseIcon color="info" fontSize="medium" />
                  </Button>
                </Box>
              </DialogContent>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  maxHeight: 940,
                }}
              >
                <Box
                  component="div"
                  sx={{
                    pl: 3,
                    width: 1,
                    height: 830,
                    overflow: "auto",
                  }}
                >
                  <UserAvatar
                    userImage={post.userImage}
                    handle={post.handle}
                    location={post.location}
                  />
                </Box>
                <CommentInput
                  state={state}
                  setState={setState}
                  handleSubmit={handleSubmit}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default PostDialog;
