---
title: mybatis
date: 2019-12-22 12:11:04
tags: [mybatis]
toc: true
excerpt: false
---
## jdbc连接数据库存在的问题
数据库链接创建、释放频繁造成系统资源浪费从而影响系统性能，如果使用数据库链接池可解决此问题。

Sql语句在代码中硬编码，造成代码不易维护，实际应用sql变化的可能较大，sql变动需要改变java代码。

使用preparedStatement向占有位符号传参数存在硬编码，因为sql语句的where条件不一定，可能多也可能少，修改sql还要修改代码，系统不易维护。

对结果集解析存在硬编码（查询列名），sql变化导致解析代码变化，系统不易维护，如果能将数据库记录封装成pojo对象解析比较方便。
## mybatis介绍
MyBatis 本是apache的一个开源项目iBatis, 2010年这个项目由apache software foundation 迁移到了google code，并且改名为MyBatis，实质上Mybatis对ibatis进行一些改进。 

MyBatis是一个优秀的持久层框架，它对jdbc的操作数据库的过程进行封装，使开发者只需要关注 SQL 本身，而不需要花费精力去处理例如注册驱动、创建connection、创建statement、手动设置参数、结果集检索等jdbc繁杂的过程代码。

Mybatis通过xml或注解的方式将要执行的各种statement（statement、preparedStatemnt、CallableStatement）配置起来，并通过java对象和statement中的sql进行映射生成最终执行的sql语句，最后由mybatis框架执行sql并将结果映射成java对象并返回。
## mybatis环境搭建
加入mybatis核心包、依赖包、数据驱动包。maven（jar包）
```
asm、cglib、commons-logging、javassist、junit、log4j、log4j-api、
log4j-core、mybatis、mysql-connector-java、slf4j-api、slf4j-log4j12
```

配置log4j，src下创建log4j.properties
```
# Global logging configuration
log4j.rootLogger=DEBUG, stdout
# Console output...
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] - %m%n
```
## SqlMapConfig.xml基础配置
SqlMapConfig.xml是mybatis核心配置文件，下面文件的配置内容为数据源、事务管理。
```xml
<!DOCTYPE configuration 
PUBLIC "-//mybatis.org//DTD Config 3.0//EN" 
"http://mybatis.org/dtd/mybatis-3-config.dtd"> 

<configuration> 
   <!-- 和spring整合后 environments配置将废除   数据源-->
   <environments default="development">
       <environment id="development">
       		<!-- 使用jdbc事务管理,事务控制由mybatis管理-->
           <transactionManager type="JDBC" />
       		<!-- 数据库连接池,由mybatis管理-->
           <dataSource type="POOLED">
               <property name="driver" value="com.mysql.jdbc.Driver" />
               <property name="url" value="jdbc:mysql://localhost:3306/aa" />
               <property name="username" value="root" />
               <property name="password" value="" />
           </dataSource>
       </environment>
   </environments>
</configuration> 
```
## 创建mapper映射文件
创建pojo模型，创建映射文件，映射文件基础配置如下：
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<!-- namespace命名空间  用来区分不同的mapper -->
<mapper namespace="test">
</mapper>
```
其中namespace为命名空间，用于隔离sql语句。
加入以下代码完成查询配置
```xml
<!-- select 查询标签 需要     返回类类型resultType   parameterType代表输入类型（可选）-->
	<select id="selUserById" parameterType="int" resultType="cn.com.aly.po.User">
		select * from user where id = #{id}
	</select>
```
## 在SqlMapConfig.xml中加载映射文件
```xml
<!-- 配置映射文件 -->
   <mappers>
   	<mapper resource="cn/com/aly/mapper/UserMapper.xml" />
   </mappers>

将上面代码加到SqlMapConfig.xml的<configuration>标签下
```
## 执行查询操作
```java
//获取配置文件
String resource = new String("SqlMapConfig.xml");
//获取配置文件输入流
InputStream inputStream = Resources.getResourceAsStream(resource);
//创建SqlSessionFactory（sql会话工厂）
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//通过工厂的到sqlsession（会话）
SqlSession sqlSession = sqlSessionFactory.openSession();
执行查询-->关闭会话
Stu stu = sqlSession.selectOne("test.selUserById", 1);
		System.out.println(stu);
		sqlSession.close();
