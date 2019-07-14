// global window
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer";
import generateId from "../middlewares/generateId";
import api from "../middlewares/api";

// noinspection JSUnresolvedVariable
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk, generateId, api];

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);
