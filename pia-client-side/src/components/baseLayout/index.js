import React from 'react';
import { Route } from 'react-router-dom';
import Footer from "../shared/footer/Footer";
import Header from "../shared/header/Header";
import Navbar from "../shared/navbar/Navbar";

const DashboardLayout = ({ children, ...rest }) => {
  return (
    <div id="main-wrapper">
      <Header />
       <Navbar />
       <div className="page-wrapper">
        <div className="content container-fluid">
        {children}
        </div>
        </div>     
      <Footer />
    </div>
  );
};

const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <DashboardLayout>
          <Component {...props} />
        </DashboardLayout>
      )}
    />
  );
};

export default DashboardLayoutRoute;
