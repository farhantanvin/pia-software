import {
  CREATE_GROUP_LEDGER,
  GET_GROUP_LEDGER,
  UPDATE_GROUP_LEDGER,
  DELETE_GROUP_LEDGER,
  CATEGORY_SELECT_GROUP_LEDGER,
} from "./types";

import GroupLedgerService from "../services/GroupLedgerService";

export const createGroupLedger =
  (accountTypeId, groupLedgerName) => async (dispatch) => {
    try {
      const res = await GroupLedgerService.create({
        accountTypeId,
        groupLedgerName,
      });
      console.log("resp", res);

      dispatch({
        type: CREATE_GROUP_LEDGER,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getGroupLedgers = () => async (dispatch) => {
  try {
    const res = await GroupLedgerService.getAll();
    dispatch({
      type: GET_GROUP_LEDGER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateGroupLedger = (id, data) => async (dispatch) => {
  try {
    await GroupLedgerService.update(id, data);

    dispatch({
      type: UPDATE_GROUP_LEDGER,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteGroupLedger = (id) => async (dispatch) => {
  try {
    await GroupLedgerService.remove(id);

    dispatch({
      type: DELETE_GROUP_LEDGER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const categorySelectGroupLedgers = (id) => async (dispatch) => {
  try {
    const res = await GroupLedgerService.getCategorySelect(id);
    console.log("action", res);
    dispatch({
      type: CATEGORY_SELECT_GROUP_LEDGER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
