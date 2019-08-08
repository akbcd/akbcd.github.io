---
title: GITHUB+HEXO搭建个人博客2
date: 2019-01-08 21:58:46
tags: 博客
---
## 经验及补充
<!--more-->
## 经验
电脑重做系统或者由于某些原因，本地blog文件存在，但是不能与云端交互数据，请看以下补充
## 补充
重置此电脑或者是重做系统需要进行(前提是那些相关程序已经安装)
右键桌面任意地方选择git bash here 输入以下命令：
- npm install -g cnpm `--`registry=https://registry.npm.taobao.org
- npm install -g hexo
- hexo g (安装全局hexo)
- hexo -v (查看hexo版本)
找到本地blog文件夹，右键选择git bash here 输入以下命令：
- ssh-keygen -t rsa -C “2226227487@qq.com“
git会重新创建一个`id_rsa.pub`文件,把这个文件里的内容添加到账户里(和最初搭建这个博客方法相同)
继续在git中执行以下代码
- hexo g
- hexo d
就是测试能否与云端交互数据，可以创建一个文章测试一下
正常情况会弹出一个`OpenSSH`对话框进行警告，输入`yes`点击`ok`
继续在git中输入
- git config `--`global user.email "2226227487@qq.com"
- git config `--`global user.name "akbcd"
之后再输入
`hexo g` `hexo d`测试即可
***
**如果是某些原因导致的，从找到本地blog文件夹进行即可**
***