import Typography from "@mui/material/Typography";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      sx={{ mt: 5 }}
    >
      {`Copyright © GA React Final Projectin ${new Date().getFullYear()}  by Paddy.`}
    </Typography>
  );
};

export default Copyright;
