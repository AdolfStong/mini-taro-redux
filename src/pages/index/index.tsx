// import Taro from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import Nav from "./components/nav";

import "./index.scss";

// const goCount: Function = () => {
//   Taro.navigateTo({ url: "/pages/addCount/index" });
// };

const Index = () => {
  const [tabIndex, setTabIndex] = useState<Number>(0);

  const getDataByCurrentTab: Function = (curTab: Number) => {
    setTabIndex(curTab);
  };

  // 获取首页数据接口

  useEffect(() => {
    console.log("index-tabIndex", tabIndex);
  }, [tabIndex]);

  return (
    <View className="index">
      <View>
        <Nav
          getDataByCurrentTab={getDataByCurrentTab}
          tabIndex={tabIndex}
        ></Nav>
      </View>
    </View>
  );
};

export default Index;
