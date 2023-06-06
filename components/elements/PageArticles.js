import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PageArticles = ({blog}) => {
  console.log('pageArticles',blog);
  return (
    <article className="entry entry-list">
    <div className="row align-items-center">
      <div className="col-md-5">
        <figure className="entry-media">
          <Link href={`/blogs/${blog?.slug}`}>
          <Image
          src={blog?.image}
          alt={blog?.title}
          width={335}
          height={200}
        />
          </Link>
        </figure>
        {/* End .entry-media */}
      </div>
      {/* End .col-md-5 */}
      <div className="col-md-7">
        <div className="entry-body">
          <div className="entry-meta">
            <span className="entry-author">
              by <span>{blog?.author}</span>
            </span>
            <span className="meta-separator">|</span>
            <span>{new Date(blog?.createdAt).toLocaleDateString()}</span>
          
          </div>

          <h2 className="entry-title">
            <Link href={`/blogs/${blog?.slug}`}>{blog?.title}</Link>
          </h2>
          {/* End .entry-title */}
          <div className="entry-cats">
            in 
        
              <Link key={blog?._id} href={`/blog-cat/${blog?.subBlog?.slug}`} style={{color:'black'}}> | {blog?.subBlog?.title} </Link>
       
            
          </div>
          {/* End .entry-cats */}
          <div className="entry-content">
            <p>
            {blog?.attributes?.content.substring(0,150)}
            </p>
            <Link href={`/blogs/${blog?.slug}`} className="read-more">
              Continue Reading
            </Link>
          </div>
          {/* End .entry-content */}
        </div>
        {/* End .entry-body */}
      </div>
      {/* End .col-md-7 */}
    </div>
    {/* End .row */}
  </article>
  )
}

export default PageArticles