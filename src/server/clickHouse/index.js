const request = require('request');

const clickHouse = {
    /**
     *  新版棱镜后端-clickHouse查询
     *  @param {*} url : clickHouse地址
     *  @param {*} authorization : clickHouse认证信息
     *  @param {string} sql : clickHouse查询语句
     *
     */
    search: async function (url, authorization, sql) {
        return new Promise((resolve, reject) => {
            request.post({
                url: url,
                headers: {
                    "content-type": "text/plain",
                    "Authorization": `Basic ${authorization}`
                },
                body: sql,
            }, function (e, data, body) {
                if (e) {
                    reject(e)
                } else {
                    resolve(body)
                }
            })
        })


    }
}
module.exports = clickHouse;