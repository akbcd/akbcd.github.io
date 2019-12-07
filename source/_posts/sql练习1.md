---
title: sql练习1
date: 2019-12-04 19:58:11
tags: sql
---
本篇文章简单介绍一下sql以及分享一个sql练习，答案仅供参考
<!--more-->
## SQL
结构化查询语言
## 数据库--关系型数据库	OLTP
mysql oracle sqlserver
## sql分类
* ddl 数据定义语句
* dml 数据管理语句
* dql 数据查询语句
* dcl 数据控制语句

* ddl 数据定义语句（掌握）
create drop alter...

* dml 数据管理语句（掌握）
INSERT update DELETE...

* dql数据查询语句（熟练掌握）
SELECT...

* dcl 数据控制语句（了解）
GRANT...

* where 子句
`>,<,>=,<=,!=,<>,=,between AND ,in,LIKE,IS,NOT,AND,OR`

### dql执行顺序

|名字|顺序|
|:-:|:-:|
|SELECT|6|
|DISTINCT|7|
|FROM|1|
|JOIN|3|
|ON|2|
|WHERE|4|
|group by|5|
|HAVING|8|
|order by|9|
|limit|10|

## 约束
**唯一** 当前列的值只能是唯一的（不包括null）
**不为空（null）** 但前列能不有null值
**主键** 唯一+非空
**外键**

## 事务 （innodb）
ACID

* 设置手动提交
set autocommit = 0;

* 设置自动提交
set autocommit = 1;

* 开启事务
BEGIN

* 提交
COMMIT

* 回滚
ROLLBACK

事务隔离级别 （从小到大）（工作效率从大到小）
未提交（Read uncommitted）
读提交（read committed） (oracle)
可重复读（repeatable read）（mysql）
串行化（Serializable）	

### mysql优化

* INDEX	
索引：提高查询效率

* EXPLAIN
执行计划

## 练习（MySQL数据库）
数据库中有三张表，分别为student,course,SC（即学生表，课程表，选课表）
//三张表截图如下：
![student](student.jpg)
![course](course.jpg)
![sc](sc.jpg)

```
1.分别查询学生表和学生修课表中的全部数据。
select * from student 
select * from SC

2.查询成绩在70到80分之间的学生的学号、课程号和成绩。
select sno,cno,grade from sc where grade between 70 and 80

3．查询C01号课程成绩最高的分数
select MAX(grade) from sc where Cno='C01'

4.查询学生都选修了哪些课程,要求列出课程号。
SELECT DISTINCT s.Cno,c.Cname from sc s join course c on s.Cno=c.Cno

5.查询修了C02号课程的所有学生的平均成绩、最高成绩和最低成绩。
select AVG(Grade),MAX(Grade),MIN(Grade) from sc where Cno='C02'

6.统计每个系的学生人数。
select Sdept,count(*) AS '学生数' from student group by Sdept

7.统计每门课程的修课人数和考试最高分。
select Cname,COUNT(*),MAX(grade) from sc,course where sc.Cno=course.Cno GROUP BY Cname

8.统计每个学生的选课门数,并按选课门数的递增顺序显示结果。
select sname,COUNT(*) as '选课门数' from sc,student where 
student.Sno=sc.Sno GROUP BY Sname ORDER BY count(sc.Sno) ASC  

9.统计选修课的学生总数和考试的平均成绩。
select count(DISTINCT sno) as 学生总数,AVG(grade) as 平均成绩 from sc

10.查询选课门数超过2门的学生的平均成绩和选课门数。
select student.Sname,avg(sc.grade),count(sc.cno) from student,sc where 
student.sno = sc.sno group by student.Sname having count(sc.cno) >2

11.列出总成绩超过200分的学生,要求列出学号、总成绩。
select sno as 学号,sum(grade) as 总成绩 from sc group by sno having sum(grade)>200

12.用子查询实现如下查询:
(1) 查询选修了C01号课程的学生的姓名和所在系。
select DISTINCT student.Sname,student.Sdept from student,sc where 
student.Sno in  (select sc.Sno from sc where sc.cno='C01')
(2) 查询数学系成绩80分以上的学生的学号、姓名。
select sno,sname from student where sno in(select sno from sc where 
sc.grade>80) and sno in(select sno from student where sdept='数学系')
(3) 查询计算机系学生所选的课程名.
select course.Cname from course where cno in(select cno from sc where 
sc.sno in(select sno from student where sdept='计算机系'))

13.删除修课成绩小于50分的学生的修课记录
DELETE from sc where Grade < 50

14.将所有选修了"c01"课程的学生的成绩加10分。
UPDATE SC SET GRADE=GRADE+10 WHERE CNO='C01';

15.查询选修了c02号课程的学生的姓名和所在系。
select sname,sdept from student,sc where student.Sno=sc.Sno and cno='C02'

16.查询成绩80分以上的学生的姓名、课程号和成绩,并按成绩的降序排列结果。
select sname,cno,grade from student,sc where 
student.sno=sc.Sno and sc.Grade>80 ORDER BY grade DESC

17.查询计算机系男生修了"数据库基础"的学生的姓名、性别、成绩。
select sname,ssex,grade from student,sc where 
student.sno=sc.Sno and student.Sdept='计算机系' and sc.Cno='C04'

18.查询哪些学生的年龄相同,要求列出年龄相同的学生的姓名和年龄。
这题使用到了表的自连接，所以需要给表取两个别名，如A和B
select t1.sname as 年龄相同的学生,t1.Sage as 年龄 from student t1 
INNER JOIN student t2 on t1.Sage in(select Sage from student where 
t1.sage=t2.Sage and t1.sname!=t2.Sname) GROUP BY t1.sname,t2.sage ORDER BY t1.Sage

19.查询哪些课程没有人选,要求列出课程号和课程名。
select cno as 课程号,cname as 课程名 from course where cno not in (select cno from sc)

20.分别查询信息系和计算机系的学生的姓名、性别、修课名称、修课成绩,
并要求将这两个查询结果合并成一个结果集,并以系名、姓名、性别、修课名称、修课成绩的顺序显示各列。此题用到了并union查询
select student.sname,student.Ssex,course.Cname,sc.Grade from student,course,sc where 
student.Sdept='信息系' and student.sno=sc.sno and course.Cno=sc.Cno
union
select student.sname,student.Ssex,course.Cname,sc.Grade from student,course,sc where 
student.Sdept='计算机系' and student.sno=sc.sno and course.Cno=sc.Cno
```