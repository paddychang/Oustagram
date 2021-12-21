import { useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUnfollowed } from "redux/actions/userActions";
// MUI
import {
  Box,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";

const FollowersCard = () => {
  const [open, setOpen] = useState(false);
  const followers = useSelector((state) => state.user.followers);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handelUnfollow = (follower) => {
    dispatch(setUnfollowed(follower));
    setOpen(false);
  };

  return (
    <>
      {followers.length > 0
        ? followers.map((data) => (
            <Box
              key={data.follower}
              sx={{ display: "flex", alignItems: "center", mb: 1, mt: 3 }}
            >
              <Avatar
                aria-label="recipe"
                src={data.followerImage}
                sx={{ width: 60, height: 60 }}
              />
              <Box
                component="div"
                sx={{
                  ml: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography variant="h1" sx={{ width: 220 }}>
                  {data.follower}
                </Typography>
                <Button onClick={handleOpen} color="error" size="small">
                  Unfollow
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogTitle>{`Do you want to unfollow ${data.follower} ?`}</DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose} color="info">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handelUnfollow(data.follower)}
                      color="error"
                    >
                      Unfollow
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Box>
          ))
        : null}
    </>
  );
};

export default FollowersCard;
