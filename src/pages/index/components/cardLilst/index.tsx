import React from "react";
import { View } from "@tarojs/components";
import ClassifyTitle from "@/components/classifyTitle";
import Card from "@/components/card";

import "./index.scss";

const CardLilst = (props: any) => {
  const { card: { list = [], title = "", describe = "" } = {} } = props;

  return (
    <View className="cardList">
      <ClassifyTitle
        title={title}
        hasMore={true}
        desc={describe}
      ></ClassifyTitle>
      <Card list={list}></Card>
    </View>
  );
};

export default CardLilst;
