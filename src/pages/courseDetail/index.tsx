import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";

import DetailBanner from "./components/banner";

import "./index.scss";

import Api from "@/api";

const CourseDetail = (props) => {
  console.log("CourseDetail-props", props);
  const [courseId, setCourseId] = useState<string>("");
  const [bannerImg, setBannerImg] = useState<Array<string>>([]);

  const getQuery: Function = () => {
    const curInstance = getCurrentInstance();
    if (curInstance && curInstance.router && curInstance.router.params) {
      const id = curInstance.router.params.id;
      setCourseId(id);
    }
  };

  /** 详情接口回调函数 */
  const detailCallBack: Function = (data: any) => {
    const { images = [] } = data;
    if (images.length) {
      images.unshift(images[0]);
    }
    setBannerImg(images);
    console.log("data - info", images);
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

  return (
    <View className="course-detail">
      <DetailBanner banner={bannerImg}></DetailBanner>
      <View className="panel"></View>
    </View>
  );
};

export default CourseDetail;
