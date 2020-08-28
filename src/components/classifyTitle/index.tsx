import React from "react";
import { View } from "@tarojs/components";

import "./index.scss";

interface Props {
  id: number;
  title: string;
  desc?: string;
  hasMore: boolean;
}

const ClassifyTitle = (props: Props) => {
  const { title = "", desc = "", hasMore = true } = props;

  return (
    <View className="classifyTitle">
      <View className="left-title">
        <View className="title-icon">
          <View className="icon"></View>
          <View className="title">{title || ""}</View>
        </View>
        {desc && <View className="desc">{desc}</View>}
      </View>
      {hasMore && (
        <View className="has-more-btn">
          更多<View className="arrow arrow-right"></View>
        </View>
      )}
    </View>
  );
};

export default ClassifyTitle;
