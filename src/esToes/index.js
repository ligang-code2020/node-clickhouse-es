const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: 'http://frontend-elastic.cs-3-k8s.xsyxsc.cn/'});
var fs = require('fs')

const ClickHouse = require('@apla/clickhouse');
const ch = new ClickHouse({
    host: '172.21.110.206',
    port: 8123,
    protocol: 'http:'
})
ch.query('SELECT * FROM default.test_index LIMIT 2 FORMAT JSONEachRow', (err, result) => {
    console.log("result:", result)
});

const stream = ch.query('SELECT * FROM default.test_index LIMIT 3 ');
stream.on('metadata', (columns) => {
    console.log("columns", columns);
})

let rows = []
stream.on('data', (row) => {
    console.log(row)
    rows.push(row)
    // console.log(rows)
})


// client.search({
//     index: 'test_index',
//     body: {
//         size: 3
//     }
// }).then(res => {
//     let buckets = res.body.hits.hits;
//     buckets.map(item =>{
//         let appId = item._source.appid;
//         let ts = item._source.ts;
//         let uv = item._source.uv;
//         let pv = item._source.pv;
//         let appVersion = item._source.app_version;
//         let countData = item._source.count_data;
//         let data = [appId,ts,uv,pv,appVersion,countData]
//
//         const writeRes = ch.query('INSERT INTO TABLE default.test_index(appid,ts,uv,pv,app_version,count_data)', (err) => {
//             if (err) {
//                 console.error(err)
//             }
//             console.log('Insert complete!')
//         })
//
//
//         writeRes.write(data)
//         writeRes.end();
//
//     })
// })

