import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";

import DetailBanner from "./components/banner";

import ShareBtn from "@/resource/images/share-icon.png";
import TipImg from "@/resource/images/tip.png";
import "./index.scss";

import Api from "@/api";

const CourseDetail = (props) => {
  console.log("CourseDetail-props", props);
  const [courseId, setCourseId] = useState<string>("");
  const [bannerImg, setBannerImg] = useState<Array<string>>([]);
  const [detailInfo, setDetailInfo] = useState<any>({});
  const [groupList, setGroupList] = useState<Array<any>>([]);

  const getQuery: Function = () => {
    const curInstance = getCurrentInstance();
    if (curInstance && curInstance.router && curInstance.router.params) {
      const { id } = curInstance.router.params;
      setCourseId(id);
    }
  };

  /** 详情接口回调函数 */
  const detailCallBack: Function = (data: any) => {
    const { images = [], pink_square = [] } = data;
    if (images.length) images.unshift(images[0]);

    setBannerImg(images);
    console.log(pink_square, "pink_square");
    setGroupList(pink_square);
    setDetailInfo(data);
  };

  useEffect(() => {
    getQuery();
  }, []);
  useEffect(() => {
    courseId && getDetailInfo(courseId, detailCallBack);
  }, [courseId]);

  const getDetailInfo: Function = (id: string, cb?: Function) => {
    Taro.request({
      url: Api.getCourseDetailInfo(),
      data: { id },
      success: function (res) {
        let { data: { data } = {} } = res;
        cb && cb(data);
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

  return (
    <View className="course-detail">
      <DetailBanner banner={bannerImg}></DetailBanner>
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
        <View className="detail-top">
          <View className="line"></View>
          <View className="title">商品详情</View>
          <View className="line"></View>
        </View>
        <View className="detail-imgs">
          <Image
            src={getImgSrcVal(detailInfo.description_text)}
            mode="widthFix"
            className="img"
          ></Image>
        </View>
      </View>
    </View>
  );
};

export default CourseDetail;
