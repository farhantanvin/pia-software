import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "primereact/utils";
//import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
//import { AutoComplete } from "primereact/autocomplete";
import { InputNumber } from "primereact/inputnumber";
import { v4 as uuidv4 } from "uuid";

import {
  getPurchaseRequisitions,
  createPurchaseRequisition,
  updatePurchaseRequisition,
  deletePurchaseRequisition,
} from "../../actions/purchaseRequisitionAction";

import { getDepartmentTypes } from "../../actions/departmentTypeAction";
import { getBranchs } from "../../actions/branchAction";
import { getAccountLedgers } from "../../actions/accountLedgerAction";
import { getBrands } from "../../actions/brandAction";

let today = new Date();

const AddPurchaseRequisition = () => {
  let emptyPurchaseRequisition = {
    id: null,
    branchId: null,
    requisitionDate: "",
    remarks: "",
    departmenTypetId: null,
    deliveryDate: "",
  };

  const [purchaseRequisitionDetail, setPurchaseRequisitionDetail] = useState([
    {
      id: uuidv4(),
      quantity: 0,
      requisitionPrice: 0,
      unit: 0,
      brandId: null,
      modelNumber: "",
      accountLedgerId: null,
    },
  ]);

  const [filteredAccountLedgers, setFilteredAccountLedgers] = useState(null);
  const [selectedAccountLedger, setSelectedAccountLedger] = useState(null);
  const [date, setDate] = useState(today);
  //   const [accountTypeDialog, setAccountTypeDialog] = useState(false);
  //   const [deleteAccountTypeDialog, setDeleteAccountTypeDialog] = useState(false);
  //   const [deleteAccountTypesDialog, setDeleteAccountTypesDialog] =
  //     useState(false);
  const [purchaseRequisition, setPurchaseRequisition] = useState(
    emptyPurchaseRequisition
  );
  const [submitted, setSubmitted] = useState(false);
  // const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  //const dt = useRef(null);
  const departmentTypes = useSelector((state) => state.departmentTypeReducer);
  const branchs = useSelector((state) => state.branchReducer);
  const accountLedgers = useSelector((state) => state.accountLedgerReducer);
  const brands = useSelector((state) => state.brandReducer);

  const dispatch = useDispatch();

  const fetchData = async () => {
    debugger;
    await dispatch(getDepartmentTypes());
    await dispatch(getBranchs());
    await dispatch(getAccountLedgers());
    await dispatch(getBrands());
  };

  useEffect(() => {
    dispatch(getDepartmentTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBranchs());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAccountLedgers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const handleAddFields = () => {
    setPurchaseRequisitionDetail([
      ...purchaseRequisitionDetail,
      {
        id: uuidv4(),
        quantity: 0,
        requisitionPrice: 0,
        unit: 0,
        brandId: null,
        modelNumber: "",
        accountLedgerId: null,
      },
    ]);
  };

  const handleChangeInput = (id, event) => {
    debugger;
    const newPurchaseRequisitionDetail = purchaseRequisitionDetail.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setPurchaseRequisitionDetail(newPurchaseRequisitionDetail);
  };

  //console.log("values", purchaseRequisitionDetail);

  const handleRemoveFields = (index) => {
    const values = [...purchaseRequisitionDetail];
    values.splice(index, 1);
    setPurchaseRequisitionDetail(values);
  };

  const onInputChange = (e, data) => {
    debugger;
    const val = (e.target && e.target.value) || "";
    let _purchaseRequisition = { ...purchaseRequisition };
    _purchaseRequisition[`${data}`] = val;
    setPurchaseRequisition(_purchaseRequisition);
  };

  // const searchAccountLedger = (event) => {
  //   setTimeout(() => {
  //     let _filteredAccountLedgers;
  //     if (!event.query.trim().length) {
  //       _filteredAccountLedgers = [...accountLedgers];
  //     } else {
  //       _filteredAccountLedgers = accountLedgers.filter((x) => {
  //         return x.accountLedgerName
  //           .toLowerCase()
  //           .startsWith(event.query.toLowerCase());
  //       });
  //     }

  //     setFilteredAccountLedgers(_filteredAccountLedgers);
  //   }, 250);
  // };

  const items = [
    { label: "Purchase Requisition" },
    { label: "Add Purchase Requisitionn" },
  ];

  const home = { icon: "pi pi-home", url: "/Home" };

  const savePurchaseRequisition = async () => {
    setSubmitted(true);
    debugger;

    var xData = {
      BranchId: purchaseRequisition.branchId,
      ///  RequisitionDate: purchaseRequisition.requisitionDate,
      DepartmentTypeId: purchaseRequisition.departmenTypetId,
      Remarks: purchaseRequisition.remarks,
      //DeliveryDate: purchaseRequisition.deliveryDate,
      PurchaseRequisitionDetails: purchaseRequisitionDetail,
    };

    await dispatch(createPurchaseRequisition(xData))
      .then((purchaseRequisition, purchaseRequisitionDetail) => {
        /*setPurchaseRequisition({
          branchId: purchaseRequisition.branchId,
          purchaseRequisitionDetail: purchaseRequisitionDetail,
        });
        console.log(purchaseRequisitionDetail);*/
      })
      .catch((e) => {
        console.log(e);
      });

    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Purchase Requisition Created!",
      life: 1500,
    });
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
    return <React.Fragment></React.Fragment>;
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <Toolbar
        className="p-mb-0"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>

      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-4">
          <label htmlFor="branchId">
            Unit or Branch <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            id="branchId"
            inputId="state"
            optionLabel="branchName"
            required
            autoFocus
            optionValue="id"
            value={purchaseRequisition.branchId}
            options={branchs}
            onChange={(e) => onInputChange(e, "branchId")}
            placeholder="Select unit or branch"
            className={classNames({
              "p-invalid": submitted && !purchaseRequisition.branchId,
            })}
          />
          {submitted && !purchaseRequisition.branchId && (
            <small className="p-error">Unit or Branch is required.</small>
          )}
        </div>

        <div className="p-field p-col-12 p-md-4">
          <label htmlFor="requisitionDate">Requisition Date</label>
          <Calendar
            id="requisitionDate"
            value={
              purchaseRequisition.requisitionDate
                ? purchaseRequisition.requisitionDate
                : date
            }
            onChange={(e) => onInputChange(e, "requisitionDate")}
            showIcon
          />
        </div>

        <div className="p-field p-col-12 p-md-4">
          <label htmlFor="remarks">Remarks</label>
          <InputText
            id="remarks"
            value={purchaseRequisition.remarks}
            onChange={(e) => onInputChange(e, "remarks")}
            required
          />
        </div>

        <div className="p-field p-col-12 p-md-4">
          <label htmlFor="Id">
            Requisition For <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            id="departmentId"
            inputId="departmentId"
            optionLabel="departmentTypeName"
            required
            optionValue="id"
            value={purchaseRequisition.departmenTypetId}
            options={departmentTypes}
            onChange={(e) => onInputChange(e, "departmenTypetId")}
            placeholder="Select department"
            className={classNames({
              "p-invalid": submitted && !purchaseRequisition.departmenTypetId,
            })}
          />
          {submitted && !purchaseRequisition.departmenTypetId && (
            <small className="p-error">Department Type is required.</small>
          )}
        </div>

        <div className="p-field p-col-12 p-md-4">
          <label htmlFor="date">Potential Date of Delivery </label>
          <Calendar
            id="deliveryDate"
            value={
              purchaseRequisition.deliveryDate
                ? purchaseRequisition.deliveryDate
                : date
            }
            onChange={(e) => onInputChange(e, "deliveryDate")}
            showIcon
          />
        </div>
      </div>

      <div className="p-fluid p-formgrid p-grid p-m-3">
        {purchaseRequisitionDetail.map((purchaseRequisitionDetail, index) => (
          <div
            key={purchaseRequisitionDetail.id}
            className="p-field  p-formgrid p-grid"
            style={{ marginBottom: "0" }}
          >
            {/* <div
              className="p-field p-col-12 p-md-2 p-formgroup-inline"
              style={{ marginBottom: "0" }}
            >
              <label htmlFor="itemName">Item Name</label>
              <AutoComplete
                id="accountLedgerId"
                name="accountLedgerId"
                optionValue="id"
                inputId="accountLedgerId"
                value={purchaseRequisitionDetail?.accountLedgerId}
                suggestions={filteredAccountLedgers}
                completeMethod={searchAccountLedger}
                field="accountLedgerName"
                dropdown
                forceSelection
                onChange={(event) =>
                  handleChangeInputAuto(purchaseRequisitionDetail.id, event)
                }
              />
            </div> */}

            <div
              className="p-field p-col-12 p-md-2"
              style={{ marginBottom: "0" }}
            >
              <label htmlFor="brandId">Item Name</label>
              <Dropdown
                id="accountLedgerId"
                name="accountLedgerId"
                inputId="accountLedgerId"
                optionLabel="accountLedgerName"
                optionValue="id"
                value={purchaseRequisitionDetail.accountLedgerId}
                options={accountLedgers}
                onChange={(event) =>
                  handleChangeInput(purchaseRequisitionDetail.id, event)
                }
                placeholder="Item"
              />
            </div>

            <div
              className="p-field p-col-12 p-md-2 p-formgroup-inline"
              style={{ marginBottom: "0" }}
            >
              <label htmlFor="modelNumber">Model Number</label>
              <InputText
                name="modelNumber"
                id="modelNumber"
                type="text"
                value={purchaseRequisitionDetail.modelNummber}
                onChange={(event) =>
                  handleChangeInput(purchaseRequisitionDetail.id, event)
                }
              />
            </div>

            <div
              className="p-field p-col-12 p-md-3 "
              style={{ marginBottom: "0", width: "330px" }}
            >
              <label htmlFor="brandId">Specification (Brand/Size)</label>
              <Dropdown
                id="brandId"
                name="brandId"
                inputId="brandId"
                optionLabel="brandName"
                optionValue="id"
                value={purchaseRequisitionDetail.brandId}
                options={brands}
                onChange={(event) =>
                  handleChangeInput(purchaseRequisitionDetail.id, event)
                }
                placeholder="Select Specification(Brand/Size)"
              />
            </div>

            <div
              className="p-field p-col-12 p-md-1 p-formgroup-inline"
              style={{ marginBottom: "0" }}
            >
              <label htmlFor="unit">Unit</label>
              <InputNumber
                inputId="unit"
                name="unit"
                value={purchaseRequisitionDetail.unit}
                min={0}
                onValueChange={(event) =>
                  handleChangeInput(purchaseRequisitionDetail.id, event)
                }
                showButtons
              />
            </div>

            <div
              className="p-field p-col-12 p-md-1 p-formgroup-inline"
              style={{ marginBottom: "0" }}
            >
              <label htmlFor="quantity">Qty</label>
              <InputNumber
                inputId="quantity"
                name="quantity"
                value={purchaseRequisitionDetail.quantity}
                min={0}
                onValueChange={(event) =>
                  handleChangeInput(purchaseRequisitionDetail.id, event)
                }
                showButtons
              />
            </div>

            <div
              className="p-field p-col-12 p-md-2 p-formgroup-inline"
              style={{ marginBottom: "0" }}
            >
              <label htmlFor="requisitionPrice">Requisition Price</label>
              <InputNumber
                inputId="requisitionPrice"
                name="requisitionPrice"
                value={purchaseRequisitionDetail.requisitionPrice}
                onValueChange={(event) =>
                  handleChangeInput(purchaseRequisitionDetail.id, event)
                }
                min={0}
                showButtons
              />
            </div>

            <div
              className="p-field p-col-12 p-md-1 p-formgroup-inline"
              style={
                index !== 0
                  ? { marginBottom: "0" }
                  : { visibility: "hidden", marginBottom: "0" }
              }
            >
              <label htmlFor="zip">&nbsp;</label>
              <Button
                label="Remove"
                icon="pi pi-times"
                className="p-button-rounded p-button-danger"
                onClick={() => handleRemoveFields(index)}
              />
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: "0", marginLeft: "0px" }}>
        <Button
          label="Add"
          icon="pi pi-plus"
          className="p-button-info d-block p-ml-3"
          onClick={() => handleAddFields()}
        />
      </div>
      <div
        className="p-field p-col-12 p-md-6 p-formgroup-inline"
        style={{ marginBottom: "0", marginLeft: "5px" }}
      >
        <Button
          label="Save"
          icon="pi pi-save"
          className="p-button-success"
          onClick={() => savePurchaseRequisition()}
          disabled={
            !(
              purchaseRequisition.departmenTypetId &&
              purchaseRequisition.branchId
            )
          }
        />
      </div>
    </div>
  );
};

export default AddPurchaseRequisition;
