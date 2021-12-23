// MUI
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
// Components
import ProfileDialog from "./ProfileDialog";

const FollowersCard = ({
  open,
  data,
  handleClose,
  handleOpen,
  handelUnfollow,
  follower,
  setAnchorEl,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1, mt: 3 }}>
      <ProfileDialog
        userHandle={data.follower}
        userImage={data.followerImage}
        setAnchorEl={setAnchorEl}
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
        <Button
          onClick={() => handleOpen(data.follower)}
          color="error"
          size="small"
        >
          Unfollow
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{`Do you want to unfollow ${follower} ?`}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="info">
              Cancel
            </Button>
            <Button onClick={() => handelUnfollow(follower)} color="error">
              Unfollow
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default FollowersCard;
