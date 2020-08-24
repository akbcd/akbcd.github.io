---
title: GITHUB+HEXO搭建个人博客
date: 2018-09-22 07:38:14
updated: 2020-08-19
toc: true
tags: 博客
---
本篇文章介绍**GITHUB+HEXO搭建个人博客**的方法，讲述如何创建GitHub账户，通过hexo在GitHub上搭建个人博客以及如何通过GitHub分支实现本地博客备份至GitHub等。文章讲述可能较为详细，可以通过目录快速定位到自己需要的部分，本篇文章适合新手阅读。
注：这篇文章是自己对**GITHUB+HEXO搭建个人博客**的总结，当你看到这篇文章时，也就意味着之前关于**GITHUB+HEXO搭建个人博客**的多篇文章已被删除。
文章里建议参看的文章，如果没有链接，请手动在所有文章中查找
<!--more-->
快速导航（建议通过目录跳转，目录位置：页面右下角）：
[博客简介](#博客简介)
[需要准备的软件](#需要准备的软件)
[git准备工作](#git准备工作)
[创建GitHub账户](#创建GitHub账户)
[配置_config.yml文件](#配置_config.yml文件)
[配置本地blog文件夹](#配置本地blog文件夹)
[博客新建文章](#博客新建文章)
[博客更换主题](#博客更换主题)
[hexo最常用的几个命令](#hexo最常用的几个命令)
[个人博客备份](#个人博客备份)
[博客备份导入本地](#博客备份导入本地)
# 博客简介
百度百科截取
>博客，仅音译，英文名为Blogger，为Web Log的混成词。它的正式名称为网络日记；又音译为部落格或部落阁等，是使用特定的软件，在网络上出版、发表和张贴个人文章的人，或者是一种通常由个人管理、不定期张贴新的文章的网站。博客上的文章通常以网页形式出现，并根据张贴时间，以倒序排列。通常具备RSS订阅功能。博客是继MSN、BBS、ICQ之后出现的第4种网络交流方式，现已受到大家的欢迎，是网络时代的个人“读者文摘”，是以超级链接为入口的网络日记，它代表着新的生活、工作和学习方式。许多博客专注在特定的课题上提供评论或新闻，其他则被作为个人性的日记。一个典型的博客结合了文字、图像、其他博客或网站的链接及其它与主题相关的媒体，能够让读者以互动的方式留下意见，是许多博客的重要要素。大部分的博客内容以文字为主，但仍有一些博客专注在艺术、摄影、视频、音乐、播客等各种主题。博客是社会媒体网络的一部分。比较著名的有新浪等博客。

## 为什么用GITHUB+HEXO搭建个人博客
首先，GITHUB和HEXO都是免费的，其次，GitHub是微软旗下的一个面向开源及私有软件项目的托管平台，几乎可以在上面发布任何信息（自己理解）。虽然优点很多，但是难免会有缺点：
1.GitHub托管的个人博客，百度搜索引擎无法抓取
2.个人博客访问速度可能较慢，可以参看 **jsdelivr加速博客静态资源**
# 需要准备的软件
参看自己的操作系统，安装相应版本
## Node.js和Git
**GITHUB+HEXO搭建个人博客**必须的两个软件，安装路径自定义，以下为官方下载地址
[node.js](https://nodejs.org/zh-cn/download/)
[git](https://git-scm.com/downloads)
注：**git**安装时切记勾选**git bash here**
## 代码编译软件
简言之，就是写博客的软件，如**Visual Studio Code**，以下为**Visual Studio Code**官方下载地址
安装时提示是否创建快捷方式、图标的选项，最好都选上
[Visual Studio Code](https://code.visualstudio.com/Download)
## 前期准备
在C盘下新建一个文件夹名为**blog**（盘符任意，可以不是c盘、文件夹名任意，最好是英文名），用于存放本地博客文件

网上有很多用GITHUB+HEXO搭建个人博客，具体可点击[hexo+github如何搭建博客](https://liulu1990.github.io/2018/09/02/hexo+github搭建博客/)
# git准备工作
当你安装完成**git**软件后，现在开始使用它了
## 在git中输入命令
右键任意位置选择**git bash here**输入以下命令，注意：只有这里可以是任意位置右键，其余均需要在blog文件夹右键：
1.`npm install -g cnpm --registry=https://registry.npm.taobao.org`（可选） ——使用淘宝镜像，简言之，就是提高下载速度
2.`npm install -g hexo` ——全局安装hexo
3.`hexo -v` ——检测hexo是否安装成功，出现版本号表明成功安装

找到自己创建的blog文件夹，右键打开选择**git bash here**输入以下命令:
1.`hexo init` ——初始化hexo
2.`npm install` ——安装npm
3.`hexo server` ——简写为`hexo s`，启动hexo本地服务，在浏览器端输入localhost:4000看一下效果
4.ctrl+c 结束本地服务，git窗口中有提示
说明：hexo服务默认端口为4000，如果被占用，请自行在百度里搜索相关解决办法。浏览器端输入localhost:4000，访问后会出现博客初始化效果，ctrl+c结束本地服务后（需要在git窗口中执行），localhost:4000无法访问
友情提示：hexo命令以及介绍参看hexo官方文档：https://hexo.io/zh-cn/docs/

# 创建GitHub账户
既然是在GitHub上托管自己的博客，当然需要有一个GitHub账户
进入GitHub网站创建账户，点击[github](https://github.com/)，记住自己的用户名和邮箱，下面需要用到
GitHub在国内可以访问，如不能访问，参看 **电脑无法访问GitHub解决办法**
## 创建repository
登录github：[https://github.com/login](https://github.com/login)
单击**Create repository**创建一个repository，**Repository name**输入`yourname`+`.github.io`，yourname为Owner名
下面的创建选项根据自己需要进行选择，也可以不动，直接创建，切记不要选择Private
## 本地创建ssh key
git中输入
`ssh-keygen -t rsa -C "your_email@youremail.com"` ——在本地创建**ssh key**，**your_email@youremail.com**为GitHub创建时用的邮箱
回车
```
$ ssh-keygen -t rsa -C"your_email@youremail.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Admin/.ssh/id_rsa):
```
直接点回车，说明会在默认文件id_rsa上生成ssh key。 
```
Enter passphrase (empty for no passphrase):
```
系统要求输入密码，直接按回车表示不设密码。
```
Enter same passphrase again:
```
重复密码时也是直接回车，之后提示你**shh key**已经生成成功。
## 添加key到github网站
文件资源管理器定位文件C:/Users/yournam/.ssh，yourname为当前计算机用户名
看到两个文件
id_rsa(您的标识)和id_rsa.pub(您的公钥)
用编译器打开id_rsa.pub，复制里面的内容
进入GitHub网站，在GitHub网站中找到Settings（单击用户头像）。设置里找到**SSH and GPG keys**，进入点击**New SSH key**，title任意，key输入自己刚才复制的id_rsa.pub内容，之后保存。保存成功后会向邮箱发送提醒
# 配置_config.yml文件
blog文件hexo初始化后，根目录下创建的_config.yml为hexo站点配置文件
修改hexo站点配置文件，需要重启hexo服务生效
## Hexo 5.0.0 Released
本内容基于hexo5.0站点配置文件进行简单的说明，不同版本hexo站点配置文件会有差异
## 需要修改的内容
具体可以参看hexo官方文档：https://hexo.io/zh-cn/docs/
下面简单介绍需要修改的内容
### Site
```
# Site
title: Hexo
subtitle: ''
description: ''
keywords:
author: John Doe
language: en
timezone: ''
```
* title
  * hexo站点标题，即播客主页title标签内容
* description、keywords
  * 对站点的描述和关键字，部署到搜索引擎需要用到
* author
  * 站点作者
* language
  * 站点语言，很重要，不修改访问站点会提示翻译中文
* 其余不需要修改

### URL
```
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://yoursite.com
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true # Set to false to remove trailing '.html' from permalinks
```
* url
  * url修改为自己站点地址，github为`https://yourname.github.io`，yourname为GitHub用户名
* 这里只需要修改此项即可

### Directory
```
# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:
```
* 不需要修改

### Writing
```
# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link:
  enable: true # Open external links in new tab
  field: site # Apply to the whole site
  exclude: ''
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
prismjs:
  enable: false
  preprocess: true
  line_number: true
  tab_replace: ''
```
* post_asset_folder
  * 生成文章对应文件夹，引用本地资源请开启此项
* external_link.enable
  * 是否在新窗口打开链接，默认为true
* highlight.enable
  * 代码高亮，仿佛需要主题支持，hexo5.0出现了hljs，高亮js，难道hexo已集成？
* highlight.line_number
  * 代码区块是否有行号
* prismjs为新增内容，不清楚啥功能，建议参看文档

### Home page setting
```
# Home page setting
# path: Root path for your blogs index page. (default = '')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
index_generator:
  path: ''
  per_page: 10
  order_by: -date
```
* 归档页面的配置
* per_page
  * 归档页面每页文章个数，默认为10
* order_by
  * 归档页文章排序方式，-date表示新文章在最上方

### Category & Tag
```
# Category & Tag
default_category: uncategorized
category_map:
tag_map:
```
* 不需要修改

### Metadata elements
```
# Metadata elements
## https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
meta_generator: true
```
* 不需要修改

### Date / Time format
```
# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss
## updated_option supports 'mtime', 'date', 'empty'
updated_option: 'mtime'
```
* 不需要修改

### Pagination
```
# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page
```
* 分页功能，per_page表示每页文章个数，0表示不分页

### Include / Exclude file(s)
```
# Include / Exclude file(s)
## include:/exclude: options only apply to the 'source/' folder
include:
exclude:
ignore:
```
* 不需要修改

### Extensions
```
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: landscape
```
* theme
  * 主题配置，下面详细说明

### Deployment
```
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: ''
```
* 暂时不需要修改，下面有详细说明

# 配置本地blog文件夹
用编译软件打开blog文件夹，在根目录中找到_config.yml
用编译软件打开，在里面找到deploy，修改为如下模式，yourname改为Owner名
```
deploy:
  type: git
  repo: git@github.com:yourname/yourname.github.io.git
  branch: master
```
blog文件夹，右键打开选择**git bash here**输入以下命令：
1.`git config --global user.email "you@example.com"` ——git确认信息，you@example.com为注册GitHub所用邮箱
2.`git config --global user.name "Your Name"` ——git确认信息，Your Name为注册GitHub用户名
3.`npm install hexo-deployer-git --save` ——安装hexo-deployer-git
4.`hexo g` ——生成静态文件
5.`hexo d` ——部署网站
正常情况会弹出一个`OpenSSH`对话框进行警告，输入`yes`点击`ok`
最后在浏览器输入：`https://yourname.github.io`，yourname为GitHub用户名
可以访问表明GITHUB+HEXO搭建个人博客完成
注：如果本地blog文件夹内容上传不了，需要从**本地创建ssh key**重新开始。
# 博客新建文章
上面介绍了如何搭建博客，既然博客搭建完成，那就需要开始写文章了
找到blog文件夹，右键**git bash here**输入
1.`hexo new "example"`——创建文章，example为文章名
git中一会儿会提示`INFO  Created: 路径\blog\source\_posts\example.md`，路径为自己blog文件夹所在路径
2.用编译器在相应的文件中进行书写保存（.md是支持markdown语法的文件，需要用markdown语法进行书写），参看 **markdown基本语法（GITHUB+HEXO搭建的博客）**
写完后 在编译器中保存
3.在git中输入`hexo s`进行本地预览，通过访问localhost:4000查看，本地没有问题后，部署网站
## 部署网站
blog文件夹，右键**git bash here**输入
1.`hexo g` ——生成静态文件
2.`hexo d` ——部署网站
上面两个命令可以简记为一个命令
`hexo g -d` ——先生成静态文件，之后部署网站
# 博客更换主题
好的博客当然需要一个好的主题来衬托
## 选一个好的主题
好的主题有很多，比方说看看这篇知乎的文章：[有哪些好看的hexo主题](https://www.zhihu.com/question/24422335)
HEXO主题官方网站：[https://hexo.io/themes/](https://hexo.io/themes/)
我们就以yilia主题为例来美化我们的博客吧！(因为我用的就是这个)
1.首先进入HEXO主题官方网站或知乎文章，点击相应的主题，进入GitHub项目页面，点击**Clone or download**选择**Download ZIP**下载后解压
如果你认为下载速度很慢，可以参看下面的**博客备份导入本地>新电脑>云端备份导入本地>快速下载GitHub文件的方法**，可以通过目录快速跳转，里面有介绍方法
2.进入自己搭建博客的本地blog文件夹，将自己的解压后的文件夹复制到themes文件夹内，在此文件夹里你应该看到的是hexo-theme-yilia-master(可以将此文件夹重命名为yilia)和landscape（hexo初始化主题）
## 安装主题
1.首先我们要修改博客的配置文件_config.yml（注意，是整个博客的配置文件，也就是博客blog目录下的_config.yml。由于主题中也含有_config.yml，所以在这里进行区分。）
2.用编译软件打开自己博客的本地文件夹，在文件夹根目录下找到_config.yml。
3.在_config.yml中找到theme选项，把主题切换为下图，将原来的landscape删掉，改为yilia，然后保存即可。
![](http://wx1.sinaimg.cn/mw690/0060lm7Tly1fvkqb1a4wxj30ao02rq2t.jpg)
完成之后主题就可以用啦，是不是有些迫不及待。正巧我们应该做一些本地测试来看看主题是否完备。话不多说，开始吧。
4.选中自己博客的本地文件夹，如果没改的话，应该是blog，右键**git bash here**
5.在git中输入`hexo s`回车
在本地浏览器输入相应的网址，观察一下效果，如果成功，那就差最后一步了
## 更换主题可能遇到的问题
这里分享自己遇到的两个问题，看看有没有遇到
### 切换主题不生效
修改_config.yml文件并保存后，浏览器刷新页面发现主题没换，还是之前的主题。
出现这种情况，很有可能是自己在开启hexo服务的情况下更换的主题，所以ctrl+c结束服务，`hexo s`启动服务，即重启hexo服务再试一下
### 切换主题不显示
这个问题跟上面那个问题不一样，这个问题的前提是主题切换成功了，在浏览器中出现
```
extends includes/layout.pug block content include ./includes/mixins/post-ui.pug #recent-posts.recent-posts +postUI include includes/pagination.pug
```
其实出现这个问题，是因为hexo缺少这个主题所需要的插件，git中输入命令
`npm install hexo-renderer-pug hexo-renderer-stylus`
安装成功后，启动服务再试试
## 主题自定义修改
网上下载的主题都是开源的，意味着自己可以根据需要进行修改，有的需求可以在主题配置文件_config.yml中修改。
踩了这么多坑，目前发现主题大多是用两种模板开发，一种是ejs，另一种就是pug（参看主题layout文件夹中文件的扩展名）
ejs扩展名的主题，hexo原生支持，而且只要自己有接触过java和html，应该都能看懂，想夸张修改也就不成问题
pug扩展名的主题，需要安装插件才能使用，这种主题，也就修改修改样式吧
## 主题上传到云端
1.没问题的话，按照yilia的官方指导教程，我们顺便修改一下站点配置文件（即根目录下的_config.yml）里面的语言（也就是整个博客的语言）
将language后面的内容修改为zh-Hans。注：语言的修改，需要主题的支持
注意，冒号之后必有空格哦！
![](http://wx2.sinaimg.cn/mw690/0060lm7Tly1fvkqpht79vj305l05b0sn.jpg)
2.将新主题发布到自己的网站上，操作如下：
blog文件夹，右键**git bash here**输入
1).`hexo g` ——生成静态文件
2).`hexo d` ——部署网站
上面两个命令可以简记为一个命令
`hexo g -d` ——先生成静态文件，之后部署网站
# hexo最常用的几个命令
hexo命令以及介绍参看hexo官方文档：https://hexo.io/zh-cn/docs/
## hexo s
启动本地服务器，用于预览主题。默认地址： http://localhost:4000/
hexo s 是 hexo server 的缩写，命令效果一致；
预览的同时可以修改文章内容或主题代码，保存后刷新页面即可；
对 Hexo 根目录 _config.yml 的修改，需要重启本地服务器后才能预览效果。
## hexo new `"新的文章"`
新建一篇标题为 `新的文章` 的文章。
## hexo d
自动生成网站静态文件，并部署到设定的仓库。
hexo d 是 hexo deploy 的缩写，命令效果一致。
## hexo clean
清除缓存文件 db.json 和已生成的静态文件 public 。
网站显示异常时可以执行这条命令试试。比如：
修改了主题样式，但是启动服务后样式没有改变；修改了图片内容，但是图片没有变。
## hexo g
生成网站静态文件到默认设置的 public 文件夹。
便于查看网站生成的静态文件或者手动部署网站；
如果使用自动部署，不需要先执行该命令；
hexo g 是 hexo generate 的缩写，命令效果一致。
## hexo g -d
先执行`hexo g`再执行`hexo d`
# 个人博客备份
这是一个很有必要的操作。其实你在部署网站后，GitHub仓库中已经有了数据，而且可以下载下来，但是下载下来的文件是经过hexo编译后的html文件，并不是我们书写的md文件
网上有很多关于备份的方法，这里分享一个用仓库分支实现备份的方法
## hexo博客备份到GitHub
**前提：**在GitHub上已经发布过文章
**思路：**使用Hexo在github搭建的博客，博客作为一个单独的GitHub仓库存在，但是这个仓库只有生成的静态网页文件，并没有md源文件，如果要换电脑或者重装系统后，就比较麻烦了，利用仓库分支，新建一个hexo分支(分支可以自定义名称)，master分支保存静态网页，hexo分支保存源文件，这样就实现了备份源代码到GitHub仓库。
## 创建新分支
1.登录到自己的GitHub网站，网站：[https://github.com/](https://github.com/)
2.找到自己创建的仓库，点击进入到代码页面,选择**Branch:master**(图片红色标注部分)
![](http://wx4.sinaimg.cn/mw690/0060lm7Tly1fz73mc5zesj30y90e9tau.jpg)
在**Find or creat a branch...**搜索框中输入**hexo**，选择下面的**Creat branch: hexo**，创建hexo分支。到此分支创建完成
3.点击**2 branches**，进入分支管理页面,将**hexo**设为默认分支，具体怎么设，自己研究(其实很简单，就不说了)。到此，将hexo设为默认分支完成。
![](http://wx2.sinaimg.cn/mw690/0060lm7Tly1fz73yd54o0j30yc0atabh.jpg)
## 配置本地备份文件夹
1.在本地桌面，磁盘里，文件夹都行，右键**Git Bash Here**，在git里面输入：
`git clone git@github.com:yourname/yourname.github.io.git` ——解释一下：将新建hexo分支里面的文件克隆到指定文件夹**yourname.github.io**，yourname换成自己的GitHub用户名
![](http://wx1.sinaimg.cn/mw690/0060lm7Tly1fz74co2j0cj30km0a8q40.jpg)
本地创建了一个新文件夹**yourname.github.io**，点击进入，将隐藏的文件显示出来，会看到`.git`文件夹，除了这个文件，其余全部删除
2.将本地之前发布文章的**blog**文件夹里的内容复制粘贴到文件夹**yourname.github.io**
注：关于主题，这里引用别人的话：
>将themes/next/(我用的是NexT主题)中的.git/删除，否则无法将主题文件夹push

## 本地数据备份至GitHub
文件夹**yourname.github.io**右键**Git Bash Here**，在git里面输入（看yourname.github.io后面是否有蓝色hexo字样，如果没有就错了）：
1.`git add .` ——将文件的修改，文件的新建，添加到暂存区。详解：**git空格add空格.**，切记不要打错，否则命令就错了
2.`git commit -m"..."` ——提交修改，`...`为对修改的描述。详解：**git空格commit空格-m"..."**
3.`git push origin hexo` ——将源文件提交到hexo分支
4.`hexo g -d`
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
这样一来，**yourname.github.io**仓库就有master分支和hexo分支，分别保存静态网页和源文件。
打开GitHub参看仓库hexo分支是否更新，更新则个人博客备份完成
此文件夹作为本地**blog**文件夹使用，对hexo博客进行的更改包括：发布、删除文章，更换主题，均在此文件夹进行。
# 博客备份导入本地
这里对新旧电脑进行说明
新电脑：即电脑中不含有关于博客的任何文件以及本地**ssh key**
旧电脑：GitHub中含有当前电脑的**ssh key**，并且已经有**yourname.github.io**文件夹
## 新电脑
### 下载软件
参看目录：**需要准备的软件**
### 在本地创建ssh key
文件资源管理器任意位置`git bash here`

输入代码
`ssh-keygen -t rsa -C"you@example.com"` ——`you@example.com`改为自已在git上注册的邮箱

回车
```
$ ssh-keygen -t rsa -C"you@example.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Admin/.ssh/id_rsa):
```
直接点回车，说明会在默认文件id_rsa上生成ssh key。 
```
Enter passphrase (empty for no passphrase):
```
系统要求输入密码，直接按回车表示不设密码。
```
Enter same passphrase again:
```
重复密码时也是直接回车，之后提示你shh key已经生成成功。

在文件资源管理器定位文件C:/Users/Admin/.ssh
看到两个文件
id_rsa和id_rsa.pub
用编译器打开id_rsa.pub，复制里面的内容
### 添加key到github网站
进入GitHub网站，在GitHub网站中找到Settings（单击用户头像）。设置里找到**SSH and GPG keys**，进入点击**New SSH key**，title任意，key输入自己刚才复制的id_rsa.pub内容，之后保存。保存成功后会向邮箱发送提醒
### 云端备份导入本地
选好要导入的位置
右键**git bash here**
输入（yourname输入自己GitHub用户名）
`git clone git@github.com:yourname/yourname.github.io.git`

回车会出现
```
Cloning into 'yourname.github.io'...
The authenticity of host 'github.com (52.74.223.119)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
输入yes，回车后云端开始导入本地（下载速度很慢，而且还取决于云端库的大小，建议提前从github云端库下载`.zip`文件）
此文件夹作为本地**blog**文件夹使用，对hexo博客进行的更改包括：发布、删除文章，更换主题，均在此文件夹进行。
#### 快速下载GitHub文件的方法
1.通过码云克隆GitHub项目实现快速下载
2.GitHub加速下载工具：https://toolwa.com/github/
### 安装hexo
云端导入本地后，git输入命令
`npm install -g hexo-cli` ——参考hexo官方文档
如果需要安装最新版hexo，输入
`npm install hexo`
### 配置并发布文章
git输入
`npm install` ——在`git clone`项目的时候，项目文件中并没有`node_modules`文件夹，项目的依赖文件可能很大。直接执行，`npm`会根据`package.json`配置文件中的依赖配置下载安装。
### 发布文章
1.`git add .` ——将文件的修改，文件的新建，添加到暂存区。详解：**git空格add空格.**，切记不要打错，否则命令就错了
2.`git commit -m"..."` ——提交修改，`...`为对修改的描述。详解：**git空格commit空格-m"..."**
3.`git push origin hexo` ——将源文件提交到hexo分支
4.`hexo g -d`
补充：
执行到`git commit -m"..."`可能会有此提示
```
*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
```
输入相应的信息（填写自己的信息）
1.`git config --global user.email "you@example.com"` ——git确认信息，you@example.com为注册GitHub所用邮箱
2.`git config --global user.name "Your Name"` ——git确认信息，Your Name为GitHub用户名
## 旧电脑
### 云端博客分支同步到本地
文件夹**yourname.github.io**右键**git bash here**
输入命令
`git pull origin hexo --allow-unrelated-histories` ——分支合并
输入此命令后，git会将云端hexo分支与本地hexo分支比较，并进行同步（云端同步到本地）
# 最后
本篇文章到此就结束了，有什么问题可以在评论区回复。关于markdown的书写语法，可以自行到网络上查找资料学习