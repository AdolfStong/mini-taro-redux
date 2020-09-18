/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-09-17 18:23:05
 * @LastEditors: Shentong
 * @LastEditTime: 2020-09-18 15:53:55
 */
import Taro from "@tarojs/taro";

type ToastIcon = "success" | "loading" | "none";

// TODO:
declare namespace wxApi {
  namespace showToast {
    interface Option {
      /** tost文本内容 */
      title: string;
      /** 弹框类型 */
      icon: "success" | "loading" | "none";
      /** 弹框延迟时间ms */
    }
  }
  //   export const showToast: Function = (option: showToast.Option) => {
  //     Taro.showToast(option);
  //   };
}

export const showToast: Function = (title, icon: ToastIcon = "none") => {
  Taro.showToast({
    title,
    icon,
    duration: 2000,
  });
};
