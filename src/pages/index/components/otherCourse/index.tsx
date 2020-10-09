import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import "./index.scss";

import Card from "@/components/card";

import Api from "@/api";

interface Tab {
  id: string;
  title: string;
}

interface Props {
  aTabInfo: Tab;
}

const OtherCourse = (props: Props) => {
  const {
    aTabInfo: { id = "" },
  } = props;
  const [hot, setHotCourse] = useState<Array<any>>([]);
  const [all, setAllCourse] = useState<Array<any>>([]);
  const [recommend, setRecommend] = useState<any>({});

  // 获取首页”非精选“数据接口
  const getLabelDetail = async (id: string) => {
    Taro.showLoading({
      title: "加载中",
    });

    const result = await Taro.request({
      url: Api.getLabelDetail(),
      data: { id },
    });
    console.log("result", result);
    let { data: { hot = [], all = [], recommend = {} } = {} } = result;

    setHotCourse(hot);
    setAllCourse(all);
    setRecommend(recommend);

    Taro.hideLoading();
  };

  useEffect(() => {
    id && getLabelDetail(id);
  }, [id]);

  // const refreshHandle: Function = () => {
  //   Taro.switchTab({
  //     url: "/pages/index/index",
  //   });
  // };
  return (
    <View className="otherCourse">
      {recommend && recommend.title && (
        <View className="recommend">
          <Image mode="widthFix" src={recommend.image} className="img"></Image>
          <View className="title">{recommend.title}</View>
          <View className="subhead">{recommend.subhead}</View>
        </View>
      )}
      <View className="card-type2">
        <Card list={hot} type={2}></Card>
      </View>
      <View className="all-course">
        <Card list={all}></Card>
      </View>
      {/* 
      <View className="refresh-btn">刷新试试</View> */}
    </View>
  );
};

export default OtherCourse;
