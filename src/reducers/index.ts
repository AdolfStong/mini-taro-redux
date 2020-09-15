/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-08-03 15:26:57
 * @LastEditors: Shentong
 * @LastEditTime: 2020-09-14 18:21:43
 */
import { combineReducers } from "redux";
import counter from "./counter";
import loginInfo from "./login";

export default combineReducers({
  counter,
  loginInfo,
});
