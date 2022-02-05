import http from "../../src/utilities/http-common";

const getAll = async () => {
  return await http.get("/api/AccountTypes");
};

const get = async (id) => {
  return await http.get(`/api/AccountTypes/${id}`);
};

const create = async (data) => {
  return await http.post("/api/AccountTypes", data);
};

const update = async (id, data) => {
  return await http.put("/api/AccountTypes/", data);
};

const remove = async (id) => {
  return await http.delete("/api/AccountTypes/" + id);
};

const removeAll = async () => {
  return await http.delete(`/api/AccountTypes`);
};

const AccountTypeService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default AccountTypeService;
