import React from "react";
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// MUI
import { Box, Divider, Typography, Avatar, IconButton } from "@mui/material";

const ProfileCard = () => {
  const {
    credentials: { handle, imageUrl, location },
    loading,
    authenticated,
  } = useSelector((state) => state.user);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <IconButton sx={{ mt: 3, ml: 3, mr: 3 }}>
          <Avatar
            aria-label="recipe"
            src={imageUrl}
            sx={{ width: 75, height: 75 }}
          />
        </IconButton>
        <div>
          <Typography variant="h1" sx={{ mb: 0.5 }}>
            {handle}
          </Typography>
          <Typography variant="h3" color="gray" sx={{ mb: 0.5 }}>
            Melbourne
          </Typography>
          <Link to="profile">
            <Typography variant="h4">Edit Profile</Typography>
          </Link>
        </div>
      </Box>
      <Divider>Followers</Divider>
    </>
  );
};

export default ProfileCard;
