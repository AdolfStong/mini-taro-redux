import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";


import "./index.scss";

const Card = (props: any) => {
  console.log("Card-props:", props);
  const Img = 'https://s6.pipacode.cn/b7d5e202008141523008012.jpg'
  const { banner = [] } = props;
  return (
    <View className="card">
      <View className="item">
        <Image
          className="img"
          mode="widthFix"
          src={Img}
        ></Image>
        <View className="title">loremfajfldfjlafjlaf </View>
        <View className="card-labels">
          <View className="apply_class label">3-12岁</View>
          <View className="activity_title label">儿童科学实验课</View>
        </View>
      </View>
      <View className="item">
        <Image
          className="img"
          mode="widthFix"
          src={Img}
        ></Image>
        <View className="title">loremfajfldfjlafjlaf </View>
        <View className="card-labels">
          <View className="apply_class label">3-12岁</View>
          <View className="activity_title label">儿童科学实验课</View>
        </View>
      </View>
      <View className="item">
        <Image
          className="img"
          mode="widthFix"
          src={Img}
        ></Image>
        <View className="title">loremfajfldfjlafjlaf </View>
        <View className="card-labels">
          <View className="apply_class label">3-12岁</View>
          <View className="activity_title label">儿童科学实验课</View>
        </View>
      </View>
      <View className="item">
        <Image
          className="img"
          mode="widthFix"
          src={Img}
        ></Image>
        <View className="title">loremfajfldfjlafjlaf </View>
        <View className="card-labels">
          <View className="apply_class label">3-12岁</View>
          <View className="activity_title label">儿童科学实验课</View>
        </View>
      </View>
    </View>
  );
};

export default Card;
