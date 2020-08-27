import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";

import { Swiper, SwiperItem } from "@tarojs/components";

import "./index.scss";

const Banner = (props: any) => {
  console.log("111", props);
  const { banner = [] } = props;
  const [nowIdx, setNowIdx] = useState<Number>(0);

  const swiperChange: Function = (e) => {
    const {
      detail: { current },
    } = e;
    setNowIdx(current);
  };
  return (
    <View className="banner">
      <Swiper
        className="swiperContainer"
        circular
        autoplay={false}
        previousMargin="50px"
        nextMargin="50px"
        onChange={(e) => swiperChange(e)}
      >
        {banner.map((item, index) => {
          return (
            <SwiperItem key={index} className="swiper-item">
              <View className="imgContainer">
                <Image
                  className={`swiper-img ${
                    nowIdx === index ? "swiper-active" : ""
                  }`}
                  mode="widthFix"
                  src={item.pic}
                ></Image>
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
    </View>
  );
};

export default Banner;
