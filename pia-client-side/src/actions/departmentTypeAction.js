import {
  CREATE_DEPARTMENT_TYPE,
  GET_DEPARTMENT_TYPE,
  UPDATE_DEPARTMENT_TYPE,
  DELETE_DEPARTMENT_TYPE,
} from "./types";

import DepartmentTypeService from "../services/DepartmentTypeService";

export const createDepartmentType =
  (departmentTypeName) => async (dispatch) => {
    try {
      const res = await DepartmentTypeService.create({ departmentTypeName });

      dispatch({
        type: CREATE_DEPARTMENT_TYPE,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getDepartmentTypes = () => async (dispatch) => {
  try {
    const res = await DepartmentTypeService.getAll();
    dispatch({
      type: GET_DEPARTMENT_TYPE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateDepartmentType = (id, data) => async (dispatch) => {
  try {
    await DepartmentTypeService.update(id, data);

    dispatch({
      type: UPDATE_DEPARTMENT_TYPE,
      payload: data,
    });

    return Promise.resolve(data.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteDepartmentType = (id) => async (dispatch) => {
  try {
    await DepartmentTypeService.remove(id);

    dispatch({
      type: DELETE_DEPARTMENT_TYPE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
