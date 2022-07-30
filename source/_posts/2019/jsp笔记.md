---
title: jsp笔记
date: 2019-10-09 09:54:51
updated: 2022-07-30
tags: jsp
categories: [笔记]
---
jsp是java web开发相关知识。简言之，就是用Java和html相关知识做jsp页面，页面类似html，但是扩展名为`.jsp`，并非`.html`
本次课主要内容：创建jsp项目，jsp注释，jsp指令，jsp脚本元素
<!--more-->
通过JavaSE Mysql 可以完成一个简单的控制台项目

## jsp第一次课

**两种程序设计方式**
* C/S 客户端 服务器（如桌面应用QQ）
* B/S 浏览器 服务器

**静态网页和动态网页的区别**
* 静态和动态最大的区别 数据的交互
* 静态是没有数据的，动态是对数据的增删改查（CURD）

### 什么是jsp
* 全称：java server pages
* 运用的知识：html+java+数据库+jsp自己的语法+js

### 什么是3p
* jsp（跨平台，免费） php（论坛，数据量小） asp（微软，收钱）

### 安装环境
* jsp必须运行在中间插件上（服务器）
* 服务器：apache公司的 Tomcat（开源，免费）
* 其它服务器（了解）：resin、 jboss、 glassfish、 weblogic 
* 如何安装服务器？只需配置环境变量（Tomcat版本要与jdk匹配）
    * 配置方法 添加环境变量 
    * 变量名：JAVA_HOME（名字不固定）
    * 变量值：D:\Program Files\Java\jdk1.8.0_221（路径配置到jdk的根目录）
* 测试 Tomcat是否成功
	* 解压Tomcat安装包，bin里面有个startup.bat
	* 双击，出现 毫秒数 
	* 在打开 网页，输入 `http://localhost:8080/` 出现Tomcat页面就对了
    * 关闭服务器 bin 里面 双击 shutdown.bat

### 利用eclipse开发java web项目
* 打开eclipse，选好工作空间，在工作空间中选择 File>New>Dynamic Web Project
* 输入项目名称，选择Target runtime中Tomcat版本（选自己安装的版本）
* 点击Finsh，项目创建成功

#### 没有Dynamic Web Project解决办法
* 在New>other...中查找，如果依然没有，可能是没有安装相应插件
* 安装插件 Help>Install New Software...>选自己的eclipse版本
* 在  Web, XML, Java EE and OSGi Enterprise Development	中选择（个别没有的表明你已安装）
    * Eclipse Java EE Developer Tools
    * Eclipse Java Web Developer Tools
    * Eclipse Web Developer Tools
    * Eclipse XML Editors and Tools

#### New Runtime中没有Tomcat版本选择
* 安装插件 JST Server Adapters

### jsp文件
* 创建文件后，默认不是utf-8编码，会出现中文乱码问题，在Preference中 `JSP Files`中修改编码为utf-8
* jsp 必须通过 server 运行

### 如何创建项目的首页
* index.jsp
jsp文件内容（与html页面相似）
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

</body>
</html>
```
### jsp的 注释有几种？
* html 注释 是显示注释   `<!-- -->` 
* java 注释  `//` `/* */` 
* jsp 自己注释  `<%-- --%>` 隐世注释

### jsp的指令有几个？都是什么？做什么的？
* 3个指令
	* `<%@ page %>`
	作用： 规定这个jsp页面的基本设置 ，例如语言，文本，编码等等
	这里唯一一个特殊的  import  可以使用多次
	`<%@ page import="包" %>`
	包可以通过`,`导入多个包`<%@ page import="java.util.*","java.io.*","java.awt.*" %>`
	* `<%@ include file="文件" %>`
	作用：包含其他页面 
	注意：被包含内容，页面基本格式要一样
	* `<%@ taglib %>`
	作用：导入标准标签库>>后面详细讲解标签库
	* 问题：page 指令是不是必须只能放在第一行？
	page指令可以在JSP中的任何地方，以任何顺序出现

### jsp 的脚本元素
* <% 这是java代码 %>
中间可以穿插html标签，但需要将java代码截断（可以参考练习中的代码）
* <%=表达式%>
输出的作用，切记 千万千万别写分号
* <%!全局内容%>

### 总结
#### jsp
* Java + html +mysql +jsp自己语法+js

