const clickHouse = require('@apla/clickhouse');
const configs = new clickHouse({
    host: '172.21.110.206',
    port: 8123,
    protocol: 'http:'
})

configs.query

