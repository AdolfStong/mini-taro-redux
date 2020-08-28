import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";

import Nodata from "./components/noda";

import "./index.scss";

import Api from "@/api";

const CourseDetail = (props) => {
  console.log("CourseDetail-props", props, getCurrentInstance().router.params);
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    const curInstance = getCurrentInstance();
    console.log("curInstance", curInstance);
    const id = curInstance.router.params.id;

    setCourseId(id);
    console.log(courseId, "0000");
  }, []);

  const getDetailInfo: Function = (id: string) => {
    Taro.request({
      url: Api.getCourseDetailInfo(),
      data: { id },
      success: function (res) {
        console.log("getCourseDetailInfo-res", res);
        // let {
        //   data: {
        //     data: { banner = [], labels = [], operation_list: operationList },
        //   } = {},
        // } = res;
      },
    });
  };

  useEffect(() => {
    getDetailInfo();
  }, []);

  return <View className="course-detail">course-detail</View>;
};

export default CourseDetail;
