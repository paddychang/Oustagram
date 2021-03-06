import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI stuff
import {
  Button,
  Typography,
  Container,
  Avatar,
  Box,
  IconButton,
  Divider,
  ImageList,
} from "@mui/material";
//Redux
import { uploadImage } from "redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
// Components
import ProfileImageList from "components/ProfileImageList";
import EditDetails from "components/EditDetails";

const Profile = () => {
  const {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
    followers,
    posts,
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
            <Box component="div" sx={{ mb: 3, display: "flex" }}>
              <Typography variant="h4" sx={{ fontSize: 24, mr: 5 }}>
                {`${posts.length}  Posts`}
              </Typography>
              <Typography variant="h4" sx={{ fontSize: 24 }}>
                {`${followers.length}  Friends`}
              </Typography>
            </Box>

            {location && (
              <Typography variant="h3" sx={{ mb: 1 }}>
                {`Location: ${location}`}
              </Typography>
            )}
            {website && (
              <>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Website:{" "}
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {website}
                  </a>
                </Typography>
              </>
            )}
            <Typography variant="h3" sx={{ mb: 3 }}>
              Joined at {dayjs(createdAt).format("MMM YYYY")}
            </Typography>
            {bio && <Typography sx={{ mb: 3, fontSize: 16 }}>{bio}</Typography>}
          </Box>
        </Box>
        <Divider sx={{ fontSize: 26 }}>Your Posts</Divider>
        <ImageList
          sx={{ width: 1150, height: "auto", mt: 5 }}
          cols={3}
          rowHeight={300}
          gap={10}
        >
          {posts.map((post) => (
            <ProfileImageList key={post.postId} post={post} />
          ))}
        </ImageList>
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
