---
title: mysql与oracle的sql语句
date: 2019-11-17 19:59:57
tags: [sql,文献]
toc: true
---
本篇文章对sql语句进行介绍
这里对MySql基本数据类型和Oracle基本数据类型的介绍可能不是很全面
<!--more-->
## 常用基础语句
1、插入数据
`insert into 表名(列1,列2· · ·) values(值1,值2· · ·)` 
（其中列名可省略，默认为每一列都有值）
2、删除数据
`delete from 表名 where 范围`（注意一般删除数据都会有条件否则全部数据都会被删除）
3、更新数据
`update 表名 set 列名 = 目标值 where 范围`（注意更新数据有条件否则全部数据都会被修改）
4、基本查询
`select * from 表名`
（`*`表示每一列都查询出来，可以换成列名以逗号隔开，表示想要查询的列） 
5、模糊查询
`select * from 表名 where 列名 like "%值%"`
（其中百分号为通配符表示前后有N个字符，可换成底杠 _ 表示通配一个字符）
6、排序
`select * from 表名 order by 列1,列2 desc`（其中条件可为一列也可为多列但查询出来的列中必须包含条件中列名，desc可省略，省略默认为升序，desc为降序排列）
7、总数
`select count（*） as totalcount from 表名`（表示查询共有多少条数据）
8、求和
`select sum(列名) as sumvalue from 表名`（列类型需为数字）
9、平均
`select avg(列名) as avgvalue from 表名`（求一列数据的平均数）
10、最大
`select max(列名) as maxvalue from 表名`（求列当中最大的值）
11、最小
`select min(列名) as minvalue from 表名`（求一列当中的最小值）
## 常用查询条件
|查询条件|关键字|
|:-:|:-:|
|比较|=，>，<，>=，<=，!=，<>|
|确定范围|BETWEEN AND, NOT BETWEEN AND|
|确定集合|IN, NOT IN|
|字符匹配|LIKE, NOT LIKE|
|空值|IS NULL, IS NOT NULL|
|多重条件|AND, OR|

1.比较一般是WHERE关键字后面的条件
2.确定范围在两者之间或两者之外
3.确定集合IN是在集合内，NOT IN在集合外
4.LIKE匹配有该字符的，NOT LIKE相反
5.空值，判断是空非空
6.多重条件AND并且，OR或需要条件全部成立的用AND，需要条件成立一部分的用OR
## 多表查询
1．简单链接
`Select * from 表1 s,表2 y where s.列 = y.列`（其中`*`为要查询的列，y,s为两个表的别名，where后面为两个表的逻辑关系）
2．外连接
`Left join ···on····`以左侧表为主（left前的表）
`Right join···on····`以右表为主（join后面的）
`full outer join···on···`（全外连接两个表中所有记录）
`Select * from 表1 left join 表2 on 表1.列 = 表2.列`
3．子查询
`Select * from 表1 a，（select 一般为函数 from 表2 where 表2.列 = a.列） b`
（子查询就是从一个结果集与另一个表中查出想要的数据）
## Where 与 having的区别
Where优先级较高，比聚合函数先执行，所以后面不能以聚合函数作为判断条件
Having优先级较低，比聚合函数后执行，可以以聚合函数作为筛选条件，但必须和分组group by同时使用
## DDL修改表语句
1：删除列
ALTER TABLE 【表名字】 DROP 【列名称】
2：增加列
ALTER TABLE 【表名字】 ADD 【列名称】 INT NOT NULL  COMMENT '注释说明'
3：修改列的类型信息
ALTER TABLE 【表名字】 CHANGE 【列名称】【新列名称（这里可以用和原来列同名即可）】 BIGINT NOT NULL  COMMENT '注释说明'
4：重命名列
ALTER TABLE 【表名字】 CHANGE 【列名称】【新列名称】 BIGINT NOT NULL  COMMENT '注释说明'
5：重命名表
ALTER TABLE 【表名字】 RENAME 【表新名字】
6：删除表中主键
Alter TABLE 【表名字】 drop primary key
7：添加主键
ALTER TABLE sj_resource_charges ADD CONSTRAINT PK_SJ_RESOURCE_CHARGES PRIMARY KEY (resid)
8：添加索引
ALTER TABLE sj_resource_charges add index INDEX_NAME (name);
9: 添加唯一限制条件索引
ALTER TABLE sj_resource_charges add unique emp_name2(cardnumber);
10: 删除索引
alter table tablename drop index emp_name;
## MySql基本数据类型
|数据类型|描述|字节|推荐使用|
|:-:|:-:|:-:|:-:|
|SMALLINT|整数，-32000到32000|2|存储相对比较小的整数，比如年龄|
|INT|从-2000000000到2000000000|4|存储中等整数，比如距离|
|BIGINT|INT不能描述的较大整数|8|存储超大整数，比如科学数据|
|FLOAT|单精度浮点|4|存储小数数据，例如测量、温度|
|DOUBLE|双精度浮点|8|需要双精度存储的数据，例如科学计数|
|DECIMAL|用户自定义精度的浮点类型|变量，取决于精度与长度|以非常高的精度保存小数数据，比如货币数额、科学计数|
|CHAR|固定长度的字符串|特定字符串长度（高达255个字符）|存储通常包含预定义字符串的变量，例如定期航线、邮编等|
|VARCHAR|具有最大限度的可变长字符串|变量，1+实际字符串长度|存储不同长度的字符串，比如名字、密码、短文等|
|TEXT|没有最大长度限制的可变长度字符串、大文本数据类型|2+实际字符串长度|例如：新闻故事、产品描述等|
|BLOB|二进制字符串|2+实际字符串长度|存储二进制数据，例如图片、文件|
|DATE|以yyyy-mm-dd格式的日期|3|存储日期|
|TIME|以hh:mm:ss格式的时间|3|存储时间或时间间隔|
|DATETIME|以yyyy-mm-dd hh:mm:ss格式存储时间|8|存储包含日期和时间的数据|

