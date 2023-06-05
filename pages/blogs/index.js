import PageArticles from '@/components/elements/PageArticles';
import { fetchDataFromApi, getData } from '@/utils/api';
import Link from 'next/link';
import React from 'react'

const Blog = ({blogs,blogCats}) => {
  console.log('blog page', blogs);
  return (
    <main className="main px-5">
    <div
      className="page-header text-center"
      style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="page-title">
          Safefood Blogs
        </h1>
      </div>
      {/* End .container */}
    </div>
    {/* End .page-header */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/">Blogs</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Listing
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
            {blogs?.blogs?.map((blog)=>(
         <PageArticles key={blog?.id} blog={blog}/>

            ))}

            {/* <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a
                    className="page-link page-link-prev"
                    href="#"
                    aria-label="Previous"
                    tabIndex={-1}
                    aria-disabled="true"
                  >
                    <span aria-hidden="true">
                      <i className="icon-long-arrow-left" />
                    </span>
                    Prev
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link page-link-next"
                    href="#"
                    aria-label="Next"
                  >
                    Next{" "}
                    <span aria-hidden="true">
                      <i className="icon-long-arrow-right" />
                    </span>
                  </a>
                </li>
              </ul>
            </nav> */}
          </div>
          {/* End .col-lg-9 */}
          <aside className="col-lg-3">
            <div className="sidebar">
              {/* <div className="widget widget-search">
                <h3 className="widget-title">Search</h3>
        
                <form action="#">
                  <label htmlFor="ws" className="sr-only">
                    Search in blog
                  </label>
                  <input
                    type="search"
                    className="form-control"
                    name="ws"
                    id="ws"
                    placeholder="Search in blog"
                    required=""
                  />
                  <button type="submit" className="btn">
                    <i className="icon-search" />
                    <span className="sr-only">Search</span>
                  </button>
                </form>
              </div> */}
              {/* End .widget */}
              <div className="widget widget-cats">
                <h3 className="widget-title">Categories</h3>
                {/* End .widget-title */}
                <ul>
                {blogCats?.subBlogs?.map((cat)=>(
                      <li key={cat?.id}>
                      <a href={`/blogs/category/${cat?.slug}`}>
                        {cat?.title}
                      </a>
                    </li>
                  ))}
 
                </ul>
              </div>
  
            </div>
            {/* End .sidebar */}
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

export default Blog


export async function getServerSideProps(context) {
  const blogs = await getData("/api/admin/blog/getAll");
  const blogCats=  await getData(
    `/api/admin/sub-blog/getAll`
  );
  return {
    props: {
      blogs,
      blogCats
    },
  };
}