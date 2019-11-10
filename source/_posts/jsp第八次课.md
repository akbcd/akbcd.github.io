---
title: jsp第八次课（未完待续）
date: 2019-11-10 10:01:49
tags: jsp
---
文件上传
<!--more-->
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