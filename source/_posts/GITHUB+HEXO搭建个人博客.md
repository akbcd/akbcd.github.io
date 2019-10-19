---
title: GITHUB+HEXO搭建个人博客
date: 2018-09-22 07:38:14
tags: 博客
---
## GITHUB+HEXO搭建个人博客

上课老师教我们用GitHub+hexo搭建个人博客的方法，起初觉得没有用，因为一个谈话，顿时觉得这个博客很有用，而且还是免费的，为何不用呢？以此作为上课的笔记，也可以提高代码输入速度，何乐而不为。

网上有很多用GITHUB+HEXO搭建个人博客，具体可点击[hexo+github如何搭建博客](https://liulu1990.github.io/2018/09/02/hexo+github搭建博客/)
以下内容作为补充(也可以按我的操作来)
<!--more-->
## 准备软件

- 需要安装Node.js和Git，安装路径任意
- 安装代码编译软件，如Sublime、Hbuilder、Visual Studio Code等
安装时提示是否创建快捷方式、图标的选项，最好都选上
- 在C盘下新建一个文件夹名为blog(盘符任意，可以不是c盘、文件夹名任意，最好是英文名)
当然我也不知道括号外面的是不是规范
## 输入命令

右键任意地方选择git bash here 输入以下命令：
- npm install -g cnpm `--`registry=https://registry.npm.taobao.org
- npm install -g hexo(安装全局hexo)
- `npm install hexo --save`(本地hexo安装)
- hexo -v(hexo是否已安装)

找到自己创建的blog文件夹-右键打开选择git bash here 输入以下命令:
- hexo init(初始化hexo)
- npm install
- hexo server(本地搭建，在浏览器端输入localhost:4000看一下效果)
- ctrl+c 结束运行

进入GitHub网站创建账户 点击[github](https://github.com/)进入
在git命令中继续执行代码
- ssh-keygen -t rsa -C “2226227487@qq.com“（“GitHub创建时用的邮箱“）
进入c/Users/apple/.ssh/id_rsa.pub 应该是这个路径，可以在c盘根目录下查找id_rsa.pub，用编译器打开，复制里面的内容，并保存下来
进入GitHub网站,创建一个repository,进入相应页面，在Repository name下输入Owner下的名字+.github.io(可能说的有些复杂)
Owner下的名字,我的是akbcd,以下用akbcd代替，即在Repository name下输入akbcd.github.io(下面的创建选项根据自己需要进行选择，也可以不动，直接创建)
在GitHub网站中找到Settings,进入。选择SSH and GPG keys,进入点击New SSH key,title任意，key输入自己刚才复制并保存的那段，之后保存，会向注册邮箱发验证码，验证一下
用编译软件打开blog文件夹，在根目录中找到_config.yml
用编译软件打开，在里面找到Deploy,更改
- type: git
- repo: git@github.com:akbcd/akbcd.github.io.git
- branch: master

在git中输入以下代码
- git config `--`global user.email "2226227487@qq.com"
- git config `--`global user.name "akbcd"
git中继续
- hexo g（先生成）
- npm install hexo-deployer-git `--`save
- hexo d（后部署,然后在github上查看文件是否已提交）
弹出对话框，输入yes 点击ok
最后在地址栏输入：https://akbcd.github.io
到此，GITHUB+HEXO搭建个人博客就完成了
注：如果本地blog文件夹内容上传不了，需要从`ssh-keygen -t rsa -C “2226227487@qq.com“`重新开始。
***