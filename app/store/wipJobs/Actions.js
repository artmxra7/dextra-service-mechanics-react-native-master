/**
 * ---------------------------------------------------------------
 *
 *  Action Types
 *
 * ---------------------------------------------------------------
 */

export const SET_WIP_JOBS = "SET_WIP_JOBS";
export const SET_WIP_JOBS_LOADING = "SET_WIP_JOBS_LOADING";
export const CLEAR_WIP_JOBS = "CLEAR_WIP_JOBS";

/**
 * ---------------------------------------------------------------
 *
 *  Action Types for Action with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export const FETCH_WIP_JOBS = "FETCH_WIP_JOBS";

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators
 *
 * ---------------------------------------------------------------
 */

export function setWipJobs(jobs) {
  return {
    type: SET_WIP_JOBS,
    payload: {
      jobs
    }
  };
}

export function setWipJobsLoading(isLoading) {
  return {
    type: SET_WIP_JOBS_LOADING,
    payload: {
      isLoading
    }
  };
}

export function clearWipJobs() {
  return {
    type: CLEAR_WIP_JOBS
  };
}

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export function fetchWipJobs() {
  return {
    type: FETCH_WIP_JOBS
  };
}
