import Taro from '@tarojs/taro'
import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import { navList } from "@/constants/data"
// import { AtButton } from "taro-ui";
import "./index.scss";

interface Props {}

const navStyle: any = {
  width: 850,
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

  const getTabsDomInfo: Function = () => {
    const query = Taro.createSelectorQuery()
    query.selectAll('.title').boundingClientRect( rec => {
      console.log(rec)
    }).exec()
  };

  useEffect(() => {
    getTabsDomInfo()
  })

  return (
    <View className="nav">
      <View className="nav.noScrollBar">
        <View className="navList" style={navStyle} >
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
