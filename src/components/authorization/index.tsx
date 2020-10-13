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

const Authorization = (props: Props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { type = 1, authorCb } = props;

  useEffect(() => {
    const type = "scope.userInfo";
    const authorSucceses: Function = async () => {
      let uInfo = await Taro.getUserInfo();
      console.log("uInfo", uInfo);
      getUserInfoHandle(uInfo);
    };
    // 如果用户已经授权过了，可以直接调用
    definedAuthorization(type, authorSucceses);
  }, []);

  /**
   *
   * @param type 需要授权的‘scope'
   * @param cb  授权成功后的回调
   */
  const definedAuthorization: Function = (type: string, cb?: Function) => {
    Taro.getSetting({
      success: function (res) {
        if (res.authSetting[type]) {
          // 已经授权过啦
          cb && cb();
        } else {
          setIsShowModal(true);
        }
      },
    });
  };
  // 获取用户信息
  const getUserInfoHandle: Function = (detail) => {
    const {
      errMsg,
      encryptedData, // 敏感信息
      signature,
      userInfo = {},
    } = detail;

    if (errMsg.indexOf(":ok") === -1) return;

    if (encryptedData && signature) {
      authorCb(userInfo);
      setIsShowModal(false);
    } else {
      setIsShowModal(true);
    }
  };

  // 获取手机号
  const getPhoneNumberHandle: Function = (detail) => {
    const { encryptedData, errMsg, iv } = detail;

    if (errMsg.indexOf(":ok") === -1) return;

    if (encryptedData && iv) {
      console.log("获取手机号", detail);
    }
  };

  return (
    <View className="authorization">
      {/* 获取用户信息：getUserInfo */}
      {/* 获取手机号：getPhoneNumber */}
      {isShowModal ? (
        type == 1 ? (
          <Button
            className="btn"
            openType="getUserInfo"
            onGetUserInfo={(e) => getUserInfoHandle(e.detail)}
          >
            getUserInfo
          </Button>
        ) : (
          <Button
            className="btn"
            openType="getPhoneNumber"
            onGetPhoneNumber={(e) => getPhoneNumberHandle(e.detail)}
          >
            getPhoneNumber
          </Button>
        )
      ) : null}
    </View>
  );
};

export default Authorization;
