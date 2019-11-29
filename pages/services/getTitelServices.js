// import httpClient from './http-client';
// import requestUrl from '../common/url';
// import configUrl from '../common/config';

const httpClient = require('./http-client');
const requestUrl = require('../common/url');
const configUrl = require('../common/config');

const BaseUrl = configUrl.baseUrl;

const getTitleServices = {
    // 获取标题信息
  async getTilteMessage() {
        const url = BaseUrl + requestUrl.getTitle;
        // return new Promise((resolve, reject) => {
        //     resolve(httpClient.request(url, 'get'));
        // });
        return await httpClient.request(url, 'get');
    }
}


// export default getTitleServices;
module.exports = getTitleServices;