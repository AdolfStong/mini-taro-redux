// import Taro from "@tarojs/taro";
import React from "react";
import { View, Video } from "@tarojs/components";

import "./index.scss";

interface Props {
  src: string;
}

const VideoPlayer = (props: Props) => {
  const { src = "" } = props;
  // const refreshHandle: Function = () => {
  //   Taro.switchTab({
  //     url: "/pages/index/index",
  //   });
  // };
  return (
    <View className="video-player-container">
      <Video
        src={src}
        autoplay
        show-mute-btn
        enable-play-gesture
        object-fit="fill"
        direction={90}
        className="video-player"
      ></Video>
    </View>
  );
};

export default VideoPlayer;
