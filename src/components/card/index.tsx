import Taro from "@tarojs/taro";
import React from "react";
import { View, Image } from "@tarojs/components";

import "./index.scss";

interface CardItem {
  id: string;
  image: string;
  title: string;
  apply_class: string;
  activity_title: string;
}

interface CardItemContainer {
  list: Array<CardItem>;
}

const Card = (props: CardItemContainer) => {
  const { list = [] } = props;

  const cardClickEvt: Function = (cardId: string) => {
    Taro.navigateTo({
      url: `/pages/courseDetail/index?id=${cardId}`,
    });
  };

  return (
    <View className="card">
      {list.map((item: CardItem, index: number) => {
        return (
          <View
            className="item"
            key={index}
            onClick={() => cardClickEvt(`${item.id}`)}
          >
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
