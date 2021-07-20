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
       uniqExact(url)     as urlCount,
       avg(firScrRenTime) as avgFpr,
       partDate
from default.flink_detail_ppo_all
where appId = 'wx6025c5470c3cb50c'
  and partDate = '20210719'
group by appId, partDate format JSON   /*非聚合类字段都要写到group by中*/