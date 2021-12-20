import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useLocation, Navigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "redux/actions/postsActions";
import { getUserData, logoutUser } from "redux/actions/userActions";
import { SET_AUTHENTICATED } from "redux/types";

// MUI
import { Grid, Container } from "@mui/material";
import homeStyles from "assets/jss/pages/homeStyles";
// Components
import PostCard from "components/PostCard";
import ProfileCard from "components/ProfileCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const classes = homeStyles();
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const { authenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const getData = async () => {
      dispatch(getAllPosts());
    };
    getData();
  }, []);

  return (
    <div className={classes.home}>
      {authenticated ? (
        <Container maxWidth="lg">
          <Grid container pacing={2}>
            <Grid item sm={12} md={8}>
              {!loading ? (
                posts.length > 0 ? (
                  posts.map((post) => (
                    <PostCard key={post.postId} post={post} />
                  ))
                ) : (
                  <h2>No Posts....</h2>
                )
              ) : (
                <h2>Loading....</h2>
              )}
            </Grid>
            <Grid item sm={12} md={4}>
              <ProfileCard />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Navigate replace to="/signin" />
      )}
    </div>
  );
};

export default Home;
