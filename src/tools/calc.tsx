/** 正则表达式匹配字符串中的img值src内容 */
const getImgSrcVal: Function = (str: string) => {
  const reg = /\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i;
  if (str) {
    const val = str.match(reg);
    if (val && val.length > 1) return val[1];
  } else return "";
};

/** 获取当前元素到顶部的距离 */
const getCurrentDomTopDistance: Function = (curDom: string) => {
  const query = Taro.createSelectorQuery();
  query.selectAll(curDom).boundingClientRect();
  query.selectViewport().scrollOffset();
  query.exec(function (res) {
    console.log(`${curDom}距离顶部高度为`, res);
    return res[0];
  });
};
