import http from "../../src/utilities/http-common";

const getAll = async () => {
  return await http.get("/api/DepartmentTypes");
};

const get = async (id) => {
  return await http.get("/DepartmentTypes/" + id);
};

const create = async (data) => {
  return await http.post("/api/DepartmentTypes", data);
};

const update = async (id, data) => {
  return await http.put("/api/DepartmentTypes/", data);
};

const remove = async (id) => {
  return await http.delete("/api/DepartmentTypes/" + id);
};

const removeAll = async () => {
  return await http.delete("/DepartmentTypes");
};

const DepartmentTypeService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default DepartmentTypeService;
