import { useState } from "react";
import dayjs from "dayjs";
// MUI Stuff
import {
  Typography,
  Dialog,
  Box,
  Avatar,
  IconButton,
  Divider,
  ImageList,
} from "@mui/material";
// Redux stuff
import { clearErrors } from "redux/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";
import { getUserByHandle } from "redux/actions/userActions";
// Componetns
import ProfileImageList from "./ProfileImageList";
import FollowButton from "./FollowButton";

const ProfileDialog = ({ userHandle, userImage, setAnchorEl }) => {
  const [path, setPath] = useState({
    open: false,
    oldPath: "",
    newPath: "",
  });
  const dispatch = useDispatch();
  const { user, followers, posts } = useSelector(
    (state) => state.user.clickedUser
  );
  const credentials = useSelector((state) => state.user.credentials);

  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/profile/${userHandle}`;

    if (oldPath === newPath) oldPath = `/profile/${userHandle}`;
    window.history.pushState(null, null, newPath);

    dispatch(getUserByHandle(userHandle));

    const waitLoading = () => {
      setTimeout(function () {
        setPath({ open: true, oldPath, newPath });
      }, 1000);
    };
    waitLoading();
  };

  const handleClose = () => {
    window.history.pushState(null, null, path.oldPath);
    setPath({ ...path, open: false });
    clearErrors();
  };

  return (
    <>
      <IconButton aria-label="chat" onClick={handleOpen}>
        <Avatar aria-label="recipe" src={userImage} />
      </IconButton>
      <Dialog open={path.open} onClose={handleClose} maxWidth="xl">
        <Box component="div" sx={{ display: "flex", width: 800, p: 2 }}>
          <Box component="div">
            <Avatar
              aria-label="recipe"
              src={userImage}
              sx={{
                width: 200,
                height: 200,
              }}
            />
          </Box>
          <Box component="div" sx={{ ml: 10, mt: 5 }}>
            <Box
              component="div"
              sx={{ display: "flex", alignItems: "flex-start" }}
            >
              <Typography variant="h1" sx={{ mb: 3, fontSize: 30, mr: 6 }}>
                {userHandle}
              </Typography>
              {userHandle !== credentials.handle && (
                <FollowButton
                  userHandle={user.handle}
                  setAnchorEl={setAnchorEl}
                />
              )}
            </Box>
            <Box component="div" sx={{ mb: 3, display: "flex", width: 800 }}>
              <Typography variant="h4" sx={{ fontSize: 24, mr: 5 }}>
                {`${posts.length}  Posts`}
              </Typography>
              <Typography variant="h4" sx={{ fontSize: 24 }}>
                {`${followers.length}  Friends`}
              </Typography>
            </Box>

            {user.location && (
              <Typography variant="h3" sx={{ mb: 1 }}>
                {`Location: ${user.location}`}
              </Typography>
            )}
            {user.website && (
              <>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Website:{" "}
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                </Typography>
              </>
            )}
            <Typography variant="h3" sx={{ mb: 3 }}>
              Joined at {dayjs(user.createdAt).format("MMM YYYY")}
            </Typography>
            {user.bio && (
              <Typography sx={{ mb: 3, fontSize: 16 }}>{user.bio}</Typography>
            )}
          </Box>
        </Box>
        <Divider sx={{ fontSize: 26 }}>Your Posts</Divider>
        <ImageList
          sx={{ width: 1150, height: "auto", mt: 5, p: 2 }}
          cols={3}
          rowHeight={300}
          gap={10}
        >
          {posts.map((post) => (
            <ProfileImageList
              key={post.postId}
              post={post}
              setAnchorEl={setAnchorEl}
            />
          ))}
        </ImageList>
      </Dialog>
    </>
  );
};

export default ProfileDialog;
