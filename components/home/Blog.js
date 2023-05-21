import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Mousewheel, Navigation, } from "swiper";
import Articles from '../elements/Articles';
const Blog = ({blogs}) => {
  return (
    <div className="blog-section bg-white py-2 pb-4">
    <div className="container">
      <div className="heading heading-flex">
        <div className="heading-left">
          <h2 className="title mb-0 font-weight-bold">From Our Blog</h2>
  
        </div>

        <div className="heading-right">
          <a
            href="category.html"
            className="title-link font-size-normal text-uppercase font-weight-normal"
          >
            View More Posts
            <i className="icon-long-arrow-right" />
          </a>
        </div>

      </div>

  


        <Swiper
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView:4,
                  },
                  1280: {
                    slidesPerView: 4,
                  },
                }}
          
                navigation={true}
                mousewheel={false}
                keyboard={true}
                modules={[Navigation, Mousewheel, Keyboard]}
                className="mySwiper"
            >

                {
                    blogs?.data?.map((blog)=><SwiperSlide key={blog?.id}> 
                                                          <Articles blog={blog}/>
                                              </SwiperSlide>
                    )
                }
          </Swiper> 


    </div>

    <div className="mb-lg-5" />
  </div>
  )
}

export default Blog