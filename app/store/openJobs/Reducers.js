import {
  SET_OPEN_JOBS,
  SET_OPEN_JOBS_LOADING,
  CLEAR_OPEN_JOBS
} from "./Actions";

export default function orders(state = { data: [], isLoading: false }, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OPEN_JOBS:
      return {
        ...state,
        data: [...payload.jobs]
      };
    case SET_OPEN_JOBS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading
      };
    case CLEAR_OPEN_JOBS:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
}
