import React, { useState } from "react";
// MUI
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

import CloseIcon from "@mui/icons-material/Close";
// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { createPost, clearErrors } from "redux/actions/postsActions";
import DragDrop from "util/DragDrop";

const NewPostDialog = (props) => {
  const UI = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const initialState = {
    open: false,
    body: "",
    error: "",
  };
  const [state, setState] = useState(initialState);
  const [file, setFile] = useState(null);

  const handleOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    dispatch(clearErrors());
    setState(initialState);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleImgChange = (file) => {
    console.log(file.name);
    const formData = new FormData();
    formData.append("image", file, file.name);
    setFile(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.body.trim() === "") {
      setState({ ...state, error: "The comment must not be empty!" });
      return;
    } else {
      dispatch(createPost({ body: state.body }, file));
      if (!UI.errors && !UI.loading) {
        setState(initialState);
      }
    }
  };

  return (
    <>
      <IconButton aria-label="chat" onClick={handleOpen}>
        <AddBoxIcon
          sx={{
            fontSize: 35,
            color: "#1d1d1d",
            "&:hover": {
              color: "gray",
            },
          }}
        />
      </IconButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="md">
        <Box
          component="div"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <DialogTitle>Create a new post</DialogTitle>
          <Button onClick={handleClose}>
            <CloseIcon color="error" fontSize="large" />
          </Button>
        </Box>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <DragDrop name="imageUrl" handleChange={handleImgChange} />
            <TextField
              name="body"
              type="text"
              label="Write you comment here...."
              multiline
              rows="3"
              error={state.error ? true : false}
              helperText={state.error}
              onChange={handleChange}
              fullWidth
              sx={{ mt: 3, mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="info"
              disabled={UI.loading}
            >
              Post
              {/* {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )} */}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewPostDialog;
