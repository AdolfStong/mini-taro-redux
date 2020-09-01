const BASE_URL = "https://m.xdsxt.com/api_v3";
const api = {
  getAllBanner: () =>
    `https://test.meixiu.mobi/api/star/v1/banner/findAllBanner`,
  getIndex: () => `${BASE_URL}/index/index`,
  getIndexPage: () => `${BASE_URL}/index/getPage`,
  getCourseDetailInfo: () => `${BASE_URL}/store/combinationDetail`,
  getLabelDetail: () => `${BASE_URL}/index/getLabelDetail`,
};

export default api;
