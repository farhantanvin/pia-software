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
  createMeasurementUnit,
  updateMeasurementUnit,
  getMeasurementUnits,
  deleteMeasurementUnit,
} from "../../../actions/measurementUnitAction";

const MeasurementUnit = () => {
  let emptyMeasurementUnit = {
    id: null,
    measurementUnitName: "",
  };

  const [error, setError] = useState(false);
  const [measurementUnitDialog, setMeasurementUnitDialog] = useState(false);
  const [deleteMeasurementUnitDialog, setDeleteMeasurementUnitDialog] =
    useState(false);
  const [deleteMeasurementUnitsDialog, setDeleteMeasurementUnitsDialog] =
    useState(false);
  const [measurementUnit, setMeasurementUnit] = useState(emptyMeasurementUnit);
  const [selectedMeasurementUnits, setSelectedMeasurementUnits] =
    useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const measurementUnits = useSelector((state) => state.measurementUnitReducer);
  const dispatch = useDispatch();

  const fetchData = async () => {
    debugger;
    await dispatch(getMeasurementUnits());
  };

  useEffect(() => {
    dispatch(getMeasurementUnits());
  }, [dispatch]);

  const openNew = () => {
    setMeasurementUnit(emptyMeasurementUnit);
    setSubmitted(false);
    setMeasurementUnitDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setMeasurementUnitDialog(false);
  };

  const hideDeleteMeasurementUnitDialog = () => {
    setDeleteMeasurementUnitDialog(false);
  };

  const hideDeleteMeasurementUnitsDialog = () => {
    setDeleteMeasurementUnitsDialog(false);
  };

  const items = [{ label: "Settings" }, { label: "Measurement Unit" }];

  const home = { icon: "pi pi-home", url: "/Home" };

  const saveMeasurementUnit = async () => {
    debugger;
    let err = 0;
    measurementUnits.find((inp) => {
      if (
        inp.measurementUnitName.toString().toLowerCase() ===
        measurementUnit.measurementUnitName.toString().toLowerCase()
      ) {
        setError(true);
        return (err = 1);
      } else {
        return setError(false);
      }
    });

    setSubmitted(true);

    debugger;
    if (!err && measurementUnit.measurementUnitName.trim()) {
      if (measurementUnit.id) {
        await dispatch(
          updateMeasurementUnit(measurementUnit.id, measurementUnit)
        )
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Measurement Unit Updated!",
          life: 1500,
        });
      } else {
        await dispatch(
          createMeasurementUnit(measurementUnit.measurementUnitName)
        )
          .then((measurementUnit) => {
            setMeasurementUnit({
              measurementUnitName: measurementUnit.measurementUnitName,
            });
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Measurement Unit Created!",
          life: 1500,
        });
      }

      setMeasurementUnitDialog(false);
      // setMeasurementUnit(emptyMeasurementUnit);
    }

    await fetchData();
  };

  const editMeasurementUnit = (measurementUnit) => {
    setMeasurementUnit({ ...measurementUnit });
    setMeasurementUnitDialog(true);
  };

  const confirmDeleteMeasurementUnit = (measurementUnit) => {
    setMeasurementUnit(measurementUnit);
    setDeleteMeasurementUnitDialog(true);
  };

  const deleteMeasurementUnitFn = async () => {
    debugger;

    let _measurementUnits = measurementUnit.id;

    await dispatch(deleteMeasurementUnit(_measurementUnits))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setMeasurementUnit(_measurementUnits);
    setDeleteMeasurementUnitDialog(false);
    setMeasurementUnit(emptyMeasurementUnit);

    await fetchData();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Measurement Unit Deleted!",
      life: 2000,
    });
  };

  // const confirmDeleteSelected = () => {
  //   setDeleteMeasurementUnitsDialog(true);
  // };

  const deleteSelectedMeasurementUnits = async () => {
    debugger;

    let _measurementUnits = measurementUnit.id;

    await dispatch(deleteMeasurementUnit(_measurementUnits))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setDeleteMeasurementUnitsDialog(false);
    setSelectedMeasurementUnits(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Measurement Unit Deleted!",
      life: 3000,
    });
  };

  const onInputChange = (e, measurementUnitName) => {
    const val = (e.target && e.target.value) || "";
    let _measurementUnit = { ...measurementUnit };
    _measurementUnit[`${measurementUnitName}`] = val;

    setMeasurementUnit(_measurementUnit);

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
          disabled={
            !selectedMeasurementUnits || !selectedMeasurementUnits.length
          }
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
          onClick={() => editMeasurementUnit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteMeasurementUnit(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">List of Measurement Units</h5>
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
  const measurementUnitDialogFooter = (
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
        onClick={saveMeasurementUnit}
      >
        <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span>
        <span className="p-button-label p-c">Save</span>
      </button>
    </React.Fragment>
  );
  const deleteMeasurementUnitDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteMeasurementUnitDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteMeasurementUnitFn}
      />
    </React.Fragment>
  );
  const deleteMeasurementUnitsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteMeasurementUnitsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedMeasurementUnits}
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
          value={measurementUnits}
          selection={selectedMeasurementUnits}
          onSelectionChange={(e) => setSelectedMeasurementUnits(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Measurement Units"
          globalFilter={globalFilter}
          header={header}
        >
          {/* <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column> */}
          <Column
            field="measurementUnitName"
            header="Measurement Unit"
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
        visible={measurementUnitDialog}
        style={{ width: "450px" }}
        header="Measurement Unit"
        modal
        className="p-fluid"
        footer={measurementUnitDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="measurementUnitName">
            Measurement Unit Name <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="measurementUnitName"
            value={measurementUnit.measurementUnitName}
            onChange={(e) => onInputChange(e, "measurementUnitName")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !measurementUnit.measurementUnitName,
            })}
          />
          {submitted && !measurementUnit.measurementUnitName && (
            <small className="p-error">
              Measurement Unit Name is required.
            </small>
          )}
          {/* {submitted && error && (
            <small className="p-error">Measurement Unit already exists!</small>
          )} */}

          {submitted && measurementUnit.measurementUnitName && error ? (
            <small className="p-error">Measurement Unit already exists!</small>
          ) : (
            ""
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteMeasurementUnitDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteMeasurementUnitDialogFooter}
        onHide={hideDeleteMeasurementUnitDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {measurementUnit && (
            <span>
              Are you sure you want to delete{" "}
              <b>{measurementUnit.measurementUnitName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteMeasurementUnitsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteMeasurementUnitsDialogFooter}
        onHide={hideDeleteMeasurementUnitsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {measurementUnit && (
            <span>
              Are you sure you want to delete the selected measurement unit?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default MeasurementUnit;
