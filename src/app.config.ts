/*
 * @Descripttion: TOSS小熊
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-07-25 16:28:03
 * @LastEditors: Shentong
 * @LastEditTime: 2020-08-28 19:31:17
 */

export default {
  pages: [
    "pages/index/index",
    "pages/my/index",
    "pages/addCount/index",
    "pages/study/index",
    "pages/courseDetail/index",
  ],
  tabBar: {
    list: [
      {
        iconPath: "resource/images/home.png",
        selectedIconPath: "resource/images/home-active.png",
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        iconPath: "resource/images/study.png",
        selectedIconPath: "resource/images/study-active.png",
        pagePath: "pages/study/index",
        text: "学习",
      },
      {
        iconPath: "resource/images/my.png",
        selectedIconPath: "resource/images/my-active.png",
        pagePath: "pages/my/index",
        text: "我的",
      },
    ],
    color: "#000",
    selectedColor: "#56abe4",
    backgroundColor: "#fff",
    borderStyle: "black",
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
