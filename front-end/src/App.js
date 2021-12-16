import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { createBrowserHistory } from "history";
import jwtDecode from "jwt-decode";
// Redux
import store from "redux/store";
import { Provider } from "react-redux";
import { getUserData, logoutUser } from "redux/actions/userActions";
import { SET_AUTHENTICATED } from "./redux/types";
// MUI
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/jss/theme";
import Header from "components/Header";
// Components
import AuthRoute from "util/AuthRoute";
import Home from "pages/Home";
import Signin from "pages/Signin";
import Signup from "pages/Signup";
import TextField from "@mui/material/TextField";

axios.defaults.baseURL =
  "http://localhost:5001/oustagram/australia-southeast1/api";

const history = createBrowserHistory();

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    // window.location.href = "/Signin";
    history.push("/Signin");
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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Signin" component={Signin} />
            <Route path="/Signup" component={Signup} />
            {/* <Route exact path="/users/:handle" component={User} /> */}
            {/* <Route
              exact
              path="/users/:handle/scream/:screamId"
              component={User}
            /> */}
            {/* <AuthRoute path="/Signin" component={Signin} />
            <AuthRoute path="/Signup" component={Signup} /> */}
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