## Oracle基本数据类型
|数据类型|参数|描述|
|:-:|:-:|:-:|
|Char(n)|n=1 to 2000字节|定长字符串，n字节长，如果不指定长度，缺省 为1个字节长（一个汉字为2字节）|
|Varchar2(n)|n=1to4000字节|可变长的字符串，具体定义时指明最大长度n，这种数据类型可以放数字、字母以及ASCII码字符集(或者EBCDIC等数据库系统接受的字符集标准)中的所有符号。如果数据长度没有达到最大值n，Oracle 8i会 根据数据大小自动调节字段长度，如果你的数据前后有空格，Oracle 8i会自动将其删去。VARCHAR2是最常用的数据类型。可做索引的最大长度3209|
|number(m,n)|m=1 to 38 n=-84 to 127|可变长的数值列，允许0、正值及负值，m是所有有效数字的位数，n是小数点以后的位数。如：number(5,2)，则这个字段的最大值是99,999，如果数值超出了位数限制就会被截取多余的位数。如：number(5,2)，但在一行数据中的这个字段 输入575.316，则真正保存到字段中的数值是575.32。如：number(3,0)，输入575.316，真正保存的数据是575。|
|Date|无|从公元前4712年1月1日到公元4712年12月31日的所有合法日期，Oracle 8i其实在内部是按7个字节来保存日期 数据，在定义中还包括小时、分、秒。缺省格式为DD-MON-YY，如07-11月-00 表示2000年11月7日。|
|long|无|可变长字符列，最大长度限制是2GB，用于不需要作字符串搜索的长串数据，如果要进行字符搜 索就要用varchar2类型。long是一种较老的数据类型，将来会逐渐被BLOB、CLOB、NCLOB等大的对象数据类型所取代。|
|Raw(n)|N=1 TO 2000|可变长二进制数据，在具体定义字段的时候必须指明最大长度n，Oracle 8i用这种格式来保存 较小的图形文件或带格式的文本文件，如 Miceosoft Word文档。raw是一种较老的数据类型，将来会逐渐被BLOB、CLOB、NCLOB等大的对象数据类型所取代|
|long raw|无|可变长二进制数据，最大长度是2GB。Oracle 8i用这种格式来保存较大的图形文件或带格式的文本文件，如Miceosoft Word文档，以及音频、视频等非文本文件。在同一张表中不能同时有long类型和long raw类型，long raw也是一种较老的数据类型，将来会逐渐被BLOB、CLOB、NCLOB等大的对象数据类型所取代。|
|blob clob nclob|无|三种大型对象(LOB)，用来保存较大的图形文件或带格式的文本文件，如Miceosoft Word文档，以及音频、视频等非文本文件，最大长度是4GB。LOB有几种类型，取决于你使用的字节的类型，Oracle 8i实实在在地将这些数据存储在数据库内部保存。可以执行读取、存储、写入等特殊操作。|

