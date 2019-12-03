const requestUrl = {
  // 获取头部信息接口
  getTitle: '/api/v1/titelLiist',
  // 根据类型id获取电影的信息
  getMovicesInfoByTitleId: '/api/v1/getMovicesByTitleId',
  // 根据电影的id获取详细信息
  getMovicesDetail: '/api/v1/getMovicesDetail',
  // 添加评论信息
  addEvenation: '/api/v1/saveEvenation',
  // 获取电影的评论信息
  getMoviesMessageByMoviesId: '/api/v1/getMoviesMessageByMoviesId',
  // 根据电影的id获取电影的评论信息（包含上拉刷新）
  getMovicesByTitleIdAndPageAndSize: '/api/v1/getMovicesByTitleIdAndPageAndSize',
};

// export default requestUrl;
module.exports = requestUrl;