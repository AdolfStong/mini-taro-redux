import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";

import "./index.scss";

interface Props {
  title: string;
  desc?: string;
  hasMore: boolean;
}

const ClassifyTitle = (props: Props) => {
  console.log("classify-title", props);
  const { title = "", desc = "宝妈强烈推荐  孩子都争着学", hasMore = true } = props;
  return (
    <View className="classifyTitle">
      <View className="left-title">
        <View className="title-icon">
          <View className="icon"></View>
          <View className="title">{title || `听故事·长见识`}</View>
        </View>
        {desc && <View className="desc">{desc}</View>}
      </View>
      {hasMore && <View className="has-more-btn">更多</View>}
    </View>
  );
};

export default ClassifyTitle;