#### jsp做什么？
* 动态网页（数据交互）

#### jsp的3个指令？
* `<%@ page %>`
	* 注：import 能使用多次

* `<%@ include file=""%>`
* `<%@ taglib %>`

#### jsp的3个脚本元素？
* <%java代码%>
* <%! 全局变量%>
* <%=表达式%> 不能有分号

#### 开发设计模式
* jsp（专门做显示工作） +javaBean（业务逻辑的东西）

### 练习
* 运用jsp打印出九九乘法表

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
<%
	for (int i = 1; i <=9; i++) {
		for (int j = 1; j <= i; j++) {
		out.print(j+"*"+i+"="+(i*j)+" ");
		}
%>
<br>
<%
	}
%>
</body>
</html>
```
* 输出100内能被3整除的数，每行显示3个

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
<%
	int j=0;
	for(int i=1;i<101;i++){
		if(i%3==0){
			out.print(i+" ");
			j++;
		}
		if(j>0) {
			if(j%3==0){	
%>
<br>
<%
			j=0;
			}
		}
	}
%>
</body>
</html>
```

## jsp第二次课
本次课主要内容
包含的相关知识点，两种页面跳转，9个内置对象的部分介绍（四个存值对象，response和out对象），登录模块的简单完成
### 包含的知识点
* 静态包含 
`<%@ include file=" " %>`
* 动作标签
    * 动态包含
    * `<jsp:include page=" "></jsp:include>`

### 静态包含和动态包含的区别？
* 编译方式不同
	* 静态的是 先编译完 再包含到一起，最终只是产生 一个.java文件,如果静态包含的文件里面内容改变，结果就会改变
	* 动态的是，各自包含进去，再编译，然后产生多个.java文件，如果动态的包含文件有改变的，结果不一定改变，效率高

* 动态的能传参数
	* 通过 `<jsp:param value="jim" name="username"/>`

### 跳转
* 服务器跳转
`<jsp:forward page="跳转的页面"></jsp:forward>`
* 客户端跳转（非jsp标签）
`response.sendRedirect("跳转页面");` 不需要截断java代码，直接在java代码中实现

### 9个内置对象
* request、 response、 page、 pageContext、 session、 application、 config、 out、 exception

#### 什么是内置对象？
* new 出来的东西就是对象
* jsp 内部的一个规范，常用的对象 内部封装好了，直接用就可以，不需要用new
			
#### 4个存值对象都有什么
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

#### response对象
* sendRedirect
`response.sendRedirect("跳转的文件")` 它不是一次请求，即存值对象request获取不到值
* setCharacterEncoding("UTF-8")
`request.setCharacterEncoding("UTF-8")` 解决乱码问题（这个处理乱码就对post方式好使）

#### out对象 
在浏览器页面输出的 out.println();
	     
### 服务器跳转和客户端跳转的区别？
1.使用服务器端跳转时，客户浏览器的地址栏并不会显示目标地址的URL，而是用客户端跳转时，地址栏当中会显示目标资源的URL；
2.服务器端跳转是由客户端发送一个请求，请求一个服务器资源——如JSP和Servlet——，这个资源又将请求转到另一个服务器资源，然后再给客户端发送一个响应，也就是说服务器端跳转是客户端发送一次请求，服务器端给出一次响应；而客户端跳转的流程则不同。客户端同样是发送一个请求给服务器端资源，这个服务器资源会首先给客户端一个响应，客户端再根据这个响应当中所包含的地址，再次向服务器端发送一个请求，也就是说客户端跳转是两次请求，两次响应；
3.在进行客户端跳转和服务器端跳转时，都需要指定目标资源的URL，如果这个路径以“”开始。在客户端跳转当中“”代表的是应用服务器根目录，而在服务器端跳转当中代表的是应用程序根目录。
	
### 登录模块
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
### 总结
#### jsp的三个动作标签
* `<jsp:include page=" "></jsp:include>`
* `<jsp:param value="jim" name="username"/>`
* `<jsp:forward page="跳转的页面"></jsp:forward>`
#### 静态包含和动态包含的区别？
静态包含是先编译再包含，最后产生一个.class，如果一个文件被改变，结果就会被改变
动态包含，先包含，再编译，最后产生多个.class，如果其中一个文件改变，可能结果不会变，但是效率高，而且还可以动态的带值
包含一般多用于，网页的菜单栏，导航栏，底部版权的包含
#### 9个内置对象
request response page pageContext out session application exception config
#### 4个存值对象的内置对象
* page ==》本页面
* request==》一次请求
* session===》 一次会话
* application==》服务器开启期间

