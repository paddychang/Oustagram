// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUnfollowed } from "redux/actions/userActions";
// MUI
import { Box, Typography, Avatar, Button } from "@mui/material";

const FollowersCard = () => {
  const followers = useSelector((state) => state.user.followers);
  const dispatch = useDispatch();

  const handelUnfollow = (follower) => {
    dispatch(setUnfollowed(follower));
  };

  return (
    <>
      {followers.length > 0
        ? followers.map((data) => (
            <Box
              key={data.userHandle}
              sx={{ display: "flex", alignItems: "center", mb: 1, mt: 3 }}
            >
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
                  onClick={() => handelUnfollow(data.follower)}
                  color="error"
                  size="small"
                >
                  Unfollow
                </Button>
              </Box>
            </Box>
          ))
        : null}
    </>
  );
};

export default FollowersCard;
