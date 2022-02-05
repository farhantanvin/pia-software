import {
  CREATE_BRANCH,
  GET_BRANCH,
  UPDATE_BRANCH,
  DELETE_BRANCH,
} from "./types";

import BranchService from "../services/BranchService";

export const createBranch = (branchCode, branchName) => async (dispatch) => {
  try {
    const res = await BranchService.create({ branchCode, branchName });

    dispatch({
      type: CREATE_BRANCH,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getBranchs = () => async (dispatch) => {
  try {
    const res = await BranchService.getAll();
    dispatch({
      type: GET_BRANCH,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateBranch = (id, data) => async (dispatch) => {
  try {
    await BranchService.update(id, data);

    dispatch({
      type: UPDATE_BRANCH,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteBranch = (id) => async (dispatch) => {
  try {
    await BranchService.remove(id);

    dispatch({
      type: DELETE_BRANCH,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
