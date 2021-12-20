import { useState } from "react";
import { useDispatch } from "react-redux";

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
  handle,
  userImage,
  setAnchorEl,
  follow,
  setFollow,
}) => {
  const [open, setOpen] = useState(false);
  const dipatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const handelFollow = () => {
    // dipatch(deletePost(postId));
    setFollow(!follow);
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
            <DialogTitle>{`Do you want to unfollow ${handle} ?`}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} color="info">
                Cancel
              </Button>
              <Button onClick={handelFollow} color="error">
                Unfollow
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>{`Do you want to follow ${handle} ?`}</DialogTitle>
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
