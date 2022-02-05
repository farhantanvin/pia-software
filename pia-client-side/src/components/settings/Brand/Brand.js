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
  createBrand,
  updateBrand,
  getBrands,
  deleteBrand,
} from "../../../actions/brandAction";

import { getAccountLedgers } from "../../../actions/accountLedgerAction";

const Brand = () => {
  let emptyBrand = {
    id: null,
    accountLedgerId: null,
    brandName: "",
  };

  const [error, setError] = useState(false);
  const [brandDialog, setBrandDialog] = useState(false);
  const [deleteBrandDialog, setDeleteBrandDialog] = useState(false);
  const [deleteBrandsDialog, setDeleteBrandsDialog] = useState(false);
  const [brand, setBrand] = useState(emptyBrand);
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const brands = useSelector((state) => state.brandReducer);
  const accountLedgers = useSelector((state) => state.accountLedgerReducer);

  const dispatch = useDispatch();

  const fetchData = async () => {
    debugger;
    await dispatch(getBrands());
    await dispatch(getAccountLedgers());
  };

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccountLedgers());
  }, [dispatch]);

  const openNew = () => {
    setBrand(emptyBrand);
    setSubmitted(false);
    setBrandDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setBrandDialog(false);
  };

  const hideDeleteBrandDialog = () => {
    setDeleteBrandDialog(false);
  };

  const hideDeleteBrandsDialog = () => {
    setDeleteBrandsDialog(false);
  };

  const items = [{ label: "Settings" }, { label: "Brand" }];

  const home = { icon: "pi pi-home", url: "/Home" };

  const saveBrand = async () => {
    let err = 0;
    brands.find((inp) => {
      if (
        inp.brandName.toString().toLowerCase() ===
        brand.brandName.toString().toLowerCase()
      ) {
        setError(true);
        return (err = 1);
      } else {
        return setError(false);
      }
    });

    setSubmitted(true);
    debugger;
    if (!err && brand.brandName.trim()) {
      if (brand.id) {
        await dispatch(updateBrand(brand.id, brand))
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Brand Updated!",
          life: 1500,
        });
      } else {
        await dispatch(createBrand(brand.accountLedgerId, brand.brandName))
          .then((brand) => {
            setBrand({
              accountLedgerId: brand.accountLedgerId,
              brandName: brand.brandName,
            });

            console.log(brand);
          })
          .catch((e) => {
            console.log(e);
          });

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Brand Created!",
          life: 1500,
        });
      }

      setBrandDialog(false);
      //setBrand(emptyBrand);
    }

    await fetchData();
  };

  const editBrand = (brand) => {
    setBrand({ ...brand });
    setBrandDialog(true);
  };

  const confirmDeleteBrand = (brand) => {
    setBrand(brand);
    setDeleteBrandDialog(true);
  };

  const deleteBrandFn = async () => {
    debugger;

    let _brands = brand.id;

    await dispatch(deleteBrand(_brands))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setBrand(_brands);
    setDeleteBrandDialog(false);
    setBrand(emptyBrand);

    await fetchData();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Brand Deleted!",
      life: 2000,
    });
  };

  // const confirmDeleteSelected = () => {
  //   setDeleteBrandsDialog(true);
  // };

  const deleteSelectedBrands = async () => {
    debugger;

    let _brands = brand.id;

    await dispatch(deleteBrand(_brands))
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    setDeleteBrandsDialog(false);
    setSelectedBrands(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Brands Deleted!",
      life: 3000,
    });
  };

  const onInputChange = (e, accountLedgerId, brandName) => {
    const val = (e.target && e.target.value) || "";
    let _brand = { ...brand };
    _brand[`${accountLedgerId}`] = val;
    _brand[`${brandName}`] = val;

    setBrand(_brand);

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
          disabled={!selectedBrands || !selectedBrands.length}
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
          onClick={() => editBrand(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteBrand(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">List of Brands</h5>
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
  const brandDialogFooter = (
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
        onClick={saveBrand}
      >
        <span className="p-button-icon p-c pi pi-check p-button-icon-left"></span>
        <span className="p-button-label p-c">Save</span>
      </button>
    </React.Fragment>
  );
  const deleteBrandDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteBrandDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteBrandFn}
      />
    </React.Fragment>
  );
  const deleteBrandsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteBrandsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedBrands}
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
          value={brands}
          selection={selectedBrands}
          onSelectionChange={(e) => setSelectedBrands(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} brands"
          globalFilter={globalFilter}
          header={header}
        >
          {/* <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column> */}
          <Column field="brandName" header="Brand Name" sortable></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column field="" header=""></Column>
          <Column body={actionBodyTemplate} header="Action"></Column>
        </DataTable>
      </div>

      <Dialog
        visible={brandDialog}
        style={{ width: "450px" }}
        header="Brand"
        modal
        className="p-fluid"
        footer={brandDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="accountLedgerId">
            Account Ledger <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            id="accountLedgerId"
            inputId="state"
            optionLabel="accountLedgerName"
            required
            autoFocus
            optionValue="id"
            value={brand.accountLedgerId}
            options={accountLedgers}
            onChange={(e) => onInputChange(e, "accountLedgerId")}
            placeholder="Select account ledger"
            className={classNames({
              "p-invalid": submitted && !brand.accountTypeId,
            })}
          />
          {submitted && !brand.accountLedgerId && (
            <small className="p-error">Account Ledger is required.</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="brandName">
            Brand Name <span style={{ color: "red" }}>*</span>
          </label>
          <InputText
            id="branchCode"
            value={brand.brandName}
            onChange={(e) => onInputChange(e, "brandName")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !brand.brandName,
            })}
          />
          {submitted && !brand.brandName && (
            <small className="p-error">Branch Code is required.</small>
          )}

          {submitted && brand.brandName && error ? (
            <small className="p-error">Brand already exists!</small>
          ) : (
            ""
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteBrandDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteBrandDialogFooter}
        onHide={hideDeleteBrandDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {brand && (
            <span>
              Are you sure you want to delete <b>{brand.brandName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteBrandsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteBrandsDialogFooter}
        onHide={hideDeleteBrandsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {brand && (
            <span>Are you sure you want to delete the selected brands?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Brand;
