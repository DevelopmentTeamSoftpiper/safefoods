import CartProduct from "@/components/checkout/CartProduct";
import SuccessProduct from "@/components/checkout/SuccessProduct";
import { emptyCart } from "@/store/cartSlice";
import { fetchDataFromApi, postDataToApi } from "@/utils/api";
import withAuth from "@/utils/restrict";
import { STRAPI_API_TOKEN } from "@/utils/urls";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Success = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const user = useSelector((state) => state.user.currentUser);
  const provider = useSelector((state)=>state.user.provider);

  const [order, setOrder] = useState(null);

  const geOrderInfo = async () => {
    if(provider === "strapi"){
      const order = await fetchDataFromApi(
        `/api/orders?populate=*&[filters][user_id_no][$eq]=${user?.id}&sort=id:desc&?pagination[page]=1&pagination[pageSize]=1`
      );
    setOrder(order);

    }else{
      const order = await fetchDataFromApi(
        `/api/orders?populate=*&[filters][user_id_no][$eq]=${user?.uid}&sort=id:desc&?pagination[page]=1&pagination[pageSize]=1`
      );
      setOrder(order);
    }

    console.log(order);
  };
  useEffect(() => {
    geOrderInfo();
  });

  if (!user) {
    router.push("/account/login");
    return null;
  }

  return (
    <div className="page-wrapper p-5">
      <main className="main">
        <div
          className="page-header text-center"
          style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
        >
          <div className="container">
            <h1 className="page-title">Order Summery</h1>
          </div>
          {/* End .container */}
        </div>
        {/* End .page-header */}

        <div className="page-content">
          <div className="checkout">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="checkout-title">Billing Details</h2>
                  {/* End .checkout-title */}
                  <div className="row">
                    <div className="col-sm-6">
                      <label style={{ fontWeight: 600 }}> Name</label>
                      <p style={{color:"black"}}>{order?.data?.[0]?.attributes?.name}</p>
                    </div>
                    {/* End .col-sm-6 */}
                    <div className="col-sm-6">
                      <label style={{ fontWeight: 600 }}>Email</label>
                      <p style={{color:"black"}}>{order?.data?.[0]?.attributes?.email}</p>
                    </div>
                    {/* End .col-sm-6 */}
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <label style={{ fontWeight: 600 }}>Phone No</label>
                      <p style={{color:"black"}}>{order?.data?.[0]?.attributes?.phone}</p>
                    </div>
                    {/* End .col-sm-6 */}
                    <div className="col-sm-6">
                      <label style={{ fontWeight: 600 }}>Street address </label>
                      <p style={{color:"black"}}>{order?.data?.[0]?.attributes?.address}</p>
                    </div>
                    {/* End .col-sm-6 */}
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <label style={{ fontWeight: 600 }}>City </label>
                      <p style={{color:"black"}}>
                        {order?.data?.[0]?.attributes?.city}-
                        {order?.data?.[0]?.attributes?.post_code}
                      </p>
                    </div>
                    {/* End .col-sm-6 */}
                    <div className="col-sm-6">
                      <label style={{ fontWeight: 600 }}>Country</label>
                      <p style={{color:"black"}}>{order?.data?.[0]?.attributes?.country}</p>
                    </div>
                    {/* End .col-sm-6 */}
                  </div>
                </div>
                {/* End .col-lg-9 */}
                <aside className="col-lg-6">
                  <div className="summary">
                    <h3 className="summary-title">Your Order</h3>
                    {/* End .summary-title */}
                    <table className="table table-summary">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th></th>
                          <th></th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.data?.[0]?.attributes?.products?.map(
                          (cartProduct) => (
                            <SuccessProduct
                              key={cartProduct?.id}
                              cartProduct={cartProduct}
                            />
                          )
                        )}

                        <tr className="summary-subtotal">
                          <td>Subtotal:</td>
                          <td></td>
                          <td></td>
                          <td>{order?.data?.[0]?.attributes?.subtotal} BDT</td>
                        </tr>
                        {/* End .summary-subtotal */}
                        <tr>
                          <td>Shipping:</td>
                          <td></td>
                          <td></td>
                          <td>
                            {order?.data?.[0]?.attributes?.shipping_cost} BDT
                          </td>
                        </tr>
                        <tr className="summary-total">
                          <td>Total:</td>
                          <td></td>
                          <td></td>
                          <td>{order?.data?.[0]?.attributes?.total} BDT</td>
                        </tr>
                        {/* End .summary-total */}
                      </tbody>
                    </table>
                    {/* End .table table-summary */}

                    {/* End .accordion */}
                  </div>
                  {/* End .summary */}
                </aside>
                {/* End .col-lg-3 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </div>
          {/* End .checkout */}
        </div>
        {/* End .page-content */}
      </main>
    </div>
  );
};

export default withAuth(Success);
