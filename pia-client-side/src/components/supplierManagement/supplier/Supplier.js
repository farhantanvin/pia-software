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
import { Calendar } from "primereact/calendar";

import {
  createSupplier,
  updateSupplier,
  getSuppliers,
  deleteSupplier,
} from "../../../actions/supplierAction";

const supplierServiceType = [
  { id: "1", supplierServiceTypes: "Eletrical" },
  { id: "2", supplierServiceTypes: "Computer" },
  { id: "3", supplierServiceTypes: "Printer" },
  { id: "4", supplierServiceTypes: "Paper" },
  { id: "5", supplierServiceTypes: "Furniture" },
];

let today = new Date();

const Supplier = () => {
  let emptySupplier = {
    id: null,
    supplierName: "",
    supplierPhone: "",
    supplierEmail: "",
    supplierWebsite: "",
    supplierAddress: "",
    date: "",
    supplierServiceTypes: null,
  };
  const [date, setDate] = useState(today);
  const [supplierDialog, setSupplierDialog] = useState(false);
  const [deleteSupplierDialog, setDeleteSupplierDialog] = useState(false);
  const [deleteSuppliersDialog, setDeleteSuppliersDialog] = useState(false);
  const [supplier, setSupplier] = useState(emptySupplier);
  const [selectedSuppliers, setSelectedSuppliers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const suppliers = useSelector((state) => state.supplierReducer);

  const dispatch = useDispatch();

  const fetchData = async () => {
    debugger;
    await dispatch(getSuppliers());
  };

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  const openNew = () => {
    setSupplier(emptySupplier);
    setSubmitted(false);
    setSupplierDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setSupplierDialog(false);
  };

  const hideDeleteSupplierDialog = () => {
    setDeleteSupplierDialog(false);
  };

  const hideDeleteSuppliersDialog = () => {
    setDeleteSuppliersDialog(false);
  };

  const items = [{ label: "Supplier Management" }, { label: "Supplier" }];

  const home = { icon: "pi pi-home", url: "/Home" };

  const saveSupplier = async () => {
    setSubmitted(true);

    debugger;
    if (supplier.supplierName.trim()) {
      if (supplier.id) {
        await dispatch(updateSupplier(supplier.id, supplier))
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Supplier Updated!",
          life: 1500,
        });
      } else {
        await dispatch(
          createSupplier(
            supplier.supplierName,
            supplier.supplierPhone,
            supplier.supplierEmail,
            supplier.supplierWebsite,
            supplier.supplierAddress,
            supplier.date,
            supplier.supplierServiceTypes
          )
        )
          .then((supplier) => {
            setSupplier({
              supplierName: supplier.supplierName,
              supplierPhone: supplier.supplierPhone,
              supplierEmail: supplier.supplierEmail,
              supplierWebsite: supplier.supplierWebsite,
              supplierAddress: supplier.supplierAddress,
              date: supplier.date,
              supplierServiceTypes: supplier.supplierServiceTypes,
            });

            console.log(supplier);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Supplier Created!",
          life: 1500,
        });
      }

      debugger;
      setSupplierDialog(false);
      setSupplier(emptySupplier);
    }

    await fetchData();
  };

  const editSupplier = (supplier) => {
    setSupplier({ ...supplier });
    setSupplierDialog(true);
  };

  const confirmDeleteSupplier = (supplier) => {
    setSupplier(supplier);
    setDeleteSupplierDialog(true);
  };

  const deleteSupplierFn = async () => {
    debugger;

    let _suppliers = supplier.id;

    await dispatch(deleteSupplier(_suppliers))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setSupplier(_suppliers);
    setDeleteSupplierDialog(false);
    setSupplier(emptySupplier);

    await fetchData();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Supplier Deleted!",
      life: 2000,
    });
  };

  const confirmDeleteSelected = () => {
    setDeleteSuppliersDialog(true);
  };

  const deleteSelectedSuppliers = async () => {
    debugger;

    let _suppliers = supplier.id;

    await dispatch(deleteSupplier(_suppliers))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setDeleteSuppliersDialog(false);
    setSelectedSuppliers(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Supplier Deleted!",
      life: 3000,
    });
  };

  const onInputChange = (e, supplierName) => {
    const val = (e.target && e.target.value) || "";
    let _supplier = { ...supplier };
    _supplier[`${supplierName}`] = val;
    setSupplier(_supplier);
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
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedSuppliers || !selectedSuppliers.length}
        />
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editSupplier(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteSupplier(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">List of Suppliers</h5>
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
  const supplierDialogFooter = (
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
        onClick={saveSupplier}
      >
        <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span>
        <span className="p-button-label p-c">Save</span>
      </button>
    </React.Fragment>
  );
  const deleteSupplierDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteSupplierDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSupplierFn}
      />
    </React.Fragment>
  );
  const deleteSuppliersDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteSuppliersDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedSuppliers}
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
          value={suppliers}
          selection={selectedSuppliers}
          onSelectionChange={(e) => setSelectedSuppliers(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Suppliers"
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column field="supplierName" header="Name" sortable></Column>
          <Column field="supplierPhone" header="Phone"></Column>
          <Column field="supplierEmail" header="Email"></Column>
          <Column field="supplierWebsite" header="Website"></Column>
          <Column field="supplierAddress" header="Address"></Column>
          <Column field="" header=""></Column>
          <Column body={actionBodyTemplate} header="Action"></Column>
        </DataTable>
      </div>

      <Dialog
        visible={supplierDialog}
        style={{ width: "450px" }}
        header="Supplier"
        modal
        className="p-fluid"
        footer={supplierDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="supplierName">
            Supplier Name <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="supplierName"
            autoFocus
            value={supplier.supplierName}
            onChange={(e) => onInputChange(e, "supplierName")}
            required
            className={classNames({
              "p-invalid": submitted && !supplier.supplierName,
            })}
          />
          {submitted && !supplier.supplierName && (
            <small className="p-error">Supplier Name is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="supplierPhone">
            Supplier Phone <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="supplierPhone"
            value={supplier.supplierPhone}
            onChange={(e) => onInputChange(e, "supplierPhone")}
            required
            className={classNames({
              "p-invalid": submitted && !supplier.supplierPhone,
            })}
          />
          {submitted && !supplier.supplierPhone && (
            <small className="p-error">
              Supplier Phone Number is required.
            </small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="supplierEmail">Supplier Email</label>
          <InputText
            id="supplierEmail"
            value={supplier.supplierEmail}
            onChange={(e) => onInputChange(e, "supplierEmail")}
          />
        </div>

        <div className="p-field">
          <label htmlFor="supplierWebsite">Supplier Website</label>
          <InputText
            id="supplierWebsite"
            value={supplier.supplierWebsite}
            onChange={(e) => onInputChange(e, "supplierWebsite")}
          />
        </div>

        <div className="p-field">
          <label htmlFor="supplierAddress">Supplier Address</label>
          <InputText
            id="supplierAddress"
            value={supplier.supplierAddress}
            onChange={(e) => onInputChange(e, "supplierAddress")}
          />
        </div>

        <div className="p-field">
          <label htmlFor="date">Date</label>
          <Calendar
            id="date"
            value={supplier.date ? supplier.date : date}
            onChange={(e) => onInputChange(e, "date")}
            showIcon
          />
        </div>

        <div className="p-field">
          <label htmlFor="supplierServiceTypes">Supplier Service type</label>
          <Dropdown
            id="supplierServiceTypes"
            inputId="state"
            optionLabel="supplierServiceTypes"
            optionValue="id"
            value={supplier.supplierServiceTypes}
            options={supplierServiceType}
            onChange={(e) => onInputChange(e, "supplierServiceTypes")}
            placeholder="Select supplier service type"
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteSupplierDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteSupplierDialogFooter}
        onHide={hideDeleteSuppliersDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {supplier && (
            <span>
              Are you sure you want to delete <b>{supplier.supplierName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteSuppliersDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteSuppliersDialogFooter}
        onHide={hideDeleteSuppliersDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {supplier && (
            <span>
              Are you sure you want to delete the selected group ledgers?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Supplier;
