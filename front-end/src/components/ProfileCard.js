import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// MUI
import { Box, Divider, Typography, Avatar } from "@mui/material";
// Components
import FollowersCard from "./FollowersCard";
import Copyright from "components/Copyright";

const ProfileCard = () => {
  const {
    credentials: { handle, imageUrl, location },
  } = useSelector((state) => state.user);

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
      <FollowersCard />
      <Copyright />
    </>
  );
};

export default ProfileCard;
