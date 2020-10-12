import Taro from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View, Button } from "@tarojs/components";

import "./index.scss";
// import DisnetImg from "@/resource/images/disnet.png";

/**
 * @description 获取用户授权
 * @param {type} 1:getUserInfo；2：
 */
interface Props {
  type: Number;
  authorCb: Function;
}

const Disnet = (props: Props) => {
  const { type = 1, authorCb } = props;

  useEffect(() => {
    const type = "scope.userInfo";
    const authorSucceses: Function = async () => {
      let uInfo = await Taro.getUserInfo();
      getUserInfoHandle(uInfo);
    };
    // 如果用户已经授权过了，可以直接调用
    definedAuthorization(type, authorSucceses);
  }, []);

  /**
   *
   * @param type 需要授权的‘是scope'
   * @param cb  授权成功后的回调
   */
  const definedAuthorization: Function = (type: string, cb?: Function) => {
    Taro.getSetting({
      success: function (res) {
        if (res.authSetting[type]) {
          // 已经授权过啦
          cb && cb();
        }
      },
    });
  };
  // 获取用户信息
  const getUserInfoHandle: Function = (e) => {
    if (e.errMsg.indexOf(":ok") === -1) return;

    const {
      encryptedData = "", // 敏感信息
      userInfo: {
        avatarUrl = "",
        city = "",
        country = "",
        gender = "",
        nickName = "",
        language = "",
        province = "",
      } = {},
    } = e;

    authorCb({
      encryptedData,
      avatarUrl,
      city,
      country,
      gender,
      nickName,
      language,
      province,
    });
  };

  return (
    <View className="authorization">
      {/* 获取用户信息：getUserInfo */}
      {type == 1 && (
        <Button
          className="btn"
          open-type="getUserInfo"
          onGetUserInfo={(e) => getUserInfoHandle(e.detail)}
        >
          getUserInfo
        </Button>
      )}
    </View>
  );
};

export default Disnet;
