import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import postsReducer from "./reducers/postsReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};

const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer,
  UI: uiReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducers, initialState, enhancer);

export default store;
