import { Link, useNavigate } from "react-router-dom";
// MUI
import { AppBar, Toolbar, Container, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "redux/actions/userActions";
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

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar} disableGutters>
            <Link to="/">
              <img src={logo} alt="logo" className={classes.logo} />
            </Link>
            {authenticated && (
              <div className={classes.right}>
                <Link to="/" className={classes.rightLink}>
                  <HomeIcon sx={{ fontSize: 35 }} className={classes.icon} />
                </Link>
                <NewPostDialog />
                <Link to="/profile" className={classes.rightLink}>
                  <AccountBoxIcon
                    sx={{ fontSize: 35 }}
                    className={classes.icon}
                  />
                </Link>
                <IconButton
                  className={classes.rightLink}
                  onClick={handleLogout}
                >
                  <LogoutIcon sx={{ fontSize: 35 }} className={classes.icon} />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.placeholder} />
    </>
  );
};

export default Header;
