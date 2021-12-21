import { useEffect } from "react";
import { Navigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "redux/actions/postsActions";
// MUI
import { Grid, Container, Box, Typography } from "@mui/material";
// Components
import PostCard from "components/PostCard";
import ProfileCard from "components/ProfileCard";
import PostCardSkeleton from "components/PostCardSkeleton";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const { authenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const getData = async () => {
      dispatch(getAllPosts());
    };

    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <Box component="div" sx={{ marginTop: 5, bgcolor: "secondary.light" }}>
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
                  <Typography variant="h3" color="secondary.main">
                    No Posts yet....
                  </Typography>
                )
              ) : (
                <>
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                </>
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
    </Box>
  );
};

export default Home;
