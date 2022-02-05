import {
  CREATE_ACCOUNT_TYPE,
  GET_ACCOUNT_TYPE,
  UPDATE_ACCOUNT_TYPE,
  DELETE_ACCOUNT_TYPE,
} from "./types";

import AccountTypeService from "../services/AccountTypeService";

export const createAccountType = (accountTypeName) => async (dispatch) => {
  try {
    const res = await AccountTypeService.create({ accountTypeName });

    dispatch({
      type: CREATE_ACCOUNT_TYPE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getAccountTypes = () => async (dispatch) => {
  try {
    const res = await AccountTypeService.getAll();
    dispatch({
      type: GET_ACCOUNT_TYPE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateAccountType = (id, data) => async (dispatch) => {
  try {
    await AccountTypeService.update(id, data);
    dispatch({
      type: UPDATE_ACCOUNT_TYPE,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteAccountType = (id) => async (dispatch) => {
  try {
    await AccountTypeService.remove(id);

    dispatch({
      type: DELETE_ACCOUNT_TYPE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
