// import httpClient from './http-client';
// import requestUrl from '../common/url';
// import configUrl from '../common/config';

const httpClient = require('./http-client');
const requestUrl = require('../common/url');
const configUrl = require('../common/config');

const BaseUrl = configUrl.baseUrl;

const servicesMovies = {
  // 获取标题信息
  async getTilteMessage() {
    const url = BaseUrl + requestUrl.getTitle;
    // return new Promise((resolve, reject) => {
    //     resolve(httpClient.request(url, 'get'));
    // });
    return await httpClient.request(url, 'get');
  },

  // 根据电影的头部标题Id获取分页信息(实现上拉刷新)
  async getMoviceByPageAndSizeAndTitleId(pageInfo) {
    const url = BaseUrl + requestUrl.getMovicesByTitleIdAndPageAndSize;
    return await httpClient.request(url, 'post', pageInfo);
  },

  // 根据电影的id获取详细信息
  async getMovicesDetailById(id) {
    const url = BaseUrl + requestUrl.getMovicesDetail + '?id=' + id;
    return await httpClient.request(url, 'get');
  },

  //  提交用户对电影的评价
  async addEvenation(addEvenationInfo) {
    const url = BaseUrl + requestUrl.addEvenation;
    return await httpClient.request(url, 'post', addEvenationInfo);
  },

  // 获取电影的评论信息
  async getmoviesInfoMessage(moviesId) {
    const url = BaseUrl + requestUrl.getMoviesMessageByMoviesId + '?id=' + moviesId;
    return await httpClient.request(url, 'get');
  }
}


// export default getTitleServices;
module.exports = servicesMovies;