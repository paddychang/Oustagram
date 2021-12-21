import { useState } from "react";
// Redux stuff
import { editUserDetails } from "redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
// MUI Stuff
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
// Icons
import EditIcon from "@mui/icons-material/Edit";

const EditDetails = () => {
  const [state, setState] = useState({
    bio: "",
    website: "",
    location: "",
    open: false,
  });
  const credentials = useSelector((state) => state.user.credentials);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
      open: true,
    });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: state.bio,
      website: state.website,
      location: state.location,
    };
    dispatch(editUserDetails(userDetails));
    handleClose();
  };

  return (
    <>
      <IconButton aria-label="chat" onClick={handleOpen}>
        <EditIcon color="info" />
      </IconButton>
      <Dialog open={state.open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <Box component="form">
            <TextField
              name="bio"
              tpye="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              value={state.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              placeholder="Your personal/professinal website"
              value={state.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder="Where you live"
              value={state.location}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="info">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDetails;
