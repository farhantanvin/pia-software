import React from "react";
import Footer from "../shared/footer/Footer";
import Header from "../shared/header/Header";
import Navbar from "../shared/navbar/Navbar";

function Home() {
  return (
    <div id="main-wrapper">
      <Header />
      <Navbar />



      {/* <!-- Page Content --> */}
      <div className="content container-fluid">

        {/* <!-- Page Header --> */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Welcome Admin!</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- /Page Header --> */}

        <div className="row">
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon"><i className="fa fa-cubes"></i></span>
                <div className="dash-widget-info">
                  <h3>112</h3>
                  <span>Projects</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon"><i className="fa fa-usd"></i></span>
                <div className="dash-widget-info">
                  <h3>44</h3>
                  <span>Clients</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon"><i className="fa fa-diamond"></i></span>
                <div className="dash-widget-info">
                  <h3>37</h3>
                  <span>Tasks</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon"><i className="fa fa-user"></i></span>
                <div className="dash-widget-info">
                  <h3>218</h3>
                  <span>Employees</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
						<div className="col-md-12">
							<div className="row">
								<div className="col-md-6 text-center">
									<div className="card">
										<div className="card-body">
											<h3 className="card-title">Total Revenue</h3>
											<div id="bar-charts"></div>
										</div>
									</div>
								</div>
								<div className="col-md-6 text-center">
									<div className="card">
										<div className="card-body">
											<h3 className="card-title">Sales Overview</h3>
											<div id="line-charts"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

      </div>

      <Footer />
    </div>
  );
}

export default Home;
