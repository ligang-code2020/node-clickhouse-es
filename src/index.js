const clickHouse = require('./server/clickHouse/index');

const homeSql = require('../src/sql/home');




async function getPvUv(startTime,endTime){
    let authorization = 'eHN5eF9ja19yOjFlNjA5ZjJmODU4MjlmOTA4OTFjZjc5ZDlmY2M4ZTk0ZDY0OGQ5ZWIyYTg4YzM1MTY3YWZhM2EwNzYzNjFjNjA=';
    let sql = homeSql.getPv(startTime,endTime,'wx6025c5470c3cb50c');

    let rst = await clickHouse.search('http://go-flink.xsyxsc.com',authorization,sql);
    let data = JSON.parse(rst)


    // console.log(data.data)

    return data

}










