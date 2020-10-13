/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-08-10 18:58:33
 * @LastEditors: Shentong
 * @LastEditTime: 2020-10-13 14:23:05
 */

import { UPDATE_USER, UPDATE_USER_INFO } from "../constants/varlate";

const BASE_USER_INFO = {};

const INITIAL_STATE = {
  is_portrayal: 1,
  is_skip: 0,
  phone: "15591611037",
  status: 1,
  token: "FD212B91EAE41A5B703DD84799463DC3",
};

export function userInfo(state = BASE_USER_INFO, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}

export function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        token: state.token + 1,
      };
    default:
      return state;
  }
}