都有共同方法，set/getAttribute
#### request对象
* 处理乱码
* 表单取值
* 获得路径
* 存对象取对象
* 请求，可以获取一些服务器信息

#### response对象
* 重定向也是客户端跳转
* 处理乱码和设置文本的格式
* 设置头部信息

#### 服务器跳转和客户端跳转的区别？
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

## jsp第三次课
好久没写笔记了。从今天开始继续。
本次课主要内容：
回顾
连接数据库的登录
### 回顾
每个项目都有一个默认的首页，首页是不用输出到地址栏，访问项目直接识别
国内默认习惯 index.html/.jsp ==>i.jsp
国外默认习惯 default.html/.jsp
#### jsp的3个指令
* `<%@ page %>` 
面试题：page是不是必须放在第一行 
答：不是，因为页面一加载，立马执行第一行，page里面写的都是页面的基本配置
* `<%@ page import="包" %>` 是唯一一个可以使用多次的属性，2种导包方式，逗号和多写几次
* `<%@ include file="文件" %>`
* `<%@ taglib %>`

#### jsp的3个脚本
* <%java代码%>
* <%! 全局变量%>（不常用）
* <%=表达式%> 表达式后面不能有分号

#### jsp的3个动作标签
* 动态包含
`<jsp:include page=" "></jsp:include>`
* 传递参数
`<jsp:param value="jim" name="username"/>`
* 服务器跳转（request能获取到值）
`<jsp:forward page="跳转的页面"></jsp:forward>`
#### 9个内置对象
request response page pageContext out session application exception  config
##### 存值对象的内置对象 4个
* page ==》本页面
* request==》一次请求
* session===》 一次会话
* application==》服务器开启期间
* 都有共同方法， set/getAttribute

java核心是对象，我们整个项目，以对象为核心，到处用对象，那么就涉及2个对象之间的互相调用问题
#### request对象
1)处理乱码 `request.setCharacterEncoding("UTF-8");`
2)表单取值 `request.getParameter("值");`
3)获得路径 
`request.getRequestURI();`获取访问路径: 项目名+servlet
`request.getRequestURL();`获取完整路径
4)存对象取对象 set/getAttribute
请求，可以获取一些服务器信息 
#### response对象
1）重定向 也是客户端跳转 `response.sendRedirect("跳转的文件")`
2）处理乱码和设置文本的格式
设置浏览器默认编码utf8
`response.setHeader("content-type", "text/html;charset=utf-8");`
设置response默认编码
`response.setCharacterEncoding("utf-8");`
字符流输出中文
`response.getWriter().print("文本");`
#### session对象 
一次会话
session有个安全访问期，一般默认是30分钟，银行系统是15分钟
### 连接数据库的登录
* 1）设计表
    * admin
* 2）设计表单
    * login.html
* 3)连接数据库
    * a）导入jar
    * b）加载驱动
* 4）获取表单值，比对从数据库出来的

#### 实现方法
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

