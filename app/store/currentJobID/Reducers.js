import { SET_CURRENT_JOB_ID } from "./Actions";

export default function currentJobID(state = null, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_JOB_ID:
      return payload.jobID;
    default:
      return state;
  }
}
