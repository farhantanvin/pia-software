import {
  CREATE_SUPPLIER,
  GET_SUPPLIER,
  UPDATE_SUPPLIER,
  DELETE_SUPPLIER,
} from "./types";

import SupplierService from "../services/SupplierService";

export const createSupplier =
  (
    supplierName,
    supplierPhone,
    supplierEmail,
    supplierWebsite,
    supplierAddress,
    date,
    supplierServiceTypes
  ) =>
  async (dispatch) => {
    try {
      const res = await SupplierService.create({
        supplierName,
        supplierPhone,
        supplierEmail,
        supplierWebsite,
        supplierAddress,
        date,
        supplierServiceTypes,
      });

      dispatch({
        type: CREATE_SUPPLIER,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getSuppliers = () => async (dispatch) => {
  try {
    const res = await SupplierService.getAll();
    dispatch({
      type: GET_SUPPLIER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateSupplier = (id, data) => async (dispatch) => {
  try {
    await SupplierService.update(id, data);

    dispatch({
      type: UPDATE_SUPPLIER,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteSupplier = (id) => async (dispatch) => {
  try {
    await SupplierService.remove(id);

    dispatch({
      type: DELETE_SUPPLIER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
