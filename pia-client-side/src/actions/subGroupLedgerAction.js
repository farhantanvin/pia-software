import {
  CREATE_SUB_GROUP_LEDGER,
  GET_SUB_GROUP_LEDGER,
  UPDATE_SUB_GROUP_LEDGER,
  DELETE_SUB_GROUP_LEDGER,
  CATEGORY_SELECT_SUB_GROUP_LEDGER,
} from "./types";

import SubGroupLedgerService from "../services/SubGroupLedgerService";

export const createSubGroupLedger =
  (accountTypeId, groupLedgerId, subGroupLedgerName) => async (dispatch) => {
    try {
      const res = await SubGroupLedgerService.create({
        accountTypeId,
        groupLedgerId,
        subGroupLedgerName,
      });

      dispatch({
        type: CREATE_SUB_GROUP_LEDGER,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getSubGroupLedgers = () => async (dispatch) => {
  try {
    const res = await SubGroupLedgerService.getAll();
    dispatch({
      type: GET_SUB_GROUP_LEDGER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateSubGroupLedger = (id, data) => async (dispatch) => {
  try {
    await SubGroupLedgerService.update(id, data);

    dispatch({
      type: UPDATE_SUB_GROUP_LEDGER,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteSubGroupLedger = (id) => async (dispatch) => {
  try {
    await SubGroupLedgerService.remove(id);

    dispatch({
      type: DELETE_SUB_GROUP_LEDGER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const categorySelectSubGroupLedgers = (id) => async (dispatch) => {
  try {
    const res = await SubGroupLedgerService.getCategorySelect(id);
    console.log("action", res);
    dispatch({
      type: CATEGORY_SELECT_SUB_GROUP_LEDGER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
