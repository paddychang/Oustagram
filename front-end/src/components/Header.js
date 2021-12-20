import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
// MUI
import { AppBar, Toolbar, Container, Avatar, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ExploreIcon from "@mui/icons-material/Explore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getUserData, logoutUser } from "redux/actions/userActions";
import { SET_AUTHENTICATED } from "redux/types";
// assets
import headerStyles from "assets/jss/components/headerStyles";
import logo from "assets/img/logo.png";
// Components
import NewPostDialog from "components/NewPostDialog";

const Header = () => {
  const classes = headerStyles();
  const authenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (authenticated) {
      dispatch(logoutUser());
    }
    navigate("/signin");
  };
  const handeHomeButton = () => {
    const token = localStorage.FBIdToken;
    if (token) {
      console.log("check");
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(logoutUser());
        navigate("/signin");
      } else {
        dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        navigate("/");
      }
    }
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar} disableGutters>
            <Link to="/">
              <img src={logo} alt="logo" className={classes.logo} />
            </Link>
            <div className={classes.right}>
              <Link to="/" className={classes.rightLink}>
                {/* <IconButton
                className={classes.rightLink}
                onClick={handeHomeButton}
              > */}
                <HomeIcon sx={{ fontSize: 35 }} className={classes.icon} />
                {/* </IconButton> */}
              </Link>
              <NewPostDialog />
              <Link to="/profile" className={classes.rightLink}>
                <AccountBoxIcon
                  sx={{ fontSize: 35 }}
                  className={classes.icon}
                />
              </Link>
              <IconButton className={classes.rightLink} onClick={handleLogout}>
                <LogoutIcon sx={{ fontSize: 35 }} className={classes.icon} />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.placeholder} />
    </>
  );
};

export default Header;