## 数据库查询练习
1.已知：员工信息表，表名为：employee

|E_Name|E_Sex|E_Age|E_Address|
|:-:|:-:|:-:|:-:|
|张三|女|19|北京|
|李四|男|20|上海|
|王五|女|25|广州|
|薛六|女|20|北京|
|王五|男|22|北京|
|赵七|男|28|上海|
|张四|女|23|北京|

（1）. 写出sql语句，查询所有年龄大于20岁的员工（2分）
`select * from employee where E_age > 20`
（2）. 写出sql语句，查询所有年龄小于25岁的女性员工（3分）
`select * from employee where e_sex='女' and e_age < 25`
（3）. 写出sql语句，统计男女员工各有多少名（3分）（不会）
`select e_sex,count(e_sex) from employee group by e_sex`
（4）. 写出sql语句，按照年龄倒序获取员工信息（3分）
`select * from employee order by e_age desc`
（5）. 写出sql语句，获取员工中哪个姓名具有重名现象（3分）
`select e_name,count(e_name) from  employee group by e_name`
（6）. 写出sql语句，查询所有姓张的员工（3分）
`select * from employee where e_name like '张%'`
（7）. 写出sql语句，查询住址为北京的前3条记录（3分）
`select * from employee where e_address='北京' and rownum<=3`
`select * from employee where e_address='北京' limit 0,3`
（8）. 写出sql语句，查询员工总数（3分）
`select count(*) from employee`
（9）. 写出sql语句，向表中插入一条记录（2分）
`insert into employee values('赵六','男',40,'长春')`
（10）.写出sql语句，修改员工张四的住址为南京（2分）
`update employee set e_address='南京' where e_name='张四'`
（11）.写出sql语句，删除年龄大于24岁的女员工（2分）
`delete from employee where e_age > 24 and e_sex='女'`
## 数据库强化练习
一、简单查询
1、列出全部学生的信息。
SELECT `*` FROM 学生

2、列出软件专业全部学生的学号及姓名。
SELECT 学号,姓名FROM 学生WHERE 专业="软件"

3、列出所有必修课的课号。
SELECT DISTINCT 课号 FROM 必修课

4、求1号课成绩大于80分的学生的学号及成绩，并按成绩由高到低列出。
SELECT 学号,成绩 FROM 选课 WHERE 课号="1" AND 成绩>80 ORDER BY 成绩DESC

5、列出非软件专业学生的名单。
方法一：
SELECT 姓名 FROM 学生 WHERE 专业 <>" 软件"
方法二：
SELECT 姓名 FROM 学生 WHERE NOT 专业="软件"
方法三：
SELECT 姓名 FROM 学生WHERE 专业!="软件"

6、查询成绩在70~80分之间的学生选课得分情况
方法一：
SELECT `*` FROM 选课WHERE 成绩>=70 AND 成绩<=80
方法二：
SELECT `*` FROM 选课WHERE 成绩BETWEEN 70 AND 80
不在此范围内的查询：（注意写出和以下语句等价的语句）
SELECT `*` FROM 选课WHERE 成绩NOT BETWEEN 70 AND 80

7、列出选修1号课或3号课的全体学生的学号和成绩。
方法一：
SELECT 学号,成绩FROM 选课WHERE 课号="1" OR 课号="3"
方法二：
SELECT 学号,成绩FROM 选课WHERE 课号IN ("1","3")
## 查询练习
Student(Sid,Sname,Sage,Ssex) 学生表 
Course(Cid,Cname,Tid) 课程表
SC(Sid,Cid,score) 成绩表
Teacher(Tid,Tname) 教师表
练习内容：
1.查询“某1”课程比“某2”课程成绩高的所有学生的学号；
SELECT a.sid FROM (SELECT sid,score FROM SC WHERE cid=1) a,(SELECT sid,score FROM SC WHERE cid=3) b WHERE a.score>b.score AND a.sid=b.sid;
此题知识点，嵌套查询和给查出来的表起别名

2.查询平均成绩大于60分的同学的学号和平均成绩；
SELECT sid,avg(score)  FROM sc  GROUP BY sid having avg(score) >60;
此题知识点，GROUP BY 语句用于结合合计函数，根据一个或多个列对结果集进行分组。group by后面不能接where，having代替了where

