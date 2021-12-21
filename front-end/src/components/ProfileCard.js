import { useState } from "react";
import { Link } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUnfollowed } from "redux/actions/userActions";
// MUI
import { Box, Divider, Typography, Avatar } from "@mui/material";
// Components
import FollowersCard from "./FollowersCard";
import Copyright from "components/Copyright";

const ProfileCard = () => {
  const [open, setOpen] = useState(false);
  const [follower, setFollower] = useState("");
  // const followers = useSelector((state) => state.user.followers);
  const {
    credentials: { handle, imageUrl, location },
    followers,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleOpen = (follower) => {
    setFollower(follower);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handelUnfollow = () => {
    dispatch(setUnfollowed(follower));
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Link to="profile">
          <Avatar
            aria-label="recipe"
            src={imageUrl}
            sx={{ width: 75, height: 75 }}
          />
        </Link>
        <Box component="div" sx={{ ml: 3 }}>
          <Typography variant="h1" sx={{ mb: 0.5 }}>
            {handle}
          </Typography>
          <Typography variant="h3" color="gray" sx={{ mb: 0.5 }}>
            {location}
          </Typography>
        </Box>
      </Box>
      <Divider>Followers</Divider>
      {followers.length > 0
        ? followers.map((data) => (
            <FollowersCard
              key={data.follower}
              data={data}
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
              handelUnfollow={handelUnfollow}
              follower={follower}
            />
          ))
        : null}
      <Copyright />
    </>
  );
};

export default ProfileCard;
