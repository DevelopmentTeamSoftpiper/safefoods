import React, { useEffect, useState } from "react";

import { fetchDataFromApi, getData } from "@/utils/api";
import useSWR from "swr";
import { useRouter } from "next/router";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import BestDeal from "@/components/home/ProductCarousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCarousel from "@/components/home/ProductCarousel";
import axios from "axios";
import Image from "next/image";
const maxResult = 3;

const CategoryProduct = ({ slug }) => {

  // const [pageIndex, setPageIndex] = useState(1);
  // const { query } = useRouter();

  // useEffect(() => {
  //   setPageIndex(1);
  // }, [query]);

  // const { data, error, isLoading } = useSWR(
  //   `/api/products?populate=*&[filters][category][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
  //   fetchDataFromApi,
  //   {
  //     fallbackData: products,
  //   }
  // );

    const [categories, setCategories] = useState(null);
    const [category, setCategory]= useState(null);
    const [products, setProducts]= useState(null);
  const fetchCategories = async () => {
    const {data} = await axios.get("/api/admin/category/getAll");
    setCategories(data);
  };
  const fetchCategory = async () => {
    const category = await axios.get(`/api/admin/category/find?slug=${slug}`);
    setCategory(category);
  };
  const fetchProducts = async () => {
    const products = await axios.get( `/api/admin/category/getProducts?slug=${slug}`);
    setProducts(products);
  };

  useEffect(() => {
    fetchCategories();
    fetchCategory();
    fetchProducts();

  }, []);
  console.log(category);
  const showToastMsg =(data)=>{
    toast.success(data.msg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
   
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  return (
    <main className="main">
      <ToastContainer/>

    <div
      className="page-header text-center"
      style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="page-title">
          {category?.data?.category?.name}<span>Shop</span>
        </h1>
      </div>
      {/* End .container */}
    </div>
    {/* End .page-header */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href={`/category/${category?.data?.category?.slug}`}>{category?.data?.category?.name}</Link>
          </li>
        </ol>
      </div>
      {/* End .container */}
    </nav>
    {/* End .breadcrumb-nav */}
    <div className="page-content">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            {/* End .toolbox */}
            <div className="products mb-3">
              <div className="row justify-content-center">
              {products?.data?.products?.map((product) => (
          <div key={product?.id} className="col-6 col-md-4 col-lg-4 col-xl-3">
            <ProductCard key={product?.id} data={product} showToastMsg={showToastMsg} />
          </div>
        ))}
        
       
              </div>
              {/* End .row */}
            </div>
     
          </div>
          {/* End .col-lg-9 */}
          <aside className="col-lg-3 order-lg-first">
            <div className="sidebar sidebar-shop">
        
  
            <div className="col-lg-5cols d-none d-lg-block">
            <nav className="side-nav">
              <div className="sidenav-title letter-spacing-normal font-size-normal d-flex justify-content-xl-between align-items-center bg-primary justify-content-center text-truncate">
                Browse Categories
                <i className="icon-bars float-right h5 text-white m-0 d-none d-xl-block" />
              </div>
              {/* End .sidenav-title   font-size-normal */}
              <ul
                className="menu-vertical sf-arrows sf-js-enabled"
                style={{ touchAction: "pan-y", height:"350px" }}
              >
                {categories?.categories?.map((c) => (
                  <li key={c._id} className="megamenu-container">
                    <Link
                      className={
                        c?.subCategories?.length > 0
                          ? "sf-with-ul text-dark d-flex"
                          : "text-dark d-flex"
                      }
                      href={`/category/${c?.slug}`}
                    >
                      <Image
                        height={20}
                        width={20}
                        src={c?.image}
                        alt={c?.name}
                      />
                      {c?.name}
                    </Link>
                    {c?.subCategories?.length > 0 && (
                      <div className="megamenu">
                        <div className="row ">
                                <div className="col-md-12">
                                  <ul>
                                    {c?.subCategories?.map(
                                      (sub) => (
                                        <li key={sub?._id}>
                                          <Link
                                            href={`/subcategory/${sub?.slug}`}
                                          >
                                            {sub?.name}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

            </div>
            {/* End .sidebar sidebar-shop */}
          </aside>
          {/* End .col-lg-3 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}

    </div>
    {/* End .page-content */}
  </main>
  )
}

export default CategoryProduct

// export async function getStaticPaths() {
//   const categories = await getData("/api/admin/category/getAll");
//   const paths = categories?.categories?.map((c) => ({
//     params: {
//       slug: c?.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// `getStaticPaths` requires using `getStaticProps`
// export async function getStaticProps({ params: { slug } }) {
//   const category =  await getData(
//     `/api/admin/category/find?slug=${slug}`
//   );
//   const products = await getData(
//     `/api/admin/category/getProducts?slug=${slug}`
//   );

//   return {
//     props: {
//       category,
//       products,
//       slug,
//     },
//   };
// }

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  return { props: { slug:slug } };
};