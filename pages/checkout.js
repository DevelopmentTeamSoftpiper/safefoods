/* eslint-disable */
import CartProduct from "@/components/checkout/CartProduct";
import { emptyCart } from "@/store/cartSlice";
import { fetchDataFromApi, postDataToApi } from "@/utils/api";
import withAuth from "@/utils/restrict";
import { STRAPI_API_TOKEN } from "@/utils/urls";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillCartXFill } from 'react-icons/bs';
import Link from "next/link";
import Loader from "@/components/Loader";
const checkout = () => {

  const [isLoading, setIsLoading] =useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [profileId, setProfileId] = useState(null);
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.currentUser);
  console.log(user._id);

  const jwt = useSelector((state) => state.user.jwt);

  const provider = useSelector((state)=>state.user.provider);


  const getUserInfo = async () => {
    if(provider === "email-password"){
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
    console.log('userInfoCheckout', userInfo)
      setName(userInfo?.data?.name);
      setEmail(userInfo?.data?.email);
      setPhone(userInfo?.data?.phone);
      setAddress(userInfo?.data?.address);
      setPostalCode(userInfo?.data?.post_code);
    setCity(userInfo?.data?.city);
    setCountry(userInfo?.data?.country);
    setProfileId(userInfo?.data?.[0]?.id);
   
    }
    // else{
    //   const userInfo = await fetchDataFromApi(
    //     `/api/profiles?populate=*&[filters][user_id_no][$eq]=${user?.uid}`
    //   );
    //   console.log('checkout',userInfo)

    //   setName(userInfo?.data?.[0]?.attributes?.username);
    // setEmail(userInfo?.data?.[0]?.attributes?.email);
    // setPhone(userInfo?.data?.[0]?.attributes?.phone);
    // setAddress(userInfo?.data?.[0]?.attributes?.address);
    // setPostalCode(userInfo?.data?.[0]?.attributes?.post_code);
    // setCity(userInfo?.data?.[0]?.attributes?.city);
    // setCountry(userInfo?.data?.[0]?.attributes?.country);
    // setProfileId(userInfo?.data?.[0]?.id);

    // }
   

  };


  const cartProducts = useSelector((state) => state.cart.cartItems);
  const subTotal = useMemo(() => {
    return cartProducts.reduce((total, val) => total + val.price, 0);
  }, [cartProducts]);
  console.log(cartProducts);
  const productData = cartProducts.map((p) => ({
    id: p?._id,
    title: p?.title,
    quantityPrice: p?.oneQuantityPrice,
    quantity: p?.quantity,
    price: p?.price,
    category: p?.category?.name,
    subcategory: p?.subcategory?.name,
  }));
  console.log(productData);

  const [shippings, setShippings] = useState(null);
  const [shippingCost, setShippingCost] = useState("70");

  const shippingCostChangeHandler = (e) => {
    setShippingCost(e.target.value);
  };

  const getShippings = async () => {
    const ships = await axios.get("/api/admin/shipping/getAll");
    // console.log(ships);
    setShippings(ships);
  };

  const [paymentMethods, setPaymentMethods] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const getPaymentMethods = async () => {
    const pMethods =  await axios.get("/api/admin/payment-methods/getAll");
    // console.log(pMethods);
    setPaymentMethods(pMethods);
  };
  const total = parseInt(subTotal) + parseInt(shippingCost);
  // console.log(total);

  useEffect(() => {
    getUserInfo();
    getShippings();
    getPaymentMethods();
    if(provider === 'strapi'){
      setUserId(user?.id);
    }else{
      setUserId(user?.uid);
    }
  }, []);

  

  const [phoneNo, setPhoneNo] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const order = async () => {
    try {

      const response = await axios.post("/api/admin/order/store", {
        data: {
          products: productData,
          user_id_no: user?._id,
          name: name,
          email: email,
          phone: phone,
          address: address,
          city: city,
          post_code: postalCode,
          country: country ? country : "Bangladesh",
          shipping_cost: shippingCost,
          payment_method: paymentMethod,
          phone_no: phoneNo,
          transaction_id: transactionId,
          subtotal: subTotal,
          total: total,
          sale_status: "pending",
          payment_status: "pending",
          delivery_status: "pending",
          order_notes: orderNotes,
          profile: profileId,
          user_id_no: userId.toString()
          
        },
      });

    //   console.log(response);
    //   dispatch(emptyCart());
      
    //   router.push("/success");
    //   setIsLoading(false);

    } catch (error) {
      console.log(error);
      toast.error(error.error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
    }


  };

  const orderSubmitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    order();
  };

  if (!user) {
    router.push("/account/login");
    return null;
  }

  return (
    <div className="page-wrapper p-5">
      <ToastContainer />

   {cartProducts.length > 0 && 
      <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">
            Checkout<span>Shop</span>
          </h1>
        </div>
        {/* End .container */}
      </div>
      {/* End .page-header */}
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="index.html">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="#">Shop</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Checkout
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            {/* <div className="checkout-discount">
          <form >
            <input
              type="text"
              className="form-control"
              required=""
              id="checkout-discount-input"
            />
            <label
              htmlFor="checkout-discount-input"
              className="text-truncate"
            >
              Have a coupon? <span>Click here to enter your code</span>
            </label>
          </form>
        </div> */}
            {/* End .checkout-discount */}

            <div className="row">
              <div className="col-lg-7">
                <h2 className="checkout-title">Billing Details</h2>
                {/* End .checkout-title */}
                <div className="row">
                  <div className="col-sm-6">
                    <label>Name </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required={true}
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
                      required={true}
                      value={email}
                      onChange={(e) => {
                        return setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <label>Phone No </label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      required={true}
                      value={phone}
                      onChange={(e) => {
                        return setPhone(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-sm-6">
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
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <label>Postal Code </label>
                    <input
                      type="text"
                      name="post_code"
                      className="form-control"
                      required=""
                      value={postalCode}
                      onChange={(e) => {
                        return setPostalCode(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-sm-6">
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

                  <div className="col-sm-6">
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
                {/* End .row */}

                {/* End .row */}

                <label>Order notes (optional)</label>
                <textarea
                  className="form-control"
                  cols={30}
                  rows={4}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </div>
              {/* End .col-lg-9 */}
              <aside className="col-lg-5">
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
                      {cartProducts?.map((cartProduct) => (
                        <CartProduct
                          key={cartProduct?.id}
                          cartProduct={cartProduct}
                        />
                      ))}

                      <tr className="summary-subtotal">
                        <td>Subtotal:</td>
                        <td></td>
                        <td></td>
                        <td>${subTotal}</td>
                      </tr>
                      <tr className="summary-shipping">
                        <td>Shipping:</td>
                        <td>&nbsp;</td>
                      </tr>
                      {/* End .summary-subtotal */}
                      {shippings?.data?.shippings?.map((ship) => (
                        <tr key={ship?._id} className="summary-shipping-row">
                          <td>
                            <div className="form-check ">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="shippingMethod"
                                  value={ship?.cost}
                                  style={{
                                    marginTop: ".6rem",
                                    marginLeft: "-2rem",
                                  }}
                                  onChange={shippingCostChangeHandler}
                                  checked={
                                    ship?.cost == shippingCost
                                  }
                                />
                                {ship?.name}
                              </label>
                            </div>
                            {/* End .custom-control */}
                          </td>
                          <td>BDT {ship?.cost}</td>
                        </tr>
                      ))}
                      <tr className="summary-total">
                        <td>Total:</td>
                        <td></td>
                        <td></td>
                        <td>BDT {total}</td>
                      </tr>
                      {/* End .summary-total */}
                    </tbody>
                  </table>
                  {/* End .table table-summary */}
                  <tr className="summary-shipping">
                    <td style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                      Payment Method:
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  {paymentMethods?.data?.paymentMethods?.map((method) => (
                    <tr key={method?._id} className="summary-shipping-row">
                      <td>
                        <div className="form-check ">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="paymentMethod"
                              value={method?.name}
                              style={{
                                marginTop: ".6rem",
                                marginLeft: "-2rem",
                              }}
                              onChange={(e) => {
                                setPaymentMethod(e.target.value);
                              }}
                              checked={
                                method?.name == paymentMethod
                              }
                            />
                            <p>{method?.name} </p>
                            <small>{method?.description}</small>
                          </label>
                        </div>
                        {/* End .custom-control */}
                      </td>
                    </tr>
                  ))}
                  {(paymentMethod === "Bkash" ||
                    paymentMethod === "Rocket" ||
                    paymentMethod === "Nagad") && (
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          placeholder="Mobile No"
                          className="form-control"
                          name="phonNo"
                          value={phoneNo}
                          onChange={(e) => {
                            setPhoneNo(e.target.value);
                          }}
                          style={{ marginTop: ".6rem", marginLeft: "-2rem" }}
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          placeholder="Transaction Id"
                          className="form-control"
                          name="transactionId"
                          value={transactionId}
                          onChange={(e) => {
                            setTransactionId(e.target.value);
                          }}
                          style={{ marginTop: ".6rem", marginLeft: "-2rem" }}
                        />
                      </div>
                    </div>
                  )}

                  {isLoading && <Loader />}

                  {/* End .accordion */}
                  <button
                    className="btn btn-outline-primary-2 btn-order btn-block mt-2"
                    onClick={orderSubmitHandler}
                  >
                    <span className="btn-text">Place Order</span>
                    <span className="btn-hover-text">
                      Proceed to Checkout
                    </span>
                  </button>
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
    </main>}

    {cartProducts.length === 0 && 
     <main className="main">
     <ToastContainer/>


{/* End .breadcrumb-nav */}
<div
className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"

>
<div className="container">

      <div className="row d-flex flex-column justify-content-center align-items-center ">
          <BsFillCartXFill style={{fontSize: "5rem", color:"brown", marginBottom:"3rem" }} />
          <h5>Cart is Empty.</h5>
          <h5 className="d-flex justify-center"> Do some shopping first.</h5>
      </div>
</div>
{/* End .container */}
</div>
{/* End .login-page section-bg */}
</main>
    }
    </div>
  );
};

export default withAuth(checkout);
