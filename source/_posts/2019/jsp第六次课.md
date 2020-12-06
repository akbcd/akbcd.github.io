---
title: jsp第六次课
date: 2019-11-09 19:21:43
tags: jsp
---
本次课主要内容：
MVC模式、el表达式、jstl表达式
<!--more-->
## MVC模式
MVC全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。MVC被独特的发展起来用于映射传统的输入、处理和输出功能在一个逻辑的图形化用户界面的结构中。
java项目MVC模式的开发思路
jsp页面：form表单的传值和回显，提交数据到servlet
servlet包：处理form表单的传值，调用service，进行页面跳转
service包：调用dao包，对dao包获得的数据进行回传
dao包：定义sql语句，调用数据库操作的工具包，返回查询的数据
bean包（或vo包）：表中名称私有属性，get/set方法
## el表达式
EL（Expression Language） 是为了使JSP写起来更加简单。表达式语言的灵感来自于 ECMAScript 和 XPath 表达式语言，它提供了在 JSP 中简化表达式的方法，让Jsp的代码更加简化。
### jsp页面的取值方法（非el）
`request.getAttribute("值")`
如果传过来的是一个对象，需要对取值进行强制类型转换
`(UserInfo)request.getAttribute("uinfo")).getUsername()`
### el取值
`${值}`
如果传过来的是一个对象
`${emp.sex }` 对象.属性
el表达式可以进行算数运算，直接输出运算后的结果
逻辑运算时，输出true或false
## jstl表达式
JSP标准标签库（JSTL）是一个JSP标签集合，它封装了JSP应用的通用核心功能。
JSTL支持通用的、结构化的任务，比如迭代，条件判断，XML文档操作，国际化标签，SQL标签。 除了这些，它还提供了一个框架来使用集成JSTL的自定义标签。
这里简单介绍一下jstl核心标签
### 核心标签
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