## jsp第四次课
本次课主要内容：
tomcat目录介绍、创建servlet
doGet、doPost、service区别
servlet生命周期、request、response、servlet里面连接数据库、过滤器
### tomcat目录介绍
bin:可执行文件（启动服务、关闭服务等）
conf：配置文件（web.xml等）
lib：依赖库
logs:日志文件
temp：临时文件
webapps：发布项目
work：jsp转成java及class文件
### 创建servlet
#### 方法1
src下创建包
包下创建servlet（包->右键->servlet->起名->Finish）
Dynamic Web Project 3.0及以上版本创建servlet时自动添加注释
项目中不会自动生成web.xml文件
项目创建的servlet源码
```
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Servlet
 */
@WebServlet("/Servlet")
public class Servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Servlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
```
启动tomcat直接访问注解中的路径
#### 方法2
src下创建包
包下创建servlet（包->右键->servlet->起名->Finish）
注解删除
web.xml中配置servlet、servlet-mapping（3.0版本之前会创建web.xml）
```
<servlet>
<!--名字-->
<servlet-name>TestServlet</servlet-name>
<!--类路径-->
<servlet-class>com.aly.test.TestServlet</servlet-class>
</servlet>
<servlet-mapping>
<!--名字-->
<servlet-name>TestServlet</servlet-name>
<!--访问路径-->
<url-pattern>/TestServlet</url-pattern>
</servlet-mapping>
```
#### 方法3
创建一个普通的java文件
继承HttpServlet
重写里面的doGet、doPost、service方法
配置注解@WebServlet("/TestServ")
启动服务测试
### doGet、doPost、service区别
service：如果重写了，请求一定是service处理
doGet：若果没有重写service，那么请求的方式是get的
doPost：若果没有重写service，那么请求的方式是post的
### servlet生命周期
1.init():初始化时候调用一次
2.第一次访问servlet时，对servlet进行初始化
3.destroy():销毁的时候调用一次
4.关闭服务器
5.`web.xml`配置servlet时添加`<load-on-startup>1</load-on-startup>`：可以使servlet在服务启动时加载
### request
#### 携带参数
`request.setAttribute("uname", uname);`
#### 获取参数的类型`--`Object 需要强制类型转换
`request.getAttribute("uname");`
#### 服务器端跳转（请求转发、类似post）`--------`跳转的页面或servlet
`request.getRequestDispatcher("success.jsp").forward(request, response);`
`<jsp:forward page="success.jsp"></jsp:forward>`
#### 中文乱码问题
所有的乱码都是由字符编码格式不匹配，统一编码格式
解决乱码的方法（servlet里添加）

post方式提交的乱码问题
`request.setCharacterEncoding("utf-8");`

get方式提交的乱码，或者直接在地址栏提交的乱码
`String uname = request.getParameter("uname");`
`uname = new String(uname.getBytes("iso-8859-1"),"utf-8");`
### response
客户端跳转（请求重定向、get）
`response.sendRedirect("fail.jsp");`
### servlet里面连接数据库
1.依赖包复制到WebContent下的WEB-INF的下面
2.JDBC的工具类复制到工程中
3.获取查询时所需要的参数
4.编写sql
5.JDBC工具类创建对象连接数据路查询
```
import java.io.IOException;
import java.util.LinkedList;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.aly.po.Student;
import com.aly.tool.JdbcUtil;

@WebServlet("/LoginServ")
public class LoginServ extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public LoginServ() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //接收post表单值
		String uname = request.getParameter("uname");
		System.out.println(uname);
		String pwd = request.getParameter("pwd");
        //创建表的vo包对象
		Student stu = new Student();
        //往对象里赋值
		stu.setName(uname);
        //sql语句
		String sql = "SELECT * FROM USER_INFO WHERE username = '"+uname+"' and password='"+pwd+"'";
        //创建数据库连接的类
		JdbcUtil ju = new JdbcUtil();
        //调用sql语句
		LinkedList<Map<String, Object>> list = ju.queryByList(sql);
        //判断跳转
		if(list.size() > 0){
			request.getSession().setAttribute("uname", uname);
			request.getRequestDispatcher("success.jsp").forward(request, response);
		}else{
			request.setAttribute("mess", "登录失败");
			request.getRequestDispatcher("login.jsp").forward(request, response);
		}
	}
}
```
### 过滤器
#### 创建方法
右键Filter，起名字，Finish
注解部分需要改成@WebFilter("/*")
在doFilter方法里面
request.setCharacterEncoding("utf-8");
chain.doFilter(request, response);（必须添加，不然会在过滤器卡住）
主要解决乱码问题，@WebFilter("/*")表示项目中所有的访问都要经过这个过滤器
```
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

/**
 * Servlet Filter implementation class EncodingFilter
 */
@WebFilter("/*")
public class EncodingFilter implements Filter {

    public EncodingFilter() {
    }

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		request.setCharacterEncoding("utf-8");
		chain.doFilter(request, response);
	}

	public void init(FilterConfig fConfig) throws ServletException {
	}

}
```
### 在servlet里面获取session
HttpServletRequest
`request.getSession()`
### 补充
这里附上一个JdbcUtil，数据库的增删改查操作类
JdbcUtil.java
```
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.Map;
import java.util.TreeMap;

public class JdbcUtil {

	String url = "jdbc:mysql://localhost:3308/employee";
	String user = "root";
	String password = "";
	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;

	//加载驱动
	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

	}
	
	// 获取连接对象
	public Connection getConn(){
		try {

			conn = DriverManager.getConnection(url, user, password);
			return conn;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} 
		
	}

	// 获取语句对象
	public Statement getStmt() {
		try {

			conn = DriverManager.getConnection(url, user, password);
			stmt = conn.createStatement();
			return stmt;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			//release();
		}
	}


	// 更新并返回被影响行数
	public int update(String sql) {
		int num;
		try {
			num = getStmt().executeUpdate(sql);
			return num;
		} catch (SQLException e) {

			e.printStackTrace();
			return -1;
		} finally {
			release();
		}

	}
	

	// 查询返回ResultSet
	public ResultSet query(String sql) {
		try {
			rs = getStmt().executeQuery(sql);
			return rs;
		} catch (SQLException e) {

			e.printStackTrace();
			return null;
		}

	}
	//通过RSMD将结果集保存在list中，最终释放资源
	public LinkedList<Map<String, Object>> queryByList(String sql) {
		LinkedList<Map<String, Object>> list = new LinkedList<Map<String, Object>>();
		try {
			rs = getStmt().executeQuery(sql);
			ResultSetMetaData rsmd = rs.getMetaData();
			//获取列数
			int columnCount = rsmd.getColumnCount();
			while (rs.next()) {
				Map<String, Object> map = new TreeMap<String, Object>();
				for (int i = 0; i < columnCount; i++) {
					String key = rsmd.getColumnName(i+1);
					String value = rs.getString(key);
					map.put(key, value);
				}
				list.add(map);

			}
			return list;

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		} finally {
			//释放资源
			release();
		}
	}
	
	/**批量更新*/
	public void  updateBatch(String[] sqls){
		stmt = getStmt();
		
		/**设置不自动提交*/
		try {
			conn.setAutoCommit(false);
			for(String sql : sqls){
				stmt.addBatch(sql);
			}
			stmt.executeBatch();
			
			/**事务提交*/
			conn.commit(); 
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void release() {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

}
```

