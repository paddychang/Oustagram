import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { createBrowserHistory } from "history";
import jwtDecode from "jwt-decode";
// Redux
import store from "redux/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getUserData, logoutUser } from "redux/actions/userActions";
import { SET_AUTHENTICATED } from "redux/types";
import { getAllPosts } from "redux/actions/postsActions";
// MUI
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/jss/theme";
import Header from "components/Header";
// Components
import AuthRoute from "util/AuthRoute";
import Home from "pages/Home";
import Signin from "pages/Signin";
import Signup from "pages/Signup";
import Profile from "pages/Profile";

axios.defaults.baseURL =
  "http://localhost:5001/oustagram/australia-southeast1/api";

const history = createBrowserHistory();

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    history.push("/signin");
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="profile" exact element={<Profile />} />
            <Route
              path="signin"
              exact
              element={
                <AuthRoute>
                  <Signin />
                </AuthRoute>
              }
            />
            <Route
              path="signup"
              exact
              element={
                <AuthRoute>
                  <Signup />
                </AuthRoute>
              }
            />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
