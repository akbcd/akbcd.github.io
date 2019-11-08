---
title: jsp第三次课
date: 2019-11-07 16:01:50
tags: jsp
---
好久没写笔记了。从今天开始继续。
本次课主要内容：
回顾
连接数据库的登录
<!--more-->
## 回顾
每个项目都有一个默认的首页，首页是不用输出到地址栏，访问项目直接识别
国内默认习惯 index.html/.jsp ==>i.jsp
国外默认习惯 default.html/.jsp
### jsp的3个指令
* `<%@ page %>` 
面试题：page是不是必须放在第一行 
答：不是，因为页面一加载，立马执行第一行，page里面写的都是页面的基本配置
* `<%@ page import="包" %>` 是唯一一个可以使用多次的属性，2种导包方式，逗号和多写几次
* `<%@ include file="文件" %>`
* `<%@ taglib %>`

### jsp的3个脚本
* <%java代码%>
* <%! 全局变量%>（不常用）
* <%=表达式%> 表达式后面不能有分号

### jsp的3个动作标签
* 动态包含
`<jsp:include page=" "></jsp:include>`
* 传递参数
`<jsp:param value="jim" name="username"/>`
* 服务器跳转（request能获取到值）
`<jsp:forward page="跳转的页面"></jsp:forward>`
### 9个内置对象
request response page pageContext out session application exception  config
#### 存值对象的内置对象 4个
* page ==》本页面
* request==》一次请求
* session===》 一次会话
* application==》服务器开启期间
* 都有共同方法， set/getAttribute

java核心是对象，我们整个项目，以对象为核心，到处用对象，那么就涉及2个对象之间的互相调用问题
### request对象
1)处理乱码 `request.setCharacterEncoding("UTF-8");`
2)表单取值 `request.getParameter("值");`
3)获得路径 
`request.getRequestURI();`获取访问路径: 项目名+servlet
`request.getRequestURL();`获取完整路径
4)存对象取对象 set/getAttribute
请求，可以获取一些服务器信息 
### response对象
1）重定向 也是客户端跳转 `response.sendRedirect("跳转的文件")`
2）处理乱码和设置文本的格式
设置浏览器默认编码utf8
`response.setHeader("content-type", "text/html;charset=utf-8");`
设置response默认编码
`response.setCharacterEncoding("utf-8");`
字符流输出中文
`response.getWriter().print("文本");`
### session对象 
一次会话
session有个安全访问期，一般默认是30分钟，银行系统是15分钟
## 连接数据库的登录
* 1）设计表
    * admin
* 2）设计表单
    * login.html
* 3)连接数据库
    * a）导入jar
    * b）加载驱动
* 4）获取表单值，比对从数据库出来的

### 实现方法
1.将数据库连接驱动导入web项目下的lib文件夹下，加载到项目中
2.在java文件夹下的src文件夹内建立相应的包和类
以上跟java控制台项目连接数据库操作几乎相同
3.建立一个登录页面html文件（表单页面）
4.建立一个获取表单数据的jsp文件，与数据库比较，实现相应的页面跳转
这里附上一部分代码

登录页面html（没加任何样式）
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>登录</title>
</head>
<body>
<!-- 表单 -->
<form action="do/DoLogin.jsp" method="post">
<p>用户名：<input type="text" name="loginname"></p>
<p>密码：<input type="password" name="nloginpwd"></p>
<p><input type="submit" value="登录"></p>
</form>
</body>
</html>
```
获取表单数据的jsp
```
<%-- 导java类 --%>
<%@page import="dao.AdminDAO"%>
<%@page import="vo.Admin"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<!-- 接收表单的值   -->
<%
  request.setCharacterEncoding("UTF-8");
  String userName=request.getParameter("loginname");
String userPwd=request.getParameter("nloginpwd");
Admin ad=new Admin();
ad.setAdminname(userName);
ad.setAdminpassword(userPwd);
AdminDAO ao=new AdminDAO();
/*连接数据库*/
/* 判断  完跳转 */
if(ao.getAdmin(ad)>0){
%>
	<jsp:forward page="../Success.jsp"></jsp:forward>
<%
}else{
	/* 客户端跳转 */
	response.sendRedirect("../Failed.jsp");	
}
%>
<!-- 服务器跳转  -->
<%-- <jsp:forward page="../ShopShow.jsp"></jsp:forward> --%>
</body>
</html>
```