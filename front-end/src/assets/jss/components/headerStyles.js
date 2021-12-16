import { makeStyles } from "@mui/styles";
import { gray } from "@mui/material/colors";

const headerStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#ffffff",
  },
  toolbar: {
    height: 70,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      height: 40,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  logo: {
    height: "auto",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "20%",
    },
  },
  placeholder: {
    height: 80,
    [theme.breakpoints.down("sm")]: {
      height: 60,
    },
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rightLink: {
    textDecoration: "none",
    padding: "8px 20px",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("sm")]: {
      color: theme.palette.primary.dark,
      textDecoration: "none",
      padding: 0,
      fontWeight: "none",
      fontSize: 14,
      borderRight: "none",
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    "&:hover": {
      color: "gray",
    },
  },
}));

export default headerStyles;
