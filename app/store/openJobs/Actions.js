/**
 * ---------------------------------------------------------------
 *
 *  Action Types
 *
 * ---------------------------------------------------------------
 */

export const SET_OPEN_JOBS = "SET_OPEN_JOBS";
export const SET_OPEN_JOBS_LOADING = "SET_OPEN_JOBS_LOADING";
export const CLEAR_OPEN_JOBS = "CLEAR_OPEN_JOBS";

/**
 * ---------------------------------------------------------------
 *
 *  Action Types for Action with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export const FETCH_OPEN_JOBS = "FETCH_OPEN_JOBS";

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators
 *
 * ---------------------------------------------------------------
 */

export function setOpenJobs(jobs) {
  return {
    type: SET_OPEN_JOBS,
    payload: {
      jobs
    }
  };
}

export function setOpenJobsLoading(isLoading) {
  return {
    type: SET_OPEN_JOBS_LOADING,
    payload: {
      isLoading
    }
  };
}

export function clearOpenJobs() {
  return {
    type: CLEAR_OPEN_JOBS
  };
}

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export function fetchOpenJobs() {
  return {
    type: FETCH_OPEN_JOBS
  };
}
