import Taro, {
  getCurrentInstance,
  usePageScroll,
  useReady,
} from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";

import DetailBanner from "./components/banner";
import VideoPlayer from "@/components/video";

import ShareBtn from "@/resource/images/share-icon.png";
import TipImg from "@/resource/images/tip.png";
import "./index.scss";

import Api from "@/api";

const CourseDetail = (props) => {
  const [isLoading, setLoadingStatus] = useState<boolean>(true);
  const [courseId, setCourseId] = useState<string>("");
  const [bannerImg, setBannerImg] = useState<Array<string>>([]);
  const [detailInfo, setDetailInfo] = useState<any>({});
  const [groupList, setGroupList] = useState<Array<any>>([]);
  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);
  const [menuTop, setMenuTop] = useState<number>(0);

  const [detailImgs, setDetailImgs] = useState<Array<string>>([]);

  const getQuery: Function = () => {
    const curInstance = getCurrentInstance();
    if (curInstance && curInstance.router && curInstance.router.params) {
      const { id } = curInstance.router.params;
      setCourseId(id);
    }
  };

  useEffect(() => {
    getQuery();
  }, []);

  /** 详情接口回调函数 */
  const detailCallBack: Function = (data: any) => {
    const {
      images = [],
      pink_square = [],
      description: { info = [] },
    } = data;
    if (images.length) images.unshift(images[0]);

    info.forEach((item) => {
      item = getImgSrcVal(item);
      // if (item.indexOf("//") === 0) item = item.substr(2);
      console.log(item, "item");
    });

    setDetailImgs(info);

    setBannerImg(images);

    setGroupList(pink_square);
    setDetailInfo(data);
  };

  usePageScroll((scroll) => {
    console.log(scroll, "scroll");
    if (scroll.scrollTop >= menuTop - 100) {
      console.log("大于拉");
    }
  });

  useEffect(() => {
    courseId && getDetailInfo(courseId, detailCallBack);
  }, [courseId]);
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

  /**
   * @desc banner图片点击事件
   */
  const swiperClickEmit: Function = () => {
    setShowVideoPlayer(true);
  };

  const getTabsDomInfo: Function = () => {
    const query = Taro.createSelectorQuery();
    console.log("query", query);
    query.select(".detail-menu");
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      setMenuTop(res[0].scrollHeight); // .detail-menu节点的上边界坐标
    });
  };
  useEffect(() => {}, []);
  useReady(() => {
    getTabsDomInfo();
  });

  if (isLoading) return <View></View>;
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
        <View className="detail-menu">
          <View className="tab active">课程特色</View>
          <View className="tab">课程目录</View>
          <View className="tab">常见问题</View>
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
                className="img"
              ></Image>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default CourseDetail;
