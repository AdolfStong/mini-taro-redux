import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";

import { Swiper, SwiperItem } from "@tarojs/components";

import "./index.scss";

const Banner = (props: any) => {
  console.log("111", props);
  const { banner = [] } = props;
  return (
    <View className="banner">
      <Swiper
        className="swiperContainer"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        {banner.map((item, index) => {
          return (
            <SwiperItem key={index}>
              <View className="imgContainer">
                <Image
                  className="swiper-img"
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
