import { fetchDataFromApi } from "@/utils/api";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");

  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/admin/product/getAll");
    console.log(data);
    const productData = data.products.map((p) => ({
      title: p?.title,
      price: p?.price,
      slug: p?.slug,
      url: p?.image,
    }));
    // console.log(data);
    // console.log("search", productData);
    setProducts(productData);
  };
  const filterChangeHandler = (e) => {
    const searchedWord = e.target.value;
    setQuery(e.target.value);

    // console.log("seaarchedWord", filterData);
    const newFilter = products.filter((value) => {
      return value.title.toLowerCase().includes(searchedWord.toLowerCase());
    });
    if (searchedWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };


  const clearInputHandler = () => {
    setQuery("");
    setFilterData([]);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div
        className="header-center d-flex flex-column "
        style={{ position: "relative" }}
      >
        <div className="header-search header-search-visible header-search-no-radius">
          <Link href="#" className="search-toggle" role="button">
            <i className="icon-search" />
          </Link>

          <div className="header-search-wrapper search-wrapper-wide">
            {/* <div className="select-custom">
              <select id="cat" name="cat">
                <option value="">All Departments</option>
                <option value={1}>Fashion</option>
                <option value={2}>- Women</option>
                <option value={3}>- Men</option>
                <option value={4}>- Jewellery</option>
                <option value={5}>- Kids Fashion</option>
                <option value={6}>Electronics</option>
                <option value={7}>- Smart TVs</option>
                <option value={8}>- Cameras</option>
                <option value={9}>- Games</option>
                <option value={10}>Home &amp; Garden</option>
                <option value={11}>Motors</option>
                <option value={12}>- Cars and Trucks</option>
                <option value={15}>- Boats</option>
                <option value={16}>- Auto Tools &amp; Supplies</option>
              </select>
            </div> */}
            {/* End .select-custom */}
            <label htmlFor="q" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="q"
              id="q"
              value={query}
              onChange={filterChangeHandler}
              placeholder="Search product ..."
              required=""
            />

            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </div>
          {/* End .header-search-wrapper */}
        </div>

        {/* End .header-search */}

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
                <li key={p?.id} className="megamenu-container" onClick={clearInputHandler}>
                  <Link
                    className="d-flex align-items-center"
                    href={`/product/${p?.slug}`}
                  >
                    <Image height={30} width={30} src={p?.url} alt={p?.title} />
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
    </>
  );
};

export default Search;
