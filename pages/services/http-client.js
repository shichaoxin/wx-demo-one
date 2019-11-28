// 请求方式的封装

const httpClient = {
    request(url, method, data, header) {
        let promise = new Promise((res, rej) => {
            wx.request({
                url: url,
                data: data ? data : null,
                method: method,
                header: header ? header : { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                    //接口调用成功
                    console.loga(res);
                    res(res);
                },
                fail: function (error) {
                    console.log(error)
                }
            })
        });
        return promise;
    }
}
// export default httpClient
module.exports = httpClient;