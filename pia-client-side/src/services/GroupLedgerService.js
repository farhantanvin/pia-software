import http from "../../src/utilities/http-common";

const getAll = async () => {
  return await http.get("/api/GroupLedgers");
};

const get = async (id) => {
  return await http.get("/api/GroupLedgers/" + id);
};

const create = async (data) => {
  return await http.post("/api/GroupLedgers", data);
};

const update = async (id, data) => {
  return await http.put("/api/GroupLedgers/", data);
};

const remove = async (id) => {
  return await http.delete("/api/GroupLedgers/" + id);
};

const removeAll = async () => {
  return await http.delete("/api/GroupLedgers");
};

const getCategorySelect = async (id) => {
  return await http.get("/api/GroupLedgers/CategorySelect/" + id);
};

const GroupLedgerService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getCategorySelect,
};

export default GroupLedgerService;