## jsp第五次课
本次课主要内容：
过滤器web.xml配置方式、监听器、application
表单空间默认值、表单的正常处理、表单控件回显
MVC模式
### 过滤器web.xml配置方式（web.xml）
web.xml中添加
```
<filter>
<filter-name>过滤器名字</filter-name>
<filter-class>类名</filter-class>
</filter>
<filter-mapping>
<filter-name>过滤器名字</filter-name>
<url-pattern>需要过滤的url</url-pattern>
</filter-mapping>
```
### 监听器
监视某事件的发生，做出响应
右键->Listener->起名字->选择你要监听的事件->finish
web.xml配置（注解二选一）
```
<listener>
<listener-class>类名</listener-class>
</listener>
```
### application	
所有用户共享的变量
从服务开启到服务关闭
setAttribute(名字，存放值);
getAttribute(名字);
在servlet中获取application
`request.getSession().getServletContext();`
session重新初始化
`session.invalidate`
#### 通过session获取网页在线人数
创建session监听器
```
public void sessionCreated(HttpSessionEvent arg0)  { 
    	ServletContext app = arg0.getSession().getServletContext();
    	Integer num = (Integer)app.getAttribute("num");
    	if(num != null){
    		num++;
    		app.setAttribute("num", num);
    	}else{
    		app.setAttribute("num", 1);
    	}
    }

public void sessionDestroyed(HttpSessionEvent arg0)  {
    System.out.println("session死了");
    ServletContext app = arg0.getSession().getServletContext();
    Integer num = (Integer)app.getAttribute("num");
    num--;
    app.setAttribute("num", num);
}
```
在jsp页面添加
```
当前网页在线人数：<%=application.getAttribute("num") %>
```
#### 通过session获取网页访问量
基于上面的在线人数
在jsp页面添加
```
<%
	Integer sum = (Integer)application.getAttribute("sum");
	if(sum != null){
		sum++;
		application.setAttribute("sum", sum);
	}else{
		application.setAttribute("sum", 1);
	}
%>
当前访问量:<%=application.getAttribute("sum") %>
```
### 表单控件默认值
通过`request.getParameter(name);`获取值
checkbox通过`request.getParameterValues("checkbox");`获取值（用字符串数组接值）

