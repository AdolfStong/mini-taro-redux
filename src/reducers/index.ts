/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-08-03 15:26:57
 * @LastEditors: Shentong
 * @LastEditTime: 2020-10-12 20:44:13
 */
import { combineReducers } from "redux";
import counter from "./counter";
import loginInfo from "./login";
import { userInfo } from "./user";

export default combineReducers({
  counter,
  loginInfo,
  userInfo,
});
