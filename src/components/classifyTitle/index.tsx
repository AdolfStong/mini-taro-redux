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
  const { title = "", desc = "", hasMore = true } = props;
  return (
    <View className="classifyTitle">
      <View className="left-title">
        <View className="title">{title || `听故事·长见识`}</View>
        {desc && <View className="desc">{`description`}</View>}
      </View>
      {hasMore && <View className="has-more-btn">1</View>}
    </View>
  );
};

export default ClassifyTitle;
