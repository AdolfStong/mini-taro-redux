/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-09-14 18:27:41
 * @LastEditors: Shentong
 * @LastEditTime: 2020-10-13 14:10:09
 */
import { SET_LOGIN_INFO } from "../constants/varlate";

export const dispetchLogin = (data) => {
  return {
    type: SET_LOGIN_INFO,
    data,
  };
};
