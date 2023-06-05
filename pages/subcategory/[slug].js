import React, { useEffect, useState } from "react";

import { fetchDataFromApi, getData } from "@/utils/api";
import useSWR from "swr";
import { useRouter } from "next/router";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import BestDeal from "@/components/home/ProductCarousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Image from "next/image";
const maxResult = 3;

const SubCategoryProduct = ({ slug }) => {
    // console.log(products);
    // const [pageIndex, setPageIndex] = useState(1);
    // const { query } = useRouter();
  
    // useEffect(() => {
    //   setPageIndex(1);
    // }, [query]);
  
    // const { data, error, isLoading } = useSWR(
    //   `/api/products?populate=*&[filters][sub_category][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    //   fetchDataFromApi,
    //   {
    //     fallbackData: products,
    //   }
    // );

    const [categories, setCategories] = useState(null);
    const [subCategory, setSubCategory]= useState(null);
    const [products, setProducts] = useState(null);

    const fetchCategories = async () => {
      const {data} = await axios.get("http://localhost:3000/api/admin/category/getAll");
      setCategories(data);
    };

    const fetchSubCategory = async () => {
      const subCategory = await axios.get(`/api/admin/sub-category/find?slug=${slug}`);
      setSubCategory(subCategory);
    };
    const fetchProducts = async () => {
      const products = await axios.get( `/api/admin/sub-category/getProducts?slug=${slug}`);
      setProducts(products);
    };
    useEffect(() => {
      fetchCategories();
      fetchSubCategory();
      fetchProducts();
    }, []);

console.log(subCategory);
    const showToastMsg =(data)=>{
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
  return (
    <main className="main">
    <div
      className="page-header text-center"
      style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="page-title">
        {subCategory?.data?.subCategory.name}<span>Shop</span>
        </h1>
      </div>
      {/* End .container */}
    </div>
    {/* End .page-header */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="index.html">Home</Link>
          </li>
          <li className="breadcrumb-item">
            {/* <Link href={`/category/${subCategory?.slug}`}>{category?.data?.[0]?.attributes?.category?.data?.attributes?.name}</Link> */}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
          {subCategory?.data?.subCategory?.name}
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
      <BestDeal title="Related Products" products={products}/>

    </div>
    {/* End .page-content */}
  </main>
  )
}

export default SubCategoryProduct

// export async function getStaticPaths() {
//     const subcategories = await getData("/api/admin/sub-category/getAll");
//     const paths = subcategories?.subcategories?.map((c) => ({
//       params: {
//         slug: c.slug,
//       },
//     }));
  
//     return {
//       paths,
//       fallback: false,
//     };
//   }
  
  // `getStaticPaths` requires using `getStaticProps`
  // export async function getStaticProps({ params: { slug } }) {
  //   const subCategory = await getData(
  //     `/api/admin/sub-category/find?slug=${slug}`
  //   );
  //   const products = await getData(
  //     `/api/admin/sub-category/getProducts?slug=${slug}`
  //   );
  
  //   return {
  //     props: {
  //       subCategory,
  //       products,
  //       slug,
  //     },
  //   };
  // }
  
  export const getServerSideProps = async (context) => {
    const { slug } = context.query;
    return { props: { slug:slug } };
  };