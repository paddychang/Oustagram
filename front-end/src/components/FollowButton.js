import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFollowed, setUnfollowed } from "redux/actions/userActions";
// MUI
import {
  Card,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";

const FollowButton = ({
  follower,
  setAnchorEl,
  follow,
  setFollow,
  userHandle,
}) => {
  const [open, setOpen] = useState(false);
  const dipatch = useDispatch();
  const followers = useSelector((state) => state.user.followers);

  useEffect(() => {
    setFollow(followers.some((el) => el.userHandle !== userHandle));
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const handelFollow = () => {
    dipatch(setFollowed(follower));
    setFollow(true);
    setOpen(false);
    setAnchorEl(null);
  };

  const handelUnfollow = () => {
    dipatch(setUnfollowed(follower));
    setFollow(false);
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <MenuItem>
        {follow ? (
          <Button onClick={handleOpen} color="error" size="small">
            Unfollow
          </Button>
        ) : (
          <Button onClick={handleOpen} color="info" size="small">
            Follow
          </Button>
        )}
      </MenuItem>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {follow ? (
          <>
            <DialogTitle>{`Do you want to unfollow ${follower} ?`}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} color="info">
                Cancel
              </Button>
              <Button onClick={handelUnfollow} color="error">
                Unfollow
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>{`Do you want to follow ${follower} ?`}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} color="error">
                Cancel
              </Button>
              <Button onClick={handelFollow} color="info">
                Follow
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default FollowButton;
