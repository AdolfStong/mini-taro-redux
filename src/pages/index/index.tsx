import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text } from "@tarojs/components";

import "./index.scss";

const goCount: Function = () => {
  Taro.navigateTo({ url: "/pages/addCount/index" });
};

class Index extends Component {
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <View>
          <Text>Hello, World !</Text>
        </View>
        <Button onClick={() => goCount()}>go to count page</Button>
      </View>
    );
  }
}

export default Index;
