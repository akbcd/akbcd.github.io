---
title: yilia主题常见问题及解决办法下
date: 2019-06-28
tags: 博客
toc: true
---
这个主题我很喜欢，因为开发者不维护了，用着时间长了，发现了很多bug
记得前段时间写了一个[yilia主题常见问题及解决办法](https://akbcd.github.io/2019/06/27/yilia主题常见问题及解决办法/)，内容有点长
最近又发现了几个问题，这次再来写一个**yilia主题常见问题及解决办法下**
<!--more-->
## 1.微信分享二维码失效
微信分享二维码不显示，是百度生成二维码失效导致，换一个在线生成网址二维码的API接口即可
### 解决方法
* 定位文件`themes\yilia\layout\_partial\post\share.ejs`，修改微信分享img标签
* 将`//pan.baidu.com/share/qrcode?url=`改为`//qr.liantu.com/api.php?text=`即可（如果依然不显示，修改为`http://qr.liantu.com/api.php?text=`再试）

这里分享一个文章：[在线生成网址二维码的API接口](https://blog.csdn.net/wang1006008051/article/details/79753051)
根据自己的需求更改在线生成网址二维码的API接口
## 2.浏览器控制台出现`GET https://litten.me:9005/badj`错误提示问题
关于访问litten.me:9005的问题，这个主题的作者之前为了更好地完善这个主题，有时候会收集用户的客户端信息，详情请见[https://github.com/litten/hexo-theme-yilia/issues/528](https://github.com/litten/hexo-theme-yilia/issues/528)，不过这个请求是异步的，不会影响博客加载速度，而且作者已经不维护了，所以关不关都行。
如果不想被统计（或不想让控制台报错），看解决办法
### 解决办法
* 定位文件`themes\yilia\source\main.0cf68a.js`
* 在文件中查找`//litten.me:9005/badjs/`
* 将这段代码所在的函数删除

我删除的内容（就是将`192:`到`193`之间的内容全部删除）
```js
192: function(e, t, n) {
        "use strict";
        function o(e) {
            var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)","i")
              , n = window.location.search.substr(1).match(t);
            return null != n ? unescape(n[2]) : null
        }
        var r = n(388);
        if (n(197),
        window.BJ_REPORT) {
            BJ_REPORT.init({
                id: 1
            }),
            BJ_REPORT.init({
                id: 1,
                uin: window.location.origin,
                combo: 0,
                delay: 1e3,
                url: "//litten.me:9005/badjs/",
                ignore: [/Script error/i],
                random: 1,
                repeat: 5e5,
                onReport: function(e, t) {},
                ext: {}
            });
            var i = window.location.host
              , a = top === window
              , u = !(/localhost/i.test(i) || /127.0.0.1/i.test(i) || /0.0.0.0/i.test(i));
            a && u && BJ_REPORT.report("yilia-" + window.location.host);
            var l = o("f")
              , c = "yilia-from";
            l ? (a && BJ_REPORT.report("from-" + l),
            r.set(c, l)) : document.referrer.indexOf(window.location.host) >= 0 ? (l = r.get(c),
            l && a && BJ_REPORT.report("from-" + l)) : r.remove(c)
        }
        e.exports = {
            init: function() {}
        }
    },
```
* 删除函数的调用
* 依然是这个文件搜索`192`，会看到`n(386),n(192);`，将`n(192);`删除，`n(386),`改为`n(386);`

到此，问题解决
## 3.yilia主题移动端目录问题
如果目录文字过长，你会发现如下问题
![](https://tva1.sinaimg.cn/large/007X8olVly1g8asg89qimj30ci0k9dl9.jpg)
目录左侧溢出，如果想解决，参看以下解决办法
### 解决办法
* 修改移动端css
* 定位文件`themes\yilia\source\main.0cf68a.css`，查找`@media screen and (max-width: 800px)`，在下面添加以下内容

```css
.toc-container.tooltip-left .tooltip-east .tooltip-content .toc-article{
    max-height: 350px;
    font-size: smaller
}

.toc-container.tooltip-left .tooltip-east .tooltip-content .toc-article .toc {
    width: 250px
}

.toc-container.tooltip-left .tooltip-east .tooltip-content .toc-article li {
    white-space: normal
}
```
* 第一个样式是修改目录高度以及文字大小
* 第二个样式是修改目录宽度
* 第三个样式修改目录文字是否换行（pc端页面，标题文字设置的不换行，所以出现了目录左侧溢出）

修改完效果如下：
![](https://tva1.sinaimg.cn/large/007X8olVly1g8l6bgvggyj30dx0n042t.jpg)
## 4.yilia主题控制台两个警告提示
### 不匹配的结束标记。

通过控制台，可以发现问题提示在p标签
```html
<p q-show="jsonFail" style="padding: 20px; font-size: 12px;">
            缺失模块。<br/>1、请确保node版本大于6.2<br/>2、在博客根目录（注意不是yilia根目录）执行以下命令：<br/> npm i hexo-generator-json-content --save<br/><br/>
            3、在根目录_config.yml里添加配置：
<pre style="font-size: 12px;" q-show="jsonFail">
  jsonContent:
    meta: false
    pages: false
    posts:
      title: true
      date: true
      path: true
      text: false
      raw: false
      content: false
      slug: false
      updated: false
      comments: false
      link: false
      permalink: false
      excerpt: false
      categories: false
      tags: true
</pre>
          </p>
```
#### 解决办法
p标签不能嵌套pre标签（通过控制台查看元素可以发现p标签和pre标签是并列出现的，浏览器将外层的p标签变成了两个p标签，与pre标签并列），将`</p>`移至pre标签之前，取消嵌套
### 注释结尾的字符不符合要求。应为 `“-->”` 字符。
我发现问题出现在预加载注释上
`<!-- element will get class pswp__preloader--active when preloader is running -->`
`--`符号出现了问题
#### 解决办法
这个就是一个简单的注释，在部分浏览器会出现提示，将`--`符号误以为注释结尾，本身没有问题
如果想改的话，将`--`改为`——`，控制台提示消失
## 5.移动端归档页面（非主页）内容过短导致样式问题
归档页面，随笔页面，这些页面差不多，如果最后一页内容过短，点击所有文章，背景色和背景层的高度出现问题
先来看看问题的图片

<div><img width=49% src ="https://tva1.sinaimg.cn/large/007X8olVly1g8hosohy91j30cg0m83zu.jpg"/> <img width=49% src ="https://tva1.sinaimg.cn/large/007X8olVly1g8hoso7yjxj30cf0m60ym.jpg"/></div>

最后一页内容过少，导致点击所有文章按钮，所有文章和背景层的背景色没有将页面充满，使页面的下半部分出现了白色透明背景
### 解决办法
这个问题只出现在移动端页面，我的方法是通过js解决
* 找到控制移动端动画的js代码
* 在js代码中添加判断，网页可见区域高度是否小于屏幕分辨率的高度
* 如果小于，对id="container"的div标签添加height属性
* height的值为屏幕分辨率的高度，使所有文章和背景层的背景色将页面充满

#### 具体实现方法
* 1.在主题中查找`document.querySelector("#container").addEventListener("scroll"`，这段代码是在一个叫`function s()`的函数
我对js代码进行了解压缩，看得直接明了些
* 2.`function s()`是移动端页面才执行的函数，通过下面的判断可以看出（因为问题只出现在移动端，所以只在控制移动端js的代码中添加）
* 3.在`function s()`函数中添加判断(在`document.querySelector("#container").addEventListener("scroll"`之前添加即可)

```js
function s() {
    //开始添加
    //添加比较body总高度与浏览器页面可用高度
    if (document.body.clientHeight < window.innerHeight) {
        var n = document.querySelector("#container");
        var height = window.innerHeight;
        n.setAttribute("style", "height:" + height + "px")
    }
    //结束
    document.querySelector("#container").addEventListener("scroll",
    function(t) {
        a()
    }),
```
这里解释一下为什么判断网页可见区域高度是否小于屏幕分辨率的高度
如果不添加这个判断，会对所有的页面都添加这个height属性，移动端css中
```css
#container, body, html {
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
}
```
`height:auto`便失去了意义
附上几个获取高度的属性
>网页可见区域高：document.body.clientHeight（body总高度）
网页可见区域高：document.body.offsetHeight（body总高度）
网页正文全文高：document.body.scrollHeight（body总高度）
浏览器页面可用高度：document.documentElement.clientHeight/window.innerHeight
屏幕分辨率的高：window.screen.height（屏幕分辨率高度）
屏幕可用工作区高：window.screen.availHeight/screen.availHeight（屏幕分辨率高度）

```js
alert("body总高度："+document.body.clientHeight)//body总高度
alert("body总高度："+document.body.offsetHeight)//body总高度
alert("body总高度："+document.body.scrollHeight)//body总高度
alert("浏览器页面可用高度："+document.documentElement.clientHeight)//浏览器页面可用高度
alert("浏览器页面可用高度："+window.innerHeight)//浏览器页面可用高度
alert("屏幕分辨率的高："+window.screen.height)//屏幕分辨率高度
alert("屏幕分辨率的高："+window.screen.availHeight)//屏幕分辨率高度
alert("屏幕分辨率的高："+screen.availHeight)//屏幕分辨率高度
```
这里用的是document.body.clientHeight和window.innerHeight
## 6.手机端主页分页过多，点击某一页，出现下一页标签换行
页数过多，点击中间的一页可能会出现下一页标签换行一半，即 `下一页`在上一行，` »`在下一行
换行的问题解决不了，分页过多，一行显示不下，自然会把多余的内容挤到下一行来，即使你把上下页标签的margin属性设为0，可能暂时没有问题，但是随着文章越来越多，迟早会被挤下来
### 这里解决一下a标签：下一页 » 换行一半问题
既然a标签换行不可避免，但是换行一半是可以避免的
将上下页a标签转为行内块
当a标签的大小不足以使它在一行显示，a标签内容会全部换行，而不会出现换行一半的现象
即在css中对`#page-nav .extend`添加`display:inline-block;`
```css
/* 添加上下页标签转为行内块 */
#page-nav .extend {
	display:inline-block;
	color:#4d4d4d;
	margin:0 27px;
	opacity:1
}
```
## 7.手机端开启目录，页面出现了滚动条
yilia主题，移动端适配有很多问题，之前的页面滚动动画、返回顶部按钮和目录，开发者应该是没有对移动端进行适配测试（可能是先在pc上实现，再往移动端适配）
开发者已经不维护这个主题，本人在移动端启用发现了很多问题
移动端文章开启目录，点击所有文章按钮，页面右侧会出现滚动条，关闭所有文章后，页面弹动效果中也会出现滚动条
### 解决办法
* 在`themes\yilia\source\main.0cf68a.css`中查找`.mid-col.show`，添加`overflow: hidden`

```css
/* 添加overflow: hidden */
.mid-col.show {
    background: none;
    opacity: .9;
    overflow: hidden
}
```
* 在移动端css下，即`@media screen and (max-width: 800px)`下，隐藏`#container`标签滚动条

```css
/* 隐藏滚动条 */
#container::-webkit-scrollbar {
    width: 0
}
```
问题解决
## 8.代码块行号显示错乱
这个问题是`white-space: pre-wrap;`自动换行造成的
### 解决办法
在`themes\yilia\source\main.0cf68a.css`中查找`white-space: pre-wrap;`，将其删除
```css
/* 删除white-space: pre-wrap; */
pre {
    overflow: auto;
    white-space: pre;
    word-wrap: break-word
}
```
使用不自动换行的`white-space:pre;`样式，代码块溢出部分会自动在底部出现滚动条，行号错乱问题就没有了。
如果代码下面的滚动条看不见，在css中添加
```css
/* figure滚动条优化 */
.article-entry figure::-webkit-scrollbar-thumb,.article-entry figure::-webkit-scrollbar-thumb:hover{
    background-color: #bbbbbb;
}
```
修改滚动条颜色（滚动条默认颜色与代码块背景色冲突）
## 9.文章内的超链接超出页面问题
当页面进行缩放时，这个区域可能会超出页面。
### 解决办法
css中对a标签添加`word-wrap: break-word`属性
指定如果足够长得话，应该换行：
```css
/* 添加word-wrap: break-word */
a {
    background: transparent;
    text-decoration: none;
    color: #08c;
    word-wrap: break-word
}
```