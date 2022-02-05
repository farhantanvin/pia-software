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
  createSubGroupLedger,
  updateSubGroupLedger,
  getSubGroupLedgers,
  deleteSubGroupLedger,
} from "../../../actions/subGroupLedgerAction";

import { getAccountTypes } from "../../../actions/accountTypeAction";
import { getGroupLedgers } from "../../../actions/groupLedgerAction";

const SubGroupLedger = () => {
  let emptySubGroupLedger = {
    id: null,
    accountTypeId: null,
    groupLedgerId: null,
    subGroupLedgerName: "",
  };

  const [groupSelectBox, setGroupSelectBox] = useState(null);
  const [subGroupLedgerDialog, setSubGroupLedgerDialog] = useState(false);
  const [deleteSubGroupLedgerDialog, setDeleteSubGroupLedgerDialog] =
    useState(false);
  const [deleteSubGroupLedgersDialog, setDeleteSubGroupLedgersDialog] =
    useState(false);
  const [subGroupLedger, setSubGroupLedger] = useState(emptySubGroupLedger);
  const [selectedSubGroupLedgers, setSelectedSubGroupLedgers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const subGroupLedgers = useSelector((state) => state.subGroupLedgerReducer);
  const accountTypes = useSelector((state) => state.accountTypeReducer);
  const groupLedgers = useSelector((state) => state.groupLedgerReducer);
  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(getAccountTypes());
    await dispatch(getSubGroupLedgers());
    await dispatch(getGroupLedgers());
  };

  useEffect(() => {
    dispatch(getSubGroupLedgers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGroupLedgers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccountTypes());
  }, [dispatch]);

  const openNew = () => {
    setSubGroupLedger(emptySubGroupLedger);
    setSubmitted(false);
    setSubGroupLedgerDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setSubGroupLedgerDialog(false);
  };

  const hideDeleteSubGroupLedgerDialog = () => {
    setDeleteSubGroupLedgerDialog(false);
  };

  const hideDeleteSubGroupLedgersDialog = () => {
    setDeleteSubGroupLedgersDialog(false);
  };

  const items = [{ label: "Chart of Account" }, { label: "Sub Group Ledger" }];

  const home = { icon: "pi pi-home", url: "/Home" };

  const saveSubGroupLedger = async () => {
    setSubmitted(true);
    if (subGroupLedger.subGroupLedgerName.trim()) {
      if (subGroupLedger.id) {
        await dispatch(updateSubGroupLedger(subGroupLedger.id, subGroupLedger))
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Sub Group Ledger Updated!",
          life: 1500,
        });
      } else {
        await dispatch(
          createSubGroupLedger(
            subGroupLedger.accountTypeId,
            subGroupLedger.groupLedgerId,
            subGroupLedger.subGroupLedgerName
          )
        )
          .then((subGroupLedger) => {
            setSubGroupLedger({
              accountTypeId: subGroupLedger.accountTypeId,
              groupLedgerId: subGroupLedger.groupLedgerId,
              subGroupLedgerName: subGroupLedger.gubGroupLedgerName,
            });
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Sub Group Ledger Created!",
          life: 1500,
        });
      }

      setSubGroupLedgerDialog(false);
      setSubGroupLedger(emptySubGroupLedger);
    }

    await fetchData();
  };

  const editSubGroupLedger = (subGroupLedger) => {
    setSubGroupLedger({ ...subGroupLedger });
    CategorySelect(subGroupLedger["accountTypeId"]);
    setSubGroupLedgerDialog(true);
  };

  const confirmDeleteSubGroupLedger = (subGroupLedger) => {
    setSubGroupLedger(subGroupLedger);
    setDeleteSubGroupLedgerDialog(true);
  };

  const deleteSubGroupLedgerFn = async () => {
    let _subGroupLedgers = subGroupLedger.id;

    await dispatch(deleteSubGroupLedger(_subGroupLedgers))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setSubGroupLedger(_subGroupLedgers);
    setDeleteSubGroupLedgerDialog(false);
    setSubGroupLedger(emptySubGroupLedger);

    await fetchData();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Sub Group Ledger Deleted!",
      life: 2000,
    });
  };

  // const confirmDeleteSelected = () => {
  //   setDeleteSubGroupLedgersDialog(true);
  // };

  const deleteSelectedSubGroupLedgers = async () => {
    let _subGroupLedgers = subGroupLedger.id;

    await dispatch(deleteSubGroupLedger(_subGroupLedgers))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setDeleteSubGroupLedgersDialog(false);
    setSelectedSubGroupLedgers(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Sub Group Ledger Deleted!",
      life: 3000,
    });
  };

  const onInputChange = (e, id) => {
    if (id === "accountTypeId") {
      CategorySelect(e.target.value);
    }
    const val = (e.target && e.target.value) || "";
    let _subGroupLedger = { ...subGroupLedger };
    _subGroupLedger[`${id}`] = val;
    setSubGroupLedger(_subGroupLedger);
  };

  // const onInputChangeGroup = (e, groupLedgerId) => {
  //   const val = (e.target && e.target.value) || "";
  //   let _subGroupLedger = { ...subGroupLedger };
  //   _subGroupLedger[`${groupLedgerId}`] = val;
  //   setSubGroupLedger(_subGroupLedger);
  // };

  const CategorySelect = (newID) => {
    let newGroup = groupLedgers.filter((group) => {
      return group.accountTypeId === newID;
    });
    setGroupSelectBox(newGroup);
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
          disabled={!selectedSubGroupLedgers || !selectedSubGroupLedgers.length}
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
          onClick={() => editSubGroupLedger(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteSubGroupLedger(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">List of Sub Group Ledgers</h5>
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
  const subGroupLedgerDialogFooter = (
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
        onClick={saveSubGroupLedger}
      >
        <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span>
        <span className="p-button-label p-c">Save</span>
      </button>
    </React.Fragment>
  );
  const deleteSubGroupLedgerDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteSubGroupLedgerDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSubGroupLedgerFn}
      />
    </React.Fragment>
  );
  const deleteSubGroupLedgersDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteSubGroupLedgersDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedSubGroupLedgers}
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
          value={subGroupLedgers}
          selection={selectedSubGroupLedgers}
          onSelectionChange={(e) => setSelectedSubGroupLedgers(e.value)}
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
            field="subGroupLedgerName"
            header="Sub Group Ledger"
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
        visible={subGroupLedgerDialog}
        style={{ width: "450px" }}
        header="Sub Group Ledger"
        modal
        className="p-fluid"
        footer={subGroupLedgerDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="accountTypeId">
            Account Type <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            id="accountTypeId"
            inputId="state"
            required
            autoFocus
            optionLabel="accountTypeName"
            optionValue="id"
            value={subGroupLedger.accountTypeId}
            options={accountTypes}
            onChange={(e) => onInputChange(e, "accountTypeId")}
            placeholder="Select account type"
            className={classNames({
              "p-invalid": submitted && !subGroupLedger.accountTypeId,
            })}
          />
          {submitted && !subGroupLedger.accountTypeId && (
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
            required
            optionLabel="groupLedgerName"
            optionValue="id"
            value={subGroupLedger.groupLedgerId}
            options={groupSelectBox}
            disabled={subGroupLedger.accountTypeId ? false : true}
            onChange={(e) => onInputChange(e, "groupLedgerId")}
            placeholder="Select Group Ledger"
            className={classNames({
              "p-invalid": submitted && !subGroupLedger.groupLedgerId,
            })}
          />
          {submitted && !subGroupLedger.groupLedgerId && (
            <small className="p-error">Group Ledger is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="subGroupLedgerName">
            Sub Group Ledger Name <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="subGroupLedgerName"
            value={subGroupLedger.subGroupLedgerName}
            onChange={(e) => onInputChange(e, "subGroupLedgerName")}
            required
            className={classNames({
              "p-invalid": submitted && !subGroupLedger.subGroupLedgerName,
            })}
          />
          {submitted && !subGroupLedger.subGroupLedgerName && (
            <small className="p-error">
              Sub Group Ledger Name is required.
            </small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteSubGroupLedgerDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteSubGroupLedgerDialogFooter}
        onHide={hideDeleteSubGroupLedgerDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {subGroupLedger && (
            <span>
              Are you sure you want to delete{" "}
              <b>{subGroupLedger.subGroupLedgerName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteSubGroupLedgersDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteSubGroupLedgersDialogFooter}
        onHide={hideDeleteSubGroupLedgersDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {subGroupLedger && (
            <span>
              Are you sure you want to delete the selected sub group ledgers?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default SubGroupLedger;
