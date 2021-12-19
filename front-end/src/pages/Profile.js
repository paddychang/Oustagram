import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
// import ProfileSkeleton from "pages/skeletons/ProfileSkeleton";
// MUI stuff
import {
  Button,
  Typography,
  Paper,
  Container,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
// Icons
import LocationOn from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CalendarToday from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardReturn from "@mui/icons-material/KeyboardReturn";
//Redux
import { logoutUser, uploadImage } from "redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box component="div" sx={{ display: "flex" }}>
          <Box component="div">
            <IconButton onClick={handleEditPicture}>
              <Avatar
                aria-label="recipe"
                src={imageUrl}
                sx={{
                  width: 200,
                  height: 200,
                }}
              />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={handleImageChange}
              />
            </IconButton>
          </Box>
          <Box component="div" sx={{ ml: 10, mt: 5 }}>
            <Box
              component="div"
              sx={{ display: "flex", alignItems: "flex-start" }}
            >
              <Typography variant="h1" sx={{ mb: 3, fontSize: 30 }}>
                {handle}
              </Typography>
              <EditDetails />
            </Box>
            {bio && (
              <Typography variant="body2" sx={{ mb: 3 }}>
                {bio}
              </Typography>
            )}

            {location && (
              <Typography variant="h3" sx={{ mb: 1 }}>
                {`Location: ${location}`}
              </Typography>
            )}
            {website && (
              <Fragment>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Website:{" "}
                  <a href={website} target="_blank">
                    {website}
                  </a>
                </Typography>
              </Fragment>
            )}
            <hr />

            <Typography variant="h3" sx={{ mb: 3 }}>
              Joined at {dayjs(createdAt).format("MMM YYYY")}
            </Typography>
          </Box>
        </Box>
        <hr />
      </Container>
    ) : (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div>
          <Button
            variant="contained"
            color="info"
            component={Link}
            to="/signin"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="info"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Container>
    )
  ) : (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <h2>Loading</h2>
    </Container>
  );
  return profileMarkup;
};

export default Profile;
