---
title: jsp第一次课
date: 2019-10-09 09:54:51
tags: jsp
---
jsp是java web开发相关知识。简言之，就是用Java和html相关知识做jsp页面，页面类似html，但是扩展名为`.jsp`，并非`.html`
本次课主要内容：创建jsp项目，jsp注释，jsp指令，jsp脚本元素
<!--more-->
通过JavaSE Mysql 可以完成一个简单的控制台项目

**两种程序设计方式**
* C/S 客户端 服务器（如桌面应用QQ）
* B/S 浏览器 服务器

**静态网页和动态网页的区别**
* 静态和动态最大的区别 数据的交互
* 静态是没有数据的，动态是对数据的增删改查（CURD）

## 什么是jsp
* 全称：java server pages
* 运用的知识：html+java+数据库+jsp自己的语法+js

## 什么是3p
* jsp（跨平台，免费） php（论坛，数据量小） asp（微软，收钱）

## 安装环境
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

## 利用eclipse开发java web项目
* 打开eclipse，选好工作空间，在工作空间中选择 File>New>Dynamic Web Project
* 输入项目名称，选择Target runtime中Tomcat版本（选自己安装的版本）
* 点击Finsh，项目创建成功

### 没有Dynamic Web Project解决办法
* 在New>other...中查找，如果依然没有，可能是没有安装相应插件
* 安装插件 Help>Install New Software...>选自己的eclipse版本
* 在  Web, XML, Java EE and OSGi Enterprise Development	中选择（个别没有的表明你已安装）
    * Eclipse Java EE Developer Tools
    * Eclipse Java Web Developer Tools
    * Eclipse Web Developer Tools
    * Eclipse XML Editors and Tools

### New Runtime中没有Tomcat版本选择
* 安装插件 JST Server Adapters

## jsp文件
* 创建文件后，默认不是utf-8编码，会出现中文乱码问题，在Preference中 `JSP Files`中修改编码为utf-8
* jsp 必须通过 server 运行

## 如何创建项目的首页
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
## jsp的 注释有几种？
* html 注释 是显示注释   `<!-- -->` 
* java 注释  `//` `/* */` 
* jsp 自己注释  `<%-- --%>` 隐世注释

## jsp的指令有几个？都是什么？做什么的？
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

## jsp 的脚本元素
* <% 这是java代码 %>
中间可以穿插html标签，但需要将java代码截断（可以参考练习中的代码）
* <%=表达式%>
输出的作用，切记 千万千万别写分号
* <%!全局内容%>

## 总结
### jsp
* Java + html +mysql +jsp自己语法+js

### jsp做什么？
* 动态网页（数据交互）

### jsp的3个指令？
* `<%@ page %>`
	* 注：import 能使用多次

* `<%@ include file=""%>`
* `<%@ taglib %>`

### jsp的3个脚本元素？
* <%java代码%>
* <%! 全局变量%>
* <%=表达式%> 不能有分号

### 开发设计模式
* jsp（专门做显示工作） +javaBean（业务逻辑的东西）

## 练习
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