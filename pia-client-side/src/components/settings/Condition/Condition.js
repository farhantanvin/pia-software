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
import { InputTextarea } from "primereact/inputtextarea";

import {
  createCondition,
  updateCondition,
  getConditions,
  deleteCondition,
} from "../../../actions/conditionAction";

const Condition = () => {
  let emptyCondition = {
    id: null,
    conditionDetail: "",
  };

  const [conditionDialog, setConditionDialog] = useState(false);
  const [deleteConditionDialog, setDeleteConditionDialog] = useState(false);
  const [deleteConditionsDialog, setDeleteConditionsDialog] = useState(false);
  const [condition, setCondition] = useState(emptyCondition);
  const [selectedConditions, setSelectedConditions] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const conditions = useSelector((state) => state.conditionReducer);
  const dispatch = useDispatch();

  const fetchData = async () => {
    debugger;
    await dispatch(getConditions());
  };

  useEffect(() => {
    dispatch(getConditions());
  }, [dispatch]);

  const openNew = () => {
    setCondition(emptyCondition);
    setSubmitted(false);
    setConditionDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setConditionDialog(false);
  };

  const hideDeleteConditionDialog = () => {
    setDeleteConditionDialog(false);
  };

  const hideDeleteConditionsDialog = () => {
    setDeleteConditionsDialog(false);
  };

  const items = [{ label: "Settings" }, { label: "Terms and Condition" }];

  const home = { icon: "pi pi-home", url: "/Home" };

  const saveCondition = async () => {
    setSubmitted(true);

    debugger;
    if (condition.conditionDetail.trim()) {
      if (condition.id) {
        await dispatch(updateCondition(condition.id, condition))
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Condition Updated!",
          life: 1500,
        });
      } else {
        await dispatch(createCondition(condition.conditionDetail))
          .then((condition) => {
            setCondition({
              conditionDetail: condition.conditionDetail,
            });

            console.log(condition);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Condition Created!",
          life: 1500,
        });
      }

      setConditionDialog(false);
      //  setCondition(emptyCondition);
    }

    await fetchData();
  };

  const editCondition = (condition) => {
    setCondition({ ...condition });
    setConditionDialog(true);
  };

  const confirmDeleteCondition = (condition) => {
    setCondition(condition);
    setDeleteConditionDialog(true);
  };

  const deleteConditionFn = async () => {
    debugger;

    let _conditions = condition.id;

    await dispatch(deleteCondition(_conditions))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setCondition(_conditions);
    setDeleteConditionDialog(false);
    setCondition(emptyCondition);

    await fetchData();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Condition Deleted!",
      life: 2000,
    });
  };

  // const confirmDeleteSelected = () => {
  //   setDeleteConditionsDialog(true);
  // };

  const deleteSelectedConditions = async () => {
    debugger;

    let _conditions = condition.id;

    await dispatch(deleteCondition(_conditions))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setDeleteConditionsDialog(false);
    setSelectedConditions(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Condition Type Deleted!",
      life: 3000,
    });
  };

  const onInputChange = (e, conditionDetail) => {
    const val = (e.target && e.target.value) || "";
    let _condition = { ...condition };
    _condition[`${conditionDetail}`] = val;

    setCondition(_condition);
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
          disabled={!selectedConditions || !selectedConditions.length}
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
          onClick={() => editCondition(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteCondition(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">List of Terms and Condition</h5>
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
  const conditionDialogFooter = (
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
        onClick={saveCondition}
      >
        <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span>
        <span className="p-button-label p-c">Save</span>
      </button>
    </React.Fragment>
  );
  const deleteConditionDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteConditionDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteConditionFn}
      />
    </React.Fragment>
  );
  const deleteConditionsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteConditionsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedConditions}
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
          value={conditions}
          selection={selectedConditions}
          onSelectionChange={(e) => setSelectedConditions(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Terms and Conditions"
          globalFilter={globalFilter}
          header={header}
        >
          {/* <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column> */}
          <Column field="conditionDetail" header="Condition" sortable></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column body={actionBodyTemplate} header="Action"></Column>
        </DataTable>
      </div>

      <Dialog
        visible={conditionDialog}
        style={{ width: "450px" }}
        header="Condition"
        modal
        className="p-fluid"
        footer={conditionDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="conditionDetail">
            Condition <span style={{ color: "red" }}>*</span>
          </label>
          <InputTextarea
            rows={5}
            cols={30}
            id="conditionDetail"
            value={condition.conditionDetail}
            onChange={(e) => onInputChange(e, "conditionDetail")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !condition.conditionDetail,
            })}
          />
          {submitted && !condition.conditionDetail && (
            <small className="p-error">Condition is required.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteConditionDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteConditionDialogFooter}
        onHide={hideDeleteConditionDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {condition && (
            <span>
              Are you sure you want to delete <b>{condition.conditionDetail}</b>
              ?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteConditionsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteConditionsDialogFooter}
        onHide={hideDeleteConditionsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {condition && (
            <span>
              Are you sure you want to delete the selected conditions?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Condition;
