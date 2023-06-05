import { fetchDataFromApi, getData } from "@/utils/api";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
const SingleBlog = ({ slug }) => {


  

  const [blogCats, setBlogCats] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState(null);
  const [blog, setBlog] = useState(null);
  const fetchBlog = async()=>{
    const blog = await axios.get(`/api/admin/blog/find?slug=${slug}`)
    console.log(blog);
    setBlog(blog);

  }
  const fetchCatBlogs = async()=>{
    const blogCats = await axios.get("/api/admin/sub-blog/getAll")
    console.log(blogCats);
    setBlogCats(blogCats);

  }
  const fetchRelatedBlogs = async()=>{
    const relatedBlogs = await axios.get("/api/admin/blog/getAll")
    console.log(relatedBlogs);
    setRelatedBlogs(relatedBlogs);

  }
  useEffect(()=>{
    fetchCatBlogs();
    fetchBlog();
    fetchRelatedBlogs();
  },[slug])

  const bl = blog?.data?.blog;
  const htmlContent = bl?.content;
  return (
    <main className="main px-5">

      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/blogs">Blogs</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
             {bl?.title}
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
              <article className="entry single-entry">
                <figure className=" d-flex justify-content-center">
                  <Image
                    src={bl?.image}
                    alt={bl?.title}
                    width={400}
                    height={200}
                  />
                </figure>
                {/* End .entry-media */}
                <div className="entry-body">
                  <div className="entry-meta">
                    <span className="entry-author">
                      by <span>{bl?.author}</span>
                    </span>
                    <span className="meta-separator">|</span>
                    <a href="#">
                      {new Date(bl?.updatedAt).toLocaleDateString()}
                    </a>
                  </div>
                  {/* End .entry-meta */}
                  <h2 className="entry-title">{bl?.title}</h2>
                  {/* End .entry-title */}
                  <div className="entry-cats">
                    in   
              <Link key={bl?.subBlog?.id} href={`/blogs/category/${bl?.subBlog?.slug}`} style={{color:'black'}}> | {bl?.subBlog?.title} </Link>
       
                  </div>
                  {/* End .entry-cats */}
                  <div className="entry-content editor-content">
                     <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  </div>
                </div>
              </article>
            </div>
            <aside className="col-lg-3">
              <div className="sidebar">

                <div className="widget widget-cats">
                  <h3 className="widget-title">Categories</h3>
                  <ul>
                  {blogCats?.data?.subBlogs?.map((cat)=>(
                      <li key={cat?.id}>
                      <a href={`/blogs/category/${cat?.slug}`}>
                        {cat?.title}
                      </a>
                    </li>
                  ))}
                  </ul>
                </div>
                <div className="widget">
                  <h3 className="widget-title">Popular Posts</h3>
                  <ul className="posts-list">
                   {relatedBlogs?.data?.blogs?.map((rb)=>(
                     <li key={rb?._id}>
                     <figure>
                       <Link href={`/blogs/${rb?.slug}`}>
                         <Image
                           src={rb?.image}
                           alt="post"
                           width={100}
                           height={100}
                         />
                       </Link>
                     </figure>
                     <div>
                       <span>{new Date(rb?.createdAt).toLocaleDateString()}</span>
                       <h4>
                         <Link href={`/blogs/${rb?.slug}`}>{rb?.title}</Link>
                       </h4>
                     </div>
                   </li>
                   ))}    
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleBlog;

// export async function getStaticPaths() {
//   const blogs = await getData("/api/admin/blog/getAll");
//   const paths = blogs?.blogs?.map((p) => ({
//     params: {
//       slug: p?.slug.toString(),
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// `getStaticPaths` requires using `getStaticProps`
// export async function getStaticProps({ params: { slug } }) {
//   const blog = await getData(
//     `/api/admin/blog/find?slug=${slug}`
//   );
//   const blogCats=  await getData(
//     `/api/admin/sub-blog/getAll`
//   );
//   const relatedBlogs = await getData("/api/admin/blog/getAll");

//   return {
//     props: {
//       blog,
//       relatedBlogs,
//       slug,
//       blogCats
//     },
//   };
// }

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  return { props: { slug:slug } };
};