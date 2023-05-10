/* eslint-disable */
import AlertBox from "@/components/elements/AlertBox";
import {
  jwtSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
} from "@/store/userSlice";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    identifier: "",
    password: "",
    response: "",
    buttonText: "sign in",
  });
  const { identifier, password, response, buttonText } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  //
  //
  //Login Handler
  const login = async () => {
    try {
      setValues({ ...values, buttonText: "Singing in" });
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier,
        password,
      });
      console.log(res.data);
      dispatch(loginSuccess(res.data.user));
      dispatch(jwtSuccess(res.data.jwt));
      const redirectPath = router.query.redirect || "/account";
      router.push(redirectPath);
    } catch (error) {
      console.log(error.response);
      setValues({
        ...values,
        response: "Invalid Email or Password",
        buttonText: "Sign In Again",
      });
      dispatch(loginFailure());
      toast.error(error.response.data.error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <main className="main">
                <ToastContainer/>

      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Login
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div
        className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
        style={{
          backgroundImage: 'url("assets/images/backgrounds/login-bg.jpg")',
        }}
      >
        <div className="container">
          <div className="form-box">
            <div className="form-tab">
            <h6>Login</h6>

              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="register-2"
                  role="tabpanel"
                  aria-labelledby="register-tab-2"
                >
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        placeholder="email"
                        onChange={handleChange}
                        name="identifier"
                        value={identifier}
                        className="form-control"
                        id="email"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        className="form-control"
                        id="password"
                        required
                      />
                    </div>

                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-outline-primary-2"
                      >
                        <span>{buttonText}</span>
                        <i className="icon-long-arrow-right" />
                      </button>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="register-policy-2"
                          required=""
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="register-policy-2"
                        >
                          I agree to the <a href="#">privacy policy</a> *
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .form-footer */}
                  </form>
                  {/* <div className="form-choice">
                  <p className="text-center">or sign in with</p>
                  <div className="row">
                    <div className="col-sm-6">
                      <a href="#" className="btn btn-login btn-g">
                        <i className="icon-google" />
                        Login With Google
                      </a>
                    </div>
                 
                    <div className="col-sm-6">
                      <a href="#" className="btn btn-login  btn-f">
                        <i className="icon-facebook-f" />
                        Login With Facebook
                      </a>
                    </div>
                  
                  </div>
               
                </div> */}
                  {/* End .form-choice */}
                </div>
                {/* .End .tab-pane */}
              </div>
              {/* End .tab-content */}
            </div>
            {/* End .form-tab */}
          </div>
          {/* End .form-box */}
        </div>
        {/* End .container */}
      </div>
      {/* End .login-page section-bg */}
    </main>
  );
};

export default login;
