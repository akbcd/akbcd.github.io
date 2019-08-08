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
## 博客云端备份恢复
### 适用于以下情况：
全新电脑（重置此电脑包括重新安装系统）、github中没有此电脑的密钥即未在github网站上添加id_rsa.pub
### 前提
看过本博客**个人博客备份（GITHUB+HEXO搭建）**文章（类似文章均可），且之前已在github网站备份
## 下面是云端恢复过程：
### 下载软件并安装：node.js、git、编译器
node.js下载地址
[https://nodejs.org/zh-cn/download/](https://nodejs.org/zh-cn/download/)
git下载地址
[https://git-scm.com/downloads](https://git-scm.com/downloads)
编译器我用的是Visual Studio Code，提供Visual Studio Code下载地址
[https://code.visualstudio.com/Download](https://code.visualstudio.com/Download)
### 创建密钥
文件资源管理器任意位置
右键`git bash here`
输入（邮件填写自己的邮件，下面均由我的代替）
- `ssh-keygen -t rsa -C"2226227487@qq.com"`
回车
```
$ ssh-keygen -t rsa -C"2226227487@qq.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Admin/.ssh/id_rsa):
```
继续回车
```
Enter passphrase (empty for no passphrase):
```
继续按回车键
```
Enter same passphrase again:
```
回车
命令执行完成后
在文件资源管理器定位文件C:/Users/Admin/.ssh
看到两个文件
id_rsa(您的标识)和id_rsa.pub(您的公钥)
用编译器打开id_rsa.pub，复制里面的内容
### 登录github，添加公钥
登录github网址：[https://github.com/login](https://github.com/login)
### 云端备份导入本地
选好要导入的位置
右键`git bash here`
输入（填写自己博客的地址，下面均由我的代替）
- `git clone git@github.com:akbcd/akbcd.github.io.git`
***
期间可能会出现警告提示，若出现yes/no选项，填写yes，回车
所需时间根据自己博客大小而定
### 本地博客预览
在输入`hexo s`命令前输入
- `npm install hexo --save`
直接输入`hexo s`会有此提示（因为备份的博客中没有hexo）
```$ hexo s
ERROR Local hexo not found in E:\akbcd.github.io
ERROR Try running: 'npm install hexo --save'
```
### 正常发布及备份文章
当执行到`git commit -m"..."`会有此提示
```
*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
```
因此先执行
- `git config --global user.email “2226227487@qq.com“`
- `git config --global user.name “akbcd”`
然后依次执行
- `git add .`
- `git commit -m"..."`
- `git push origin hexo` 
- `hexo g -d`
- `hexo g -d`
***
**至此，讲解到此结束，感谢大家的阅读。**
***