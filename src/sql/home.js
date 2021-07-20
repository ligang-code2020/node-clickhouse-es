exports.getPv = function (startTime, endTime, appId) {
    let sql = `select count(guid) as uv,sum(pv) as pv, phone from(
        select guid,count(*) as pv, concat(phoneType,' / ',phoneFullType) as phone from default.flink_detail_ppo_all 
        where partDate>='${startTime}' and partDate<='${endTime}' and appId='${appId}' group by guid,concat(phoneType,' / ',phoneFullType)) t 
        group by phone order by count(guid) desc limit 50 format JSON`

    return sql;
}


