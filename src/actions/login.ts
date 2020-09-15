/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-09-14 18:27:41
 * @LastEditors: Shentong
 * @LastEditTime: 2020-09-15 17:24:30
 */
import { SET_LOGIN_INFO } from "../constants/counter";

export const setLogin = (data) => {
  return {
    type: SET_LOGIN_INFO,
    data,
  };
};

export function setLoginInfo(data) {
  return (dispatch) => dispatch(setLogin(data));
}
