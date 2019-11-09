---
title: jsp第七次课（未完待续）
date: 2019-11-09 20:03:24
tags: jsp
---
本次课主要内容：
登录失败的错误提示方法
js、jquery的简单介绍
<!--more-->
## 登录失败错误提示
jsp页面form表单提交用户名和密码
数据库匹配失败，即用户名或密码错误
### 实现方法
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
## js的简单介绍
js全称：JavaScript
是Web的编程语言。
所有现代的HTML页面都使用JavaScript。
javascript与java没有任何关系。是一种弱类型语言。