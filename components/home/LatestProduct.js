import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Mousewheel, Navigation, } from "swiper";
import ProductCard from '../product/ProductCard';
import { fetchDataFromApi } from '@/utils/api';

const LatestProduct = ({showToastMessage, products}) => {

console.log('latestPro', products);



const showToastMsg = (data)=>{
  showToastMessage({
    msg: data?.msg
  })
}

  return (
    <div className="container deal-section">
        <h3 className="title text-center mt-5 font-weight-bold">
          Latest Product
        </h3>

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
                    slidesPerView:5,
                  },
                  1280: {
                    slidesPerView: 5,
                  },
                }}
          
                navigation={true}
                mousewheel={false}
                keyboard={true}
                modules={[Navigation, Mousewheel, Keyboard]}
                className="mySwiper"
            >

                {
                    products?.products?.map((product)=><SwiperSlide key={product?.id}> 
                                                          <ProductCard key={product?.id} data = {product} showToastMsg={showToastMsg}/>
                                              </SwiperSlide>
                    )
                }
          </Swiper> 
    </div>
  )
}

export default LatestProduct;

