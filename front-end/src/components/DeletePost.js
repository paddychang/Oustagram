import { useState } from "react";
// MUI Stuff
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  MenuItem,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// Redux
import { deletePost } from "redux/actions/postsActions";
import { useDispatch } from "react-redux";

const DeletePost = ({ postId, setAnchorEl, check }) => {
  const [open, setOpen] = useState(false);
  const dipatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const handleDeletePost = () => {
    dipatch(deletePost(postId));
    setOpen(false);
  };

  return (
    <>
      {check === "postcard" ? (
        <MenuItem>
          <Button onClick={handleOpen} color="error" size="small">
            Delete
          </Button>
        </MenuItem>
      ) : (
        <Button onClick={handleOpen} color="error" size="small">
          <DeleteForeverIcon color="error" sx={{ fontSize: 30 }} />
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this post ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="info">
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePost;
