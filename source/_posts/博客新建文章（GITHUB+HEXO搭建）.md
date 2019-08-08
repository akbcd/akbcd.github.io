---
title: 博客新建文章（GITHUB+HEXO搭建）
date: 2018-10-27 21:04:44
tags: 博客
---
## 新建文章
<!--more-->
- 找到本地GITHUB+HEXO搭建个人博客的文件夹，git bash here
- 在git中输入`hexo new "新的文章"`
- git中一会儿会提示`INFO  Created: C:\blog\source\_posts\新的文章.md`
- 用编译器在相应的文件中进行书写创建（.md是支持markdown语法的文件，需要用markdown语法进行书写）
- 写完后 在编译器中保存
- 在git中输入`hexo s`进行本地预览 本地没有问题后，上传到云端
## 文章上传至云端
- 在git中输入
- hexo g(生成网站静态文件到默认设置的 public 文件夹。)
- hexo d(自动生成网站静态文件，并部署到设定的仓库。)
***