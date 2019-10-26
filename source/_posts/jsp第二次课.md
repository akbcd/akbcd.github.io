---
title: jsp第二次课
date: 2019-10-10 13:10:54
tags: jsp
---
本次课主要内容
包含的相关知识点，两种页面跳转，9个内置对象的部分介绍（四个存值对象，response和out对象），登录模块的简单完成
<!--more-->
## 包含的知识点
* 静态包含 
`<%@ include file=" " %>`
* 动作标签
    * 动态包含
    * `<jsp:include page=" "></jsp:include>`

## 静态包含和动态包含的区别？
* 编译方式不同
	* 静态的是 先编译完 再包含到一起，最终只是产生 一个.java文件,如果静态包含的文件里面内容改变，结果就会改变
	* 动态的是，各自包含进去，再编译，然后产生多个.java文件，如果动态的包含文件有改变的，结果不一定改变，效率高

* 动态的能传参数
	* 通过 `<jsp:param value="jim" name="username"/>`

## 跳转
* 服务器跳转
`<jsp:forward page="跳转的页面"></jsp:forward>`
* 客户端跳转
`response.sendRedirect("跳转页面");` 不需要截断java代码，直接在java代码中实现

## 9个内置对象
* request、 response、 page、 pageContext、 session、 application、 config、 out、 exception

### 什么是内置对象？
* new 出来的东西就是对象
* jsp 内部的一个规范，常用的对象 内部封装好了，直接用就可以，不需要用new
			
### 4个存值对象都有什么
* page：本页 相当于我们基础的this，代表当前对象
* request： 一次请求，一般就是页面跳转一次
* session：一次会话，只要你不离开这个浏览器，就在session范围内
* application：整个服务器开启都好使
* 它们4个都有2个共同的方法，就是存对象，取对象
* setAttribute(,)/getAttribute("")
例如
```
<!--存对象页面-->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		 /* page 存对象要用 pageContext对象  */
		 pageContext.setAttribute("username", "jim");
	    
	%>
	<%-- <%=pageContext.getAttribute("username")%>  --%>
	<jsp:forward page="PageTest1.jsp"></jsp:forward> 
</body>
</html>
```
PageTest1.jsp
```
<!--取对象页面-->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<!--输出对象-->
	<%=pageContext.getAttribute("username")%> 
	
</body>
</html>
```
* 相当于我们java基础学的 4个权限修饰符：private 缺省的  protected public

### response对象
* sendRedirect
`response.sendRedirect("跳转的文件")` 它不是一次请求，即存值对象request获取不到值
* setCharacterEncoding("UTF-8")
`request.setCharacterEncoding("UTF-8")` 解决乱码问题（这个处理乱码就对post方式好使）

### out对象 
在浏览器页面输出的 out.println();
	     
## 服务器跳转和客户端跳转的区别？
1.使用服务器端跳转时，客户浏览器的地址栏并不会显示目标地址的URL，而是用客户端跳转时，地址栏当中会显示目标资源的URL；
2.服务器端跳转是由客户端发送一个请求，请求一个服务器资源——如JSP和Servlet——，这个资源又将请求转到另一个服务器资源，然后再给客户端发送一个响应，也就是说服务器端跳转是客户端发送一次请求，服务器端给出一次响应；而客户端跳转的流程则不同。客户端同样是发送一个请求给服务器端资源，这个服务器资源会首先给客户端一个响应，客户端再根据这个响应当中所包含的地址，再次向服务器端发送一个请求，也就是说客户端跳转是两次请求，两次响应；
3.在进行客户端跳转和服务器端跳转时，都需要指定目标资源的URL，如果这个路径以“”开始。在客户端跳转当中“”代表的是应用服务器根目录，而在服务器端跳转当中代表的是应用程序根目录。
	
## 登录模块
分析
* 1、有一个html页面
    * 有2个文本框 ，一个按钮
***
* 2、有一个处理数据的jsp页面
* 3、成功的页面和失败的页面

这里实现用户名和密码是固定的登陆页面
html页面（实现两个文本框，一个按钮，页面跳转）
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
    <!--action="do/DoLogin.jsp"为页面跳转，form为表单标签-->
	<form action="do/DoLogin.jsp" method="post">
	 <p>用户名: <input type="text" name="userName"></p>
	  <p>密码: <input type="password" name="userPwd"></p>
	  <p> <input type="submit" value="登录"></p>
	</form>
</body>
</html>
```
jsp数据处理以及跳转页面
```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<!-- 接收 Login 表单的值   -->
	<%
	/*  这个处理乱码  就对 post方式好使 */
	  request.setCharacterEncoding("UTF-8");
	  String userName=request.getParameter("userName");
	String userPwd=request.getParameter("userPwd");
	System.out.println(userName+"" +userPwd);
	/* 判断  完跳转 */
	if("jim".equals(userName)&&"123".equals(userPwd)){
	%>
        <!--成功页面-->
		<jsp:forward page="../ShopShow.jsp"></jsp:forward>
	<%
	}else{
        <!--失败页面-->
		/* 客户端跳转 */
		response.sendRedirect("../Nav.html");	
	}
	%>
	<!-- 服务器跳转  -->
	<%-- <jsp:forward page="../ShopShow.jsp"></jsp:forward> --%>
</body>
</html>
```
## 总结
### jsp的三个动作标签
* `<jsp:include page=" "></jsp:include>`
* `<jsp:param value="jim" name="username"/>`
* `<jsp:forward page="跳转的页面"></jsp:forward>`
### 静态包含和动态包含的区别？
静态包含是先编译再包含，最后产生一个.class，如果一个文件被改变，结果就会被改变
动态包含，先包含，再编译，最后产生多个.class，如果其中一个文件改变，可能结果不会变，但是效率高，而且还可以动态的带值
包含一般多用于，网页的菜单栏，导航栏，底部版权的包含
### 9个内置对象
request response page pageContext out session application exception config
### 4个存值对象的内置对象
* page ==》本页面
* request==》一次请求
* session===》 一次会话
* application==》服务器开启期间

都有共同方法，set/getAttribute
### request对象
* 处理乱码
* 表单取值
* 获得路径
* 存对象取对象
* 请求，可以获取一些服务器信息

### response对象
* 重定向也是客户端跳转
* 处理乱码和设置文本的格式
* 设置头部信息

### 服务器跳转和客户端跳转的区别？
* 地址栏 
	* 服务器地址栏不改变，是原地址
	* 客户端是目标地址
***
* 访问次数
	* 服务器端是访问一次服务器
	* 客户端是2次访问 
***
* 执行后，后面的代码是否执行？
	* 服务器端后面的代码不执行==后面不要写释放资源的代码，肯定是执行不了
	* 客户端后面的代码会执行    
***
* session对象 
	* 一次会话
	* session有个安全访问期，一般默认是30分钟，银行系统是15分钟