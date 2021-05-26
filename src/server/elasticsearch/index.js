const request = require("request");


/**
 * 查询索引
 * */
function search(_host, _auth, _index, _type, _body) {
    return new Promise((resolve, reject) => {
        request.post({
            url: `${_host}/${_index}/${_type}/_search`,
            json: true,
            headers: {
                "content-type": "application/json",
                "Authorization": `Basic ${_auth}`,
            },
            body: _body,
        }, function (e, data, body) {
            if (e) {
                reject(e)
            } else {
                resolve(body);
            }
        })
    })
}

/**
 * 创建索引
 * */
function put(_host, _auth, _index, _body) {
    return new Promise((resolve, reject) => {
        request.put({
            url: `${_host}/${_index}`,
            json: true,
            headers: {
                "content-type": "application/json",
                "Authorization": `Basic ${_auth}`,
            },
            body: _body,
        }, function (e, data, body) {
            if (e) {
                console.log("[ERROR] ES 建表失败, ", e)
                reject(e)
            } else {
                resolve(body);
            }
        })
    })
}

/**
 * 根据索引修改数据
 * 如果需要实时修改数据， _refresh需要传入固定参数 /?refresh=true, 否则留空
 * */
function add(_host, _auth, _index, _type, _body, _refresh) {
    return new Promise((resolve, reject) => {
        request.post({
            url: `${_host}/${_index}/${_type}${_refresh}`,
            json: true,
            headers: {
                "content-type": "application/json",
                "Authorization": `Basic ${_auth}`,
            },
            body: _body,
        }, function (e, data, body) {
            if (e) {
                console.log("[ERROR] ES 插入数据失败, ", e)
                reject(e)
            } else {
                resolve(body);
            }
        })
    })
}

/**
 * 根据ID索引修改对应数据
 * */
function update(_index, _type, _id, _body) {
    return new Promise((resolve, reject) => {
        request.post({
            url: `${host}` + _index + `/` + _type + `/` + _id + `/_update?refresh=true`,
            json: true,
            headers: {
                "content-type": "application/json",
                "Authorization": `Basic ${auth}`,
            },
            body: _body,
        }, function (e, data, body) {
            if (e) {
                reject(e)
            } else {
                resolve(body);
            }
        })
    })
}

/**
 * 根据id删除对应数据
 * */
function del(_index, _type, _id) {
    return new Promise((resolve, reject) => {
        request.del({
            url: `${host}` + _index + `/` + _type + `/` + _id + `/?refresh=true`,
            json: true,
            headers: {
                "content-type": "application/json",
                "Authorization": `Basic ${auth}`,
            },
            body: {},
        }, function (e, data, body) {
            if (e) {
                reject(e)
            } else {
                resolve(body);
            }
        })
    })
}

/**
 * 根据id删除对应索引下的数据
 * */
function deleteByQuery(_index, _type, _body, isTask = true) {
    let delQuery = isTask ? '_delete_by_query?wait_for_completion=false' : '_delete_by_query'
    return new Promise((resolve, reject) => {
        request.post({
            url: `${host}` + _index + `/` + _type + `/` + delQuery,
            json: true,
            headers: {
                "content-type": "application/json",
                "Authorization": `Basic ${auth}`,
            },
            body: _body,
        }, function (e, data, body) {
            if (e) {
                reject(e)
            } else {
                resolve(body);
            }
        })
    })
}

/**
 * 根据任务ID查询
 * */
function queryTask(_taskId) {
    return new Promise((resolve, reject) => {
        request.get({
            url: `${host}` + `_tasks/` + _taskId,
            json: true,
            headers: {
                "content-type": "application/json",
                "Authorization": `Basic ${auth}`,
            },
            body: {},
        }, function (e, data, body) {
            if (e) {
                reject(e)
            } else {
                resolve(body);
            }
        })
    })
}

/**
 * 删除索引
 * */
function deleteIndex(_host, _auth, _index) {
    return new Promise((resolve, reject) => {
        request.delete({
            url: `${_host}/${_index}`,
            json: true,
            headers: {
                "content-type": "application/json",
                "Authorization": `Basic ${_auth}`,
            },
            body: {},
        }, function (e, data, body) {
            if (e) {
                reject(e)
            } else {
                resolve(body);
            }
        })
    })
}

module.exports = {
    async search(_host, _auth, _index, _type, _query) {
        return search(_host, _auth, _index, _type, _query)
    },
    async put(_host, _auth, _index, _body) {
        return put(_host, _auth, _index, _body)
    },
    async add(_host, _auth, _index, _type, _query, _refresh = "") {
        return add(_host, _auth, _index, _type, _query, _refresh)
    },
    async update(_index, _type, _id, _body) {
        return update(_index, _type, _id, _body)
    },
    async del(_index, _type, _id) {
        return del(_index, _type, _id)
    },
    async deleteByQuery(_index, _type, _body, isTask) {
        return deleteByQuery(_index, _type, _body, isTask)
    },
    async queryTask(_taskId) {
        return queryTask(_taskId)
    },
    async deleteIndex(_host, _auth, _index) {
        return deleteIndex(_host, _auth, _index)
    }
};