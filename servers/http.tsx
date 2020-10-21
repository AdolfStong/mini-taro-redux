import Taro from "@tarojs/taro";
import getBaseUrl from "./baseUrl";
import interceptors from "./interceptors";

import TaroRequst from './requst'

interceptors.forEach((i) => Taro.addInterceptor(i));

// interface RequstOpt {
//   url: string;
//   data: any;
//   method: "get" | "post" | "delete" | "put";
//   header: Header;
// }
interface HttpRespnseType {
  [key: string]: any;
  code: number
  msg: string
}

class httpRequest {
  baseOptions(params, method) {
    let { url, data } = params;
    const BASE_URL = getBaseUrl();

    const contentType = params.contentType || "application/json";
    const option = {
      url: BASE_URL + url,
      data,
      method,
      header: {
        "content-type": contentType,
        Authorization: Taro.getStorageSync("Authorization"),
      },
    };
    return TaroRequst<HttpRespnseType>(option);
  }

  get(url, data = {}) {
    let option = { url, data };
    return this.baseOptions(option, "GET");
  }

  post(url, data, contentType) {
    let option = { url, data, contentType };
    return this.baseOptions(option, "POST");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }
}

export default new httpRequest();