3.查询所有同学的学号、姓名、选课数、总成绩
SELECT Student.sid,Student.Sname,count(SC.cid),sum(score)FROM Student left Outer JOIN SC on Student.sid=SC.cid GROUP BY Student.sid,Sname

4.查询姓“李”的老师的个数；
select count(teacher.tid)from teacher where teacher.tname like'李%'

5.查询没学过“叶平”老师课的同学的学号、姓名；
SELECT Student.sid,Student.Sname FROM Student WHERE sid not in (SELECT distinct( SC.sid) FROM SC,Course,Teacher WHERE  SC.cid=Course.cid AND Teacher.id=Course.tid AND Teacher.Tname='叶平');
 此题知识点，distinct是去重的作用

6.查询学过“···”并且也学过编号“···”课程的同学的学号、姓名；
select a.SID,a.SNAME from (select student.SNAME,student.SID from student,course,sc where cname='c++'and sc.sid=student.sid and sc.cid=course.cid) a,
(select student.SNAME,student.SID from student,course,sc where cname='english'and sc.sid=student.sid and sc.cid=course.cid) b where a.sid=b.sid;
标准答案（但是好像不好使）SELECT Student.S#,Student.Sname FROM Student,SC WHERE Student.S#=SC.S# AND SC.C#='001'and exists( SELECT * FROM SC as SC_2 WHERE SC_2.S#=SC.S# AND SC_2.C#='002');  
此题知识点，exists是在集合里找数据，as就是起别名

7.查询学过“叶平”老师所教的所有课的同学的学号、姓名；
select a.sid,a.sname from (select student.sid,student.sname from student,teacher,course,sc 
where teacher.TNAME='杨巍巍' and teacher.tid=course.tid and course.cid=sc.cid and student.sid=sc.sid) a
标准答案：SELECT sid,Sname FROM Student WHERE sid in (SELECT sid FROM SC ,Course ,Teacher WHERE SC.cid=Course.cid AND Teacher.tid=Course.tid AND Teacher.Tname='杨巍巍' GROUP BY sid having count(SC.cid)=(SELECT count(cid) FROM Course,Teacher  WHERE Teacher.tid=Course.tid AND Tname='杨巍巍'))

8.查询课程编号“”的成绩比课程编号“”课程低的所有同学的学号、姓名；
select a.sid,a.sname from(select student.SID,student.sname,sc.SCORE  from student,sc where student.sid=sc.sid and sc.cid=1) a,
(select student.SID,student.sname,sc.score from student,sc where student.sid=sc.sid and sc.cid=2) b where a.score`<`b.score and a.sid=b.sid
标准答案：SELECT sid,Sname FROM (SELECT Student.sid,Student.Sname,score ,
(SELECT score FROM SC SC_2 WHERE SC_2.sid=Student.sid AND SC_2.cid=1) score2 FROM Student,SC
WHERE Student.sid=SC.sid AND cid=1) S_2 WHERE score2 `<`score;

9.查询所有课程成绩小于分的同学的学号、姓名；
SELECT sid,Sname FROM Student WHERE sid not in (SELECT Student.sid FROM Student,SC WHERE Student.sid=SC.sid AND score>60); 
此题知识点，先查出大于60分的，然后not in 就是小于60分的了

10.查询没有学全所有课的同学的学号、姓名；
SELECT Student.sid,Student.Sname  FROM Student,SC  
WHERE Student.sid=SC.sid GROUP BY  Student.sid,Student.Sname having count(cid) <(SELECT count(cid) FROM Course); 

11.查询至少学过学号为“”同学所有一门课的其他同学学号和姓名；
SELECT student.sid,student.Sname FROM Student,SC WHERE Student.sid=SC.sid AND cid in (SELECT cid FROM SC WHERE sid=1)
此题知识点，SELECT sid,Sname FROM Student,SC WHERE Student.sid=SC.sid AND cid in (SELECT cid FROM SC WHERE sid=1)这样写是错误的，因为from后面是两个表，不能明确是哪个表里面的sid和sname所以错误提示是“未明确定义列”

12.把“SC”表中“叶平”老师教的课的成绩都更改为此课程的平均成绩；
update sc set score=(select avg(score) from sc,course,teacher where course.cid=sc.cid and course.tid=teacher.tid and teacher.tname='杨巍巍')

