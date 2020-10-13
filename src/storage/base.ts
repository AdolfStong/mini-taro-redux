/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-10-13 16:31:46
 * @LastEditors: Shentong
 * @LastEditTime: 2020-10-13 17:39:26
 */
import { getOpenId } from "@/servers/servers";
import { showToast } from "@/src/tools/wxApi";

function wxLogin(): Promise<string> {
  return new Promise((resolve) => {
    Taro.login({
      success: (res) => {
        const { code, errMsg } = res;
        if (code) {
          resolve(code);
        } else {
          showToast(`登录失败！${errMsg}`);
        }
      },
      fail: (err) => {
        showToast(err.errMsg);
      },
    });
  });
}

export async function fetchInfoByCode(): Promise<void> {
  const code = await wxLogin();

  const getOpenIdInfo = await getOpenId({ code });

  if (getOpenIdInfo.statusCode === 0) {
    console.log("getOpenIdInfo", getOpenIdInfo);
  }
}
