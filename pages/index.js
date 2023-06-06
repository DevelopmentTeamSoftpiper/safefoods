import { fetchDataFromApi, getData } from "@/utils/api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileMenuOverlay from "@/components/layout/MobileMenuOverlay";
import MobileMenuContainer from "@/components/layout/MobileMenuContainer";
import Hero from "@/components/home/Hero";
import Banner1 from "@/components/home/Banner1";
import MiniBanner from "@/components/home/MiniBanner";
import HomeService from "@/components/home/HomeService";
import LatestProduct from "@/components/home/LatestProduct";
import ProductCarousel from "@/components/home/ProductCarousel";
import HomeCategory from "@/components/home/HomeCategory";
import TestCategory from "@/components/home/TestCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewsLetter from "@/components/home/NewsLetter";
import Blog from "@/components/home/Blog";
import { useState } from "react";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [catProducts, setCatProducts] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [mainSlider, setMinSlider] = useState(null);
  const [latestProducts, setLatestProducts] = useState(null);
  const [discountedProducts, setDiscountedProducts] = useState(null);
  const [bestDealProducts, setBestDealProducts] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchAllData = async () => {

    const pd = await getData("/api/admin/product/getAll");
    const ctg = await getData("/api/admin/category/getAll");
    const cPd = await await getData(
      "/api/admin/category/getProducts?categoryId=64788ad6dce8e2b6ba2c9d85"
    );
    const bg = await getData("/api/admin/blog/getAll");
    const mSld = await getData("/api/admin/slider/getAll");
    // const latestProduct = await fetchDataFromApi(`/api/products?populate=*&sort=id:desc&?pagination[page]=1&pagination[pageSize]=10`);
    const lsPd = await getData("/api/admin/product/getAll");
    const dPd = await getData("/api/admin/product/discounted");
    const bdPd = await getData("/api/admin/product/bestDeal");

    setProducts(pd);
    setCategories(ctg);
    setCatProducts(cPd);
    setBlogs(bg);
    setMinSlider(mSld);
    setLatestProducts(lsPd);
    setDiscountedProducts(dPd);
    setBestDealProducts(bdPd);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  console.log(blogs);
  const showToastMessage = (data) => {
    toast.success(data.msg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,

      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };


  const isData = products && categories && catProducts && blogs && mainSlider && latestProducts && latestProducts && 
  discountedProducts && bestDealProducts;

  return (
    <>
  {isData ?
  <div className="page-wrapper" style={{ padding: "10px" }}>
  <ToastContainer />

  {/* <Header /> */}
  <main className="main" style={{ backgroundColor: "#fafafa" }}>
    <Hero mainSlider={mainSlider} />
    <HomeService />
    {/* <HomeCategory categories={categories} /> */}
    <MiniBanner />
    <TestCategory
      catProducts={catProducts}
      showToastMessage={showToastMessage}
    />
    <LatestProduct
      products={latestProducts}
      showToastMessage={showToastMessage}
    />
    <Banner1 />
    <ProductCarousel
      title="Discount Sales"
      products={discountedProducts}
      showToastMessage={showToastMessage}
    />
    <ProductCarousel
      title="Best Deals"
      products={bestDealProducts}
      showToastMessage={showToastMessage}
    />
    <Blog blogs={blogs} />
    <NewsLetter />
  </main>
  {/* <Footer /> */}
</div>

: <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
  <ClipLoader color="#36d7b7" />
</div>
  }
      {/* <MobileMenuOverlay  />
      <MobileMenuContainer /> */}
    </>
  );
}

// export async function getServerSideProps(context) {
//   const products = await getData("/api/admin/product/getAll");
//   const categories = await getData("/api/admin/category/getAll");
//   const catProducts = await await getData(
//     "/api/admin/category/getProducts?categoryId=64788ad6dce8e2b6ba2c9d85"
//   );
//   const blogs = await getData("/api/admin/blog/getAll");
//   const mainSlider = await getData("/api/admin/slider/getAll");
//   // const latestProduct = await fetchDataFromApi(`/api/products?populate=*&sort=id:desc&?pagination[page]=1&pagination[pageSize]=10`);
//   const latestProducts = await getData("/api/admin/product/getAll");
//   const discountedProducts = await getData("/api/admin/product/discounted");
//   const bestDealProducts = await getData("/api/admin/product/bestDeal");

//   return {
//     props: {
//       products,
//       categories,
//       catProducts,
//       blogs,
//       mainSlider,
//       latestProducts,
//       discountedProducts,
//       bestDealProducts,
//     },
//   };
// }
