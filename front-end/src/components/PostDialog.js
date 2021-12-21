import { useState, useEffect } from "react";
// MUI Stuff
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// Redux stuff
import { getPost, clearErrors } from "redux/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";
// Componetns
import UserAvatar from "components/UserAvatar";
import CommentInput from "components/CommentInput";

const PostDialog = ({ state, setState, postId, userHandle, handleSubmit }) => {
  const [path, setPath] = useState({
    open: false,
    oldPath: "",
    newPath: "",
  });
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.post);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getPost(postId));
    };
    fetchData();
    // eslint-disable-next-line
  }, [path.open]);

  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandle}/post/${postId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);
    setPath({ open: true, oldPath, newPath });
  };

  const handleClose = () => {
    window.history.pushState(null, null, path.oldPath);
    setPath({ ...path, open: false });
    clearErrors();
  };

  return (
    <>
      <IconButton aria-label="chat" onClick={handleOpen}>
        <ChatBubbleOutlineIcon />
      </IconButton>
      <Dialog open={path.open} onClose={handleClose} maxWidth="xl">
        <Grid container space={1}>
          <Grid item>
            <Box
              sx={{
                width: 600,
                height: 1000,
                background: "#000",
                display: "flex",
              }}
            >
              <img
                src={post.imageUrl}
                alt="post images"
                style={{
                  hetigh: "auto",
                  maxWidth: 600,
                  objectFit: "contain",
                  flexGrow: 1,
                }}
              />
            </Box>
          </Grid>
          <Grid item>
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
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <IconButton>
                      <Avatar
                        aria-label="recipe"
                        src={post.userImage}
                        sx={{ width: 50, height: 50 }}
                      />
                    </IconButton>
                    <Box component="div" sx={{ ml: 3 }}>
                      <Typography variant="h1" sx={{ mb: 0.5 }}>
                        {post.userHandle}
                      </Typography>
                    </Box>
                  </Box>
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
                  {post.comments.length > 0 ? (
                    post.comments.map((comment, idx) => (
                      <UserAvatar
                        key={idx}
                        userImage={comment.userImage}
                        handle={comment.useHandle}
                        comment={comment.comment}
                      />
                    ))
                  ) : (
                    <Typography variant="h3" sx={{ mt: 3 }}>
                      You do not have Comments.
                    </Typography>
                  )}
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
