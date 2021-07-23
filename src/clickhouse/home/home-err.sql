/*
home页面sql-ppo查询结果

传入参数：
1.appId
2.day


返回结果：
urlCount:ppo表中url字段去重个数
avgFpr:fpr平均时间


*/

select appId,
       uniqExact(errorUrl) as pageErrUv,
       count()             as pageErrorTotal,
       partDate,
       errorType
from default.flink_detail_err_all
where appId = 'wx6025c5470c3cb50c'
  and errorType = 'error'
  and partDate = '20210719'
group by appId, partDate, errorType format JSON;

/*
视图语句：
*/

select *
from dws.home_err_stat_mv_d
where appId = 'wx6025c5470c3cb50c'
  and partDate = '20210719'
  and errorType = 'error' format JSON