|input标签type属性|值|
|:-:|:-:|
|password|空字符串|
|password|空字符串|
|textArea|空字符串|
|radio|null|
|checkbox|null|

### radio的正常处理
一般情况下会有默认值（checked="checkid"）
### checkbox（字符串数组）
先判断是否为null
遍历拼接成字符串（中间需要特殊字符间隔）
```
// 将多选数据存为字符串，多选数据的值为hobby
String hobbys[] = request.getParameterValues("hobby");
String hobby = "";
if (hobbys != null && hobbys.length > 0) {
    for (String s : hobbys) {
        hobby += s + "-";
    }
    hobby = hobby.substring(0, hobby.length() - 1);
}
```
### 表单控件回显

|属性|回显方法|
|:-:|:-:|
|text|value=<%=request.getAttribute("text")%> 如果有可能第一次访问当前界面，需要判断值是否是null|
|textarea|两个标签之间|
|radio|将得到的值，和每一个选项判断，加上checked="checked"|
|checkbox|将得到的值，和每一个选项判断，加上checked="checked"|

### MVC模式
MVC模式是一种项目开发模式，适合多人开发的一种模式
介绍java web项目经历的几种开发模式

第一种模式jsp，类似php
所有的java代码都写在jsp页面，一个人开发，form表单的值传到jsp页面进行处理

第二种jsp+servlet(model1)
form表单的值提交到servlet中进行处理

第三种model2== MVC
M：model模式（业务bean）		
V：view视图，即jsp
C：controller控制，servlet

## jsp第六次课
本次课主要内容：
MVC模式、el表达式、jstl表达式
### MVC模式
MVC全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。MVC被独特的发展起来用于映射传统的输入、处理和输出功能在一个逻辑的图形化用户界面的结构中。
java项目MVC模式的开发思路
jsp页面：form表单的传值和回显，提交数据到servlet
servlet包：处理form表单的传值，调用service，进行页面跳转
service包：调用dao包，对dao包获得的数据进行回传
dao包：定义sql语句，调用数据库操作的工具包，返回查询的数据
bean包（或vo包）：表中名称私有属性，get/set方法
### el表达式
EL（Expression Language） 是为了使JSP写起来更加简单。表达式语言的灵感来自于 ECMAScript 和 XPath 表达式语言，它提供了在 JSP 中简化表达式的方法，让Jsp的代码更加简化。
#### jsp页面的取值方法（非el）
`request.getAttribute("值")`
如果传过来的是一个对象，需要对取值进行强制类型转换
`(UserInfo)request.getAttribute("uinfo")).getUsername()`
#### el取值
`${值}`
如果传过来的是一个对象
`${emp.sex }` 对象.属性
el表达式可以进行算数运算，直接输出运算后的结果
逻辑运算时，输出true或false
### jstl表达式
JSP标准标签库（JSTL）是一个JSP标签集合，它封装了JSP应用的通用核心功能。
JSTL支持通用的、结构化的任务，比如迭代，条件判断，XML文档操作，国际化标签，SQL标签。 除了这些，它还提供了一个框架来使用集成JSTL的自定义标签。
这里简单介绍一下jstl核心标签
#### 核心标签
核心标签是最常用的JSTL标签。引用核心标签库的语法如下：
`<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`
这个引用在jsp页面添加
介绍几个表单回显需要用到的几个标签
`<c:out>` 用于在JSP中显示数据，就像`<%= ... >`
`<c:if>` 与我们在一般程序中用的if一样
比如回显表单中的多选
```
<input type="checkbox" name="hobby" value="足球"
<c:if test="${emp.hobby.indexOf('足球') >=0}" var="res" scope="session">
checked="checked"</c:if>
>足球<input type="checkbox" name="hobby" value="篮球"
<c:if test="${emp.hobby.indexOf('篮球')>=0}" var="res" scope="session">
checked="checked"</c:if>
>篮球<input type="checkbox" name="hobby" value="排球"
<c:if test="${emp.hobby.indexOf('排球')>=0}" var="res" scope="session">
checked="checked"</c:if>
>排球
```
`<c:forEach>` 基础迭代标签，接受多种集合类型
也可以用作form表单回显
```
<input type="checkbox" name="hobby" value="篮球" 
<c:forEach items="${hobby }" var="s">
    <c:if test="${'篮球' == s }">
        checked="checked"
    </c:if>
</c:forEach>
/>篮球
<input type="checkbox" name="hobby" value="足球" 
<c:forEach items="${hobby }" var="s">
    <c:if test="${'足球' == s }">
        checked="checked"
    </c:if>
</c:forEach>
/>足球
<input type="checkbox" name="hobby" value="排球" 
<c:forEach items="${hobby }" var="s">
    <c:if test="${'排球' == s }">
        checked="checked"
    </c:if>
</c:forEach>
/>排球
```
这el和jstl表达式简化了jsp用java代码的取值方式

