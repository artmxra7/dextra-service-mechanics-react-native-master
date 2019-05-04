/**
 * ---------------------------------------------------------------
 *
 *  Action Types
 *
 * ---------------------------------------------------------------
 */

export const SET_CURRENT_JOB = "SET_CURRENT_JOB";
export const SET_CURRENT_JOB_LOADING = "SET_CURRENT_JOB_LOADING";

/**
 * ---------------------------------------------------------------
 *
 *  Action Types for Action with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export const FETCH_CURRENT_JOB = "FETCH_CURRENT_JOB";

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators
 *
 * ---------------------------------------------------------------
 */

export function setCurrentJob(job) {
  return {
    type: SET_CURRENT_JOB,
    payload: {
      job
    }
  };
}

export function setCurrentJobLoading(isLoading) {
  return {
    type: SET_CURRENT_JOB_LOADING,
    payload: {
      isLoading
    }
  };
}

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export function fetchCurrentJob() {
  return {
    type: FETCH_CURRENT_JOB
  };
}
