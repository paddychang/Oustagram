import { makeStyles } from "@mui/styles";

const signinStyles = makeStyles((theme) => ({
  textField: {
    border: "2px soild #000",
    "&$focused $notchedOutline": {
      borderColor: "#4A90E2",
      borderWidth: 1,
    },
  },
}));

export default signinStyles;
