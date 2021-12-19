// MUI
import IconButton from "@mui/material/IconButton";
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Box,
  Container,
  Avatar,
} from "@mui/material";

const UserAvatar = ({ userImage, handle, location }) => {
  return (
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
          src={userImage}
          sx={{ width: 50, height: 50 }}
        />
      </IconButton>
      <Box component="div" sx={{ ml: 3 }}>
        <Typography variant="h1" sx={{ mb: 0.5 }}>
          name
        </Typography>
        <Typography variant="h3" color="gray">
          Melbourne
        </Typography>
      </Box>
    </Box>
  );
};

export default UserAvatar;
