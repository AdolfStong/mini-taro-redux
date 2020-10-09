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

/**
 * @description card 排列方式
 * @params { type: 1/2, list: [] }
 */
interface CardItemContainer {
  list: Array<CardItem>;
  type?: number;
}

const Card = (props: CardItemContainer) => {
  const { list = [], type = 1 } = props;

  const cardClickEvt: Function = (cardId: string) => {
    Taro.navigateTo({
      url: `/pages/courseDetail/index?id=${cardId}`,
    });
  };

  return (
    <View className={`card ${type === 2 ? "card-type" : ""}`}>
      {list.map((item: CardItem, index: number) => {
        return (
          <View
            className="item"
            key={index}
            onClick={() => cardClickEvt(`${item.id}`)}
          >
            <Image
              className="img"
              mode="widthFix"
              lazy-load
              src={item.image}
            ></Image>
            <View className="info">
              <View className="title">{item.title}</View>
              <View className="card-labels">
                <View className="apply_class label">{item.apply_class}</View>
                <View className="activity_title label">
                  {item.activity_title}
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
console.log("React.memo", React.memo);
export default React.memo(Card);
// export default Card;
