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
  createControlLedger,
  updateControlLedger,
  getControlLedgers,
  deleteControlLedger,
} from "../../../actions/controlLedgerAction";

import { getAccountTypes } from "../../../actions/accountTypeAction";
import { getGroupLedgers } from "../../../actions/groupLedgerAction";
import { getSubGroupLedgers } from "../../../actions/subGroupLedgerAction";

const ControlLedger = () => {
  let emptyControlLedger = {
    id: null,
    accountTypeId: null,
    groupLedgerId: null,
    subGroupLedgerId: null,
    controlLedgerName: "",
  };

  const [groupLedgerSelectBox, setGroupLedgerSelectBox] = useState(null);
  const [subGroupLedgerSelectBox, setSubGroupLedgerSelectBox] = useState(null);
  const [controlLedgerDialog, setControlLedgerDialog] = useState(false);
  const [deleteControlLedgerDialog, setDeleteControlLedgerDialog] =
    useState(false);
  const [deleteControlLedgersDialog, setDeleteControlLedgersDialog] =
    useState(false);
  const [controlLedger, setControlLedger] = useState(emptyControlLedger);
  const [selectedControlLedgers, setSelectedControlLedgers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const accountTypes = useSelector((state) => state.accountTypeReducer);
  const groupLedgers = useSelector((state) => state.groupLedgerReducer);
  const subGroupLedgers = useSelector((state) => state.subGroupLedgerReducer);
  const controlLedgers = useSelector((state) => state.controlLedgerReducer);

  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(getAccountTypes());
    await dispatch(getGroupLedgers());
    await dispatch(getSubGroupLedgers());
    await dispatch(getControlLedgers());
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

  const openNew = () => {
    setControlLedger(emptyControlLedger);
    setSubmitted(false);
    setControlLedgerDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setControlLedgerDialog(false);
  };

  const hideDeleteControlLedgerDialog = () => {
    setDeleteControlLedgerDialog(false);
  };

  const hideDeleteControlLedgersDialog = () => {
    setDeleteControlLedgersDialog(false);
  };

  const items = [{ label: "Chart of Account" }, { label: "Control Ledger" }];

  const home = { icon: "pi pi-home", url: "/Home" };

  const saveControlLedger = async () => {
    setSubmitted(true);
    if (controlLedger.controlLedgerName.trim()) {
      if (controlLedger.id) {
        await dispatch(updateControlLedger(controlLedger.id, controlLedger))
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Control Ledger Updated!",
          life: 1500,
        });
      } else {
        await dispatch(
          createControlLedger(
            controlLedger.accountTypeId,
            controlLedger.groupLedgerId,
            controlLedger.subGroupLedgerId,
            controlLedger.controlLedgerName
          )
        )
          .then((controlLedger) => {
            setControlLedger({
              accountTypeId: controlLedger.accountTypeId,
              groupLedgerId: controlLedger.groupLedgerId,
              subGroupLedgerId: controlLedger.subGroupLedgerId,
              controlLedgerName: controlLedger.controlLedgerName,
            });

            console.log(controlLedger);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Control Ledger Created!",
          life: 1500,
        });
      }

      setControlLedgerDialog(false);
      setControlLedger(emptyControlLedger);
    }

    await fetchData();
  };

  const editControlLedger = (controlLedger) => {
    setControlLedger({ ...controlLedger });
    categoryGroupLedgerSelect(controlLedger["accountTypeId"]);
    categorySubGroupLedgerSelect(controlLedger["groupLedgerId"]);
    setControlLedgerDialog(true);
  };

  const confirmDeleteControlLedger = (controlLedger) => {
    setControlLedger(controlLedger);
    setDeleteControlLedgerDialog(true);
  };

  const deleteControlLedgerFn = async () => {
    let _controlLedgers = controlLedger.id;

    await dispatch(deleteControlLedger(_controlLedgers))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setControlLedger(_controlLedgers);
    setDeleteControlLedgerDialog(false);
    setControlLedger(emptyControlLedger);

    await fetchData();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Control Ledger Deleted!",
      life: 2000,
    });
  };

  // const confirmDeleteSelected = () => {
  //   setDeleteControlLedgersDialog(true);
  // };

  const deleteSelectedControlLedgers = async () => {
    let _controlLedgers = controlLedger.id;

    await dispatch(deleteControlLedger(_controlLedgers))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setDeleteControlLedgersDialog(false);
    setSelectedControlLedgers(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Control Ledger Deleted!",
      life: 3000,
    });
  };

  const onInputChange = (e, id) => {
    if (id === "accountTypeId") {
      categoryGroupLedgerSelect(e.target.value);
    }

    if (id === "groupLedgerId") {
      categorySubGroupLedgerSelect(e.target.value);
    }

    const val = (e.target && e.target.value) || "";
    let _controlLedger = { ...controlLedger };
    _controlLedger[`${id}`] = val;
    setControlLedger(_controlLedger);
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
          disabled={!selectedControlLedgers || !selectedControlLedgers.length}
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
          onClick={() => editControlLedger(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteControlLedger(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">List of Control Ledgers</h5>
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
  const controlLedgerDialogFooter = (
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
        onClick={saveControlLedger}
      >
        <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span>
        <span className="p-button-label p-c">Save</span>
      </button>
    </React.Fragment>
  );
  const deleteControlLedgerDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteControlLedgerDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteControlLedgerFn}
      />
    </React.Fragment>
  );
  const deleteControlLedgersDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteControlLedgersDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedControlLedgers}
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
          value={controlLedgers}
          selection={selectedControlLedgers}
          onSelectionChange={(e) => setSelectedControlLedgers(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Sub Group Ledgers"
          globalFilter={globalFilter}
          header={header}
        >
          {/* <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column> */}
          <Column
            field="controlLedgerName"
            header="Control Ledger"
            sortable
          ></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column body={actionBodyTemplate} header="Action"></Column>
        </DataTable>
      </div>

      <Dialog
        visible={controlLedgerDialog}
        style={{ width: "450px" }}
        header="Control Ledger"
        modal
        className="p-fluid"
        footer={controlLedgerDialogFooter}
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
            value={controlLedger.accountTypeId}
            options={accountTypes}
            onChange={(e) => onInputChange(e, "accountTypeId")}
            placeholder="Select account type"
            className={classNames({
              "p-invalid": submitted && !controlLedger.accountTypeId,
            })}
          />
          {submitted && !controlLedger.accountTypeId && (
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
            value={controlLedger.groupLedgerId}
            options={groupLedgerSelectBox}
            disabled={controlLedger.accountTypeId ? false : true}
            onChange={(e) => onInputChange(e, "groupLedgerId")}
            placeholder="Select Group Ledger"
            className={classNames({
              "p-invalid": submitted && !controlLedger.groupLedgerId,
            })}
          />
          {submitted && !controlLedger.groupLedgerId && (
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
            value={controlLedger.subGroupLedgerId}
            options={subGroupLedgerSelectBox}
            disabled={controlLedger.groupLedgerId ? false : true}
            onChange={(e) => onInputChange(e, "subGroupLedgerId")}
            placeholder="Select Sub Group Ledger"
            className={classNames({
              "p-invalid": submitted && !controlLedger.subGroupLedgerId,
            })}
          />
          {submitted && !controlLedger.subGroupLedgerId && (
            <small className="p-error">Sub Group Ledger is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="controlLedgerName">
            Control Ledger Name <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="controlLedgerName"
            value={controlLedger.controlLedgerName}
            onChange={(e) => onInputChange(e, "controlLedgerName")}
            required
            className={classNames({
              "p-invalid": submitted && !controlLedger.controlLedgerName,
            })}
          />
          {submitted && !controlLedger.controlLedgerName && (
            <small className="p-error">Control Ledger Name is required.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteControlLedgerDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteControlLedgerDialogFooter}
        onHide={hideDeleteControlLedgerDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {controlLedger && (
            <span>
              Are you sure you want to delete{" "}
              <b>{controlLedger.controlLedgerName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteControlLedgersDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteControlLedgersDialogFooter}
        onHide={hideDeleteControlLedgersDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {controlLedger && (
            <span>
              Are you sure you want to delete the selected control ledger
              ledgers?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ControlLedger;
