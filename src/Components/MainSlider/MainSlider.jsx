import React from "react";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import slider4 from "../../assets/images/grocery-banner.png";
import slider5 from "../../assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <div className="row w-11/12 mx-auto md:w-full py-5">
      <div className="w-full md:w-3/4">
        <Slider {...settings}>
          <img
            src={slider3}
            className="w-5/6 md:w-full md:object-cover object-fill h-[400px]"
            alt="slider3"
          />
          <img
            src={slider4}
            className="w-5/6 md:w-full md:object-cover object-fill h-[400px]"
            alt="slider4"
          />
          <img
            src={slider5}
            className="w-5/6 md:w-full md:object-cover object-fill h-[400px]"
            alt="slider5"
          />
        </Slider>
      </div>

      <div className="w-full md:w-1/4 flex md:flex-col">
        <img src={slider2} className="w-1/2 md:w-full h-[200px]" alt="" />
        <img src={slider3} className="w-1/2 md:w-full h-[200px]" alt="" />
      </div>
    </div>
  );
}
