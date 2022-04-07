/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-10-21 15:51:32
 * @LastEditors: Shentong
 * @LastEditTime: 2020-10-22 15:47:11
 */
import Taro from '@tarojs/taro';
import { showToast } from "@/src/tools/wxApi";

interface RequstOpt {
  url: string;
  data: any;
  method: HTTPMedthods;
  header: any;
}

type HTTPMedthods =
  | 'POST'
  | 'GET'
  | 'OPTIONS'
  | 'PUT'
  | 'DELETE'
  | 'HEAD'
  | 'TRACE'
  | 'CONNECT';

export default function<T> (args: RequstOpt) : Promise<T> {
    const {url, data, method, header } = args
    
    return new Promise ((resolve, reject) => {
        Taro.request({
            url,
            data,
            method,
            header,
            success(res) {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    reject({ res });
                }
            },
            fail(err) {
                reject(err);
                showToast('网络连接失败，请重新加载')
              },
        })
    })
}