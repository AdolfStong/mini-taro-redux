import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";

// import { AtButton } from "taro-ui";
import "./index.scss";

interface Props {}

interface navCategory {
  title: string;
  id: string;
}

const navList: Array<navCategory> = [
  {
    title: "精选",
    id: "index",
  },
  {
    title: "免费",
    id: "free",
  },
  {
    title: "大语文",
    id: "chinese",
  },
  {
    title: "数学",
    id: "math",
  },
  {
    title: "童书绘本",
    id: "english",
  },
  {
    title: "科学科技",
    id: "science",
  },
  {
    title: "传统文化",
    id: "culture",
  },
  {
    title: "人文历史",
    id: "history",
  },
];

const navStyle: any = {
  width: 750,
  // width: navList.length * 120,
};

const Nav = (props: any) => {
  console.log("nav-props", props);
  const { getDataByCurrentTab } = props;
  const [tabIndex, setTabIndex] = useState<Number>(0);

  const navItemClick: Function = (index: Number) => {
    setTabIndex(index);
    getDataByCurrentTab(index);
  };

  return (
    <View className="nav">
      <View className="nav.noScrollBar">
        <View className="navList" style={navStyle}>
          {navList.map((navItem, index) => {
            return (
              <View
                key={navItem.id}
                className={`title ${index === tabIndex ? "active" : null}`}
                onClick={() => navItemClick(index)}
              >
                {navItem.title}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Nav;