```
## #{}与${}的区别
#{}表示一个占位符号，通过#{}可以实现preparedStatement向占位符中设置值，自动进行java类型和jdbc类型转换，#{}可以有效防止sql注入。 #{}可以接收简单类型值或pojo属性值。 如果parameterType传输单个简单类型值，#{}括号中可以是value或其它名称。

${}表示拼接sql串，通过${}可以将parameterType 传入的内容拼接在sql中且不进行jdbc类型转换， ${}可以接收简单类型值或pojo属性值，如果parameterType传输单个简单类型值，${}括号中只能是value。
## Mybatis增删改
```xml
添加一条数据
<insert id="addUser" parameterType="cn.com.aly.po.User">
		insert into user(username,pwd,sex,age) values(#{username},#{pwd},#{sex},#{age})
</insert>

添加一条数据并返回主键

<selectKey keyProperty="id" order="AFTER" resultType="int">
	select last_insert_id()
</selectKey>

sqlSession.insert("insertStu", stu);//执行插入

删除一条数据

<delete id="delUserById" parameterType="cn.com.aly.po.User">
		delete from user where id = #{id}
</delete>

User user = new User();
user.setId(29);
int i = sqlSession.delete("test.delUserById", user);
sqlSession.commit();
sqlSession.close();

修改一条数据

<update id="updUserById" parameterType="cn.com.aly.po.User">
		update user set username=#{username},pwd = #{pwd},sex = #{sex},age=#{age} where id=#{id}
</update>

User user = new User();
user.setId(28);
user.setUsername("uuqq");
user.setPwd("123");
user.setSex("男");
user.setAge(23);
int i = sqlSession.update("test.updUserById", user);
```
## 原始dao开发
编写dao接口（开发中直接提交到版本控制服务器上，其他人可继续开发）
编写dao实现类，实现dao里面的方法，完成功能开发
原始dao开发中存在以下问题
Dao方法体存在重复代码：通过SqlSessionFactory创建SqlSession，调用SqlSession的数据库操作方法
调用sqlSession的数据库操作方法需要指定statement的id，这里存在硬编码，不得于开发维护。
## mapper动态代理
Mapper接口开发方法只需要程序员编写Mapper接口（相当于Dao接口），由Mybatis框架根据接口定义创建接口的动态代理对象，代理对象的方法体同上边Dao接口实现类方法。（也就是说不需要写实现类）

但Mapper接口开发必需遵循以下规范：//sqlSession.getMapper（）;

1、Mapper.xml文件中的namespace与mapper接口的类路径相同。

2、Mapper接口方法名和Mapper.xml中定义的每个statement的id相同 

3、Mapper接口方法的输入参数类型和mapper.xml中定义的每个sql 的parameterType的类型相同

4、Mapper接口方法的输出参数类型和mapper.xml中定义的每个sql的resultType的类型相同
## 动态sql-if
```xml
if为select标签下子标签表示判断，属性test表示判断条件

<select id="selUserByName" parameterType="cn.com.aly.po.User" resultType="cn.com.aly.po.User">
    select * from user 
        Where 1=1
            <if test="username != null and username!=''">
                and username = #{username}
            </if>
            <if test="sex != null and sex!=''">
                and sex = #{sex}
            </if>
</select>
```
## 动态sql-where
```xml
where为select标签下子标签，用来表示条件

<select id="selUserByName" parameterType="cn.com.aly.po.User" resultType="cn.com.aly.po.User">
    select * from user 
        <where>
            <if test="username != null and username!=''">
                and username = #{username}
            </if>
            <if test="sex != null and sex!=''">
                and sex = #{sex}
            </if>
        </where>
</select>

会自动处理掉第一个if里面加的and
```
## sql片段
```xml
Sql中可将重复的sql提取出来，使用时用include引用即可，最终达到sql重用的目的，如下

<!-- 定义sql片段 -->
	<sql id="userwhere">
			<if test="id != null and id !=''">
				and id = #{id}
			</if>
			<if test="username != null and username !=''">
				and username = #{username}
			</if>
			<if test="pwd != null and pwd !=''">
				and pwd = #{pwd}
			</if>
			<if test="sex != null and sex !=''">
				and sex=#{sex}
			</if>
			<if test="addr != null and addr !=''">
				and addr=#{addr}
			</if>
			<if test="photo != null and photo !=''">
				and photo=#{photo}
			</if>
			<if test="hobby != null and hobby !=''">
				and hobby=#{hobby}
			</if>
	</sql>

<select id="selUser" parameterType="cn.com.aly.po.Userinfo" resultType="cn.com.aly.po.Userinfo">
    select * from userinfo 	
    <where>
        <!-- 引用sql片段 -->
        <include refid="userwhere" />
    </where>
</select>

```
## 高级映射一对一
首先确定sql语句，确定要查询的列

根据sql语句完成扩展domain类的建立，继承主domain类，将查询的列中不包含在主类中的列名加到扩展domain类中

映射文件输出类型为扩展domain类

定义mapper接口中方法

Sql语句
```sql
SELECT o.*,u.username,u.pwd,u.sex,u.age FROM orders o,USER u WHERE o.user_id = u.id AND o.id = 1
```
定义pojo扩展类
```java
public class OrdersCustem extends Orders {
	private String username;
	
	private String pwd;
	
	private String sex;
	
	private Integer age;
```

确定返回类型
```java
resultType="cn.com.aly.po.OrdersCustem"
```

定义mapper接口中方法
```java
OrdersCustem selOrdersWithUserById(Orders orders);
```
## 高级映射一对多
首先确定sql语句，确定要查询的列，并将多方创建成list放入一方

根据sql语句完成resultMap的建立，association为一对一的配置，collection为一对多，多方配置

映射文件输出使用resultMap，并将值设置为刚建立的resultMap的id

定义mapper接口中方法

```sql
sql语句
SELECT o.*,u.username,u.pwd,u.sex,u.age FROM orders o,USER u WHERE o.user_id = u.id AND u.id = #{id}
```
创建resultMap
```xml
<!-- id ：下面使用到该resultMap的时候所写的值     type规定当前类是那一个 -->
	<resultMap id="resultofuser" type="cn.com.aly.po.User">
		<id property="id" column="user_id"/>
		<result property="username" column="username"/>
		<result property="pwd" column="pwd"/>
		<result property="sex" column="sex"/>
		<result property="age" column="age"/>
		<!-- 一对多时  多方的配置    ofType配置的是多方的类型 -->
		<collection property="orderList" ofType="cn.com.aly.po.Orders">
			<id property="id" column="id"/>
			<result property ="user_id" column="user_id"/>
			<result property ="number" column="number"/>
			<result property ="createtime" column="createtime"/>
			<result property ="note" column="note"/>
		</collection>
	</resultMap>
```

确定返回类型
```java
resultMap="resultofuser"
```

定义mapper接口中方法
```java
User selUserWithOrdersById(User user);
```
## 高级映射多对多
多对多映射实质为：一对一与一对多的整合，同样使用resultMap，灵活使用association和collection。

association将关联查询信息映射到一个pojo对象中。

collection将关联查询信息映射到一个list集合中。

注意：如果使用resultType则无法关联查询
## 高级映射延迟加载
需要查询关联信息时，使用mybatis延迟加载特性可有效的减少数据库压力，首次查询只查询主要信息，关联信息等用户获取时再加载。

|设置项|描述|允许值|默认值|
|-|-|-|-|
|lazyLoadingEnabled|全局性设置懒加载。如果设为‘false’，则所有相关联的都会被初始化加载|true、false|false|
|aggressiveLazyLoading|当设置为‘true’的时候，懒加载的对象可能被任何懒属性全部加载。否则，每个属性都按需加载|true、false|true|

```xml
<settings>
    <setting name="lazyLoadingEnabled" value="true"/>
    <setting name="aggressiveLazyLoading" value="false"/>
</settings>
```
应用时需要在association或collection指定javaType（关联结果映射位置），select（指定关联查询sql），column（需要传入的值）
```xml
<resultMap id="resultforlazy" type="cn.com.aly.po.Orders">
    <id property="id" column="id"/>
    <result property ="user_id" column="user_id"/>
    <result property ="number" column="number"/>
    <result property ="createtime" column="createtime"/>
    <result property ="note" column="note"/>
    
    <association property="user" javaType="cn.com.aly.po.User" select="selUserById" column="user_id">
        <id property="id" column="user_id"/>
        <result property="username" column="username"/>
        <result property="pwd" column="pwd"/>
        <result property="sex" column="sex"/>
        <result property="age" column="age"/>
    </association>
</resultMap>
```