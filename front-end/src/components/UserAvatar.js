// MUI
import { Typography, Box, Avatar } from "@mui/material";

const UserAvatar = ({ userImage, userHandle, comment }) => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Avatar
        aria-label="recipe"
        src={userImage}
        sx={{ width: 60, height: 60, mt: 1 }}
      />
      <Box component="div" sx={{ ml: 3 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {userHandle}
        </Typography>
        <Typography variant="h4" color="gray" sx={{ ml: 1 }}>
          {comment}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserAvatar;
