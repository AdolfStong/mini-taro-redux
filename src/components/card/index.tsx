import React from "react";
import { View, Image } from "@tarojs/components";

import "./index.scss";

const Card = (props: any) => {
  const { list = [] } = props;

  return (
    <View className="card">
      {list.map((item: any, index: string) => {
        return (
          <View className="item" key={index}>
            <Image className="img" mode="widthFix" src={item.image}></Image>
            <View className="title">{item.title}</View>
            <View className="card-labels">
              <View className="apply_class label">{item.apply_class}</View>
              <View className="activity_title label">
                {item.activity_title}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Card;