## jsp第七次课
本次课主要内容：
登录失败的错误提示方法
flieupload文件上传
### 登录失败错误提示
jsp页面form表单提交用户名和密码
数据库匹配失败，即用户名或密码错误
#### 实现方法
在jsp页面form表单下面添加一个标签，回显servlet登录失败传值
```
<!-- 登录失败错误提示 -->
<div style="color:red;text-align:center;">${mes }</div>
```
样式根据自己需要更改

servlet判断失败，进行失败传值
```
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bean.Admin;
import service.AdminServ;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//获取表单数据
		String uname=request.getParameter("uname");
		String pwd=request.getParameter("pwd");
		//创建对象赋值
		Admin ad=new Admin();
		ad.setUname(uname);
		ad.setPwd(pwd);
		//调用service
		AdminServ as=new AdminServ();
		//接收service数据
		Admin admin=as.login(ad);
		//不为空，跳转到主页，否则登录失败，回到登录页
		if(admin!=null) {
			request.getSession().setAttribute("admin", admin);
			response.sendRedirect("showAll");
		}else {
			request.setAttribute("mes","用户名或密码错误");
			request.getRequestDispatcher("login.jsp").forward(request, response);
		}
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
```
### flieupload文件上传
* 在lib文件夹下导入两个jar包
commons-fileupload-1.2.2.jar
commons-io-2.3.jar
这两个包在官网应该可以下载（版本可能不一样）
* jsp页面form表单提交方式为post，`enctype="multipart/form-data"`

