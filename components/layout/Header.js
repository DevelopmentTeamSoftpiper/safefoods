import React, { useEffect, useState } from "react";
import MobileMenuOverlay from "./MobileMenuOverlay";
import MobileMenuContainer from "./MobileMenuContainer";
import AuthModal from "../auth/AuthModal";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/userSlice";
import Search from "./Search";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { toast, ToastContainer } from "react-toastify";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/router";

const Header = ({ siteInfo }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);
  const provider = useSelector((state) => state.user.provider);

  const dispatch = useDispatch();

  const logOut = async () => {
    dispatch(logout());
    if (provider === "firebase") {
      await signOut(auth);
    }
    toast.success("Sign out successfully");
  };

  //menu tab
  const [tab, setTab] = useState("category");
  console.log(tab);

  // mobile menu
  const [closeMenu, setCloseMenu] = useState(false);
  const showMenuHandler = () => {
    setCloseMenu(!closeMenu);
  };

  const [categories, setCategories] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi("/api/categories?populate=*");
    setCategories(data);
  };

  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");

  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const { data } = await fetchDataFromApi("/api/products?populate=*");
    const productData = data.map((p) => ({
      title: p?.attributes?.title,
      price: p?.attributes?.price,
      slug: p?.attributes?.slug,
      url: p?.attributes?.image?.data?.[0]?.attributes?.url,
    }));
    console.log(data);
    console.log("search", productData);
    setProducts(productData);
  };
  const filterChangeHandler = (e) => {
    const searchedWord = e.target.value;
    setQuery(searchedWord);
    const newFilter = products.filter((value) => {
      return value.title.toLowerCase().includes(searchedWord.toLowerCase());
    });
    if (query === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  console.log("filter", filterData);

  const clearInputHandler = () => {
    setQuery("");
    setFilterData([]);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ToastContainer />
      <header className="header header-intro-clearance header-26">
        {/* End .header-top */}
        <div className="header-middle">
          <div className="container">
            <div className="header-left">
              <button className="mobile-menu-toggler" onClick={showMenuHandler}>
                <span className="sr-only">Toggle mobile menu</span>
                <i className="icon-bars" />
              </button>
              <Link href="/" className="logo">
                <Image
                  src={siteInfo?.data?.attributes?.logo?.data?.attributes?.url}
                  alt="safefoods Logo"
                  width={105}
                  height={25}
                />
              </Link>
            </div>
            {/* End .header-left */}
            <Search />

            <div className="header-right">
              <div className="header-dropdown-link">
                <ul className="top-menu">
                  <li>
                    {/* <Link href={user? "#": "/account/login"} className='' style={{backgroundColor: "#61AB00",color:"white", padding:"10px"}}>{user? "Account" : "Login/Register"}</Link> */}

                    <div className="header-dropdown">
                      <Link
                        href={user ? "#" : "/account/login"}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#61AB00",
                          padding: "10px",
                          minWidth: "100px",
                          paddingRight: "17px",
                        }}
                      >
                        {user ? (
                          <li className="text-white"> Account </li>
                        ) : (
                          <li>
                            <Link href="/account/login" className="text-white">
                              Login /
                            </Link>
                            <Link
                              href="/account/register"
                              className="text-white"
                            >
                              Register
                            </Link>
                          </li>
                        )}
                      </Link>

                      {user && (
                        <div className="header-menu">
                          <ul>
                            <li>
                              <Link href="/account/details">Account Details</Link>
                            </li>
                            <li>
                              <Link href="/account/edit-profile">Edit Profile</Link>
                            </li>
                             <li>
                              <Link href="/account/orders">Orders</Link>
                            </li>
                            <li>
                              <button
                                style={{ paddingLeft: "15px" }}
                                onClick={() => {
                                  logOut();
                                }}
                              >
                                Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                      {/* End .header-menu */}
                    </div>

                    {/* <li>
                  <a href="#signin-modal" data-toggle="modal">
                    Sign in / Sign up
                  </a>
                </li> */}
                  </li>
                </ul>
                <Cart />
              </div>
            </div>
            {/* End .header-right */}
          </div>
          {/* End .container */}
        </div>
        {/* End .header-middle */}
        <div className="header-bottom sticky-header">
          <div className="container d-flex justify-center">
            <div className="">
              <nav className="main-nav">
                <ul className="menu sf-arrows">
                  <li className={router.pathname === "/" ? "active" : ""}>
                    <Link href="/">Home</Link>
                  </li>
                  <li className={router.pathname === "/shop" ? "active" : ""}>
                    <Link href="/shop">Shop</Link>
                  </li>
                  <li className={router.pathname === "/about" ? "active" : ""}>
                    <Link href="/about">About</Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/private-policy" ? "active" : ""
                    }
                  >
                    <Link href="/private-policy">Private Policy</Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/returns-refund" ? "active" : ""
                    }
                  >
                    <Link href="/returns-refund">Refund & Returns</Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/terms-and-conditions"
                        ? "active"
                        : ""
                    }
                  >
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li
                    className={router.pathname === "/contact" ? "active" : ""}
                  >
                    <Link href="/contact">Contact</Link>
                  </li>

                  {/* <li>
                <a href="blog.html" className="sf-with-ul">
                  Blog
                </a>
                <ul>
                  <li>
                    <a href="blog.html">Classic</a>
                  </li>
                  <li>
                    <a href="blog-listing.html">Listing</a>
                  </li>
                  <li>
                    <a href="#">Grid</a>
                    <ul>
                      <li>
                        <a href="blog-grid-2cols.html">Grid 2 columns</a>
                      </li>
                      <li>
                        <a href="blog-grid-3cols.html">Grid 3 columns</a>
                      </li>
                      <li>
                        <a href="blog-grid-4cols.html">Grid 4 columns</a>
                      </li>
                      <li>
                        <a href="blog-grid-sidebar.html">Grid sidebar</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Masonry</a>
                    <ul>
                      <li>
                        <a href="blog-masonry-2cols.html">Masonry 2 columns</a>
                      </li>
                      <li>
                        <a href="blog-masonry-3cols.html">Masonry 3 columns</a>
                      </li>
                      <li>
                        <a href="blog-masonry-4cols.html">Masonry 4 columns</a>
                      </li>
                      <li>
                        <a href="blog-masonry-sidebar.html">Masonry sidebar</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Mask</a>
                    <ul>
                      <li>
                        <a href="blog-mask-grid.html">Blog mask grid</a>
                      </li>
                      <li>
                        <a href="blog-mask-masonry.html">Blog mask masonry</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Single Post</a>
                    <ul>
                      <li>
                        <a href="single.html">Default with sidebar</a>
                      </li>
                      <li>
                        <a href="single-fullwidth.html">Fullwidth no sidebar</a>
                      </li>
                      <li>
                        <a href="single-fullwidth-sidebar.html">
                          Fullwidth with sidebar
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li> */}
                </ul>
                {/* End .menu */}
              </nav>
              {/* End .main-nav */}
            </div>
            {/* End .header-center */}
            {/* <div className="header-right">
          <i className="la la-lightbulb-o" />
          <p className="text-dark">Clearance Up to 30% Off</p>
        </div> */}
          </div>
          {/* End .container */}
        </div>
        {/* End .header-bottom */}
      </header>
      {/* <MobileMenuOverlay
        showMenu={showMenu}
        menuCloseHandler={menuCloseHandler}
      /> */}
      {/* <MobileMenuContainer
        showMenu={showMenu}
        menuCloseHandler={menuCloseHandler}
      /> */}

      {/* Mobile Menu overlay */}

      <div
        className="mobile-menu-overlay"
        style={{
          visibility: closeMenu ? "visible" : "",
          opacity: closeMenu ? 1 : 0,
        }}
        onClick={showMenuHandler}
      ></div>
      {/* Mobile Menu Container */}
      <div
        className="mobile-menu-container"
        style={{
          visibility: "visible",
          transform: closeMenu ? "translateX(280px)" : "translateX(0px)",
        }}
      >
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close" onClick={showMenuHandler}>
            <i className="icon-close" />
          </span>
          <div style={{ position: "relative", marginBottom: "2rem" }}>
            <div className="d-flex align-items-center justify-content-between">
              <input
                type="search"
                className="form-control"
                style={{ marginBottom: "0rem" }}
                name="mobile-search"
                id="mobile-search"
                placeholder="Search in..."
                required=""
                value={query}
                onChange={filterChangeHandler}
              />
              <button
                className="btn btn-primary btn-sm"
                style={{ minWidth: "30px" }}
                type="submit"
              >
                <i className="icon-search" />
              </button>
            </div>

            {filterData.length !== 0 && query.length > 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 46,
                  left: 0,
                  zIndex: 100,
                  width: "100%",
                  backgroundColor: "whitesmoke",
                }}
              >
                <ul
                  className="menu-vertical sf-arrows sf-js-enabled"
                  style={{ touchAction: "pan-y" }}
                >
                  {filterData?.map((p) => (
                    <li
                      key={p?.id}
                      className="megamenu-container"
                      onClick={() => {
                        showMenuHandler();
                        clearInputHandler();
                      }}
                      // onClick={showMenuHandler}
                    >
                      <Link
                        className="d-flex align-items-center"
                        href={`/product/${p?.slug}`}
                        onClick={() => {
                          showMenuHandler();
                          clearInputHandler();
                        }}
                      >
                        <Image
                          height={30}
                          width={30}
                          src={p?.url}
                          alt={p?.title}
                        />
                        <span className="d-flex align-items-center">
                          {p?.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <ul className="nav nav-pills-mobile" role="tablist">
            <li className="nav-item">
              <Link
                className="nav-link font-size-normal second-primary-color font-weight-normal text-uppercase active"
                // id="mobile-menu-link"
                // data-toggle="tab"
                href="#"
                // role="tab"
                // aria-controls="mobile-menu-tab"
                // aria-selected="true"
                onClick={() => {
                  setTab("category");
                }}
              >
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link font-size-normal second-primary-color font-weight-normal text-uppercase"
                // id="mobile-cats-link"
                // data-toggle="tab"
                href="#"
                // role="tab"
                // aria-controls="mobile-cats-tab"
                // aria-selected="false"
                onClick={() => {
                  setTab("menu");
                }}
              >
                Menu
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            {tab === "category" && (
              <div
                className="tab-pane  show "
                style={{ display: "block" }}
                // id="mobile-menu-tab"
                // role="tabpanel"
                // aria-labelledby="mobile-menu-link"
              >
                <nav className="mobile-nav">
                  <ul className="mobile-menu">
                    {categories?.map((c) => (
                      <li
                        key={c?.id}
                        className="active"
                        onClick={showMenuHandler}
                      >
                        <Link
                          href={`/category/${c?.attributes?.slug}`}
                          onClick={showMenuHandler}
                        >
                          {c?.attributes?.name}
                        </Link>
                        {c?.attributes?.sub_categories?.data?.length > 0 && (
                          <ul style={{ display: "block" }}>
                            {c?.attributes?.sub_categories?.data?.map((sub) => (
                              <Link
                                key={sub?.id}
                                href={`/subcategory/${sub?.attributes?.slug}`}
                                onClick={showMenuHandler}
                              >
                                <li>{sub?.attributes?.name}</li>
                              </Link>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {tab === "menu" && (
              <div
                className="tab-pane  show"
                style={{ display: "block" }}
                // id="mobile-cats-tab"
                // role="tabpanel"
                // aria-labelledby="mobile-cats-link"
              >
                <nav className="mobile-cats-nav">
                  <ul className="mobile-cats-menu">
                    <li onClick={showMenuHandler}>
                      <Link className="mobile-cats-lead" href="/">
                        Home
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link className="mobile-cats-lead" href="/shop">
                        Shop
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link className="mobile-cats-lead" href="/about">
                        About
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link className="mobile-cats-lead" href="/private-policy">
                        Private Policy
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link className="mobile-cats-lead" href="/returns-refund">
                        Refund & Returns
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link
                        className="mobile-cats-lead"
                        href="/terms-and-conditions"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link className="mob ile-cats-lead" href="/contact">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                  {/* End .mobile-cats-menu */}
                </nav>
              </div>
            )}
          </div>
          {/* End .tab-content */}

          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>
      {/* <AuthModal/> */}
    </>
  );
};

export default Header;
