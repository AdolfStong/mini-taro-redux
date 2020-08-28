import Taro from "@tarojs/taro";
import React from "react";
import { View, Image } from "@tarojs/components";

import "./index.scss";
import NodataImg from "@/resource/images/no-data.png";

const Nodata = () => {
  const goBuy: Function = () => {
    Taro.switchTab({
      url: "/pages/index/index",
    });
  };
  return (
    <View className="no-data">
      <Image mode="widthFix" src={NodataImg} className="img"></Image>
      <View className="desc">
        <View>亲，您目前还没有可学习的课程哦~</View>
        <View>也可能是您还没购买该类课程，快去选选吧~</View>
      </View>
      <View className="btn buy" onClick={() => goBuy()}>
        去购课
      </View>
      <View className="btn gift" onClick={() => goBuy()}>
        去赠课
      </View>
    </View>
  );
};

export default Nodata;
