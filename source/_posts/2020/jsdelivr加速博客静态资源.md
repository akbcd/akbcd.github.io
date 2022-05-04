---
title: jsdelivr加速博客静态资源
date: 2020-06-10 06:48:20
tags: 博客
update: 2022-05-04
toc: true
---
如果你的博客文件在GitHub托管，请看一下这篇文章
通过jsdelivr加速博客静态资源，会使你的博客访问速度加快
先来看一看什么是jsdelivr<!--more-->
## jsdelivr简介
[jsdelivr官网](https://www.jsdelivr.com/)
>用于开源的免费 CDN
快速、可靠和自动化
jsDelivr 是一个公开的开源 CDN（内容交付网络），由Dmitriy Akulov 和 Prospect One开发，专注于性能、可靠性和安全性。它免费用于每个人，没有带宽限制。

[github开源项目](https://github.com/jsdelivr/jsdelivr)
>jsDelivr 与多家中国公司合作，在中国大陆和整个亚洲大陆提供快速可靠的文件交付。我们在中国境内拥有能够显著提高交付速度和延迟的服务器。我们还拥有中国政府颁发的有效的 ICP 许可证，以保护我们免受禁令和缓慢下载。
jsDelivr在中国内部工作完美！

**需要注意，通过jsdelivr加速有两个限制: 单文件不能大于20M, 仓库的某版本不能大于50M**
## 为什么要使用jsdelivr？
众所周知，GitHub的服务器在国外，访问速度很不理想，特别是大于1MB的文件，速度很慢
jsdelivr可以加速博客中的静态资源（单文件不能大于20M，足够了），国内加速节点很多，免费
## 参考文献
网上关于实现jsdelivr加速博客静态资源的文章很多，这里推荐两篇文章：
[仅引入 JS 实现博客 CDN 加速](https://blog.clouder.im/hexo/jsdelivr_js/)，本篇文章参考此方法，在此表示感谢
[GitHub + jsDelivr视频切片测试](https://m1314.cn/403.html)
## 怎么使用
参看上面参考文献中的文章，这里以yilia主题为例
### 加速文章页静态资源
* 在主题`yilia\layout\_partial\post`文件夹中新建`jsdelivr.ejs`文件，添加如下内容：

```
<script>
/* jsdelivr */
var name = '<%- theme.jsdelivr.name %>';
var repository = '<%- theme.jsdelivr.repository %>';
if ("localhost" != document.domain && yiliaConfig.isPost) {
    for (var key in document.getElementById("js-content").getElementsByTagName("img")) {
        if (isNaN(key)) break;
        document.getElementById("js-content").getElementsByTagName("img")[key].src = document.getElementById("js-content").getElementsByTagName("img")[key].src.replace(document.domain, "cdn.jsdelivr.net/gh/" + name + "/" + repository);
    }
    for (var key in document.getElementById("js-content").getElementsByTagName("audio")) {
        if (isNaN(key)) break;
        document.getElementById("js-content").getElementsByTagName("audio")[key].src = document.getElementById("js-content").getElementsByTagName("audio")[key].src.replace(document.domain, "cdn.jsdelivr.net/gh/" + name + "/" + repository);
    }
    for (var key in document.getElementById("js-content").getElementsByTagName("video")) {
        if (isNaN(key)) break;
        document.getElementById("js-content").getElementsByTagName("video")[key].src = document.getElementById("js-content").getElementsByTagName("video")[key].src.replace(document.domain, "cdn.jsdelivr.net/gh/" + name + "/" + repository);
    }
}
</script>
```
此代码实现jsdelivr加速文章中引用本地图片、音乐、视频的资源，即替换img、video、audio标签中的src路径为jsdelivr加速博客静态资源的路径
适用于加速相对路径的资源，其他引用的资源不会影响
`name`和`repository`对应的是GitHub的用户名和仓库名，下面有说明
`"localhost" != document.domain`判断是否为本地端口，`yiliaConfig.isPost`判断是否为文章页
* 在`yilia\layout\_partial\after-footer.ejs`中第一个script标签下添加（`<%- partial('script') %>`上面）：

```
<% if (theme.jsdelivr.enable){ %>
<%- partial('post/jsdelivr')%>
<% } %>
```
通过主题配置文件判断是否开启jsdelivr加速
* 在`yilia\layout\_partial\head.ejs`中head标签添加（可选）：

```
<% if (theme.jsdelivr.enable){ %>
<link rel="preconnect" href="//cdn.jsdelivr.net">
<link rel="dns-prefetch" href="//cdn.jsdelivr.net">
<% } %>
```
* 主题配置文件`themes\yilia\_config.yml`添加jsdelivr配置，控制是否开启：

```
jsdelivr:
  enable: false
  name:  #github用户名
  repository:  #仓库名
```
name为github用户名，repository为仓库名，一般为：xxx.github.io
### 加速全局搜索的search.xml文件（可选）
前提：
主题用到了插件`hexo-generator-searchdb`所生成的`search.xml`文件
如果你是yilia主题，参看[yilia主题进阶配置](https://akbcd.github.io/2019/10/14/yilia主题进阶配置/)中安装全局搜索功能

随着博客文章越来越多，search.xml文件也会越来越大，加载的速度也会越来越慢，这就影响到了体验
这里简单提一下如何通过jsdelivr加速主题中需要的search.xml文件
还是以yilia主题为例，参看[yilia主题进阶配置](https://akbcd.github.io/2019/10/14/yilia主题进阶配置/)
主要就是修改调用`searchFunc()`函数的方法
```
<% if (theme.jsdelivr.enable){ %>
<script>
    if ("localhost" != document.domain){
        $(function () {
            searchFunc("//cdn.jsdelivr.net/gh/" + "<%- theme.jsdelivr.name %>" + "/" + "<%- theme.jsdelivr.repository %>" +"/" + "search.xml", 'js-searchInput', 'js-searchResult');
        });
    } else {
        $(function () {
            searchFunc("/" + "search.xml", 'js-searchInput', 'js-searchResult');
        });
    }
</script>
<% } else { %>
<script>
    $(function () {
        searchFunc("/" + "search.xml", 'js-searchInput', 'js-searchResult');
    });
</script>
<% } %>
```
### 遇到的问题
问：近期更改了jsdelivr加速的文件内容，但是jsdelivr加速的文件内容并没有做出相应的更改，请问应该怎么做？
答：其实这是jsdeliver缓存导致的，您可以等待一天之后再次观察是否更改，或者您可以强制刷新缓存，即
>你的 CDN 链接 想手动刷新时 把链接中的
`https://cdn.jsdelivr.net/`
替换成
`https://purge.jsdelivr.net/`
即可实时刷新
## 最后
通过jsdelivr加速博客静态资源，博客访问速度提升不少
记得之前引用本地图片需要很长时间才能加载出来，现在很快就加载完成，search.xml文件的加载速度提升不少

如果需要关闭jsdelivr加速，直接修改主题配置文件即可，很方便

这篇文章仅介绍了加速本地部分资源和search.xml文件的方法，其它文件，比如：js、css等文件也可以用相应方法通过jsdelivr加速访问，这里不再进行介绍。

2022年5月4日追记：
文章页jsdelivr加速可能出现的错误
如果文章页引入的静态资源（视频、音乐、图片），url是已经手动按照jsdelivr加速替换规则替换后的url，在开启jsdelivr加速时，jsdelivr加速会按照写好的替换规则进行替换，替换规则是按照域名替换，替换后的字符串中有替换前的域名，这就导致了重复替换，导致jsdelivr加速出错。
解决方法，以img为例，audio和video同理
```
for (var key in document.getElementById("js-content").getElementsByTagName("img")) {
    if (isNaN(key)) break;
    // 避免重复替换出错，替换前，如果有替换后的字符串，先还原
    document.getElementById("js-content").getElementsByTagName("img")[key].src = document.getElementById("js-content").getElementsByTagName("img")[key].src.replace("cdn.jsdelivr.net/gh/" + name + "/" + repository,document.domain);
    // 还原后，重新替换
    document.getElementById("js-content").getElementsByTagName("img")[key].src = document.getElementById("js-content").getElementsByTagName("img")[key].src.replace(document.domain, "cdn.jsdelivr.net/gh/" + name + "/" + repository);
}
```