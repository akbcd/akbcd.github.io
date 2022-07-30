---
title: eclipse安装与测试
date: 2020-04-24 06:59:35
tags: 教程
categories: [笔记]
---
本篇文章记录eclipse安装方法以及常用的一些配置
<!--more-->
## eclipse安装
### 下载eclipse
进入eclipse官网：https://www.eclipse.org/downloads/packages/
注：不同eclipse版本的扩展版本可能不同
选择自己所用开发语言的版本，这里以java语言为例，eclipse版本为 2020-03
总共有两个java语言版本**Eclipse IDE for Java Developers**和**Eclipse IDE for Enterprise Java Developers (includes Incubating components)**
如果你需要**java web**开发，选择**Eclipse IDE for Enterprise Java Developers (includes Incubating components)** ，若没有此项，尝试切换eclipse版本。
选择**Windows 64-bit**，这里以**Windows10 64位**操作系统安装为例
进入下载页面，点击下载，如果没有跳出下载窗口，尝试切换镜像，将镜像地址改为中国镜像
### 安装eclipse
下载好的eclipse是zip压缩文件，解压后，点击`eclipse.exe`，进入到eclipse启动页面
因为下载的是带有开发环境的eclipse，不需要安装，简单配置就可以使用了
启动页面提示不能运行
![eclipse报错](https://i.loli.net/2020/04/24/K3VICjkMBFa6o9e.png)
这是因为电脑还没有安装java
### 下载java
如果你嫌麻烦，直接在浏览器搜索java，进入到java官网下载页面推荐的java版本，文件很小，下载的只是个java下载程序，下载后，打开此程序，java会自动下载，不过多介绍
下载完整java程序，看下面内容：（需要登录Oracle账户）
进入javase页面：https://www.oracle.com/java/technologies/javase-downloads.html
这里面有java现在应用的所有版本，一般需要的是java7或者java8，这里以下载java8u251为例
找到**Java SE 8u251**，选择**Oracle JDK**>**JDK Download**进入下载页面（jdk里面包含jre）
选择自己的系统版本，点击后面的下载链接
![jdk下载](https://i.loli.net/2020/04/24/5DonH4pZYAMm1Kj.png)
记得之前不需要登录账户就可以下载，现在需要登录账户了，登录成功自动跳转下载窗口进行下载（文件200多M，包含jre）
### 安装java
打开自己下载好的**java jdk**程序，依次下一步，选择安装位置，jdk安装完会弹出jre安装
注：这里的jre安装是可以选择安装位置的，但是java更新所安装的jre默认为c盘，而且不会弹出路径选择
安装完成后，打开eclipse，eclipse成功打开，选择自己的工作空间，进入eclipse（win10系统下eclipse使用不需要配置环境变量，如果你是cmd，需要配置）
**到此，eclipse安装完成**
## 测试
### 更改代码大小
选择Window>Prefences打开
选择General>Appearance>`Color and Fonts`找到`Text Font`进行编辑即可（三个第一项）
### 设置工作空间编码格式为utf-8
依次Window>Prefences>General>Workspace
找到`Text file econding`
默认为GBK，选择其它，改为utf-8
jsp文件设置utf-8
`Window>Prefences>Web>Jsp Files`选择utf-8
### java语言测试
创建java项目
`File>New>Java Project`
输入java项目名称，点击Finish即可
在src文件夹下创建package或者直接创建class，记住类名规范，输入语句进行测试
### jsp测试
#### 配置tomcat
jsp文件的运行需要tomcat服务
点击：[tomcat官网](http://tomcat.apache.org/)下载需要的版本
选择`Binary Distributions`下面的Core中内容进行下载，里面有对应的Windows版本。（如果不能下载，依然是切换镜像）
下载后解压即可
注：tomcat默认使用8080端口（tomcat在eclipse使用不需要配置环境变量）
#### 创建`Dynamic Web project`项目
`File>New>Dynamic Web project`
输入项目名称
在`Target runtime`下面选择`New Runtime...`，在Apache中选择自己下载的tomcat版本，点击next，点击Browse...，找到tomcat解压后的路径，添加tomcat
两次下一步进入到`Web Module`页面，根据自己的需要选择是否创建`web.xml`文件
创建jsp文件测试
`Dynamic Web project`项目WebContent文件夹下创建jsp文件，输入测试内容保存
右键`Run As`选择在服务器上运行
eclipse启动tomcat服务，服务启动成功跳转到jsp页面，也可以把路径复制下来，粘贴到浏览器中进行调试
**到此，jsp测试成功**