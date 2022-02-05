import {
  CREATE_ACCOUNT_LEDGER,
  GET_ACCOUNT_LEDGER,
  UPDATE_ACCOUNT_LEDGER,
  DELETE_ACCOUNT_LEDGER,
} from "./types";

import AccountLedgerService from "../services/AccountLedgerService";

export const createAccountLedger =
  (
    accountTypeId,
    groupLedgerId,
    subGroupLedgerId,
    controlLedgerId,
    accountLedgerName
  ) =>
  async (dispatch) => {
    try {
      const res = await AccountLedgerService.create({
        accountTypeId,
        groupLedgerId,
        subGroupLedgerId,
        controlLedgerId,
        accountLedgerName,
      });

      dispatch({
        type: CREATE_ACCOUNT_LEDGER,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getAccountLedgers = () => async (dispatch) => {
  try {
    debugger;
    const res = await AccountLedgerService.getAll();
    dispatch({
      type: GET_ACCOUNT_LEDGER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateAccountLedger = (id, data) => async (dispatch) => {
  try {
    await AccountLedgerService.update(id, data);

    dispatch({
      type: UPDATE_ACCOUNT_LEDGER,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteAccountLedger = (id) => async (dispatch) => {
  try {
    await AccountLedgerService.remove(id);

    dispatch({
      type: DELETE_ACCOUNT_LEDGER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
