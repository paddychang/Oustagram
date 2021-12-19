import { makeStyles } from "@mui/styles";

const postDialogStyles = makeStyles({
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  images: {
    hetigh: "auto",
    objectFit: "cover",
    flexGrow: 1,
  },

  // closeButton: {
  //   position: "absolute",
  //   left: "90%",
  //   top: "2%",
  // },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

export default postDialogStyles;
