---
title: jsp第七次课
date: 2019-11-09 20:03:24
tags: jsp
---
本次课主要内容：
登录失败的错误提示方法
flieupload文件上传
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
## flieupload文件上传
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
### flieupload文件上传工具类分享
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