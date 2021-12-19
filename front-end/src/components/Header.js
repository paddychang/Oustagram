import { Link } from "react-router-dom";
// MUI
import { AppBar, Toolbar, Container, Avatar, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ExploreIcon from "@mui/icons-material/Explore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
// assets
import headerStyles from "assets/jss/components/headerStyles";
import logo from "assets/img/logo.png";

const Header = () => {
  const classes = headerStyles();

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
                <HomeIcon sx={{ fontSize: 35 }} className={classes.icon} />
              </Link>
              <Link to="/post" className={classes.rightLink}>
                <AddBoxIcon sx={{ fontSize: 35 }} className={classes.icon} />
              </Link>
              {/* <Link to="/" className={classes.rightLink}>
                <ExploreIcon sx={{ fontSize: 35 }} className={classes.icon} />
              </Link> */}
              {/* <Link to="/signin" className={classes.rightLink}> */}
              <IconButton>
                <LogoutIcon sx={{ fontSize: 35 }} className={classes.icon} />
              </IconButton>
              {/* </Link> */}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.placeholder} />
    </>
  );
};

export default Header;
