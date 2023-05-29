/*eslint-disable */
import Loader from "@/components/Loader";
import { logout } from "@/store/userSlice";
import { fetchDataFromApi, postDataToApi, updateDataToApi } from "@/utils/api";
import withAuth from "@/utils/restrict";
import { API_URL } from "@/utils/urls";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [profileInfo, setProfileInfo] = useState(null);
  const [profileId, setProfileId] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);
  
  const provider = useSelector((state) => state.user.provider);
  const jwt = useSelector((state) => state.user.jwt);
  
  console.log(jwt);

  console.log(user);


  const getUserInfo = async () => {
   const userInfo =  await axios.post("/api/profile/find",
    {
      user_id_no: user._id,
    },
     {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: `Bearer ${jwt}`,
      },
      
    });
    console.log(userInfo);
      setName(userInfo?.data?.name);
      setEmail(userInfo?.data?.email);
      setPhone(userInfo?.data?.phone);
      setAddress(userInfo?.data?.address);
      setPostalCode(userInfo?.data?.post_code);
      setCity(userInfo?.data?.city);
      setCountry(userInfo?.data?.country);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const profile = async () => {
    try {

      const updatedProfileData = await axios.post("/api/profile/update",
      {
        name: name,
        email: email,
        phone: phone,
        address: address,
        post_code: postalCode,
        city: city,
        country: country,
        user_id_no: user._id,
      },
       {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: `Bearer ${jwt}`,
        },
        
      });
      toast.success("Profile Edited Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(updatedProfileData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const profileSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    profile();
  };

  const updatePassword = async () => {
    try {
      const res =await axios.post(
        `${API_URL}/api/auth/change-password`,
        {
          currentPassword: currentPassword,
          password: password,
          passwordConfirmation: passwordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      toast.success("Password Updated Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setPassword("");
      setCurrentPassword("");
      setPasswordConfirmation("");
      console.log("res", res);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error?.response?.data?.error?.message);
    }
  };

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    updatePassword();
  };

  if (!user) {
    router.push("/account/login");
    return null;
  }

  const dispatch = useDispatch();
  return (
    <main className="main">
      <ToastContainer />

      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Edit Account Information</h1>
        </div>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-center p-5">
          {/* End .col-12 */}
          <div className="col-md-10">
            <ul className="nav nav-tabs nav-tabs-bg" id="tabs-1" role="tablist">
              <li className="nav-item">
                <Link
                  className="nav-link "
                  id="tab-1-tab"
                  data-toggle="tab"
                  href="/account"
                  role="tab"
                  aria-controls="tab-1"
                  aria-selected="true"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  id="tab-2-tab"
                  data-toggle="tab"
                  href="/account/orders"
                  role="tab"
                  aria-controls="tab-2"
                  aria-selected="false"
                >
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link "
                  id="tab-3-tab"
                  data-toggle="tab"
                  href="/account/details"
                  role="tab"
                  aria-controls="tab-3"
                  aria-selected="false"
                >
                  Account Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  id="tab-4-tab"
                  data-toggle="tab"
                  href="/account/edit-profile"
                  role="tab"
                  aria-controls="tab-4"
                  aria-selected="false"
                >
                  Edit Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  id="tab-5-tab"
                  data-toggle="tab"
                  href="#tab-5"
                  role="tab"
                  aria-controls="tab-5"
                  aria-selected="false"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
            <div className="tab-content tab-content-border" id="tab-content-1">
              <div
                className="tab-pane fade show active"
                id="tab-1"
                role="tabpanel"
                aria-labelledby="tab-1-tab"
              >
                <form onSubmit={profileSubmitHandler}>
                  <div className="row">
                    <div className="col-sm-6">
                      <label>Username </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required=""
                        value={name}
                        onChange={(e) => {
                          return setName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-sm-6">
                      <label>Email </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        required=""
                        value={email}
                        onChange={(e) => {
                          return setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <label>Phone </label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        required=""
                        value={phone}
                        onChange={(e) => {
                          return setPhone(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <label>Address </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    required=""
                    value={address}
                    onChange={(e) => {
                      return setAddress(e.target.value);
                    }}
                  />
                  <div className="row">
                    <div className="col-md-4">
                      <label>Postal Code </label>
                      <input
                        type="text"
                        name="postal_code"
                        className="form-control"
                        required=""
                        value={postalCode}
                        onChange={(e) => {
                          return setPostalCode(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>City </label>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        required=""
                        value={city}
                        onChange={(e) => {
                          return setCity(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Country </label>
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        required=""
                        value={country}
                        onChange={(e) => {
                          return setCountry(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {isLoading && <Loader />}

                  <button type="submit" className="btn btn-outline-primary-2">
                    <span>SAVE CHANGES</span>
                    <i className="icon-long-arrow-right" />
                  </button>
                </form>

              {
                provider === "strapi" && 
                
            (
              <>
              <h3 className="pt-2">Change Password:</h3>
              <form onSubmit={passwordChangeHandler}>
              <div className="row">
                <div className="col-sm-4">
                  <label>Current Password </label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-control"
                    required=""
                    value={currentPassword}
                    onChange={(e) => {
                      return setCurrentPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="col-sm-4">
                  <label>Password </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    required=""
                    value={password}
                    onChange={(e) => {
                      return setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="col-sm-4">
                  <label>Confirmed Password </label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    className="form-control"
                    required=""
                    value={passwordConfirmation}
                    onChange={(e) => {
                      return setPasswordConfirmation(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
              {password !== passwordConfirmation && passwordConfirmation.length>0 && 
              <span style={{color:"brown", fontWeight:600}}>Passwords should be matched</span>}
              </div>
              {isLoading && <Loader />}

              <button type="submit" className="btn btn-outline-primary-2">
                <span>SAVE CHANGES</span>
                <i className="icon-long-arrow-right" />
              </button>
            </form>
            </>
            )
              }
              </div>
            </div>
            {/* End .tab-content */}
          </div>
          {/* End .col-md-6 */}

          {/* End .col-md-6 */}
        </div>
      </div>
    </main>
  );
};

export default withAuth(EditProfile);
