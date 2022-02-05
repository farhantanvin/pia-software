import {
  CREATE_BRAND,
  GET_BRAND,
  UPDATE_BRAND,
  DELETE_BRAND,
} from "../actions/types";

import BrandService from "../services/BrandService";

export const createBrand = (accountLedgerId, brandName) => async (dispatch) => {
  try {
    const res = await BrandService.create({ accountLedgerId, brandName });

    dispatch({
      type: CREATE_BRAND,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getBrands = () => async (dispatch) => {
  try {
    const res = await BrandService.getAll();
    dispatch({
      type: GET_BRAND,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateBrand = (id, data) => async (dispatch) => {
  try {
    await BrandService.update(id, data);

    dispatch({
      type: UPDATE_BRAND,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteBrand = (id) => async (dispatch) => {
  try {
    await BrandService.remove(id);

    dispatch({
      type: DELETE_BRAND,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
