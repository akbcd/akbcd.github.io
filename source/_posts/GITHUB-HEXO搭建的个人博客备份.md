---
title: GITHUB+HEXO搭建的个人博客备份
date: 2019-01-15 10:56:09
tags: 博客
---
## hexo博客备份到GitHub
<!--more-->
最近一直在找关于hexo博客备份的文章，几乎都没有看懂，自己仔细研究了两天，终于实现了备份，下面讲解详细步骤
**前提：**在GitHub上已经发布过文章
**思路：**使用Hexo在github搭建的博客，博客作为一个单独的GitHub仓库存在，但是这个仓库只有生成的静态网页文件，并没有Hexo的源文件，如果要换电脑或者重装系统后，就比较麻烦了，利用仓库分支，新建一个新分支hexo(可以自定义名称)，master分支和hexo分支，分别保存静态网页和源文件，这样就实现了备份源代码到GitHub仓库。
## 详细步骤
1.登录到自己的GitHub网站，网站：[https://github.com/](https://github.com/)
***
2.找到自己创建的仓库，点击进入到代码页面,选择**Branch:master**(图片红色标注部分)
![](http://wx4.sinaimg.cn/mw690/0060lm7Tly1fz73mc5zesj30y90e9tau.jpg)
在**Find or creat a branch...**搜索框中输入**hexo**，选择下面的**Creat branch: hexo**,创建hexo分支。到此分支创建完成
***
3.点击**2 branches**，进入分支管理页面,将**hexo**设为默认分支，具体怎么设，自己研究(其实很简单，就不说了)。到此，将hexo设为默认分支完成。
![](http://wx2.sinaimg.cn/mw690/0060lm7Tly1fz73yd54o0j30yc0atabh.jpg)
***
4.在本地桌面，磁盘里，文件夹都行，右键**Git Bash Here**,在git里面输入：
- `git clone git@github.com:akbcd/akbcd.github.io.git`(解释一下：将新建hexo分支里面的文件克隆到指定文件夹**akbcd.github.io**,我的是akbcd,换成自己的就行)
![](http://wx1.sinaimg.cn/mw690/0060lm7Tly1fz74co2j0cj30km0a8q40.jpg)
本地创建了一个新文件夹**akbcd.github.io**，点击进入,将隐藏的文件显示出来，会看到**.git**文件夹，除了这个文件，其余全部删除
***
5.将本地之前发布文章的**blog**文件夹里的内容复制粘贴到文件夹**akbcd.github.io**，引用别人的话：将themes/next/(我用的是NexT主题)中的.git/删除，否则无法将主题文件夹push(其实我的没有，所以直接忽略)
***
6.文件夹**akbcd.github.io**右键**Git Bash Here**,在git里面输入(观看akbcd.github.io后面是否有蓝色hexo字样，如果没有就错了)：
- `git add .` (详解：**git空格add空格.**，切记不要打错，否则命令就错了)
- `git commit -m"..."` (详解：**git空格commit空格-m"..."**)
- `git push origin hexo` 
来提交hexo网站源文件
- `hexo g -d` (详解：**hexo空格g空格-d**)
生成静态网页部署至Github上,下面是操作图片:
![](http://wx3.sinaimg.cn/mw690/0060lm7Tly1fz75222tc2j30km0cjwhj.jpg)
***
![](http://wx4.sinaimg.cn/mw690/0060lm7Tly1fz752vwhh7j30kr0chadg.jpg)
***
![](http://wx4.sinaimg.cn/mw690/0060lm7Tly1fz753i9bz6j30kl07mta7.jpg)
***
![](http://wx1.sinaimg.cn/mw690/0060lm7Tly1fz7543vdyjj30km0chac2.jpg)
***
![](http://wx3.sinaimg.cn/mw690/0060lm7Tly1fz754oinm9j30kn0chjtj.jpg)
***
这样一来，**akbcd.github.io**仓库就有master分支和hexo分支，分别保存静态网页和源文件。
**最后：**将文件夹**akbcd.github.io**删除，重新克隆至本地，打开会发现文件数量和之前的不一样，少了一些，但是不影响。此文件夹作为本地**blog**文件夹使用，对hexo博客进行的更改包括：发布、删除文章，更换主题，均在此文件夹进行。完事后执行代码有所变化：
- `git add .` (详解：**git空格add空格.**，切记不要打错，否则命令就错了)
- `git commit -m"..."` (详解：**git空格commit空格-m"..."**)
- `git push origin hexo` 
- `hexo g -d`
此时会提示错误，根据提示执行：
- `npm install hexo --save`(如果没有提示报错，请忽略此步骤)
- `hexo g -d`
先上传源代码再发布文章，即完成了边发布边保存。可以上自己的GitHub官网页面查看，hexo和master分支均进行了更新。
本地文件丢失，通过克隆将源代码文件克隆到本地，保证了文件的备份。
***
**至此，讲解到此结束，感谢大家的阅读。**