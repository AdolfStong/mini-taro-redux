import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";

import { Swiper, SwiperItem } from "@tarojs/components";

import "./index.scss";

import PlayIcon from "@/resource/images/play-icon.png";

const DetailBanner = (props: any) => {
  // console.log(props, "detai-banner");
  const { banner = [] } = props;
  const [swiperList, setSwiperList] = useState<Array<string>>([]);

  useEffect(() => {
    console.log(banner);
    setSwiperList(banner);
  }, [banner]);

  // const swiperChange: Function = (e) => {
  //   const {
  //     detail: { current },
  //   } = e;
  //   setNowIdx(current);
  // };
  return (
    <View className="detail-banner">
      <Swiper className="swiperContainer" circular autoplay>
        {swiperList.map((item, index) => {
          return (
            <SwiperItem key={index} className="swiper-item">
              <View className="imgContainer">
                <Image
                  className="swiper-img"
                  mode="widthFix"
                  src={item}
                ></Image>
                {index === 0 && (
                  <View>
                    <Image
                      mode="widthFix"
                      className="play-icon"
                      src={PlayIcon}
                    ></Image>
                  </View>
                )}
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
    </View>
  );
};

export default DetailBanner;
