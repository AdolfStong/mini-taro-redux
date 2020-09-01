import React from "react";
import { View } from "@tarojs/components";
import ClassifyTitle from "@/components/classifyTitle";
import Card from "@/components/card";

import "./index.scss";

interface CardItem {
  id: number;
  title: string;
  hasMore: boolean;
  describe: string;
  list: Array<any>;
}

interface cardContainer {
  card: CardItem;
}

const CardLilst = (props: cardContainer) => {
  const { card: { list = [], title = "", describe = "", id = 0 } = {} } = props;

  return (
    <View className="cardList">
      <ClassifyTitle
        id={id}
        title={title}
        hasMore={true}
        desc={describe}
      ></ClassifyTitle>
      <Card list={list}></Card>
    </View>
  );
};

export default CardLilst;
