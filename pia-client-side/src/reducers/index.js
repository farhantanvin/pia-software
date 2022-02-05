import { combineReducers } from "redux";
import authReducer from "./authReducer";
import departmentTypeReducer from "./departmentTypeReducer";
import accountTypeReducer from "./accountTypeReducer";
import groupLedgerReducer from "./groupLedgerReducer";
import subGroupLedgerReducer from "./subGroupLedgerReducer";
import controlLedgerReducer from "./controlLedgerReducer";
import accountLedgerReducer from "./accountLedgerReducer";
import supplierReducer from "./supplierReducer";
import branchReducer from "./branchReducer";
import brandReducer from "./brandReducer";
import measurementUnitReducer from "./measurementUnitReducer";
import conditionReducer from "./conditionReducer";

export default combineReducers({
  authReducer,
  departmentTypeReducer,
  accountTypeReducer,
  groupLedgerReducer,
  subGroupLedgerReducer,
  controlLedgerReducer,
  accountLedgerReducer,
  supplierReducer,
  branchReducer,
  brandReducer,
  measurementUnitReducer,
  conditionReducer,
});
