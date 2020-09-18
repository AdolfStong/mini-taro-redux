import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { connect } from "react-redux";

import { View, Image, Input } from "@tarojs/components";

import "./index.scss";

import headerImg from "@/resource/images/header-bg.png";
import phoneIcon from "@/resource/images/phone-icon.png";
import saveIcon from "@/resource/images/save-icon.png";
import bottomBg from "@/resource/images/bottom-bg.png";

import { setLogin } from "@/src/actions/login";
import { showToast } from "@/src/tools/wxApi";

const LoginInfo = (props) => {
  console.log("props", props);
  const { setLogin } = props;
  const [mobile, setMobile] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const loginHandle: Function = async () => {
    const validate = judgeFromData();
    if (!validate) return;

    Taro.showLoading({
      title: "加载中",
    });
    /** 模拟登陆接口 */
    setTimeout(() => {
      const data = {
        id: code,
        mobile,
      };
      setLogin(data);

      Taro.hideLoading();

      Taro.switchTab({
        url: "/pages/index/index",
      });
    }, 1000);
  };

  const judgeFromData: Function = () => {
    if (!mobile || !code) {
      showToast("请输入手机号和验证码");
      return 0;
    }
    if (!/1[0-9]{10}/.test(mobile)) {
      showToast("请输入正确的手机号");
      return 0;
    }
    return 1;
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
      <View className="footer">
        <Image className="tooter-img" src={bottomBg} mode="widthFix" />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({ loginInfo: state.loginInfo });

const mapDispatchToProps = (dispatch) => ({
  setLogin: (data) => dispatch(setLogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginInfo);
