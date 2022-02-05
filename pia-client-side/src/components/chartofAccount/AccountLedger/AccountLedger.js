import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dropdown } from "primereact/dropdown";

import {
  createAccountLedger,
  updateAccountLedger,
  getAccountLedgers,
  deleteAccountLedger,
} from "../../../actions/accountLedgerAction";

import { getAccountTypes } from "../../../actions/accountTypeAction";
import { getGroupLedgers } from "../../../actions/groupLedgerAction";
import { getSubGroupLedgers } from "../../../actions/subGroupLedgerAction";
import { getControlLedgers } from "../../../actions/controlLedgerAction";

const AccountLedger = () => {
  let emptyAccountLedger = {
    id: null,
    accountTypeId: null,
    groupLedgerId: null,
    subGroupLedgerId: null,
    controlLedgerId: null,
    accountLedgerName: "",
  };

  const [groupLedgerSelectBox, setGroupLedgerSelectBox] = useState(null);
  const [subGroupLedgerSelectBox, setSubGroupLedgerSelectBox] = useState(null);
  const [controlLedgerSelectBox, setControlLedgerSelectBox] = useState(null);
  const [accountLedgerDialog, setAccountLedgerDialog] = useState(false);
  const [deleteAccountLedgerDialog, setDeleteAccountLedgerDialog] =
    useState(false);
  const [deleteAccountLedgersDialog, setDeleteAccountLedgersDialog] =
    useState(false);
  const [accountLedger, setAccountLedger] = useState(emptyAccountLedger);
  const [selectedAccountLedgers, setSelectedAccountLedgers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const accountTypes = useSelector((state) => state.accountTypeReducer);
  const groupLedgers = useSelector((state) => state.groupLedgerReducer);
  const subGroupLedgers = useSelector((state) => state.subGroupLedgerReducer);
  const controlLedgers = useSelector((state) => state.controlLedgerReducer);
  const accountLedgers = useSelector((state) => state.accountLedgerReducer);

  const dispatch = useDispatch();

  const fetchData = async () => {
    // await dispatch(getAccountTypes());
    //await dispatch(getGroupLedgers());
    //await dispatch(getSubGroupLedgers());
    //await dispatch(getControlLedgers());
    debugger;
    await dispatch(getAccountLedgers());
    console.log(getAccountLedgers);
  };

  useEffect(() => {
    dispatch(getAccountTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGroupLedgers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubGroupLedgers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getControlLedgers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccountLedgers());
  }, [dispatch]);

  const openNew = () => {
    setAccountLedger(emptyAccountLedger);
    setSubmitted(false);
    setAccountLedgerDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setAccountLedgerDialog(false);
  };

  const hideDeleteAccountLedgerDialog = () => {
    setDeleteAccountLedgerDialog(false);
  };

  const hideDeleteAccountLedgersDialog = () => {
    setDeleteAccountLedgersDialog(false);
  };

  const items = [{ label: "Chart of Account" }, { label: "Account Ledger" }];

  const home = { icon: "pi pi-home", url: "/Home" };

  const saveAccountLedger = async () => {
    setSubmitted(true);

    if (accountLedger.accountLedgerName.trim()) {
      if (accountLedger.id) {
        await dispatch(updateAccountLedger(accountLedger.id, accountLedger))
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Account Ledger Updated!",
          life: 1500,
        });
      } else {
        await dispatch(
          createAccountLedger(
            accountLedger.accountTypeId,
            accountLedger.groupLedgerId,
            accountLedger.subGroupLedgerId,
            accountLedger.controlLedgerId,
            accountLedger.accountLedgerName
          )
        )
          .then((accountLedger) => {
            setAccountLedger({
              accountTypeId: accountLedger.accountTypeId,
              groupLedgerId: accountLedger.groupLedgerId,
              subGroupLedgerId: accountLedger.subGroupLedgerId,
              controlLedgerId: accountLedger.controlLedgerId,
              accountLedgerName: accountLedger.accountLedgerName,
            });
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Account Ledger Created!",
          life: 1500,
        });
      }

      setAccountLedgerDialog(false);
      // setAccountLedger(emptyAccountLedger);
    }

    await fetchData();
  };

  const editAccountLedger = (accountLedger) => {
    setAccountLedger({ ...accountLedger });
    categoryGroupLedgerSelect(accountLedger["accountTypeId"]);
    categorySubGroupLedgerSelect(accountLedger["groupLedgerId"]);
    categoryControlLedgerSelect(accountLedger["subGroupLedgerId"]);
    setAccountLedgerDialog(true);
  };

  const confirmDeleteAccountLedger = (accountLedger) => {
    setAccountLedger(accountLedger);
    setDeleteAccountLedgerDialog(true);
  };

  const deleteAccountLedgerFn = async () => {
    let _accountLedgers = accountLedger.id;

    await dispatch(deleteAccountLedger(_accountLedgers))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setAccountLedger(_accountLedgers);
    setDeleteAccountLedgerDialog(false);
    setAccountLedger(emptyAccountLedger);

    await fetchData();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Account Ledger Deleted!",
      life: 2000,
    });
  };

  // const confirmDeleteSelected = () => {
  //   setDeleteAccountLedgersDialog(true);
  // };

  const deleteSelectedAccountLedgers = async () => {
    let _accountLedgers = accountLedger.id;

    await dispatch(deleteAccountLedger(_accountLedgers))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setDeleteAccountLedgersDialog(false);
    setSelectedAccountLedgers(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Account Ledger Deleted!",
      life: 3000,
    });
  };

  const onInputChange = (e, id) => {
    debugger;

    if (id === "accountTypeId") {
      categoryGroupLedgerSelect(e.target.value);
    }

    if (id === "groupLedgerId") {
      categorySubGroupLedgerSelect(e.target.value);
    }
    if (id === "subGroupLedgerId") {
      categoryControlLedgerSelect(e.target.value);
    }

    const val = (e.target && e.target.value) || "";
    let _accountLedger = { ...accountLedger };
    _accountLedger[`${id}`] = val;

    setAccountLedger(_accountLedger);
  };

  const categoryGroupLedgerSelect = (newID) => {
    let newGroup = groupLedgers.filter((group) => {
      return group.accountTypeId === newID;
    });
    setGroupLedgerSelectBox(newGroup);
  };

  const categorySubGroupLedgerSelect = (id) => {
    let newGroup = subGroupLedgers.filter((subGroup) => {
      return subGroup.groupLedgerId === id;
    });
    setSubGroupLedgerSelectBox(newGroup);
  };

  const categoryControlLedgerSelect = (id) => {
    let newGroup = controlLedgers.filter((controlLedger) => {
      return controlLedger.subGroupLedgerId === id;
    });
    setControlLedgerSelectBox(newGroup);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <BreadCrumb
          model={items}
          home={home}
          style={{ border: "none", padding: "0", background: "#f7f9fa" }}
        />
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
        {/* <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedAccountLedgers || !selectedAccountLedgers.length}
        /> */}
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editAccountLedger(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteAccountLedger(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">List of Account Ledgers</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const accountLedgerDialogFooter = (
    <React.Fragment>
      <button
        className="p-button p-component p-button-danger"
        onClick={hideDialog}
      >
        <span className="p-button-icon p-c pi pi-times p-button-icon-left"></span>
        <span className="p-button-label p-c">Cancel</span>
      </button>

      <button
        className="p-button p-component p-button-success"
        onClick={saveAccountLedger}
      >
        <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span>
        <span className="p-button-label p-c">Save</span>
      </button>
    </React.Fragment>
  );
  const deleteAccountLedgerDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteAccountLedgerDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteAccountLedgerFn}
      />
    </React.Fragment>
  );
  const deleteAccountLedgersDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteAccountLedgersDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedAccountLedgers}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="p-mb-0"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={accountLedgers}
          selection={selectedAccountLedgers}
          onSelectionChange={(e) => setSelectedAccountLedgers(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Account Ledgers"
          globalFilter={globalFilter}
          header={header}
        >
          {/* <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column> */}
          <Column
            field="accountLedgerName"
            header="Account Ledger"
            sortable
          ></Column>
          <Column field="accountTypeName" header="Account Type"></Column>
          <Column field="groupLedgerName" header="Group Ledger"></Column>
          <Column field="subGroupLedgerName" header="Sub Group Ledger"></Column>
          <Column field="controlLedgerName" header="Control Ledger"></Column>
          <Column body={actionBodyTemplate} header="Action"></Column>
        </DataTable>
      </div>

      <Dialog
        visible={accountLedgerDialog}
        style={{ width: "450px" }}
        header="Account Ledger"
        modal
        className="p-fluid"
        footer={accountLedgerDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="accountTypeId">
            Account Type <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            id="accountTypeId"
            inputId="state"
            optionLabel="accountTypeName"
            autoFocus
            required
            optionValue="id"
            value={accountLedger.accountTypeId}
            options={accountTypes}
            onChange={(e) => onInputChange(e, "accountTypeId")}
            placeholder="Select account type"
            className={classNames({
              "p-invalid": submitted && !accountLedger.accountTypeId,
            })}
          />
          {submitted && !accountLedger.accountTypeId && (
            <small className="p-error">Account Type is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="groupLedgerId">
            Group Ledger <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            id="groupLedgerId"
            inputId="state"
            optionLabel="groupLedgerName"
            required
            optionValue="id"
            value={accountLedger.groupLedgerId}
            options={groupLedgerSelectBox}
            disabled={accountLedger.accountTypeId ? false : true}
            onChange={(e) => onInputChange(e, "groupLedgerId")}
            placeholder="Select Group Ledger"
            className={classNames({
              "p-invalid": submitted && !accountLedger.groupLedgerId,
            })}
          />
          {submitted && !accountLedger.groupLedgerId && (
            <small className="p-error">Group Ledger is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="subGroupLedgerId">
            Sub Group Ledger <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            id="subGroupLedgerId"
            inputId="state"
            optionLabel="subGroupLedgerName"
            required
            optionValue="id"
            value={accountLedger.subGroupLedgerId}
            options={subGroupLedgerSelectBox}
            disabled={accountLedger.groupLedgerId ? false : true}
            onChange={(e) => onInputChange(e, "subGroupLedgerId")}
            placeholder="Select Sub Group Ledger"
            className={classNames({
              "p-invalid": submitted && !accountLedger.subGroupLedgerId,
            })}
          />
          {submitted && !accountLedger.subGroupLedgerId && (
            <small className="p-error">Sub Group Ledger is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="controlLedgerId">
            Control Ledger <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            id="controlLedgerId"
            inputId="state"
            optionLabel="controlLedgerName"
            required
            optionValue="id"
            value={accountLedger.controlLedgerId}
            options={controlLedgerSelectBox}
            disabled={accountLedger.subGroupLedgerId ? false : true}
            onChange={(e) => onInputChange(e, "controlLedgerId")}
            placeholder="Select Control Ledger"
            className={classNames({
              "p-invalid": submitted && !accountLedger.controlLedgerId,
            })}
          />
          {submitted && !accountLedger.controlLedgerId && (
            <small className="p-error">Control Ledger is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="accountLedgerName">
            Account Ledger Name <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="accountLedgerName"
            value={accountLedger.accountLedgerName}
            onChange={(e) => onInputChange(e, "accountLedgerName")}
            required
            className={classNames({
              "p-invalid": submitted && !accountLedger.accountLedgerName,
            })}
          />
          {submitted && !accountLedger.accountLedgerName && (
            <small className="p-error">Account Ledger Name is required.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteAccountLedgerDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteAccountLedgerDialogFooter}
        onHide={hideDeleteAccountLedgerDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {accountLedger && (
            <span>
              Are you sure you want to delete{" "}
              <b>{accountLedger.accountLedgerName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteAccountLedgersDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteAccountLedgersDialogFooter}
        onHide={hideDeleteAccountLedgersDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {accountLedger && (
            <span>
              Are you sure you want to delete the selected account ledger
              ledgers?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default AccountLedger;
