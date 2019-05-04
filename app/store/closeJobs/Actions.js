/**
 * ---------------------------------------------------------------
 *
 *  Action Types
 *
 * ---------------------------------------------------------------
 */

export const SET_CLOSE_JOBS = "SET_CLOSE_JOBS";
export const SET_CLOSE_JOBS_LOADING = "SET_CLOSE_JOBS_LOADING";
export const CLEAR_CLOSE_JOBS = "CLEAR_CLOSE_JOBS";

/**
 * ---------------------------------------------------------------
 *
 *  Action Types for Action with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export const FETCH_CLOSE_JOBS = "FETCH_CLOSE_JOBS";

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators
 *
 * ---------------------------------------------------------------
 */

export function setCloseJobs(jobs) {
  return {
    type: SET_CLOSE_JOBS,
    payload: {
      jobs
    }
  };
}

export function setCloseJobsLoading(isLoading) {
  return {
    type: SET_CLOSE_JOBS_LOADING,
    payload: {
      isLoading
    }
  };
}

export function clearCloseJobs() {
  return {
    type: CLEAR_CLOSE_JOBS
  };
}

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export function fetchCloseJobs() {
  return {
    type: FETCH_CLOSE_JOBS
  };
}
