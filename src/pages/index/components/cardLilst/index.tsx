import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import ClassifyTitle from "@/components/classifyTitle";
import Card from "@/components/card";

import "./index.scss";

const CardLilst = (props: any) => {
  console.log("111", props);
  const { banner = [] } = props;
  return (
    <View className="cardList">
      <ClassifyTitle title={""} hasMore={true}></ClassifyTitle>
      <Card></Card>
    </View>
  );
};

export default CardLilst;
