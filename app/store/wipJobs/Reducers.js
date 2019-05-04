import { SET_WIP_JOBS, SET_WIP_JOBS_LOADING, CLEAR_WIP_JOBS } from "./Actions";

export default function wipJobs(
  state = { data: [], isLoading: false },
  action
) {
  const { type, payload } = action;

  switch (type) {
    case SET_WIP_JOBS:
      return {
        ...state,
        data: [...payload.jobs]
      };
    case SET_WIP_JOBS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading
      };
    case CLEAR_WIP_JOBS:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
}
