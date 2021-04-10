const {Client} = require('@elastic/elasticsearch')
const client = new Client({node: 'http://172.21.91.206:9200'})


client.search({
    index: 'user_authority',
    body: {
        size: 2
    }
}).then(res => {
    let userName = [];
    let mobile = [];
    let result = res.body.hits.hits
    result.map(item => {
        userName.push(item._source.userid);
        mobile.push(item._source.mobile);

        client.index({
            index: "test-name",
            body: {
                name: `${item._source.userid}`,
                age: `${item._source.mobile}`
            }
        })

    })
    console.log(userName)
    console.log(mobile)

}).catch(err => {
    console.log(err)
})


