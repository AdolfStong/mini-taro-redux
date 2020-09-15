import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Image, Input } from "@tarojs/components";

import "./index.scss";

import headerImg from "@/resource/images/header-bg.png";
import phoneIcon from "@/resource/images/phone-icon.png";
import saveIcon from "@/resource/images/save-icon.png";
import bottomBg from "@/resource/images/bottom-bg.png";

import { setLoginInfo } from "@/src/actions/login";

const LoginInfo = (props) => {
  console.log("props", props);
  const { setLogin, loginInfo } = props;
  const [mobile, setMobile] = useState<string>("15591611037");
  const [code, setCode] = useState<string>("8510");

  const loginHandle: Function = async () => {
    Taro.showLoading({
      title: "加载中",
    });
    console.log(mobile, code);

    setTimeout(() => {
      const data = {
        id: "13",
        mobile: "13321193432",
      };
      setLogin(data);

      Taro.hideLoading();
      setTimeout(() => {
        console.log("props", props);
      }, 2000);
    }, 1000);
  };

  // const inputHandle: Function = (taroE: any) => {
  //   const {
  //     detail: { value = "" },
  //   } = taroE;
  //   console.log(value, "value");
  //   // setMobile(event.target.value)
  // };

  return (
    <View className="myLogin">
      <View className="header">
        <Image src={headerImg} className="header-img" mode="widthFix" />
      </View>
      <View className="section">
        <View className="input-box">
          <View className="logo">
            <Image src={headerImg} className="logo-img" />
          </View>
          <View className="input-list">
            <View className="phone">
              <Image src={phoneIcon} className="phone-img" mode="widthFix" />
              <Input
                className="phone-input"
                type="number"
                value={mobile}
                name="mobile"
                onInput={(event) => setMobile(event.detail.value)}
                placeholder="请输入手机号"
              />
            </View>
            <View className="code">
              <Image src={saveIcon} className="code-img" mode="widthFix" />
              <Input
                type="number"
                className="code-input"
                value={code}
                onInput={(event) => setCode(event.detail.value)}
                placeholder="验证码"
              />
              <View className="get-code-btn">获取验证码</View>
              {/* <span v-else className="get-again">重新发送{{cutDown}}秒</span> */}
            </View>
            <View className="choice">
              <View className="img-box">
                <View className="border-line"></View>
                <View className="word">本人已阅读并同意</View>
                {/* <img
                  className=icon}
                  src="/static/images/choice-icon.png"
                /> */}
                {/* <Input className="check-input" type="hidden" /> */}
              </View>
              <View className="xieyi">《用户协议》</View>
            </View>
          </View>
          <View className="register-btn" onClick={() => loginHandle()}>
            登录
          </View>
        </View>
      </View>
      <View>{loginInfo.mobile}</View>

      <View className="footer">
        <Image className="tooter-img" src={bottomBg} mode="widthFix" />
      </View>
    </View>
  );
};

export default connect(
  ({ loginInfo }) => ({
    loginInfo,
  }),
  (dispatch) => ({
    setLogin(data) {
      dispatch(setLoginInfo(data));
    },
  })
)(LoginInfo);
