/*
home页面sql-app最近10小时每个小时的的uv和pv

传入参数：
1.appId
2.startTime
3.startTime
4.day

返回结果：
1.appId
2.pv
3.uv
4.statHour
*/

select appId,
       statHour,
       uv,
       pv
from (
         select appId,
                uniqExact(guid)              as uv,
                count(*)                     as pv,
                SUBSTRING(insertTime, 1, 10) as statDate,   /*截取日期*/
                SUBSTRING(insertTime, 12, 2) as statHour    /*截取小时*/
         from default.flink_detail_ppo_all
         where partDate = '20210719'
         group by appId, SUBSTRING(insertTime, 1, 10), SUBSTRING(insertTime, 12, 2)
     ) t
where statDate = '2021-07-19'
  and statHour >= '07'
  and statHour <= '16'
  and appId = 'wx6025c5470c3cb50c'
order by statHour asc format JSON