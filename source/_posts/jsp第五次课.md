---
title: jsp第五次课
date: 2019-11-08 08:56:54
tags: jsp
---
本次课主要内容：
过滤器web.xml配置方式、监听器、application
表单空间默认值、表单的正常处理、表单控件回显
MVC模式
<!--more-->
## 过滤器web.xml配置方式（web.xml）
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
## 监听器
监视某事件的发生，做出响应
右键->Listener->起名字->选择你要监听的事件->finish
web.xml配置（注解二选一）
```
<listener>
<listener-class>类名</listener-class>
</listener>
```
## application	
所有用户共享的变量
从服务开启到服务关闭
setAttribute(名字，存放值);
getAttribute(名字);
在servlet中获取application
`request.getSession().getServletContext();`
session重新初始化
`session.invalidate`
### 通过session获取网页在线人数
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
### 通过session获取网页访问量
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
## 表单空间默认值
通过`request.getParameter(name);`获取值
checkbox通过`request.getParameterValues("checkbox");`获取值（用字符串数组接值）

|input标签type属性|值|
|:-:|:-:|
|password|空字符串|
|password|空字符串|
|textArea|空字符串|
|radio|null|
|checkbox|null|

## radio的正常处理
一般情况下会有默认值（checked="checkid"）
## checkbox（字符串数组）
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
## 表单空间回显

|属性|回显方法|
|:-:|:-:|
|text|value=<%=request.getAttribute("text")%> 如果有可能第一次访问当前界面，需要判断值是否是null|
|textarea|两个标签之间|
|radio|将得到的值，和每一个选项判断，加上checked="checked"|
|checkbox|将得到的值，和每一个选项判断，加上checked="checked"|

## MVC模式
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