import { Link } from "react-router-dom";
// Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Button, IconButton } from "@mui/material";
// REdux
import { likePost, unlikePost } from "redux/actions/postsActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const LikeButton = ({ postId }) => {
  const user = useSelector((state) => state.user);
  const authenticated = user.authenticated;
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (user.likes && user.likes.find((like) => like.postId === postId))
      setCheck(true);
  }, [check]);

  const handleLikePost = () => {
    dispatch(likePost(postId));
    setCheck(true);
  };
  const handleUnlikePost = () => {
    dispatch(unlikePost(postId));
    setCheck(false);
  };

  return (
    <div>
      {!authenticated ? (
        <Link to="/signin">
          <Button>
            <FavoriteIcon color="info" />
          </Button>
        </Link>
      ) : check ? (
        <IconButton aria-label="remove to favorites" onClick={handleUnlikePost}>
          <FavoriteIcon color="error" />
        </IconButton>
      ) : (
        <IconButton aria-label="add to favorites" onClick={handleLikePost}>
          <FavoriteIcon color="info" />
        </IconButton>
      )}
    </div>
  );
};

export default LikeButton;
