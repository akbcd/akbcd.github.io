---
title: GITHUB+HEXO搭建个人博客
date: 2018-09-22 07:38:14
updated: 2020-08-19
toc: true
tags: [博客,hexo,github]
categories: [笔记]
---
本篇文章已于2022/7/30再次校对。
本篇文章介绍**GITHUB+HEXO搭建个人博客**的方法，讲述如何创建GitHub账户，通过hexo在GitHub上搭建个人博客以及如何通过GitHub分支实现本地博客备份至GitHub等。文章讲述可能较为详细，可以通过目录快速定位到自己需要的部分，本篇文章适合新手阅读。
注：这篇文章是自己对**GITHUB+HEXO搭建个人博客**的总结，当你看到这篇文章时，也就意味着之前关于**GITHUB+HEXO搭建个人博客**的多篇文章已被删除。
文章里建议参看的文章，如果没有链接，可以在站点的所有文章中查找。
<!--more-->
快速导航（建议通过目录跳转，目录位置：页面右下角）：
[博客简介](?id=#博客简介)
[需要准备的软件](?id=#需要准备的软件)
[安装Hexo](?id=#安装Hexo)
[建站](?id=#建站)
[创建GitHub账户](?id=#创建GitHub账户)
[配置_config.yml文件](?id=#配置_config.yml文件)
[配置本地blog文件夹](?id=#配置本地blog文件夹)
[博客新建文章](?id=#博客新建文章)
[博客更换主题](?id=#博客更换主题)
[hexo最常用的几个命令](?id=#hexo最常用的几个命令)
[个人博客备份](?id=#个人博客备份)
[博客备份导入本地](?id=#博客备份导入本地)
## 博客简介
百度百科截取
>博客，仅音译，英文名为Blogger，为Web Log的混成词。它的正式名称为网络日记；又音译为部落格或部落阁等，是使用特定的软件，在网络上出版、发表和张贴个人文章的人，或者是一种通常由个人管理、不定期张贴新的文章的网站。博客上的文章通常以网页形式出现，并根据张贴时间，以倒序排列。通常具备RSS订阅功能。博客是继MSN、BBS、ICQ之后出现的第4种网络交流方式，现已受到大家的欢迎，是网络时代的个人“读者文摘”，是以超级链接为入口的网络日记，它代表着新的生活、工作和学习方式。许多博客专注在特定的课题上提供评论或新闻，其他则被作为个人性的日记。一个典型的博客结合了文字、图像、其他博客或网站的链接及其它与主题相关的媒体，能够让读者以互动的方式留下意见，是许多博客的重要要素。大部分的博客内容以文字为主，但仍有一些博客专注在艺术、摄影、视频、音乐、播客等各种主题。博客是社会媒体网络的一部分。比较著名的有新浪等博客。

### 为什么用GITHUB+HEXO搭建个人博客
首先，GitHub和hexo都是免费的，其次，GitHub是微软旗下的一个面向开源及私有软件项目的托管平台，几乎可以在上面发布任何信息（自己理解）。虽然优点很多，但是难免会有缺点：
1.GitHub托管的个人博客，百度搜索引擎无法抓取
2.个人博客访问速度可能较慢。~可以参看 **jsdelivr加速博客静态资源（已失效）**~
## 需要准备的软件
参看自己的操作系统，安装相应版本
### Node.js和Git
**GITHUB+HEXO搭建个人博客**必须的两个软件，安装路径自定义，以下为Windows版本官方下载地址
* [Node.js](https://nodejs.org/zh-cn/download/)
* [Git](https://git-scm.com/downloads)

Git 安装时请勾选 **git bash here**
>**Windows 用户**
对于中国大陆地区用户，可以前往 [淘宝 Git for Windows 镜像](https://npm.taobao.org/mirrors/git-for-windows/) 下载 git 安装包。

Node.js 为大多数平台提供了官方的 安装程序。对于中国大陆地区用户，可以前往 [淘宝 Node.js 镜像](https://npm.taobao.org/mirrors/node) 下载。
>使用 Node.js 官方安装程序时，请确保勾选 **Add to PATH** 选项（默认已勾选）。

### 代码编译软件（可选的）
简言之，就是写博客的软件，这里推荐使用 **Visual Studio Code** ，以下为 **Visual Studio Code** 官方下载地址
[Visual Studio Code](https://code.visualstudio.com/Download)
安装时提示是否创建快捷方式、图标的选项，最好都选上
### 前期准备
在目标盘符下新建一个名为**blog**的文件夹（文件夹名任意，最好是英文名），用于存放本地博客文件

ps：网上有很多用GITHUB+HEXO搭建个人博客的方法，具体可点击[hexo+github如何搭建博客](https://liulu1990.github.io/2018/09/02/hexo+github搭建博客/)
## 安装Hexo
所有必备的应用程序安装完成后，即可使用 npm 安装 Hexo。
右键任意位置选择**git bash here**输入以下命令，注意：只有这里可以是任意位置右键，其余均需要在blog文件夹（存放本地博客文件的文件夹）右键：
其中：命令的第一条是可选的：配置npm使用淘宝镜像，简言之，就是提高下载速度
```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
$ npm install -g hexo-cli
```
注：只需要安装hexo-cli即可，在执行`hexo init blog`和`npm install`的时候，`hexo-cli`是会自动安装hexo到博客的node_modules目录下的。当然，你也可以直接输入命令
`npm install -g hexo` ——全局安装hexo
```bash
$ hexo -v
```
检测hexo是否安装成功，出现版本号表明成功安装
### Node.js 版本限制
Hexo 强烈建议永远安装最新版本的 Hexo，以及 推荐的 Node.js 版本。
## 建站
安装 Hexo 完成后，找到自己创建的blog文件夹，右键选择 **git bash here** 输入以下命令，Hexo 将会在指定文件夹中新建所需要的文件。
```bash
$ hexo init
$ npm install
```
新建完成后，blog文件夹的目录如下：
```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```
**_config.yml**
网站的配置信息，您可以在此配置大部分的参数。
**package.json**
应用程序的信息。EJS, Stylus 和 Markdown renderer 已默认安装，您可以自由移除。
**scaffolds**
模版文件夹。当您新建文章时，Hexo 会根据 scaffold 来建立文件。
Hexo的模板是指在新建的文章文件中默认填充的内容。例如，如果您修改scaffold/post.md中的Front-matter内容，那么每次新建一篇文章时都会包含这个修改。
**source**
资源文件夹是存放用户资源的地方。除 `_posts` 文件夹之外，开头命名为 `_` (下划线)的文件 / 文件夹和隐藏的文件将会被忽略。Markdown 和 HTML 文件会被解析并放到 `public` 文件夹，而其他文件会被拷贝过去。
**themes**
主题文件夹。Hexo 会根据主题来生成静态页面。
执行以下命令，启用hexo服务，预览博客效果
```bash
hexo server
```
简写为`hexo s`，hexo本地服务启动后，在浏览器端输入localhost:4000即可查看效果
ctrl+c 可结束hexo本地服务（git窗口中有提示）
说明：hexo服务默认端口为4000，如果被占用，请自行在百度里搜索相关解决办法。浏览器端输入localhost:4000，访问后会出现博客初始化效果，ctrl+c结束本地服务后（需要在git窗口中执行），localhost:4000无法访问
友情提示：hexo命令以及介绍参看hexo官方文档：https://hexo.io/zh-cn/docs/

## 创建GitHub账户
既然是在GitHub上托管自己的博客，当然需要有一个GitHub账户
进入GitHub网站创建账户，点击[github](https://github.com/)，记住自己的用户名和邮箱，下面需要用到
GitHub在国内可以访问，如不能访问，可以参看站点文章 **电脑无法访问GitHub解决办法**
### 创建repository
登录github：[https://github.com/login](https://github.com/login)
单击**Create repository**创建一个repository，**Repository name**输入`yourname`+`.github.io`，yourname为Owner名
下面的创建选项根据自己需要进行选择，也可以不动，直接创建，切记不要选择Private（私有的）
### 本地创建ssh key
git中输入以下命令，在本地创建**ssh key**，**your_email@youremail.com**为GitHub创建时用的邮箱
```bash
$ ssh-keygen -t rsa -C "your_email@youremail.com"
```
回车后出现如下提示：
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
### 添加key到github网站
文件资源管理器定位文件C:/Users/yourname/.ssh，yourname为当前计算机用户名
可以看到两个文件，扩展名可能需要在文件资源管理器中手动将其显示，这里只需要 `id_rsa.pub`
* `id_rsa`(您的标识)
* `id_rsa.pub`(您的公钥)

用编译器打开`id_rsa.pub`，复制里面的内容
进入GitHub网站，在GitHub网站中找到Settings（单击用户头像）。设置里找到**SSH and GPG keys**，进入点击**New SSH key**，title任意，key输入自己刚才复制的id_rsa.pub内容，之后保存。保存成功后会向邮箱发送提醒
## 配置_config.yml文件
blog文件夹被hexo初始化后，根目录下创建的`_config.yml`文件为hexo站点配置文件
注意：修改hexo站点配置文件，需要重启hexo服务才会生效
本文基于hexo5.0站点配置文件进行简单的说明，不同版本hexo站点配置文件会有差异
具体可以参看hexo官方文档：https://hexo.io/zh-cn/docs/configuration
下面简单介绍需要修改的内容
### 需要修改的内容
下记使用默认值的项目可自行参照hexo官方文档按需修改。

**Site**

* `title` hexo站点标题，即播客主页title标签内容改成自己想设的内容即可。
* `description`、`keywords` 网站的描述和关键字，主要用于SEO，告诉搜索引擎一个关于您站点的简单描述
* `author` 站点作者
* `language` 站点语言，很重要，不修改访问站点会提示翻译中文。中文常见的有 zh-Hans和 zh-CN。

其余不需要修改

**URL**

* `url` url修改为自己站点地址，github为`https://yourname.github.io`，yourname为GitHub用户名

其余可不修改

**Directory**

使用默认值即可

**Writing**

* `post_asset_folder` 生成文章对应文件夹，引用本地资源请开启此项
* `external_link.enable` 是否在新窗口打开链接，默认为true（文章中引用的链接），按需要更改
* `highlight.line_number` 代码区块是否有行号，启用与不启用代码块的层级结构会有所不同

其余不需要修改

**Home page setting**

使用默认值即可

**Category & Tag**

使用默认值即可

**Metadata elements**

使用默认值即可

**Date / Time format**

* `updated_option` Git 管理站点，请设置为`date`
>**updated_option**
`updated_option` 控制了当 `Front Matter` 中没有指定 `updated` 时，`updated` 如何取值：
>* `mtime`: 使用文件的最后修改时间。这是从 Hexo 3.0.0 开始的默认行为。
>* `date`: 使用 `date` 作为 `updated` 的值。可被用于 Git 工作流之中，因为使用 Git 管理站点时，文件的最后修改日期常常会发生改变
>* `empty`: 直接删除 `updated`。使用这一选项可能会导致大部分主题和插件无法正常工作。

**Pagination**

使用默认值即可

**Include / Exclude file(s)**

使用默认值即可

**Extensions**

* `theme` 主题配置，修改成自己所使用的主题，下面有详细说明

**Deployment**

部署部分的设置，下面有详细说明

## 配置本地blog文件夹
用编译软件打开blog文件夹，在根目录中找到`_config.yml`
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
3.`npm install hexo-deployer-git --save` ——安装hexo-deployer-git插件，在hexo初始化生成的**package.json**文件中，如果有此插件，无需再次安装
4.`hexo g` ——生成静态文件
5.`hexo d` ——部署网站，需要安装hexo-deployer-git插件使用
正常情况会弹出一个`OpenSSH`对话框进行警告，输入`yes`点击`ok`，也有可能直接在窗口提示`Are you sure you want to continue connecting`，取决于安装的git版本
最后在浏览器输入：`https://yourname.github.io`，yourname为GitHub用户名
可以访问表明GITHUB+HEXO搭建个人博客完成
注：如果本地blog文件夹内容部署不了，需要从**本地创建ssh key**重新开始。
## 博客新建文章
上面介绍了如何搭建博客，既然博客搭建完成，那就需要开始写文章了
找到blog文件夹，右键**git bash here**输入
1.`hexo new "example"`——创建文章，example为文章名
git中一会儿会提示`INFO  Created: 路径\blog\source\_posts\example.md`，路径为自己blog文件夹所在路径
2.用编译器在相应的文件中进行书写保存（.md是支持markdown语法的文件，需要用markdown语法进行书写），参看 **markdown基本语法（GITHUB+HEXO搭建的博客）**
写完后 在编译器中保存
3.在git中输入`hexo s`进行本地预览，通过访问localhost:4000查看，本地没有问题后，部署网站
### 部署网站
blog文件夹，右键**git bash here**输入
1.`hexo g` ——生成静态文件
2.`hexo d` ——将本地生成的静态文件部署到网站
上面两个命令可以简记为一个命令
`hexo g -d` ——先生成静态文件，之后部署网站
## 博客更换主题
好的博客当然需要一个好的主题来衬托
### 选一个好的主题
好的主题有很多，比方说看看这篇知乎的文章：[有哪些好看的hexo主题](https://www.zhihu.com/question/24422335)
HEXO主题官方网站：[https://hexo.io/themes/](https://hexo.io/themes/)
我们就以yilia主题为例来美化我们的博客吧！(因为我用的就是这个)
1.首先进入HEXO主题官方网站或知乎文章，点击相应的主题，进入GitHub项目页面，点击**Clone or download**选择**Download ZIP**下载后解压
如果你认为下载速度很慢，可以参看下面的**博客备份导入本地>新电脑>云端备份导入本地>快速下载GitHub文件的方法**，可以通过目录快速跳转，里面有介绍方法
2.进入自己搭建博客的本地blog文件夹，将自己的解压后的文件夹复制到themes文件夹内，在此文件夹里你应该看到的是hexo-theme-yilia-master(可以将此文件夹重命名为yilia)和landscape（hexo初始化主题）
### 安装主题
1.首先我们要修改博客的配置文件_config.yml（注意，是整个博客的配置文件，也就是博客blog目录下的_config.yml。由于主题中也含有_config.yml，所以在这里进行区分。）
2.用编译软件打开自己博客的本地文件夹，在文件夹根目录下找到_config.yml。
3.在_config.yml中找到theme选项，将原来的landscape删掉，改为yilia，然后保存即可。
完成之后主题就可以用啦，是不是有些迫不及待。正巧我们应该做一些本地测试来看看主题是否完备。话不多说，开始吧。
4.选中自己博客的本地文件夹，如果没改的话，应该是blog，右键**git bash here**
5.在git中输入`hexo s`回车
在本地浏览器输入相应的网址，观察一下效果，如果成功，那就差最后一步了
### 更换主题可能遇到的问题
这里分享自己遇到的两个问题，看看有没有遇到
#### 切换主题不生效
修改_config.yml文件并保存后，浏览器刷新页面发现主题没换，还是之前的主题。
出现这种情况，很有可能是自己在开启hexo服务的情况下更换的主题，所以ctrl+c结束服务，`hexo s`启动服务，即重启hexo服务再试一下
#### 切换主题不显示
这个问题跟上面那个问题不一样，这个问题的前提是主题切换成功了，在浏览器中出现
```
extends includes/layout.pug block content include ./includes/mixins/post-ui.pug #recent-posts.recent-posts +postUI include includes/pagination.pug
```
其实出现这个问题，是因为hexo缺少这个主题所需要的插件，git中输入命令
`npm install hexo-renderer-pug hexo-renderer-stylus`
安装成功后，启动服务再试试
### 主题自定义修改
网上下载的主题都是开源的，意味着自己可以根据需要进行修改，有的需求可以在主题配置文件_config.yml中修改。
踩了这么多坑，目前发现主题大多是用两种模板开发，一种是ejs，另一种就是pug（参看主题layout文件夹中文件的扩展名）
ejs扩展名的主题，只要自己有接触过java和html，应该都能看懂，想夸张修改也就不成问题
pug扩展名的主题，可能需要安装插件才能使用，这种主题，也就修改修改样式吧
### 主题上传到云端
1.没问题的话，按照yilia的官方指导教程，我们顺便修改一下站点配置文件（即根目录下的_config.yml）里面的语言（也就是整个博客的语言）
将language后面的内容修改为zh-CN。注：语言的修改，需要主题的支持
注意，冒号之后必有空格哦！
```
# Site
title: akbcd博客
subtitle: ''
description: '' 
keywords: ''
author: akbcd
language: zh-CN
timezone: ''
```
2.将新主题发布到自己的网站上，操作如下：
blog文件夹，右键**git bash here**输入
1).`hexo g` ——生成静态文件
2).`hexo d` ——部署网站
上面两个命令可以简记为一个命令
`hexo g -d` ——先生成静态文件，之后部署网站
## hexo最常用的几个命令
hexo命令以及介绍参看hexo官方文档：https://hexo.io/zh-cn/docs/
### hexo s
启动本地服务器，用于预览主题。默认地址： http://localhost:4000/
`hexo s` 是 `hexo server` 的缩写，命令效果一致；
预览的同时可以修改文章内容或主题代码，保存后刷新页面即可；
对 Hexo 根目录 `_config.yml` 的修改，需要重启本地服务器后才能预览效果。
### hexo new `"新的文章"`
新建一篇标题为 新的文章 的文章。此文章路径为 `/source/_posts`
### hexo d
自动生成网站静态文件，并部署到设定的仓库。
`hexo d` 是 `hexo deploy` 的缩写，命令效果一致。
输入此命令，如果出现`ERROR Deployer not found: git`提示，请安装hexo-deployer-git插件
输入命令`npm install hexo-deployer-git --save`安装
### hexo clean
清除缓存文件 `db.json` 和已生成的静态文件夹 `public` 。
网站显示异常时可以执行这条命令试试。比如：
修改了主题样式，但是启动服务后样式没有改变；修改了图片内容，但是图片没有变。
### hexo g
生成网站静态文件到默认设置的 `public` 文件夹。
便于查看网站生成的静态文件或者手动部署网站；
如果使用自动部署，不需要先执行该命令；
`hexo g` 是 `hexo generate` 的缩写，命令效果一致。
### hexo g -d
先执行`hexo g`再执行`hexo d`
### hexo草稿的简单使用
草稿文章不被显示在页面上，链接也访问不到
>**不要处理我的文章**
如果你不想你的文章被处理，你可以将 Front-Matter 中的 `layout:` 设为 `false` 。
注：此功能需要主题加以支持，虽然文章不被显示在页面上，但是链接可以访问。

#### 创建草稿 
`hexo new draft "新的草稿"`
新建一篇标题为 新的草稿 的草稿。此草稿路径为 `/source/_drafts`
当然，有的文章你不想发布，但又不舍得删除，可以将此文章移至草稿目录下。
#### 预览草稿
```
//如果你希望强行预览草稿，更改配置文件：
render_drafts: true

//或者，如下方式启动server：
$ hexo server --drafts
```
#### 发布草稿
`hexo publish "新的草稿"`
该命令会把 /source/_drafts 下的 新的草稿 文章移到 /source/_posts 下，当然，你也可以手动移动
## 个人博客备份
**这是一个很有必要的操作**。其实你在部署网站后，GitHub仓库中已经有了数据，而且可以下载下来，但是下载下来的文件是经过hexo编译后的html文件，并不是我们书写的md文件
网上有很多关于备份的方法，这里分享一个用仓库分支实现备份的方法
### hexo博客备份到GitHub
**前提：**在GitHub上已经发布过文章
**思路：**使用Hexo在github搭建的博客，博客作为一个单独的GitHub仓库存在，但是这个仓库只有生成的静态网页文件，并没有md源文件，如果要换电脑或者重装系统后，就比较麻烦了，利用仓库分支，新建一个hexo分支(分支可以自定义名称)，master分支保存静态网页，hexo分支保存源文件，这样就实现了备份源代码到GitHub仓库。
### 创建新分支
1.登录到自己的GitHub网站，网站：[https://github.com/](https://github.com/)
2.找到自己创建的仓库，点击进入到代码页面,选择**Branch:master**
在**Find or creat a branch...** 搜索框中输入**hexo**，选择下面的**Creat branch: hexo**，创建hexo分支。到此分支创建完成
3.点击**2 branches**，进入分支管理页面,将**hexo**设为默认分支，具体怎么设，自己研究(其实很简单，就不说了)。到此，将hexo设为默认分支完成。
### 配置本地备份文件夹
1.在本地桌面，磁盘里，文件夹都行，右键**Git Bash Here**，在git里面输入以下内容，将新建hexo分支里面的文件克隆到指定文件夹**yourname.github.io**，yourname换成自己的GitHub用户名
```
$ git clone git@github.com:yourname/yourname.github.io.git
```
注意：git中提供了多种克隆仓库至本地的方法
>克隆仓库的分支为默认分支，如果想克隆指定分支，请执行命令：`git clone -b 分支名仓库地址`
>* `git clone -b hexo git@github.com:yourname/yourname.github.io.git`

本地创建了一个新文件夹**yourname.github.io**，点击进入，将隐藏的文件显示出来，会看到`.git`文件夹，除了这个文件，其余全部删除
2.将本地之前发布文章的**blog**文件夹里的内容复制粘贴到文件夹**yourname.github.io**
注：关于主题，这里引用别人的话：
>将themes/next/(我用的是NexT主题)中的.git/删除，否则无法将主题文件夹push

### 本地数据备份至GitHub
文件夹**yourname.github.io**右键**Git Bash Here**，在git里面输入（看yourname.github.io后面是否有蓝色hexo字样，如果没有就错了）：
1.`git add .` ——将文件的修改，文件的新建，添加到暂存区。详解：**git空格add空格.** ，切记不要打错，否则命令就错了
2.`git commit -m"..."` ——提交修改，`...`为对修改的描述。详解：**git空格commit空格-m"..."**
3.`git push origin hexo` ——将源文件提交到hexo分支
4.`hexo g -d`
这样一来，**yourname.github.io**仓库就有master分支和hexo分支，分别保存静态网页和源文件。
打开GitHub参看仓库hexo分支是否更新，更新则个人博客备份完成
此文件夹作为本地**blog**文件夹使用，对hexo博客进行的更改包括：发布、删除文章，更换主题，均在此文件夹进行。
## 博客备份导入本地
这里对新旧电脑进行说明
新电脑：即电脑中不含有关于博客的任何文件以及本地**ssh key**
旧电脑：GitHub中含有当前电脑的**ssh key**，并且已经有**yourname.github.io**文件夹
### 新电脑
此部分内容与上文高度重复。
#### 下载软件
参看目录：**需要准备的软件**，跳转点击 [需要准备的软件](?id=#需要准备的软件)
**补充：如果你的电脑只是重装系统，并且没有删除本地yourname.github.io文件夹，那么你可以在重装系统之前，将本地的ssh key备份，当重装系统完成后，将其放置指定文件夹下即可跳过创建和添加ssh key相关步骤。**
**在本地创建ssh key**、**添加key到github网站** 参看上文目录：**创建GitHub账户**，跳转点击 [创建GitHub账户](?id=#创建GitHub账户)
#### 云端备份导入本地
选好要导入的位置
右键**git bash here**
输入以下命令（yourname输入自己GitHub用户名）：
```bash
git clone git@github.com:yourname/yourname.github.io.git
```
回车会出现
```
Cloning into 'yourname.github.io'...
The authenticity of host 'github.com (52.74.223.119)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
输入yes，回车后云端开始导入本地（下载速度很慢，而且还取决于云端库的大小，建议提前从github云端库下载`.zip`文件）
此文件夹作为本地**blog**文件夹使用，对hexo博客进行的更改包括：发布、删除文章，更换主题，均在此文件夹进行。
>快速下载GitHub文件的方法
1.通过码云克隆GitHub项目实现快速下载
2.GitHub加速下载工具：https://toolwa.com/github/

#### 安装hexo
云端导入本地后，git输入命令（必须）
```bash
$ npm install -g hexo-cli
```
如果需要安装最新版hexo，输入（可选）
```bash
$ npm install hexo
```
#### 配置并发布文章
git输入
`npm install` ——在`git clone`项目的时候，项目文件中并没有`node_modules`文件夹，项目的依赖文件可能很大。直接执行，`npm`会根据`package.json`配置文件中的依赖配置下载安装。
#### 发布文章
1.`git add .` ——将文件的修改，文件的新建，添加到暂存区。详解：**git空格add空格.** ，切记不要打错，否则命令就错了
2.`git commit -m"..."` ——提交修改，`...`为对修改的描述。详解：**git空格commit空格-m"..."**
3.`git push origin hexo` ——将源文件提交到hexo分支
期间若出现提示Are you sure you want to continue connecting，请输入yes
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
1.`git config --global user.email "you@example.com"` ——git确认信息，`you@example.com`为注册GitHub所用邮箱
2.`git config --global user.name "Your Name"` ——git确认信息，Your Name为GitHub用户名
### 旧电脑
#### 云端博客分支同步到本地
文件夹**yourname.github.io**右键**git bash here**
输入一下命令，分支合并
```bash
git pull origin hexo --allow-unrelated-histories
```
输入此命令后，git会将云端hexo分支与本地hexo分支比较，并进行同步（云端同步到本地）
## Visual Studio Code 运行 git bash 命令（可选）
### 前言
正如大家所知道的，**Visual Studio Code** 功能很强大，这里简单介绍一下直接通过 **Visual Studio Code** 管理本地博客，而不再借助于git窗口
### hexo5.0
hexo5.0 版本，已经在 package.json 文件中添加hexo部分功能的脚本命令，在 **Visual Studio Code** 中打开 package.json 文件，在script上点击Debug即可运行
#### 配置 git bash
Windows系统中 **Visual Studio Code** 终端默认使用的是 PowerShell ，这里介绍将终端默认启动的 PowerShell 换成 git bash
##### 修改 settings.json 文件
如果你的 **Visual Studio Code** 不是中文版本，你可以通过在扩展中搜索`Chinese`关键字安装中文语言扩展
1.依次打开设置——>功能——>终端，找到 在 settings.json 中编辑 ，打开
2.添加如下内容：
```
{
  "terminal.integrated.profiles.windows": {
    "JavaScript Debug Terminal": {
      "path": "C:\\Program Files\\Git\\bin\\bash.exe"
    }
  },
  "terminal.integrated.defaultProfile.windows": "JavaScript Debug Terminal"
}
```
`C:\\Program Files\\Git\\bin\\bash.exe`修改为自己git bash命令所在路径，保存
补充：自定义终端的配置每个版本会不一样，建议升级为最新版后参考[官方文档](https://code.visualstudio.com/docs/)
搜索关键字：integrated-terminal
3.打开终端——>新终端，你会看到终端已经换成bash终端，直接就可以在这里执行git bash命令啦
##### 终端切换
直接在git bash终端里输入cmd切换为cmd终端，输入powershell切换为power shell终端，输入bash切换回git bash终端
## 最后
本篇文章到此就结束了，有什么问题可以在评论区回复。关于markdown的书写语法，可以自行到网络上查找资料学习