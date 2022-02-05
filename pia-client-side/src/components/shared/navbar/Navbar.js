import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [purchaseRequisitionSidebar, setPurchaseRequisitionSidebar] =
    useState(false);
  const [settingSidebar, setSettingSidebar] = useState(false);
  const [supplierManagementSidebar, setSupplierManagementSidebar] =
    useState(false);
  const [chartAccountSidebar, setChartAccountSidebar] = useState(false);

  return (
    // < !--Sidebar -- >
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main</span>
            </li>

            <li className="submenu">
              <Link
                to="#"
                onClick={() => setChartAccountSidebar(!chartAccountSidebar)}
              >
                <i className="la la la-money"></i>{" "}
                <span> Charts of Accounts</span>{" "}
                <span className="menu-arrow"></span>
              </Link>
              <ul className={chartAccountSidebar ? "d-block" : "d-none "}>
                <li>
                  <Link className="" to="/AccountType">
                    {" "}
                    Account Type{" "}
                  </Link>
                </li>
                <li>
                  <Link className="" to="/GroupLedger">
                    {" "}
                    Group Ledger{" "}
                  </Link>
                </li>
                <li>
                  <Link className="" to="/SubGroupLedger">
                    {" "}
                    Sub Group Ledger
                  </Link>
                </li>
                <li>
                  <Link className="" to="/ControlLedger">
                    {" "}
                    Control Ledger
                  </Link>
                </li>
                <li>
                  <Link className="" to="/AccountLedger">
                    {" "}
                    Account Ledger
                  </Link>
                </li>
              </ul>
            </li>

            <li className="submenu">
              <Link
                to="#"
                onClick={() =>
                  setSupplierManagementSidebar(!supplierManagementSidebar)
                }
              >
                <i className="la la-shopping-cart"></i>{" "}
                <span> Supplier Management</span>{" "}
                <span className="menu-arrow"></span>
              </Link>
              <ul className={supplierManagementSidebar ? "d-block" : "d-none "}>
                <li>
                  <Link className="" to="/Supplier">
                    {" "}
                    Supplier{" "}
                  </Link>
                </li>
              </ul>
            </li>

            <li className="submenu">
              <Link to="#" onClick={() => setSettingSidebar(!settingSidebar)}>
                <i className="la la-cog"></i> <span> Settings</span>{" "}
                <span className="menu-arrow"></span>
              </Link>
              <ul className={settingSidebar ? "d-block" : "d-none "}>
                <li>
                  <Link className="" to="/Department">
                    {" "}
                    Department
                  </Link>
                </li>
                <li>
                  <Link className="" to="/Branch">
                    {" "}
                    Branch
                  </Link>
                </li>
                <li>
                  <Link className="" to="/Brand">
                    {" "}
                    Brand
                  </Link>
                </li>
                <li>
                  <Link className="" to="/MeasurementUnit">
                    {" "}
                    Measurement Unit
                  </Link>
                </li>
                <li>
                  <Link className="" to="/Condition">
                    {" "}
                    Terms & Condition
                  </Link>
                </li>
              </ul>
            </li>

            <li className="submenu">
              <Link
                to="#"
                onClick={() =>
                  setPurchaseRequisitionSidebar(!purchaseRequisitionSidebar)
                }
              >
                <i className="la la-credit-card"></i>{" "}
                <span> Purchase Requisition</span>{" "}
                <span className="menu-arrow"></span>
              </Link>
              <ul
                className={purchaseRequisitionSidebar ? "d-block" : "d-none "}
              >
                <li>
                  <Link className="" to="/AddPurchaseRequisition">
                    {" "}
                    Add Purchase Requisition
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // <!-- /Sidebar -->
  );
};

export default Navbar;
