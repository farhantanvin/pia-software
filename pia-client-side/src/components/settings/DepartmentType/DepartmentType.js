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
  createDepartmentType,
  updateDepartmentType,
  getDepartmentTypes,
  deleteDepartmentType,
} from "../../../actions/departmentTypeAction";

const DepartmentType = () => {
  let emptyDepartment = {
    id: null,
    departmentTypeName: "",
  };

  const [error, setError] = useState(false);
  //const [departments, setDepartments] = useState();
  const [departmentDialog, setDepartmentDialog] = useState(false);
  const [deleteDepartmentDialog, setDeleteDepartmentDialog] = useState(false);
  const [deleteDepartmentsDialog, setDeleteDepartmentsDialog] = useState(false);
  const [department, setDepartment] = useState(emptyDepartment);
  const [selectedDepartments, setSelectedDepartments] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const departmentTypes = useSelector((state) => state.departmentTypeReducer);
  const dispatch = useDispatch();

  const fetchData = async () => {
    debugger;
    await dispatch(getDepartmentTypes());
  };

  useEffect(() => {
    dispatch(getDepartmentTypes());
  }, [dispatch]);

  const openNew = () => {
    setDepartment(emptyDepartment);
    setSubmitted(false);
    setDepartmentDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setDepartmentDialog(false);
  };

  const hideDeleteDepartmentDialog = () => {
    setDeleteDepartmentDialog(false);
  };

  const hideDeleteDepartmentsDialog = () => {
    setDeleteDepartmentsDialog(false);
  };

  const items = [{ label: "Settings" }, { label: "Department" }];

  const home = { icon: "pi pi-home", url: "/Home" };

  const saveDepartmentType = async () => {
    let err = 0;
    departmentTypes.find((inp) => {
      if (
        inp.departmentTypeName.toString().toLowerCase() ===
        department.departmentTypeName.toString().toLowerCase()
      ) {
        setError(true);
        return (err = 1);
      } else {
        return setError(false);
      }
    });

    setSubmitted(true);

    if (!err && department.departmentTypeName.trim()) {
      if (department.id) {
        await dispatch(updateDepartmentType(department.id, department))
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Department Updated!",
          life: 1500,
        });
      } else {
        await dispatch(createDepartmentType(department.departmentTypeName))
          .then((department) => {
            setDepartment({
              departmentTypeName: department.departmentTypeName,
            });
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Department Created!",
          life: 1500,
        });
      }

      //setDepartments(null);
      setDepartmentDialog(false);
      //setDepartment(emptyDepartment);
    }
    await fetchData();
  };

  const editDepartment = (department) => {
    setDepartment({ ...department });
    setDepartmentDialog(true);
  };

  const confirmDeleteDepartment = (department) => {
    setDepartment(department);
    setDeleteDepartmentDialog(true);
  };

  const deleteDepartment = async () => {
    let _departments = department.id;

    await dispatch(deleteDepartmentType(_departments))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setDepartment(_departments);
    setDeleteDepartmentDialog(false);
    setDepartment(emptyDepartment);

    await fetchData();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Department Deleted!",
      life: 2000,
    });
  };

  // const confirmDeleteSelected = () => {
  //   setDeleteDepartmentsDialog(true);
  // };

  const deleteSelectedDepartments = async () => {
    debugger;

    let _departments = department.departmentTypeId;

    await dispatch(deleteDepartmentType(_departments))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    //setDepartments(_departments);
    setDeleteDepartmentsDialog(false);
    setSelectedDepartments(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Departments Deleted!",
      life: 3000,
    });
  };

  const onInputChange = (e, departmentTypeName) => {
    const val = (e.target && e.target.value) || "";
    let _department = { ...department };
    _department[`${departmentTypeName}`] = val;

    setDepartment(_department);

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
          disabled={!selectedDepartments || !selectedDepartments.length}
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
          onClick={() => editDepartment(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteDepartment(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">List of Department</h5>
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
  const departmentDialogFooter = (
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
        onClick={saveDepartmentType}
      >
        <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span>
        <span className="p-button-label p-c">Save</span>
      </button>
    </React.Fragment>
  );
  const deleteDepartmentDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteDepartmentDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteDepartment}
      />
    </React.Fragment>
  );
  const deleteDepartmentsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteDepartmentsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedDepartments}
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
          value={departmentTypes}
          selection={selectedDepartments}
          onSelectionChange={(e) => setSelectedDepartments(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} departments"
          globalFilter={globalFilter}
          header={header}
        >
          {/* <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column> */}
          <Column field="departmentTypeName" header="Name" sortable></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column body={actionBodyTemplate} header="Action"></Column>
        </DataTable>
      </div>

      <Dialog
        visible={departmentDialog}
        style={{ width: "450px" }}
        header="Department"
        modal
        className="p-fluid"
        footer={departmentDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="departmentTypeName">
            Department Name <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="departmentTypeName"
            value={department.departmentTypeName}
            onChange={(e) => onInputChange(e, "departmentTypeName")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !department.departmentTypeName,
            })}
          />
          {submitted && !department.departmentTypeName && (
            <small className="p-error">Department Name is required.</small>
          )}

          {submitted && department.departmentTypeName && error ? (
            <small className="p-error">Department already exists!</small>
          ) : (
            ""
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteDepartmentDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteDepartmentDialogFooter}
        onHide={hideDeleteDepartmentDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {department && (
            <span>
              Are you sure you want to delete{" "}
              <b>{department.departmentTypeName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteDepartmentsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteDepartmentsDialogFooter}
        onHide={hideDeleteDepartmentsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {department && (
            <span>
              Are you sure you want to delete the selected departments?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default DepartmentType;
