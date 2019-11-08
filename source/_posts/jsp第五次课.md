---
title: jsp第五次课（未完待续）
date: 2019-11-08 08:56:54
tags: jsp
---
本次课主要内容：
过滤器web.xml配置方式（web.xml）、监听器、application
表单空间默认值、radio的正常处理、表单控件回显
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