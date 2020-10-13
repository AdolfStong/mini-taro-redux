/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-08-03 15:26:57
 * @LastEditors: Shentong
 * @LastEditTime: 2020-10-13 13:53:06
 */
import { ADD, MINUS } from "../constants/varlate";

export const add = () => {
  return {
    type: ADD,
  };
};
export const minus = () => {
  return {
    type: MINUS,
  };
};

// 异步的action
export function asyncAdd() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add());
    }, 2000);
  };
}
