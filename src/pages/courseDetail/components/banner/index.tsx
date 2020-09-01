import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";

import { Swiper, SwiperItem } from "@tarojs/components";

import "./index.scss";

import PlayIcon from "@/resource/images/play-icon.png";

type Callback = () => void;

interface Props {
  banner: Array<string>;
  swiperClickEmit?: Function
}

const DetailBanner = (props: Props) => {
  // console.log(props, "detai-banner");
  const { banner = [], swiperClickEmit } = props;
  const [swiperList, setSwiperList] = useState<Array<string>>([]);

  useEffect(() => {
    setSwiperList(banner);
  }, [banner]);

  // const swiperChange: Function = (e) => {
  //   const {
  //     detail: { current },
  //   } = e;
  //   setNowIdx(current);
  // };
  const SwiperItemClick: Function = (index: Number) => {
    // console.log(index);
    if (index === 0 && swiperClickEmit) swiperClickEmit()
  };

  return (
    <View className="detail-banner">
      <Swiper className="swiperContainer" circular autoplay>
        {swiperList.map((item, index) => {
          return (
            <SwiperItem
              key={index}
              className="swiper-item"
              onClick={() => SwiperItemClick(index)}
            >
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
