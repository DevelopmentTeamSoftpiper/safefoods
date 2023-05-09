import { fetchDataFromApi } from '@/utils/api';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Search = () => {
    const [filterData, setFilterData] = useState([]);
    const [query, setQuery] = useState("");

    const [products, setProducts] = useState(null);
    useEffect(() => {
      fetchProducts();
    }, []);
    const fetchProducts = async () => {
      const { data } = await fetchDataFromApi("/api/products?populate=*");
      setProducts(data);
    
    };
// console.log(products);
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

      const clearInputHandler = () => {
        setQuery("");
        setFilterData([]);
      };

  return (
<>
<div className="header-center d-flex flex-column ">
    <div className="header-search header-search-visible header-search-no-radius">
      <a href="#" className="search-toggle" role="button">
        <i className="icon-search" />
      </a>
      <form action="#" method="get">
        <div className="header-search-wrapper search-wrapper-wide">
          <div className="select-custom">
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
          </div>
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
        
      </form>
      

    </div>
    
    {/* End .header-search */}
    {/* <div class="container">
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action active">
          Search Results
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <Image src="https://res.cloudinary.com/dz5nyqdv5/image/upload/v1683592036/medium_safefoods_4f9f35f05f.jpg" alt="Video thumbnail" class="mr-3" height={20} width={20}/>
          <div class="media-body">
            <h5 class="mt-0">Video Title</h5>
            <p>Description</p>
          </div>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <Image src="https://res.cloudinary.com/dz5nyqdv5/image/upload/v1683592036/medium_safefoods_4f9f35f05f.jpg" alt="Video thumbnail" class="mr-3" height={20} width={20}/>
          <div class="media-body">
            <h5 class="mt-0">Video Title</h5>
            <p>Description</p>
          </div>
        </a>

      </div>
    </div>
  </div>
</div>
     */}
  </div>
    
</>
  )
}

export default Search