13.查询和“”号的同学学习的课程完全相同的其他同学学号和姓名；
SELECT sid FROM SC WHERE cid in (SELECT cid FROM SC WHERE sid=6) GROUP BY sid having count(`*`)=(SELECT count(`*`) FROM SC WHERE sid=6); 
此题知识点，用数量来判断 

14.删除学习“叶平”老师课的SC表记录； 
delete from sc s where s.cid in (select c.cid from teacher t,course c where t.tid = c.tid and tname='李子')
此题知识点，嵌套查询可以分布考虑，先查出李子老师都交了什么课的id，然后再删除那些id的值

15.向SC表中插入一些记录，这些记录要求符合以下条件：没有上过编号“”课程的同学学号、课程的平均成绩；
Insert into SC SELECT sid,2,(SELECT avg(score) FROM SC WHERE cid=2) FROM Student WHERE sid not in (SELECT sid FROM SC WHERE cid=2); 

16.查询各科成绩最高和最低的分：以如下形式显示：课程ID，最高分，最低分；
select cid as 课程号,max(score)as 最高分,min(score) as 最低分 from sc group by cid
标准答案（但是运行不好使）SELECT L.cid As 课程ID,L.score AS 最高分,R.score AS 最低分 
FROM SC L ,SC AS R  
WHERE L.cid = R.cid AND  
L.score = (SELECT MAX(IL.score)  
FROM SC AS IL,Student AS IM  
WHERE L.cid = IL.cid AND IM.sid=IL.sid  
GROUP BY IL.cid)  
AND  R.Score = (SELECT MIN(IR.score) FROM SC AS IR WHERE R.cid = IR.cid  GROUP BY IR.cid ); 

17.查询每门课程被选修的学生数
select sc.cid,count(sc.sid) from sc,course where sc.cid=course.cid group by sc.cid

18.查询出只选修了一门课程的全部学生的学号和姓名
SELECT SC.sid,Student.Sname,count(cid) AS 选课数 FROM SC ,Student  
WHERE SC.sid=Student.sid GROUP BY SC.sid ,Student.Sname having count(cid)=1;

19.查询每门课程的平均成绩，结果按平均成绩升序排列，平均成绩相同时，按课程号降序排列
SELECT Cid,Avg(score) FROM SC GROUP BY cid ORDER BY Avg(score),cid DESC ;

20.查询不及格的课程，并按课程号从大到小排列 
SELECT cid,sid FROM sc WHERE score <60 ORDER BY cid 

21.查询课程编号为且课程成绩在分以上的学生的学号和姓名；
select student.sid,student.sname from sc,student where sc.cid=1 and sc.score>60 and sc.sid=student.sid

22.查询选修“叶平”老师所授课程的学生中，成绩最高的学生姓名及其成绩
select student.sname,sc.score from sc,student,teacher,course c where teacher.tname='叶平'
and teacher.tid=c.tid and c.cid=sc.cid and sc.sid=student.sid and sc.score=(select max(score)from sc where sc.cid=c.cid)

23.查询各个课程及相应的选修人数
select sc.cid ,count(sc.sid)from sc,student where sc.sid=student.sid group by sc.cid 

24.统计每门课程的学生选修人数（超过人的课程才统计）。要求输出课程号和选修人数，查询结果按人数降序排列，查询结果按人数降序排列，若人数相同，按课程号升序排列
select sc.cid,count(sc.cid)from sc,course where sc.cid=course.cid group by sc.cid  order by sc.cid desc

25.检索至少选修两门课程的学生学号
SELECT sid FROM  sc group  by  sid having  count(*)  >  =  2  
rownum的用法
查询所有成绩第二名到第四名的成绩
select * from （select rownum p,t.score from（SELECT s.score score FROM sc s ORDER BY score desc）t ）tt where tt.p>1 and tt.p<5

26.查询没学过“叶平”老师讲授的任一门课程的学生姓名
select distinct sid from sc where sid not in(select sc.sid from sc,course,teacher where sc.cid=course.cid and course.tid=teacher.tid and 
teacher.tname='叶平')

27.检索“ ”课程分数小于90，按分数降序排列的同学学号
select sc.sid from sc,course where sc.cid=course.cid and course.cname='java' and sc.score<90

28.删除“ ”同学的“ ”课程的成绩 
delete from sc where sid=1 and cid=1