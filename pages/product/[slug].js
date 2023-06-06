import React, { useState } from "react";
import { fetchDataFromApi, getData } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LatestProduct from "@/components/home/LatestProduct";
import RelatedProducts from "@/components/product/RelatedProduct";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ProductDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log('slug', slug);
  const [product, setProduct]= useState(null);

const fetchProducts = async () => {
  const product = await axios.get( `/api/admin/product/find?slug=${slug}`);
  console.log(product);
  setProduct(product);
};

useEffect(() => {
  fetchProducts();

}, [slug]);
  console.log(product);
  const p = product?.data?.product;
  const dispatch = useDispatch();
  const showToastMessage =(data)=>{
    toast.success(data.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
   
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const [quantity, setQuantity] = useState(1);
  // console.log(quantity);
  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container d-flex align-items-center">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="#">Products</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {p?.title}
            </li>
          </ol>
        </div>
      </nav>
      <ToastContainer/>

      <div className="page-content">
        <div className="container">
          <div className="product-details-top">
            <div className="row">
              <div className="col-md-6">
                <div className="product-gallery product-gallery-vertical">
                  <div className="row">
                    <figure className="product-main-image">
                      <Image
                        id="product-zoom"
                        src={p?.image}
                        data-zoom-image={p?.image}
                        width={300}
                        height={300}
                        alt={p?.title}
                        priority="true"
                      />
                      <Link
                        href="#"
                        id="btn-product-gallery"
                        className="btn-product-gallery"
                      >
                        <i className="icon-arrows" />
                      </Link>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-details">
                  <h1 className="product-title">{p?.title}</h1>

                  <div className="product-price">{p?.price}BDT</div>
                  <div className="product-content">
                    <p>{p?.shortDescription}</p>
                  </div>
                  {/* 
              <div className="details-filter-row details-row-size">
                <label htmlFor="size">Size:</label>
                <div className="select-custom">
                  <select name="size" id="size" className="form-control">
                    <option value="#" selected="selected">
                      Select a size
                    </option>
                    <option value="s">Small</option>
                    <option value="m">Medium</option>
                    <option value="l">Large</option>
                    <option value="xl">Extra Large</option>
                  </select>
                </div>
               
              
              </div> */}
                  <div className="details-filter-row details-row-size">
                    <label htmlFor="qty">Qty:</label>
                    <div className="product-details-quantity">
                      <input
                        type="number"
                        id="qty"
                        className="form-control"
                        defaultValue={1}
                        min={1}
                        max={10}
                        step={1}
                        data-decimals={0}
                        required=""
                        value={quantity}
                        onChange={(e)=>{setQuantity(e.target.value)}}
                      />
                    </div>
                  </div>
                  <div className="product-details-action">

                    <button className="btn-product btn-cart" onClick={()=>{
                            dispatch(addToCart({
                              ...p,
                              oneQuantityPrice: p?.price,
                              quantity:quantity
                            }));
                            toast.success("Product Added to Cart", {
                              position: "top-right",
                              autoClose: 1000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                              });
                      }}>
                        <span id='btn-add-to-cart'>add to cart</span>
                    </button>

                  </div>
                  <div className="product-details-footer">
                    <div className="product-cat ml-2">
                      <span>Category:</span>

                      <Link
                        href={`/category/${p?.category?.slug}`}
                        style={{color: "#61AB00",fontWeight:600}}
                      >
                        {" "}
                        {p?.category?.name}
                      </Link>
                    </div>
                    <div className="product-cat ml-2">
                      <span>Sub-Category:</span>

                      <Link
                        href={`/subcategory/${p?.subCategory?.slug}`}
                        style={{color: "#61AB00",fontWeight:600}}
                      >
                        {" "}
                        {p?.subCategory?.name}
                      </Link>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="product-details-tab">
            <ul className="nav nav-pills justify-content-start" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="product-desc-link"
                  data-toggle="tab"
                  href="#product-desc-tab"
                  role="tab"
                  aria-controls="product-desc-tab"
                  aria-selected="true"
                >
                  Description
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="product-desc-tab"
                role="tabpanel"
                aria-labelledby="product-desc-link"
              >
                <div className="product-desc-content">
                  <h3>Product Information</h3>
                  <p>
                    <ReactMarkdown>{p?.description}</ReactMarkdown>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* < RelatedProducts products={products} showToastMessage={showToastMessage} /> */}
      </div>



    </main>
  );
};

export default ProductDetails;

// export async function getStaticPaths() {
//   const products = await getData("/api/admin/product/getAll");
//   const paths = products?.products?.map((p) => ({
//     params: {
//       slug: p?.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// `getStaticPaths` requires using `getStaticProps`
// export async function getStaticProps({ params: { slug } }) {
//   const product = await getData(
//     `/api/admin/product/find?slug=${slug}`
//   );
//   // const products = await fetchDataFromApi(
//   //   `/api/products?populate=*&[filters][slug][$ne]=${slug}`
//   // );

//   return {
//     props: {
//       product,
//       // products,
//       slug,
//     },
//   };
// }

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  return { props: { slug:slug } };
};
