import Taro from "@tarojs/taro";
import React from "react";
import { View, Image } from "@tarojs/components";

import "./index.scss";
import DisnetImg from "@/resource/images/disnet.png";

const Disnet = () => {
  const refreshHandle: Function = () => {
    Taro.switchTab({
      url: "/pages/index/index",
    });
  };
  return (
    <View className="disnet">
      <Image mode="widthFix" src={DisnetImg} className="img"></Image>
      <View className="refresh-btn" onClick={() => refreshHandle()}>
        刷新试试
      </View>
    </View>
  );
};

export default Disnet;
