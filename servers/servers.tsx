/* eslint-disable import/prefer-default-export */
import HTTPREQUEST from "./http";

export function getIndex() {
  return HTTPREQUEST.get("/index/index");
}
