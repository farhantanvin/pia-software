import http from "../../src/utilities/http-common";

const getAll = async () => {
  return await http.get("/api/Branchs");
};

const get = async (id) => {
  return await http.get(`/api/Branchs/${id}`);
};

const create = async (data) => {
  return await http.post("/api/Branchs", data);
};

const update = async (id, data) => {
  return await http.put("/api/Branchs/", data);
};

const remove = async (id) => {
  return await http.delete("/api/Branchs/" + id);
};

const removeAll = async () => {
  return await http.delete("/api/Branchs");
};

const BranchService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default BranchService;
