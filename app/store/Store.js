import { combineReducers, applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import sagas from "./Sagas";
import openJobs from "./openJobs/Reducers";
import wipJobs from "./wipJobs/Reducers";
import closeJobs from "./closeJobs/Reducers";
import currentJobID from "./currentJobID/Reducers";
import currentJob from "./currentJob/Reducers";

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  openJobs,
  wipJobs,
  closeJobs,
  currentJobID,
  currentJob
});
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;
