import Taro, { getCurrentInstance, usePageScroll } from "@tarojs/taro";
import React, { useState, useEffect, useRef } from "react";
import { View, Image } from "@tarojs/components";

import DetailBanner from "./components/banner";
import VideoPlayer from "@/components/video";

import ShareBtn from "@/resource/images/share-icon.png";
import TipImg from "@/resource/images/tip.png";
import Loading from "@/components/loading";
import "./index.scss";

import Api from "@/api";

const CourseDetail = (props) => {
  console.log("props", props);
  const [isLoading, setLoadingStatus] = useState<boolean>(true);
  const [courseId, setCourseId] = useState<string>("");
  const [tabActiveIndex, setTabActiveIndex] = useState<number>(0);
  const [bannerImg, setBannerImg] = useState<Array<string>>([]);
  const [detailInfo, setDetailInfo] = useState<any>({});
  const [groupList, setGroupList] = useState<Array<any>>([]);
  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);
  const [menuTop, setMenuTop] = useState<number>(0);
  const [fixedTabs, setFixedTabsStatus] = useState<boolean>(false);
  const [imgOnload, setImgOnload] = useState<boolean>(false);

  const [detailImgs, setDetailImgs] = useState<Array<string>>([]);
  const [detailImgsPos, setDetailImgsPos] = useState<Array<string>>([]);

  const refContainer = useRef(null);

  const TabArr: Array<string> = ["课程特色", "课程目录", "常见问题"];

  useEffect(() => {
    getQuery();
  }, []);

  useEffect(() => {
    courseId && getDetailInfo(courseId, detailCallBack);
  }, [courseId]);

  useEffect(() => {
    if (!isLoading) {
      getTabsDomInfo();
      if (imgOnload) calcDetailImgsPosition();
    }
  }, [imgOnload, isLoading]);

  /**
   * @description 获取页面传参，类似于‘?id=1&name=lilei’ 形式
   * @tip props对象中也可拿到
   */
  const getQuery: Function = () => {
    const curInstance = getCurrentInstance();
    if (curInstance && curInstance.router && curInstance.router.params) {
      const { id } = curInstance.router.params;
      setCourseId(id);
    }
  };
  /** 详情接口回调函数callback */
  const detailCallBack: Function = (data: any) => {
    const {
      images = [],
      pink_square = [],
      description: { info = [] },
    } = data;
    if (images.length) images.unshift(images[0]);

    info.forEach((item) => {
      item = getImgSrcVal(item);
    });

    setDetailImgs(info);

    setBannerImg(images);

    setGroupList(pink_square);
    setDetailInfo(data);
  };
  /** 页面滚动 监听 */
  usePageScroll((scroll) => {
    const { scrollTop = 0 } = scroll;

    if (scrollTop >= menuTop) {
      !fixedTabs && setFixedTabsStatus(true);
    } else {
      fixedTabs && setFixedTabsStatus(false);
    }
    /** 通过滚动的位置，为tabs添加class=‘active’ */
    const [first = 0, seconed = 0, third = 0] = detailImgsPos;
    const scrollDistance = scrollTop + 50; // ‘50px’是 fixed元素高度

    if (scrollDistance < seconed) {
      setTabActiveIndex(0);
    } else if (scrollDistance >= seconed && scrollDistance < third) {
      setTabActiveIndex(1);
    } else if (scrollDistance >= third) {
      setTabActiveIndex(2);
    }
  });
  /** 详情页接口 */
  const getDetailInfo: Function = (id: string, cb?: Function) => {
    Taro.showLoading({
      title: "加载中",
    });
    Taro.request({
      url: Api.getCourseDetailInfo(),
      data: { id },
      success: function (res) {
        let { data: { data } = {} } = res;
        cb && cb(data);
      },
      complete: function () {
        setLoadingStatus(false);
        Taro.hideLoading();
      },
    });
  };
  /** 正则表达式匹配字符串中的img值src内容 */
  const getImgSrcVal: Function = (str: string) => {
    const reg = /\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i;
    if (str) {
      const val = str.match(reg);
      if (val && val.length > 1) return val[1];
    } else return "";
  };
  /*banner图片点击事件*/
  const swiperClickEmit: Function = () => {
    setShowVideoPlayer(true);
  };
  /** 获取tabs距离顶部的top值 */
  const getTabsDomInfo: Function = () => {
    const query = Taro.createSelectorQuery();

    query.select(".detail-menu").boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      res[0] && setMenuTop(res[0].top); // .detail-menu节点的上边界坐标
    });
  };
  /** 每张生成的图片距离顶部的top值 */
  const calcDetailImgsPosition: Function = () => {
    const query = Taro.createSelectorQuery();
    query.selectAll(".detailImg").boundingClientRect();
    query.selectViewport().scrollOffset();

    query.exec(function (res) {
      const { scrollTop = 0 } = res[1];
      const domArr = res[0] || [];
      const topArr = domArr.map((dom) => Math.ceil(dom.top) + scrollTop);
      setDetailImgsPos([...topArr]);
    });
  };
  /** 详情页面图片 加载完毕 回调 */
  const detaiImgOnload: Function = () => {
    setImgOnload(true);
  };
  /** 点击tab滚动页面锚点 */
  const tabClickHandle: Function = (index: number) => {
    Taro.pageScrollTo({
      scrollTop: detailImgsPos[`${index}`] - 50,
      duration: 300,
    });
  };

  if (isLoading) return <Loading></Loading>;
  return (
    <View className="course-detail">
      {showVideoPlayer && (
        <View className="video-container">
          <VideoPlayer src={detailInfo.video_intro}></VideoPlayer>
        </View>
      )}
      {!showVideoPlayer && (
        <DetailBanner
          banner={bannerImg}
          swiperClickEmit={swiperClickEmit}
        ></DetailBanner>
      )}
      <View className="panel">
        <View className="title-share">
          <View className="title">{detailInfo.title}</View>
          <Image className="share-btn" src={ShareBtn} mode="widthFix"></Image>
        </View>
        <View className="info">{detailInfo.info}</View>
        <View className="price-info">
          <View className="price">
            <View className="num">{detailInfo.price}</View>
            <View className="tip">起</View>
          </View>
          <View className="sales-info">
            <View className="group">已拼{detailInfo.sales}单</View>
            <View className="people">
              <View className="count">{detailInfo.people}</View>
              人拼单
            </View>
          </View>
        </View>
        <View className="tips">
          <Image className="share-btn" src={TipImg} mode="widthFix"></Image>
          <View className="tip">
            拼团倒计时结束时未能拼单者视为抢购失败将发起退款
          </View>
        </View>
        <View className="group-info">
          <View className="desc">
            <View className="join-count">{detailInfo.sp_sales}人已参加</View>
            <View className="look-more">
              <View>查看更多</View>
              <View className="arrow arrow-right"></View>
            </View>
          </View>
          {/* <View>{}</View> */}
          <View className="join-list">
            {groupList.map((item) => {
              return (
                <View className="item" key={item.id}>
                  <View className="people-info">
                    <Image
                      src={item.avatar}
                      mode="widthFix"
                      className="img"
                    ></Image>
                    <View className="name-group">
                      <View className="name">{item.nickname}</View>
                      <View className="group">
                        {item.people}人团
                        <View className="price">￥{detailInfo.price}</View>
                      </View>
                    </View>
                  </View>
                  <View className="go-group">
                    <View className="residual-time">
                      <View className="residual">还差1人成团</View>
                      <View className="time">剩余00:00:00:00</View>
                    </View>
                    <View className="btn">去参团</View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View className="detail-menu-box">
          <View
            ref={refContainer}
            className={`detail-menu ${fixedTabs && "fixed-tabs"}`}
          >
            {TabArr.map((tab, index) => {
              return (
                <View
                  key={index}
                  className={`tab ${index === tabActiveIndex ? "active" : ""}`}
                  onClick={() => tabClickHandle(index)}
                >
                  {tab}
                </View>
              );
            })}

            {/* <View className="tab active">课程特色</View>
            <View className="tab">课程目录</View>
            <View className="tab">常见问题</View> */}
          </View>
        </View>
        {/* <View className="detail-top">
          <View className="line"></View>
          <View className="title">商品详情</View>
          <View className="line"></View>
        </View> */}
        <View className="detail-imgs">
          {detailImgs.map((item, index) => {
            return (
              <Image
                key={index}
                src={"https://s6.pipacode.cn/b6d02201912231937443484.jpg"}
                mode="widthFix"
                onError={() => ""}
                onLoad={() => detaiImgOnload()}
                className="img detailImg"
              ></Image>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default CourseDetail;
