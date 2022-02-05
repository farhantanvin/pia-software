import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LogInAuth } from "../../actions/authAction";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const initialSigninState = {
    email: "",
    password: ""
  };
  const [signIn, setSignin] = useState(initialSigninState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignin({ ...signIn, [name]: value });
  };



  const SubmitLogin = (e) => {
    e.preventDefault();

    debugger;

    const { email, password } = signIn;

    dispatch(LogInAuth(email, password))
      .then((data) => {
        setSignin({
          email: data.email,
          password: data.password
        });
        setSubmitted(true);
        console.log(data);
        const token = data.jwToken;
        alert(token);
      })
      .catch((e) => {
        console.log(e);
      });

  };

  return (
    <>

      {submitted ? (

        toast.success("You Have Logged in Successfully!"),
        //history.push('/DepartmentTypeList'),
        window.location = "/home",
        <h1 style={{ display: "none" }}>Login Failed!!</h1>

      ) : (


        <div className="main-wrapper">
          <div className="account-content">
            {/* <a href="job-list.html" class="btn btn-primary apply-btn">
            Apply Job
          </a> */}
            <div className="container">
              {/* <!-- Account Logo --> */}
              <div className="account-logo">
                <a href="index.html">
                  <img src="assets/img/logo2.png" alt="Dreamguy's Technologies" />
                </a>
              </div>
              {/* <!-- /Account Logo --> */}

              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>

                  {/* <!-- Account Form --> */}
                  <form action="index.html">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        className="form-control"
                        value={signIn.email}
                        onChange={handleInputChange}
                        name="email"
                        id="email"
                        type="text"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col">
                          <label>Password</label>
                        </div>
                        <div className="col-auto">
                          <a className="text-muted" href="forgot-password.html">
                            Forgot password?
                        </a>
                        </div>
                      </div>
                      <input
                        className="form-control"
                        type="password"
                        value={signIn.password}
                        onChange={handleInputChange}
                        name="password"
                        id="password"
                      />
                    </div>
                    <div className="form-group text-center">
                      <button className="btn btn-primary account-btn" onClick={SubmitLogin}>
                        Login
                    </button>
                    </div>
                    <div className="account-footer">
                      {/* <p>
                      Don't have an account yet?{" "}
                      <router>
                        <Link to="/Signup">Register</Link>
                      </router>
                    </p> */}
                    </div>
                  </form>
                  {/* <!-- /Account Form --> */}
                </div>
              </div>
            </div>
          </div>
        </div>

      )}

    
  <ToastContainer autoClose={2000} />

     {/* <!-- /Main Wrapper --></div>         */}

    </>
  );
}

export default Signin;
