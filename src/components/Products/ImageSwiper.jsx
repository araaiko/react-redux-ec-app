import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper";
import Noimage from "../../assets/img/src/no_image.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/virtual";

const ImageSwiper = (props) => {
  const images = props.images;

  return (
    <Swiper
      modules={[Navigation, Pagination, Virtual]}
      slidesPerView={1}
      pagination={{
        type: "bullets",
        clickable: true,
        dynamicBullets: true,
      }}
      navigation
      virtual
    >
      {images.length === 0 ? (
        <SwiperSlide className="p-media__thumb">
          <img src={Noimage} alt="代替画像" />
        </SwiperSlide>
      ) : (
        images.map((image, index) => (
          <SwiperSlide
            className="p-media__thumb"
            key={image.path}
            virtualIndex={index}
          >
            <img src={image.path} alt="商品画像" />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default ImageSwiper;
