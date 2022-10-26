import React, { useEffect } from "react";
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import Noimage from "../../assets/img/src/no_image.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSwiper2 = (props) => {
  const images = props.images;

  useEffect(() => {
    // eslint-disable-next-line
    const swiper = new Swiper(".swiper", {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      loop: true,
      // autoplay: {
      //   delay: 1000,
      // },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {images.length === 0 ? (
          <div className="swiper-slide p-media__thumb">
            <img src={Noimage} alt="代替画像" />
          </div>
        ) : (
          images.map((image, index) => (
            <div key={index} className="swiper-slide p-media__thumb">
              <img src={image.path} alt="商品画像" />
            </div>
          ))
        )}
      </div>
      <div className="swiper-pagination"></div>

      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};

export default ImageSwiper2;
