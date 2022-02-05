import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import AuthLayout from "./components/authLayout";
import BaseLayout from "./components/baseLayout";
import Home from "./components/home/Home";
import NotFound from "./components/notFound/NotFound";

//// START SETUP COMPONENT ////
import DepartmentType from "./components/settings/DepartmentType/DepartmentType";
import Degree from "./components/settings/Degree/Degree";
import Branch from "./components/settings/Branch/Branch";
import Brand from "./components/settings/Brand/Brand";
import MeasurementUnit from "./components/settings/MeasurementUnit/MeasurementUnit";
import Condition from "./components/settings/Condition/Condition";
///// END SETUP COMPONENT ////

//// START MASTER COMPONENT ////
import AccountType from "./components/chartofAccount/AccountType/AccountType";
import GroupLedger from "./components/chartofAccount/GroupLedger/GroupLedger";
import SubGroupLedger from "./components/chartofAccount/SubGroupLedger/SubGroupLedger";
import ControlLedger from "./components/chartofAccount/ControlLedger/ControlLedger";
import AccountLedger from "./components/chartofAccount/AccountLedger/AccountLedger";
import Supplier from "./components/supplierManagement/supplier/Supplier";
import AddPurchaseRequisition from "./components/purchaseRequisition/AddPurchaseRequisition";
//// END MASTER COMPONENT ////

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/Signin" />
        </Route>

        {/* <Route exact path="/">
          <Redirect to="/NotFound" />
        </Route> */}

        <Route exact path="/NotFound" component={NotFound} />

        <AuthLayout exact path="/Signin" component={Signin} />
        <AuthLayout exact path={["/Signup"]} component={Signup} />

        {/* <React.Fragment> */}
        <div className="App">
          <BaseLayout exact path="/Home" component={Home} />
          <BaseLayout exact path="/Department" component={DepartmentType} />
          <BaseLayout exact path="/Degree" component={Degree} />
          <BaseLayout exact path="/Branch" component={Branch} />
          <BaseLayout exact path="/Brand" component={Brand} />
          <BaseLayout
            exact
            path="/MeasurementUnit"
            component={MeasurementUnit}
          />
          <BaseLayout exact path="/Condition" component={Condition} />

          <BaseLayout exact path="/AccountType" component={AccountType} />
          <BaseLayout exact path="/GroupLedger" component={GroupLedger} />
          <BaseLayout exact path="/SubGroupLedger" component={SubGroupLedger} />
          <BaseLayout exact path="/ControlLedger" component={ControlLedger} />
          <BaseLayout exact path="/AccountLedger" component={AccountLedger} />
          <BaseLayout exact path="/Supplier" component={Supplier} />
          <BaseLayout
            exact
            path="/AddPurchaseRequisition"
            component={AddPurchaseRequisition}
          />
        </div>
        {/* </React.Fragment> */}
      </Switch>
    </Router>
  );
}
export default App;
