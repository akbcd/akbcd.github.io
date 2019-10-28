---
title: yilia主题进阶配置
date: 2019-10-14 11:13:55
tags: 博客
top: true
toc: true
---
这篇文章添加几个适用于yilia主题的功能
本篇文章可与[yilia主题常见问题及解决办法](https://akbcd.github.io/2019/06/27/yilia主题常见问题及解决办法/)结合着看
<!--more-->
## yilia主题添加本地头像
如果你的头像是引用网络的，那就要注意了，网络上的图片随时都有可能被删除，删除之后，头像就没有了
头像的图片一般不是很大，完全可以进行本地引用
### 实现方法
* 将自己的头像图片放在`themes\yilia\source\img`路径下（路径可以更换），我的图片名为`avatar.png`
* 修改主题配置文件`themes\yilia\_config.yml`，在里面找到`#你的头像url`，添加路径

```
#你的头像url
avatar: /img/avatar.png
```
* 本地预览`hexo s`看效果

## 添加字数统计
字数统计需要安装插件实现
### 实现方法
* 安装hexo-wordcount插件
`npm i --save hexo-wordcount`
* 找到想添加的位置，以文章标题的下方为例（参看本博客显示效果）
* 定位文件`themes\yilia\layout\_partial\article.ejs`，在里面添加

```
<% if (post.link || post.title){ %>
      <header class="article-header">
        <%- partial('post/title', {class_name: 'article-title'}) %>
        <% if (!post.noDate){ %>
        <%- partial('post/date', {class_name: 'archive-article-date', date_format: null}) %>
        <% } %>
        <!-- 开始添加字数统计-->
        <% if(theme.word_count && !post.no_word_count && !index){%>
          <div>
            字数：<%= wordcount(post.content) %>字
          </div>
        <% } %>
        <!-- 添加完成 -->
      </header>
<% } %>
```
**div标签的样式可以自己修改，添加style属性即可，也可以添加class，在css中美化**
* 添加了判断条件，修改主题配置文件`themes\yilia\_config.yml`，添加

```
#是否开启字数统计
#不需要使用，直接设置值为false，或注释掉
word_count: true
```
* `hexo s`本地预览查看效果

## 安装全局搜索功能
yilia博客拥有一个搜索功能，这个功能只能匹配到标题和标签，不是很强大，接下来介绍一个能匹配到文章内容的搜索功能
这个功能的实现，感谢：
全局搜索功能的开发者： 
[jQuery-based Local Search Engine for Hexo](https://www.hahack.com/codes/local-search-engine-for-hexo/)
hexo-theme-matery主题开发者：
[https://blinkfox.github.io/](https://blinkfox.github.io/)
没有他们的贡献，我自己实现不了这个功能，本功能实现效果与hexo-theme-matery主题类似

### 效果图
pc页面
![](https://tva1.sinaimg.cn/large/007X8olVly1g8asepxgnbj30kj09yqbv.jpg)
手机页面
![](https://tva1.sinaimg.cn/large/007X8olVly1g8asf74sq6j30ci0k67dj.jpg)

### 实现方法
本功能的实现需要导入jquery，我用的版本是`jquery-3.4.1.js`
本功能的实现还需要安装插件`hexo-generator-searchdb`
* 博客的根目录下，`git bash here`，输入命令：`npm install hexo-generator-searchdb --save`
* 根目录配置文件（不是主题配置文件）`_config.yml`中添加以下内容

```
search:
  path: search.xml
  field: post
```
测试插件是否安装成功
* 输入本地预览命令`hexo s`，在浏览器输入预览网址
在网址后添加`search.xml`，比如我的预览网址是`localhost:4000/`，那就在浏览器导航栏输入`localhost:4000/search.xml`
查看是否有页面显示，出现页面，插件安装成功
* 在主题路径`themes\yilia\layout\_partial`下创建`search.ejs`文件
* 上jquery官网下载jquery，将`jquery-3.4.1.js`放在`themes\yilia\source`路径下

在`search.ejs`中添加以下内容（粘贴到`search.ejs`中即可）
```
<% if (theme.local_search && theme.local_search.enable){ %>
<div id="js-searchModal" style="display: none;">
    <div style="padding: 24px;">
        <div class="search-header">
            <span><i class="icon-search icon"></i>&nbsp;&nbsp;搜索</span>
            <input class="search-ipt" q-model="search" type="text" placeholder="请输入搜索的关键字" id="js-searchInput">
        </div>
        <div id="js-searchResult"></div>
    </div>
</div>
<!--搜索背景层-->
<div id="js-modal-overlay" style="display: none;"></div>
<script type="text/javascript">
    window.onload=function(){
        $(function(){
            //背景层样式
            $("#js-modal-overlay").css({
                "position": "fixed",
                "z-index": "1000",
                "top": "0",
                "bottom": "0",
                "width": "100%",
                "background": "#000",
                "opacity": ".3",
            });
            //搜索弹窗样式
            $("#js-searchModal").css({
                "top": "10%",
                "min-height": "500px",
                "width": "80%",
                "z-index": "1001",
                "position": "fixed",
                "left": "0",
                "right": "0",
                "background": "linear-gradient(200deg,#a0cfe4,#e8c37e)",
                "max-height": "70%",
                "margin": "auto",
                "overflow-x": "hidden",
                "overflow-y": "auto",
                "border-radius": "2px"
            });
            //修改搜索框样式
            $("#js-searchInput").css({"width":"100%"});
            $(".search-header,.search-header i").css({
                "color": "#fff",
                "font-size": "18px"
            });
        })
        //给搜索图标添加点击事件
        var open = document.getElementById('js-icon-search');
        open.setAttribute("title","搜索")
        open.onclick = function(){
            //pc端body标签添加fixed会出问题，这里只给移动端添加
            if(/Mobile/i.test(navigator.userAgent)&&screen.width < 800){
                //移动端页面固定滚动条，pc端滚动条不需要额外固定
                document.body.style.position = 'fixed';
            }
            //弹窗出现时淡入动画
            $("#js-searchModal").fadeIn(2000);
            $("#js-modal-overlay").fadeIn(2000);
        }
        //关闭搜索
        var close = document.getElementById('js-modal-overlay');
        close.onclick = function(){
            //移除移动端页面固定滚动条
            document.body.removeAttribute('style');
            //弹窗关闭时淡出动画
            $("#js-searchModal").fadeOut(1000);
            $("#js-modal-overlay").fadeOut(1000);
        }
    }
</script>
<!-- 引入jquery -->
<script src="<%=config.root%>jquery-3.4.1.js"></script>
<!-- 实现本地搜索函数 -->
<script type="text/javascript">
    var searchFunc = function (path, search_id, content_id) {
        'use strict';
        $.ajax({
            url: path,
            dataType: "xml",
            success: function (xmlResponse) {
                // get the contents from search data
                var datas = $("entry", xmlResponse).map(function () {
                    return {
                        title: $("title", this).text(),
                        content: $("content", this).text(),
                        url: $("url", this).text()
                    };
                }).get();
                var $input = document.getElementById(search_id);
                var $resultContent = document.getElementById(content_id);
                $input.addEventListener('input', function () {
                    var str = '<ul class=\"search-result-list\">';
                    var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                    $resultContent.innerHTML = "";
                    if (this.value.trim().length <= 0) {
                        return;
                    }
                    // perform local searching
                    datas.forEach(function (data) {
                        var isMatch = true;
                        var content_index = [];
                        var data_title = data.title.trim().toLowerCase();
                        var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                        var data_url = data.url;
                        var index_title = -1;
                        var index_content = -1;
                        var first_occur = -1;
                        // only match artiles with not empty titles and contents
                        if (data_title != '' && data_content != '') {
                            keywords.forEach(function (keyword, i) {
                                index_title = data_title.indexOf(keyword);
                                index_content = data_content.indexOf(keyword);
                                if (index_title < 0 && index_content < 0) {
                                    isMatch = false;
                                } else {
                                    if (index_content < 0) {
                                        index_content = 0;
                                    }
                                    if (i == 0) {
                                        first_occur = index_content;
                                    }
                                }
                            });
                        }
                        // show search results
                        if (isMatch) {
                            str += "<li><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
                            var content = data.content.trim().replace(/<[^>]+>/g, "");
                            if (first_occur >= 0) {
                                // cut out 100 characters
                                var start = first_occur - 20;
                                var end = first_occur + 80;
                                if (start < 0) {
                                    start = 0;
                                }
                                if (start == 0) {
                                    end = 100;
                                }
                                if (end > content.length) {
                                    end = content.length;
                                }
                                var match_content = content.substr(start, end);
                                // highlight all keywords
                                keywords.forEach(function (keyword) {
                                    var regS = new RegExp(keyword, "gi");
                                    match_content = match_content.replace(regS, "<em class=\"search-keyword\">" + keyword + "</em>");
                                });
                                str += "<p class=\"search-result\">" + match_content + "...</p>"
                            }
                            str += "</li>";
                        }
                    });
                    str += "</ul>";
                    $resultContent.innerHTML = str;
                    //搜索结果框架样式（li标签）
                    $(".search-result-list li").css({
                        "border-bottom":"1px dotted #dcdcdc",
                        "padding-top": "5px"
                    });
                    //搜索结果标题（a标签）样式
                    $(".search-result-list a").css({
                        "color": "#fff",
                        "font-size":"18px",
                        "font-weight": "300",
                        "line-height": "35px"
                    });
                    //搜索结果内容样式
                    $(".search-result-list .search-result").css({
                        "font-size": "16px",
                        "line-height": "20px",
                        "color": "#fffdd8"
                    });
                    //匹配词样式
                    $(".search-result-list .search-keyword").css({
                        "color":"#e96900",
                        "font-style":"normal"
                    })
                });
            }
        });
    }
    //调用搜索函数
    $(function () {
        searchFunc("/" + "search.xml", 'js-searchInput', 'js-searchResult');
    });
</script>
<% } %>
```
* 定位文件`themes\yilia\layout\layout.ejs`，在里面的body标签下添加内容：`<%- partial('_partial/search') %>`（添加位置可以根据需求更改）

**注意：不要添加在body标签内的最后，即主题导入js之后，这样会导致主题的部分js失效**
**建议在以下位置添加**

```
<body>
  <!--开始添加-->
  <%- partial('_partial/search') %>
  <!添加结束>
  <div id="container" q-class="show:isCtnShow">
    <canvas id="anm-canvas" class="anm-canvas"></canvas>
```
* 修改搜索弹窗的样式，定位文件`themes\yilia\source\main.0cf68a.css`，在里面查找
`.tools-col .tools-section .search-wrap .search-ipt`，在后面添加`,.search-header .search-ipt`（导入所有文章中搜索框样式）
```
.tools-col .tools-section .search-wrap .search-ipt,.search-header .search-ipt {
    width: 310px;
    color: #fff;
    background: none;
    border: none;
    border-bottom: 2px solid #fff;
    font-family: Roboto,serif
}
```
* 依然是这里面，查找
`.tools-col .tools-section .search-wrap ::-webkit-input-placeholder`，后面添加`,.search-header ::-webkit-input-placeholder`（修改搜索框提示文字的颜色与所有文章中的相同）
```
.tools-col .tools-section .search-wrap ::-webkit-input-placeholder,.search-header ::-webkit-input-placeholder {
    color: #ededed
}
```
* 定位文件`themes\yilia\layout\_partial\tools.ejs`，在里面找到搜索图标的i标签，在标签里添加一个id：`js-icon-search`（添加搜索弹窗事件）
这里实现的是点击搜索图标出现搜索框
```
<div class="search-wrap">
  <input class="search-ipt" q-model="search" type="text" placeholder="find something…">
  <!--修改位置-->
  <i class="icon-search icon" q-show="search|isEmptyStr" id="js-icon-search"></i>
  <i class="icon-close icon" q-show="search|isNotEmptyStr" q-on="click:clearChose(e)"></i>
</div>
```
* 最后一步，在`themes\yilia\_config.yml`中添加判断配置
```
#是否开启全局搜索
#不开启值为false，开启，值为true
#使用方法：点击所有文章中的搜索图标
local_search:
  enable: true
```
简单说明一下原理：通过获取搜索图标的id，添加点击事件，通过点击事件弹出全局搜索框，添加一个背景层（这里的背景层用的是开启分享显示微信二维码时的背景层样式，并不能直接添加class，那个class绑定着js），在背景层添加一个关闭搜索弹窗的点击事件，关闭全局搜索
主题配置文件全局搜索的开关通过`search.ejs`文件中的第一行判断语句进行判断
这里对`main.0cf68a.css`文件的修改只有两处，其余样式的实现都是靠js来实现（可以自行将js实现的样式添加到`main.0cf68a.css`），添加css样式的的地方里面有提示，可以根据自己的需求更改
yilia主题有一个气泡上浮的动画效果，在搜索弹窗中没有实现(添加了搜索弹窗淡入淡出效果)
最后，再次感谢以上的杰出贡献者，使我在yilia主题中实现了全局搜索功能
## yilia主题添加博客文章置顶功能和置顶标签
目前已经有了博客文章置顶的插件，觉得这个功能很好用，在这里分享一下
参考链接
[hexo博客优化之文章置顶+置顶标签](https://blog.csdn.net/qwerty200696/article/details/79010629)
感谢插件的制作者
[hexo-generator-index-pin-top](https://github.com/netcan/hexo-generator-index-pin-top)
### 实现方法
* 安装插件（博客根目录git安装）
`npm uninstall hexo-generator-index --save`
`npm install hexo-generator-index-pin-top --save`
安装完成后
* 在需要置顶的文章中加上`top: true`即可

```
---
title: jsp第一次课
date: 2019-10-09 09:54:51
tags: jsp
top: true
---
```
* 本地预览`hexo s`，你会看到yilia主题自带置顶标签，不需要进行额外的添加
![](https://tva1.sinaimg.cn/large/007X8olVly1g8ash8bd5kj308902pa9u.jpg)
* 到此，功能实现完成

还有一种方法，修改`Hexo文件夹下的node_modules/hexo-generator-index/lib/generator.js`文件，个人感觉没有这个简单，这里不进行介绍。
感兴趣的话，点击[新增Hexo博客文章置顶功能](https://zhousiwei.gitee.io/2019/02/25/新增Hexo博客文章置顶功能/)
# yilia主题常见问题及解决办法 下
## 微信分享二维码失效
微信分享二维码不显示，是百度生成二维码失效导致，换一个在线生成网址二维码的API接口即可
### 解决方法
* 定位文件`themes\yilia\layout\_partial\post\share.ejs`，修改微信分享img标签
* 将`//pan.baidu.com/share/qrcode?url=`改为`//qr.liantu.com/api.php?text=`即可（如果依然不显示，修改为`http://qr.liantu.com/api.php?text=`再试）

这里分享一个文章：[在线生成网址二维码的API接口](https://blog.csdn.net/wang1006008051/article/details/79753051)
根据自己的需求更改在线生成网址二维码的API接口
## 浏览器控制台出现`GET https://litten.me:9005/badj`错误提示问题
关于访问litten.me:9005的问题，这个主题的作者之前为了更好地完善这个主题，有时候会收集用户的客户端信息，详情请见[https://github.com/litten/hexo-theme-yilia/issues/528](https://github.com/litten/hexo-theme-yilia/issues/528)，不过这个请求是异步的，不会影响博客加载速度，而且作者已经不维护了，所以关不关都行。
如果不想被统计（或不想让控制台报错），看解决办法
### 解决办法
* 定位文件`themes\yilia\source\main.0cf68a.js`
* 在文件中查找`//litten.me:9005/badjs/`
* 将这段代码所在的函数删除

我删除的内容（就是将`192:`到`193`之间的内容全部删除）
```
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
## yilia主题移动端目录问题
如果目录文字过长，你会发现如下问题
![](https://tva1.sinaimg.cn/large/007X8olVly1g8asg89qimj30ci0k9dl9.jpg)
目录左侧溢出，如果想解决，参看以下解决办法
### 解决办法
* 修改移动端css
* 定位文件`themes\yilia\source\main.0cf68a.css`，查找`@media screen and (max-width: 800px)`，在下面添加以下内容

```
.toc-container.tooltip-left .tooltip-east .tooltip-content .toc-article{
    max-height: 400px;
    font-size: x-small
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
![](https://tva1.sinaimg.cn/large/007X8olVly1g8asgr7yb4j30ci0jzgr7.jpg)
## yilia主题控制台两个警告提示
### 不匹配的结束标记。

通过控制台，可以发现问题提示在p标签
```
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