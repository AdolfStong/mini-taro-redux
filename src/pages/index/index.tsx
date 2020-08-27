import Taro, { useReachBottom } from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import Nav from "./components/nav";
import Banner from "./components/banner";
import CardLilst from "./components/cardLilst";

import "./index.scss";

import Api from "@/api";

const Index = () => {
  const [tabIndex, setTabIndex] = useState<Number>(0);
  const [banner, setBanner] = useState<Array<any>>([]);
  const [labels, setLabels] = useState<Array<any>>([]);
  const [operationList, setOperationList] = useState<Array<any>>([]);
  const [pageLoadingFinish, setPageLoadingFinish] = useState<boolean>(false);

  const getDataByCurrentTab: Function = (curTab: Number) => {
    setTabIndex(curTab);
  };

  const compare: Function = (property: string) => {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    };
  };

  // 获取首页数据接口
  const getIndexInfo = () => {
    Taro.request({
      url: Api.getIndex(),
      success: function (res) {
        let {
          data: {
            data: { banner = [], labels = [], operation_list: operationList },
          } = {},
        } = res;

        operationList.sort(compare("sort"));
        operationList = operationList.filter(
          (opt) => opt.show_type !== 1 && opt.show_type !== 4
        );

        setBanner(banner);
        setLabels(labels);
        setOperationList(operationList);
      },
    });
  };

  // 《大家都在看》 分页
  const getIndexPage = (start: number, successCallback: Function) => {
    Taro.request({
      url: Api.getIndexPage(),
      data: { limit: 8, start, currentPage: "/pages/course/course" },
      success: function (res) {
        let {
          data: { data },
        } = res;

        successCallback(data);
      },
    });
  };

  // 分页加载业务逻辑
  const laodMore = () => {
    Taro.showLoading({
      title: "加载中",
    });

    let start = 0;
    operationList.forEach((item) => {
      if (item.id === 5) start = item.list.length;
    });
    // 分页加载接口
    getIndexPage(start, (list: Array<any>) => {
      if (list.length) {
        operationList.forEach((item) => {
          if (item.id === 5) {
            item.list = [...item.list, ...list];
          }
        });

        setOperationList([...operationList]);
      } else {
        setPageLoadingFinish(true);
      }

      Taro.hideLoading();
    });
  };

  useEffect(() => {
    getIndexInfo();
  }, []);

  useEffect(() => {
    console.log("index-tabIndex", tabIndex);
  }, [tabIndex]);

  useReachBottom(() => {
    !pageLoadingFinish && laodMore();
  });

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
        <View className="card-container">
          {operationList.map((operate) => {
            return <CardLilst card={operate} key={operate.id}></CardLilst>;
          })}
        </View>
        <View className="load-more">
          {pageLoadingFinish && (
            <View className="load-finish">我是有底线的</View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Index;
