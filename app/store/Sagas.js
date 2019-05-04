import { put, takeEvery, all, call, select } from "redux-saga/effects";
import axios from "axios";

import { config } from "../config/Config";
import Data from "../config/Data";
import { setOpenJobs, setOpenJobsLoading } from "./openJobs/Actions";
import { setWipJobs, setWipJobsLoading } from "./wipJobs/Actions";
import { setCloseJobs, setCloseJobsLoading } from "./closeJobs/Actions";
import { setCurrentJob, setCurrentJobLoading } from "./currentJob/Actions";

function* fetchJobs(status = "WAITING") {
  const data = new Data();

  let command, loadingFunc, setFunc;

  switch (status) {
    case "WIP":
      command = "FETCH_WIP_JOBS";
      loadingFunc = setWipJobsLoading;
      setFunc = setWipJobs;
      break;

    case "CLOSE":
      command = "FETCH_CLOSE_JOBS";
      loadingFunc = setCloseJobsLoading;
      setFunc = setCloseJobs;
      break;

    default:
      command = "FETCH_OPEN_JOBS";
      loadingFunc = setOpenJobsLoading;
      setFunc = setOpenJobs;
      break;
  }

  yield takeEvery(command, function*() {
    yield put(loadingFunc(true));

    try {
      const user = yield call(data.select, "user");
      const response = yield call(
        axios.post,
        `${config.url}jobs/status/${status.toLowerCase()}`,
        { userID: user.id }
      );
      const jobs = response.data.data;

      yield put(setFunc(jobs));
      yield put(loadingFunc(false));
    } catch (error) {
      console.error(error);
      yield put(loadingFunc(false));
    }
  });
}

function* fetchCurrentJob() {
  yield takeEvery("FETCH_CURRENT_JOB", function*() {
    yield put(setCurrentJobLoading(true));

    try {
      const getJobID = state => state.currentJobID;
      const jobID = yield select(getJobID);
      const response = yield call(axios.get, `${config.url}jobs/${jobID}`);
      const job = response.data.data;

      yield put(setCurrentJob(job));
      yield put(setCurrentJobLoading(false));
    } catch (error) {
      console.error(error);
      yield put(setCurrentJobLoading(false));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fetchJobs("WAITING"),
    fetchJobs("WIP"),
    fetchJobs("CLOSE"),
    fetchCurrentJob()
  ]);
}
