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
  createGroupLedger,
  updateGroupLedger,
  getGroupLedgers,
  deleteGroupLedger,
} from "../../../actions/groupLedgerAction";

import { getAccountTypes } from "../../../actions/accountTypeAction";

const GroupLedger = () => {
  let emptyGroupLedger = {
    id: null,
    accountTypeId: null,
    groupLedgerName: "",
  };

  const [groupLedgerDialog, setGroupLedgerDialog] = useState(false);
  const [deleteGroupLedgerDialog, setDeleteGroupLedgerDialog] = useState(false);
  const [deleteGroupLedgersDialog, setDeleteGroupLedgersDialog] =
    useState(false);
  const [groupLedger, setGroupLedger] = useState(emptyGroupLedger);
  const [selectedGroupLedgers, setSelectedGroupLedgers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const groupLedgers = useSelector((state) => state.groupLedgerReducer);
  const accountTypes = useSelector((state) => state.accountTypeReducer);

  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(getGroupLedgers());
    await dispatch(getAccountTypes());
  };

  useEffect(() => {
    dispatch(getGroupLedgers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccountTypes());
  }, [dispatch]);

  const openNew = () => {
    setGroupLedger(emptyGroupLedger);
    setSubmitted(false);
    setGroupLedgerDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setGroupLedgerDialog(false);
  };

  const hideDeleteGroupLedgerDialog = () => {
    setDeleteGroupLedgerDialog(false);
  };

  const hideDeleteGroupLedgersDialog = () => {
    setDeleteGroupLedgersDialog(false);
  };

  const items = [{ label: "Chart of Account" }, { label: "Group Ledger" }];

  const home = { icon: "pi pi-home", url: "/Home" };

  const saveGroupLedger = async () => {
    setSubmitted(true);
    if (groupLedger.groupLedgerName.trim()) {
      if (groupLedger.id) {
        await dispatch(updateGroupLedger(groupLedger.id, groupLedger))
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Group Ledger Updated!",
          life: 1500,
        });
      } else {
        await dispatch(
          createGroupLedger(
            groupLedger.accountTypeId,
            groupLedger.groupLedgerName
          )
        )
          .then((groupLedger) => {
            setGroupLedger({
              accountTypeId: groupLedger.accountTypeId,
              groupLedgerName: groupLedger.groupLedgerName,
            });

            console.log(groupLedger);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Group Ledger Created!",
          life: 1500,
        });
      }
      setGroupLedgerDialog(false);
      setGroupLedger(emptyGroupLedger);
    }

    await fetchData();
  };

  const editGroupLedger = (groupLedger) => {
    setGroupLedger({ ...groupLedger });
    setGroupLedgerDialog(true);
  };

  const confirmDeleteGroupLedger = (groupLedger) => {
    setGroupLedger(groupLedger);
    setDeleteGroupLedgerDialog(true);
  };

  const deleteGroupLedgerFn = async () => {
    let _groupLedgers = groupLedger.id;

    await dispatch(deleteGroupLedger(_groupLedgers))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setGroupLedger(_groupLedgers);
    setDeleteGroupLedgerDialog(false);
    setGroupLedger(emptyGroupLedger);

    await fetchData();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Group Ledger Deleted!",
      life: 2000,
    });
  };

  // const confirmDeleteSelected = () => {
  //   setDeleteGroupLedgersDialog(true);
  // };

  const deleteSelectedGroupLedgers = async () => {
    let _groupLedgers = groupLedger.id;

    await dispatch(deleteGroupLedger(_groupLedgers))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setDeleteGroupLedgersDialog(false);
    setSelectedGroupLedgers(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Group Ledger Deleted!",
      life: 3000,
    });
  };

  const onInputChange = (e, groupLedgerName) => {
    const val = (e.target && e.target.value) || "";
    let _groupLedger = { ...groupLedger };
    _groupLedger[`${groupLedgerName}`] = val;

    setGroupLedger(_groupLedger);
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
          disabled={!selectedGroupLedgers || !selectedGroupLedgers.length}
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
          onClick={() => editGroupLedger(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteGroupLedger(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">List of Group Ledgers</h5>
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
  const groupLedgerDialogFooter = (
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
        onClick={saveGroupLedger}
      >
        <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span>
        <span className="p-button-label p-c">Save</span>
      </button>
    </React.Fragment>
  );
  const deleteGroupLedgerDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteGroupLedgerDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteGroupLedgerFn}
      />
    </React.Fragment>
  );
  const deleteGroupLedgersDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteGroupLedgersDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedGroupLedgers}
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
          value={groupLedgers}
          selection={selectedGroupLedgers}
          onSelectionChange={(e) => setSelectedGroupLedgers(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Group Ledgers"
          globalFilter={globalFilter}
          header={header}
        >
          {/* <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column> */}
          <Column
            field="groupLedgerName"
            header="Group Ledger"
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
        visible={groupLedgerDialog}
        style={{ width: "450px" }}
        header="Group Ledger"
        modal
        className="p-fluid"
        footer={groupLedgerDialogFooter}
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
            required
            autoFocus
            optionValue="id"
            value={groupLedger.accountTypeId}
            options={accountTypes}
            onChange={(e) => onInputChange(e, "accountTypeId")}
            placeholder="Select account type"
            className={classNames({
              "p-invalid": submitted && !GroupLedger.accountTypeId,
            })}
          />
          {submitted && !groupLedger.accountTypeId && (
            <small className="p-error">Account Type is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="groupLedgerName">
            Group Ledger Name <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="groupLedgerName"
            value={groupLedger.groupLedgerName}
            onChange={(e) => onInputChange(e, "groupLedgerName")}
            required
            className={classNames({
              "p-invalid": submitted && !GroupLedger.groupLedgerName,
            })}
          />
          {submitted && !groupLedger.groupLedgerName && (
            <small className="p-error">Group Ledger Name is required.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteGroupLedgerDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteGroupLedgerDialogFooter}
        onHide={hideDeleteGroupLedgerDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {groupLedger && (
            <span>
              Are you sure you want to delete{" "}
              <b>{groupLedger.groupLedgerName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteGroupLedgersDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteGroupLedgersDialogFooter}
        onHide={hideDeleteGroupLedgersDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {groupLedger && (
            <span>
              Are you sure you want to delete the selected group ledgers?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default GroupLedger;
