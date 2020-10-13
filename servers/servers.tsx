/* eslint-disable import/prefer-default-export */
import REQUEST from "./http";

interface RequestOpenidParams {
  /**
   * @param code wx.Login() 获取的code
   */
  code: string;
}

/**
 * @description 获取openid
 * @param data { code }
 */
export const getOpenId = (data: RequestOpenidParams) => {
  return REQUEST.get("/v1/works/weixin/getOpenId", data);
};

/**
 * @description 获取首页信息
 */
export function getIndex() {
  return REQUEST.get("/index/index");
}
