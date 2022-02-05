import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    // <!-- Main Wrapper -->
    <div class="main-wrapper">
      <div class="account-content">
        {/* <a href="job-list.html" class="btn btn-primary apply-btn">Apply Job</a> */}
        <div class="container">
          {/* <!-- Account Logo --> */}
          <div class="account-logo">
            <a href="index.html">
              <img src="assets/img/logo2.png" alt="Dreamguy's Technologies" />
            </a>
          </div>
          {/* <!-- /Account Logo --> */}

          <div class="account-box">
            <div class="account-wrapper">
              <h3 class="account-title">Register</h3>
              <p class="account-subtitle">Access to our dashboard</p>

              {/* <!-- Account Form --> */}
              <form action="index.html">
                <div class="form-group">
                  <label>Email</label>
                  <input class="form-control" type="text" />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input class="form-control" type="password" />
                </div>
                <div class="form-group">
                  <label>Repeat Password</label>
                  <input class="form-control" type="password" />
                </div>
                <div class="form-group text-center">
                  <button class="btn btn-primary account-btn" type="submit">
                    Register
                  </button>
                </div>
                <div class="account-footer">
                  <p>
                    Already have an account? <router><Link to="/Signin">Login</Link></router>
                  </p>
                </div>
              </form>
              {/* <!-- /Account Form --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    // {/* <!-- /Main Wrapper --> */}
  );
}

export default Signup;
