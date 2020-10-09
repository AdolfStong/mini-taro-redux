import Taro, { useReachBottom } from "@tarojs/taro";
import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { View, Image } from "@tarojs/components";
import Nav from "./components/nav";
import Banner from "./components/banner";
import CardLilst from "./components/cardLilst";
import OtherCourse from "./components/otherCourse";

import "./index.scss";

import Api from "@/api";

import { getIndex } from "@/servers/servers";

interface Tab {
  id: string;
  title: string;
}
function areEqual(prevProps, nextProps) {
  return prevProps.seconds === nextProps.seconds;
}
const Index = (props) => {
  console.log("index-props", props);
  // const [loginInfo, setLoginInfo] = useState<any>(lgInfo);
  const [tabIndex, setTabIndex] = useState<Number>(0);
  const [banner, setBanner] = useState<Array<any>>([]);
  const [labels, setLabels] = useState<Array<any>>([]);
  const [operationList, setOperationList] = useState<Array<any>>([]);
  const [pageLoadingFinish, setPageLoadingFinish] = useState<boolean>(false);
  /** 非 精选下的内容 start*/
  const [aTabInfo, setTabInfo] = useState<Tab>({ id: "", title: "" });
  /** 非 精选下的内容 end*/
  const getDataByCurrentTab: Function = (curTab: Number, tab: Tab) => {
    setTabIndex(curTab);
    setTabInfo(tab);
  };
  // redux中的loginInfo信息回显 TODO:
  const information = useSelector((state) => state.loginInfo);
  console.log("information", information);

  const compare: Function = (property: string) => {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    };
  };

  // 获取首页”精选“下数据接口
  const getIndexInfo: Function = async () => {
    const indexData = await getIndex();
    let {
      data: { banner = [], labels = [], operation_list: optList = [] } = {},
    } = indexData;

    optList.sort(compare("sort"));
    optList = optList.filter(
      (opt) => opt.show_type !== 1 && opt.show_type !== 4
    );

    setBanner(banner);
    setLabels(labels);
    setOperationList(optList);
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

  useEffect(() => {}, [tabIndex]);

  useReachBottom(() => {
    !pageLoadingFinish && tabIndex === 0 && laodMore();
  });

  return (
    <View className="index">
      <Nav getDataByCurrentTab={getDataByCurrentTab} tabIndex={tabIndex}></Nav>
      {/* 其他模块 */}
      {tabIndex !== 0 ? (
        <OtherCourse aTabInfo={aTabInfo}></OtherCourse>
      ) : (
        // 精选模块
        <View className="best-course">
          <Banner banner={banner}></Banner>
          <View className="labels">
            {labels.map((label, label_index) => {
              return (
                <View className="item" key={label_index}>
                  <Image
                    className="img"
                    mode="widthFix"
                    src={label.icon}
                  ></Image>
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
      )}
    </View>
  );
};
// const Index = () => {

// };

export default Index;

// const mapStateToProps = (state) => ({ loginInfo: state.loginInfo });

// const mapDispatchToProps = (dispatch) => ({
//   setLogin: (data) => dispatch(setLogin(data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Index);
// export default Taro.memo(Index, () => true);
