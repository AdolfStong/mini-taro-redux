/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-09-14 18:27:41
 * @LastEditors: Shentong
 * @LastEditTime: 2020-10-12 20:19:18
 */
import { UPDATE_USER_INFO } from "../constants/counter";

export const updateUserInfo = (data) => {
  return {
    type: UPDATE_USER_INFO,
    data,
  };
};
