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
  createBranch,
  updateBranch,
  getBranchs,
  deleteBranch,
} from "../../../actions/branchAction";

const Branch = () => {
  let emptyBranch = {
    id: null,
    branchCode: "",
    branchName: "",
  };

  const [error, setError] = useState(false);
  const [branchDialog, setBranchDialog] = useState(false);
  const [deleteBranchDialog, setDeleteBranchDialog] = useState(false);
  const [deleteBranchsDialog, setDeleteBranchsDialog] = useState(false);
  const [branch, setBranch] = useState(emptyBranch);
  const [selectedBranchs, setSelectedBranchs] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const branchs = useSelector((state) => state.branchReducer);
  const dispatch = useDispatch();

  const fetchData = async () => {
    debugger;
    await dispatch(getBranchs());
  };

  useEffect(() => {
    dispatch(getBranchs());
  }, [dispatch]);

  const openNew = () => {
    setBranch(emptyBranch);
    setSubmitted(false);
    setBranchDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setBranchDialog(false);
  };

  const hideDeleteBranchDialog = () => {
    setDeleteBranchDialog(false);
  };

  const hideDeleteBranchsDialog = () => {
    setDeleteBranchsDialog(false);
  };

  const items = [{ label: "Settings" }, { label: "Branch" }];

  const home = { icon: "pi pi-home", url: "/Home" };

  const saveBranch = async () => {
    let err = 0;
    branchs.find((inp) => {
      if (
        inp.branchCode.toString().toLowerCase() ===
        branch.branchCode.toString().toLowerCase()
      ) {
        setError(true);
        return (err = 1);
      } else {
        return setError(false);
      }
    });

    setSubmitted(true);
    debugger;
    if (!err && branch.branchName.trim()) {
      if (branch.id) {
        await dispatch(updateBranch(branch.id, branch))
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Branch Updated!",
          life: 1500,
        });
      } else {
        await dispatch(createBranch(branch.branchCode, branch.branchName))
          .then((branch) => {
            setBranch({
              branchCode: branch.branchCode,
              branchName: branch.branchName,
            });

            console.log(branch);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Branch Created!",
          life: 1500,
        });
      }

      setBranchDialog(false);
      // setBranch(emptyBranch);
    }

    await fetchData();
  };

  const editBranch = (branch) => {
    setBranch({ ...branch });
    setBranchDialog(true);
  };

  const confirmDeleteBranch = (branch) => {
    setBranch(branch);
    setDeleteBranchDialog(true);
  };

  const deleteBranchFn = async () => {
    debugger;

    let _branchs = branch.id;

    await dispatch(deleteBranch(_branchs))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    //setBranch(_branchs);
    setDeleteBranchDialog(false);
    setBranch(emptyBranch);

    await fetchData();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Branch Deleted!",
      life: 2000,
    });
  };

  // const confirmDeleteSelected = () => {
  //   setDeleteBranchsDialog(true);
  // };

  const deleteSelectedBranchs = async () => {
    debugger;

    let _branchs = branch.id;

    await dispatch(deleteBranch(_branchs))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setDeleteBranchsDialog(false);
    setSelectedBranchs(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Branchs Deleted!",
      life: 3000,
    });
  };

  const onInputChange = (e, branchCode, branchName) => {
    const val = (e.target && e.target.value) || "";
    let _branch = { ...branch };
    _branch[`${branchCode}`] = val;
    _branch[`${branchName}`] = val;

    setBranch(_branch);

    if (error) {
      setError(false);
    }
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
          disabled={!selectedBranchs || !selectedBranchs.length}
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
          onClick={() => editBranch(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteBranch(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">List of Branchs</h5>
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
  const branchDialogFooter = (
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
        onClick={saveBranch}
      >
        <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span>
        <span className="p-button-label p-c">Save</span>
      </button>
    </React.Fragment>
  );
  const deleteBranchDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteBranchDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteBranchFn}
      />
    </React.Fragment>
  );
  const deleteBranchsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteBranchsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedBranchs}
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
          value={branchs}
          selection={selectedBranchs}
          onSelectionChange={(e) => setSelectedBranchs(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} branchs"
          globalFilter={globalFilter}
          header={header}
        >
          {/* <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column> */}
          <Column field="branchCode" header="Branch Code" sortable></Column>
          <Column field="branchName" header="Name" sortable></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column body={actionBodyTemplate} header="Action"></Column>
        </DataTable>
      </div>

      <Dialog
        visible={branchDialog}
        style={{ width: "450px" }}
        header="Branch"
        modal
        className="p-fluid"
        footer={branchDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="branchCode">
            Branch Code <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="branchCode"
            value={branch.branchCode}
            onChange={(e) => onInputChange(e, "branchCode")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !branch.branchCode,
            })}
          />
          {submitted && !branch.branchCode && (
            <small className="p-error">Branch Code is required.</small>
          )}
          {/* {submitted && error && (
            <small className="p-error">Branch already exists!</small>
          )} */}

          {submitted && branch.branchCode && error ? (
            <small className="p-error">Brand already exists!</small>
          ) : (
            ""
          )}
        </div>

        <div className="p-field">
          <label htmlFor="branchName">
            Branch Name <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="branchName"
            value={branch.branchName}
            onChange={(e) => onInputChange(e, "branchName")}
            required
            className={classNames({
              "p-invalid": submitted && !branch.branchName,
            })}
          />
          {submitted && !branch.branchName && (
            <small className="p-error">Branch Name is required.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteBranchDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteBranchDialogFooter}
        onHide={hideDeleteBranchDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {branch && (
            <span>
              Are you sure you want to delete <b>{branch.branchName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteBranchsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteBranchsDialogFooter}
        onHide={hideDeleteBranchsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {branch && (
            <span>
              Are you sure you want to delete the selected departments?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Branch;
