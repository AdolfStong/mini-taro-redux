/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-09-14 18:14:21
 * @LastEditors: Shentong
 * @LastEditTime: 2020-09-15 21:33:05
 */
import { SET_LOGIN_INFO } from "../constants/counter";

const BASE_INFO = {};

export default function loginInfo(state = BASE_INFO, action) {
  const { id = "", mobile = "" } = action.data || {};

  switch (action.type) {
    case SET_LOGIN_INFO:
      return {
        ...state,
        id,
        mobile,
      };
    default:
      return state;
  }
}