```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>文件上传</title>
</head>
<body>
<form action="fileupd" method="post" enctype="multipart/form-data">
<input type="file" name="file">
<input type="submit">
</form>
</body>
</html>
```
将数据提交到servlet
servlet接收上传文件，实现上传
```
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

@WebServlet("/fileupd")
public class Fileupd extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			//创建桌面文件项工程
			DiskFileItemFactory dfif =new DiskFileItemFactory();
			//解析磁盘文件项
			ServletFileUpload sfu=new ServletFileUpload(dfif);
			//解析request请求，放入迭代器
			FileItemIterator fii = sfu.getItemIterator(request);
			//通过迭代器得到上传文件的输入流
			InputStream is=fii.next().openStream();
			//创建输出流
			FileOutputStream fos=new FileOutputStream("d:/1.jpg");
			int len=0;
			byte[] b=new byte[1024];
			while((len=is.read(b))>0) {
				fos.write(b,0,len);
			}
			fos.close();
			is.close();
		} catch (FileUploadException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
```
这里以照片为例，上传的文件保存在`d:/1.jpg`
#### flieupload文件上传工具类分享
```
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;


public class FileUploadTool {
	/**具有所有表单信息的请求*/
	private HttpServletRequest request;
	
	/**存放单个数值的表单数据的KV对,如：文本框，单选框等*/
	private Map<String, String> map;
	
	/**存放多个数值的表单数据的KV对，如：多选框*/
	private Map<String, List<String>> mapValues;
	
	/**文件的上传路径-项目的文件夹*/
	private String filePath;
	
	/**文件最终上传到服务器的位置*/
	private String fileServerUrl;
	
	/**
	 * 基本构造方法，默认上传文件的路径是 image
	 * @param request 具有表单数据的请求
	 */
	public FileUploadTool(HttpServletRequest request) {
		this(request, "image");
	}
	
	/**
	 * @param request 具有表单数据的请求
	 * @param filePath 上传文件的路径
	 */
	public FileUploadTool(HttpServletRequest request, String filePath) {
		this.request = request;
		this.filePath = filePath;
		
		map = new HashMap<String, String>();
		mapValues = new HashMap<String, List<String>>();
		
		upload();//上传文件
	}
	
	/**
	 * 指定上传到服务器上的文件名称
	 * @title: getFileName
	 * @param fileName
	 * @return String
	 */
	private String getFileName(String fileName) {
		return UUID.randomUUID() + fileName.substring(fileName.lastIndexOf(".")) ;
	}
	
	/**
	 * 执行上传文件
	 * @title: upload
	 */
	@SuppressWarnings("unchecked")
	public void upload() {
		//获取文件最终上传到服务器的位置-文件夹
		fileServerUrl = request.getSession().getServletContext().getRealPath(filePath);
		
		//如果此文件夹不存在，则新创建一个。
		File floder = new File(fileServerUrl);
		if(!floder.exists()) {
			floder.mkdir();
		}
		//创建DiskFileItemFactory 对象用来保存表单控件的每一项
		DiskFileItemFactory dff = new DiskFileItemFactory();
		//创建ServletFileUpload 对象 用来解析表单的每一个控件(FileItem)
		ServletFileUpload sfu = new ServletFileUpload(dff);
		
		try {
			//把表单标签封装成FileItem对象
			
			List<FileItem> list = sfu.parseRequest(request);
			//System.out.println("标签总数:" + list.size());
			
			//已存表单的值，用来判断是否已经存过当前name值的表单
			String lastValues = null;
			
			//用来处理多选框等多个数值的表单，存放一个表单控件的多个数据
			List<String> values;
			
			//遍历每个FileItem对象，即遍历每个表单标签
			for (int i = 0; i < list.size(); i++) {
				
				//获取当前所遍历的表单对象
				FileItem fileItem = list.get(i);
				
				//这里获取的是表单标签的name属性值，即Key值
				String targetName = fileItem.getFieldName();
				
				if(fileItem.isFormField()) {//是普通的表单标签
					
					//取出普通标签的值
					String value = fileItem.getString("UTF-8");
					
					//把此表单控件的name属性值，以及用户所填的数据，一起放到map中
					lastValues = map.put(targetName, value);
					
				
					if(lastValues != null ) {//如果有多选框
						
						//获取此多选框的数值集合
						values = mapValues.get(targetName);
						
						//如果没有，即第二个数值
						if(values == null) {
							//则新创建一个集合
							values = new ArrayList<String>();
							
							//把此表单数值集合，放到多数值的map集合中
							mapValues.put(targetName, values);
							
							//把此控件的上一个数值，放到此控件数值集合中。
							values.add(lastValues);
						}
						
						//添加当前的数值到集合中。
						values.add(value);
					}
					
				}else {//是文件标签
					
					String fileName = fileItem.getName();//获取文件的名称-用户上传的
					
					if(!"".equals(fileName)) {//如果用户已选择文件
						//获取上传到服务器上的文件名称
						fileName = getFileName(fileName);
						
						//把此控件的name属性值，及上传到服务器上的文件名称，一起放到map中
						lastValues = map.put(targetName, fileName);
						
						if(lastValues != null ) {//如果是上传多个文件
							//获取此多个文件的数值集合
							values = mapValues.get(targetName);
							
							//如果没有，即第二个数值
							if(values == null) {
								//则新创建一个集合
								values = new ArrayList<String>();
								
								//把此表单数值集合，放到多数值的map集合中
								mapValues.put(targetName, values);
								
								//把此控件的上一个上传到服务器的文件名称，放到此控件数值集合中。
								values.add(lastValues);
							}
							
							//把此控件的上一个上传到服务器的文件名称  加当前的数值到集合中。
							values.add(fileName);
						}
						
						//这是上传文件的关键操作
						fileItem.write(new File(fileServerUrl, fileName));
					}
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 获取单数据表单中的内容
	 * @title: getParameter
	 * @param key
	 * @return String
	 */
	public String getParameter(String key) {
		return map.get(key);
	}
	
	/**
	 * 获取多数据表单控件中的内容
	 * @title: getParamaterValues
	 * @param key
	 * @return List<String>
	 */
	public List<String> getParamaterValues(String key) {
		return mapValues.get(key);
	}
}
```