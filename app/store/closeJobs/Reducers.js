import {
  SET_CLOSE_JOBS,
  SET_CLOSE_JOBS_LOADING,
  CLEAR_CLOSE_JOBS
} from "./Actions";

export default function closeJobs(
  state = { data: [], isLoading: false },
  action
) {
  const { type, payload } = action;

  switch (type) {
    case SET_CLOSE_JOBS:
      return {
        ...state,
        data: [...payload.jobs]
      };
    case SET_CLOSE_JOBS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading
      };
    case CLEAR_CLOSE_JOBS:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
}
