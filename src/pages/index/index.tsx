import Taro from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import Nav from "./components/nav";
CardLilst;
import Banner from "./components/banner";
import CardLilst from "./components/cardLilst";

import "./index.scss";

import Api from "@/api";

const Index = () => {
  const [tabIndex, setTabIndex] = useState<Number>(0);
  const [banner, setBanner] = useState<Array<any>>([]);
  const [labels, setLabels] = useState<Array<any>>([]);

  const getDataByCurrentTab: Function = (curTab: Number) => {
    setTabIndex(curTab);
  };

  // 获取首页数据接口
  const getIndexInfo = () => {
    Taro.request({
      url: Api.getIndex(),
      success: function (res) {
        const { data: { data: { banner = [], labels = [] } } = {} } = res;
        setBanner(banner);
        setLabels(labels);
      },
    });
  };

  console.log("Api", Api);

  useEffect(() => {
    getIndexInfo();
  }, []);

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
        <Banner banner={banner}></Banner>
        <View className="labels">
          {labels.map((label, label_index) => {
            return (
              <View className="item" key={label_index}>
                <Image className="img" mode="widthFix" src={label.icon}></Image>
                <View className="title">{label.title}</View>
              </View>
            );
          })}
        </View>
        <CardLilst></CardLilst>
      </View>
    </View>
  );
};

export default Index;
