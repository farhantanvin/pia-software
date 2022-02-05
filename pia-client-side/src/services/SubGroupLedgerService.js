import http from "../../src/utilities/http-common";

const getAll = async () => {
  return await http.get("/api/SubGroupLedgers");
};

const get = async (id) => {
  return await http.get("/api/SubGroupLedgers/" + id);
};

const create = async (data) => {
  return await http.post("/api/SubGroupLedgers", data);
};

const update = async (id, data) => {
  return await http.put("/api/SubGroupLedgers/", data);
};

const remove = async (id) => {
  return await http.delete("/api/SubGroupLedgers/" + id);
};

const removeAll = async () => {
  return await http.delete("/api/SubGroupLedgers");
};

const getCategorySelect = async (id) => {
  return await http.get("/api/SubGroupLedgers/CategorySelect/" + id);
};

const SubGroupLedgerService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getCategorySelect,
};

export default SubGroupLedgerService;
