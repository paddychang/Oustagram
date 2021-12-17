import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "redux/actions/postsActions";
// MUI
import { Grid, Container } from "@mui/material";
import homeStyles from "assets/jss/pages/homeStyles";
// Components
import PostCard from "components/PostCard";

const Home = () => {
  const classes = homeStyles();
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    const getData = async () => {
      dispatch(getAllPosts());
    };
    getData();
  }, []);

  return (
    <div className={classes.home}>
      <Container maxWidth="lg">
        <Grid container pacing={2}>
          <Grid item sm={12} md={8}>
            {!loading ? (
              posts.length > 0 ? (
                posts.map((post) => <PostCard key={post.postId} post={post} />)
              ) : (
                <h2>No Posts....</h2>
              )
            ) : (
              <h2>Loading....</h2>
            )}
          </Grid>
          <Grid item sm={12} md={4}>
            <h1>porifle</h1>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
