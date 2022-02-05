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

import {
  createAccountType,
  updateAccountType,
  getAccountTypes,
  deleteAccountType,
} from "../../../actions/accountTypeAction";

const AccountType = () => {
  let emptyAccountType = {
    id: null,
    accountTypeName: "",
  };

  const [accountTypeDialog, setAccountTypeDialog] = useState(false);
  const [deleteAccountTypeDialog, setDeleteAccountTypeDialog] = useState(false);
  const [deleteAccountTypesDialog, setDeleteAccountTypesDialog] =
    useState(false);
  const [accountType, setAccountType] = useState(emptyAccountType);
  const [selectedAccountTypes, setSelectedAccountTypes] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const accountTypes = useSelector((state) => state.accountTypeReducer);
  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(getAccountTypes());
  };

  useEffect(() => {
    dispatch(getAccountTypes());
  }, [dispatch]);

  const openNew = () => {
    setAccountType(emptyAccountType);
    setSubmitted(false);
    setAccountTypeDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setAccountTypeDialog(false);
  };

  const hideDeleteAccountTypeDialog = () => {
    setDeleteAccountTypeDialog(false);
  };

  const hideDeleteAccountTypesDialog = () => {
    setDeleteAccountTypesDialog(false);
  };

  const items = [{ label: "Chart of Account" }, { label: "Account Type" }];

  const home = { icon: "pi pi-home", url: "/Home" };

  const saveAccountType = async () => {
    setSubmitted(true);
    if (accountType.accountTypeName.trim()) {
      if (accountType.id) {
        await dispatch(updateAccountType(accountType.id, accountType))
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Account Type Updated!",
          life: 1500,
        });
      } else {
        await dispatch(createAccountType(accountType.accountTypeName))
          .then((accountType) => {
            setAccountType({
              accountTypeName: accountType.accountTypeName,
            });

            console.log(accountType);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Account Type Created!",
          life: 1500,
        });
      }
      setAccountTypeDialog(false);
      setAccountType(emptyAccountType);
    }

    await fetchData();
  };

  const editAccountType = (accountType) => {
    setAccountType({ ...accountType });
    setAccountTypeDialog(true);
  };

  const confirmDeleteAccountType = (accountType) => {
    setAccountType(accountType);
    setDeleteAccountTypeDialog(true);
  };

  const deleteAccount = async () => {
    let _accountTypes = accountType.id;
    await dispatch(deleteAccountType(_accountTypes))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setAccountType(_accountTypes);
    setDeleteAccountTypeDialog(false);
    setAccountType(emptyAccountType);

    await fetchData();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Account Type Deleted!",
      life: 2000,
    });
  };

  // const confirmDeleteSelected = () => {
  //   setDeleteAccountTypesDialog(true);
  // };

  const deleteSelectedAccountTypes = async () => {
    let _accountTypes = accountType.id;
    await dispatch(deleteAccountType(_accountTypes))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setDeleteAccountTypesDialog(false);
    setSelectedAccountTypes(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Account Type Deleted!",
      life: 3000,
    });
  };

  const onInputChange = (e, accountTypeName) => {
    const val = (e.target && e.target.value) || "";
    let _accountType = { ...accountType };
    _accountType[`${accountTypeName}`] = val;

    setAccountType(_accountType);
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
          disabled={!selectedAccountTypes || !selectedAccountTypes.length}
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
          onClick={() => editAccountType(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteAccountType(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">List of Account Types</h5>
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
  const accountTypeDialogFooter = (
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
        onClick={saveAccountType}
      >
        <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span>
        <span className="p-button-label p-c">Save</span>
      </button>
    </React.Fragment>
  );
  const deleteAccountTypeDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteAccountTypeDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteAccount}
      />
    </React.Fragment>
  );
  const deleteAccountTypesDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteAccountTypesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedAccountTypes}
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
          value={accountTypes}
          selection={selectedAccountTypes}
          onSelectionChange={(e) => setSelectedAccountTypes(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Account Types"
          globalFilter={globalFilter}
          header={header}
        >
          {/* <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column> */}
          <Column
            field="accountTypeName"
            header="Account Type"
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
        visible={accountTypeDialog}
        style={{ width: "450px" }}
        header="Account Type"
        modal
        className="p-fluid"
        footer={accountTypeDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="accountTypeName">
            Account Type Name <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="accountTypeName"
            value={accountType.accountTypeName}
            onChange={(e) => onInputChange(e, "accountTypeName")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !accountType.accountTypeName,
            })}
          />
          {submitted && !accountType.accountTypeTypeName && (
            <small className="p-error">Account Type Name is required.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteAccountTypeDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteAccountTypeDialogFooter}
        onHide={hideDeleteAccountTypeDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {accountType && (
            <span>
              Are you sure you want to delete{" "}
              <b>{accountType.accountTypeName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteAccountTypesDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteAccountTypesDialogFooter}
        onHide={hideDeleteAccountTypesDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {accountType && (
            <span>
              Are you sure you want to delete the selected account types?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default AccountType;
