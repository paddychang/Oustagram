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

const FollowersCard = ({
  open,
  data,
  handleClose,
  handleOpen,
  handelUnfollow,
  follower,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1, mt: 3 }}>
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
