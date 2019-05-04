/**
 * ---------------------------------------------------------------
 *
 *  Action Types
 *
 * ---------------------------------------------------------------
 */

export const SET_CURRENT_JOB_ID = "SET_CURRENT_JOB_ID";

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators
 *
 * ---------------------------------------------------------------
 */

export function setCurrentJobID(jobID) {
  return {
    type: SET_CURRENT_JOB_ID,
    payload: {
      jobID
    }
  };
}
