import { SET_CURRENT_JOB, SET_CURRENT_JOB_LOADING } from "./Actions";

export default function currentJob(
  state = { data: {}, isLoading: false },
  action
) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_JOB:
      return {
        ...state,
        data: payload.job
      };
    case SET_CURRENT_JOB_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading
      };
    default:
      return state;
  }
}
