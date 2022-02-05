import http from "../utilities/http-common";

const getAll = async () => {
  return await http.get("/api/AccountLedgers");
};

const get = async (id) => {
  return await http.get("/api/AccountLedgers/" + id);
};

const create = async (data) => {
  return await http.post("/api/AccountLedgers", data);
};

const update = async (id, data) => {
  return await http.put("/api/AccountLedgers/", data);
};

const remove = async (id) => {
  return await http.delete("/api/AccountLedgers/" + id);
};

const removeAll = async () => {
  return await http.delete("/api/AccountLedgers");
};

const AccountLedgerService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default AccountLedgerService;
