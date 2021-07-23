/*
home页面sql-rho明细表查询结果

传入参数：
1.appId
2.day


返回结果：
apiCount:rho表中apiUrl字段去重个数
avgApiTime:avgTime平均时间

耗时：10.45s
*/

select appId,
       uniqExact(apiUrl) as apiCount,
       avg(avgTime)      as avgApiTime,
       partDate
from default.flink_detail_rho_all
where appId = 'wx6025c5470c3cb50c'
  and partDate = '20210719'
group by appId, partDate format JSON;

/*
视图查询

耗时：348ms
*/
select *
from dws.home_rho_stat_mv_d
where appId = 'wx6025c5470c3cb50c'
  and partDate = '20210719'



