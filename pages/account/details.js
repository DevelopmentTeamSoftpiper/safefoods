/*eslint-disable */
import { logout } from "@/store/userSlice";
import { fetchDataFromApi, postDataToApi,updateDataToApi } from "@/utils/api";
import withAuth from "@/utils/restrict";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AccountDetails = () => {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);
  // console.log(user);
  const jwt = useSelector((state) => state.user.jwt);
  const provider = useSelector((state)=>state.user.provider);
  const getUserInfo = async ()=>{

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
    console.log('details',userInfo);
      setUserInfo(userInfo);
   



  }
  useEffect(()=>{
    getUserInfo();
  },[])

  console.log('profile',userInfo);


  if (!user) {
    router.push("/account/login");
    return null;
  }

  const dispatch = useDispatch();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">
          My Account Details
          </h1>
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
                  className="nav-link active"
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
                  className="nav-link"
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
                    <div className="row">
                  <div className="col-lg-6">
                    <div className="card card-dashboard">
                      <div className="card-body">
                        <h3 className="card-title">Billing Address</h3>
                        {/* End .card-title */}
                        <p>
                          Name : {userInfo?.data?.name}
                          <br />
                          Email: {userInfo?.data?.email}
                          <br />
                          Phone: {userInfo?.data?.phone} 
                          <br />
                   
       
                        </p>
                      </div>
                      {/* End .card-body */}
                    </div>
                    {/* End .card-dashboard */}
                  </div>
                  {/* End .col-lg-6 */}
                  <div className="col-lg-6">
                    <div className="card card-dashboard">
                      <div className="card-body">
                        <h3 className="card-title">Shipping Address</h3>
                        {/* End .card-title */}
                        <p>
                         
                          {userInfo?.data?.address === null && 
                          <div>
                          <p> You have not set up this type of address yet.</p> 
                          <Link href="/account/edit-profile" className="btn btn-sm btn-warning mt-2">Edit Profile Information</Link>
                          </div>
                          
                          }
                          <br />
                          {userInfo?.data?.address !== null &&
                          <>
                          <p>{userInfo?.data?.address}</p>
                          <p>{userInfo?.data?.city}, {userInfo?.data?.post_code},</p>
                          <p>{userInfo?.data?.country}</p>

                          <Link href="/account/edit-profile" className="btn btn-sm btn-warning mt-2">Edit Profile Information</Link>
                          </>
                      
                            }
                        </p>
                      </div>
                      {/* End .card-body */}
                    </div>
                    {/* End .card-dashboard */}
                  </div>
                  {/* End .col-lg-6 */}
                </div>
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

export default withAuth(AccountDetails);
