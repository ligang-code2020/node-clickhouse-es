select appId,
       statHour,
       sum(uv) as uv,
       sum(pv) as pv
from (
         select appId,
                uniqExact(guid)              as uv,
                count(*)                     as pv,
                SUBSTRING(insertTime, 1, 10) as statDate,
                SUBSTRING(insertTime, 12, 2) as statHour
         from default.flink_detail_ppo_all
         where partDate = '20210719'
         group by appId, SUBSTRING(insertTime, 1, 10), SUBSTRING(insertTime, 12, 2)
     ) t
where statDate = '2021-07-19'
  and statHour >= '07'
  and statHour <= '16'
  and appId = 'wx6025c5470c3cb50c'
group by appId, statHour
order by statHour asc format JSON