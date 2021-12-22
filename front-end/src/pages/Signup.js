import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "redux/actions/userActions";
import { CLEAR_ERRORS } from "redux/types";
// MUI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Assets
import icon from "assets/img/icon192.png";
// Components
import Copyright from "components/Copyright";

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.UI);
  let navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
  });

  useEffect(() => {
    dispatch({ type: CLEAR_ERRORS });
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newUser);
    dispatch(signupUser(newUser, navigate));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            variant="square"
            src={icon}
          />

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="handle"
                  required
                  fullWidth
                  id="handle"
                  label="Username"
                  autoFocus
                  onChange={handleChange}
                  error={errors && "handle" in errors ? true : false}
                  helperText={errors && "handle" in errors && errors.handle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  error={errors && "email" in errors ? true : false}
                  helperText={errors && "email" in errors && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  error={errors && "password" in errors ? true : false}
                  helperText={errors && "password" in errors && errors.password}
                  InputProps={{
                    autoComplete: "off",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  onChange={handleChange}
                  error={errors && "confirmPassword" in errors ? true : false}
                  helperText={
                    errors &&
                    "confirmPassword" in errors &&
                    errors.confirmPassword
                  }
                  InputProps={{
                    autoComplete: "off",
                  }}
                />
              </Grid>
            </Grid>
            {errors && "general" in errors && (
              <Typography color="error">{errors.general}</Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
