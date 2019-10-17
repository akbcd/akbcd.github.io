---
title: yilia主题进阶配置
date: 2019-10-14 11:13:55
tags: 博客
---
这篇文章添加几个适用于yilia主题的功能
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
这个功能的实现，感谢以下网站：
全局搜索功能的开发者： [jQuery-based Local Search Engine for Hexo](https://www.hahack.com/codes/local-search-engine-for-hexo/)
hexo-theme-matery主题开发者：[https://blinkfox.github.io/](https://blinkfox.github.io/)
没有他们的贡献，我自己实现不了这个功能，本功能实现效果与hexo-theme-matery主题类似

### 效果图
pc页面
![](search1.png)
手机页面
![](search2.png)

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

在`search.ejs`中添加以下内容（总共183行，粘贴到`search.ejs`中即可）
```
<% if (theme.local_search && theme.local_search.enable){ %>
<div id="js-searchModal" style="display: none; opacity: 1; top: 10%;">
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
                "z-index": "1002",
                "top": "-25%",
                "left": "0",
                "bottom": "0",
                "right": "0",
                "width": "100%",
                "background": "rgba(0,0,0,0.6)",
                "will-change": "opacity",
            });
            //搜索弹窗样式
            $("#js-searchModal").css({
                "min-height": "500px",
                "width": "80%",
                "z-index": "1003",
                "position": "fixed",
                "left": "0",
                "right": "0",
                "background": "linear-gradient(200deg,#a0cfe4,#e8c37e)",
                "max-height": "70%",
                "width": "80%",
                "margin": "auto",
                "overflow-x": "hidden",
                "overflow-y": "auto",
                "border-radius": "2px",
                "will-change": "top, opacity"
            });
            //修改搜索框样式
            $("#js-searchInput").css({"width":"100%"});
            $(".search-header,.search-header i").css({
                "color": "#fff",
                "font-size": "18px"
            });
        })
        var jsm = document.getElementById('js-searchModal');
        var jmo = document.getElementById('js-modal-overlay');
        //给搜索图标添加点击事件
        var open = document.getElementById('js-icon-search');
        open.onclick = function(){
            //弹窗出现时淡入动画
            $("#js-searchModal").fadeIn(2000);
            //弹出搜索    
            jsm.style.display = 'block';
            jmo.style.display = 'block';
        }
        //关闭搜索
        var close = document.getElementById('js-modal-overlay');
        close.onclick = function(){
            jsm.style.display = 'none';
            jmo.style.display = 'none';
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
                    //搜索结果样式修改
                    $(".search-result-list li").css({
                        "border-bottom":"1px dotted #dcdcdc",
                        "padding-top": "5px"
                    });
                    //搜索结果标题样式
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
* 定位文件`themes\yilia\layout\layout.ejs`，在里面的body标签下添加内容：`<%- partial('_partial/search') %>`

```
<body>
  <!--开始添加-->
  <%- partial('_partial/search') %>
  <!添加结束>
  <div id="container" q-class="show:isCtnShow">
    <canvas id="anm-canvas" class="anm-canvas"></canvas>
```
* 修改搜索弹窗的样式，定位文件`themes\yilia\source\main.0cf68a.css`，在里面查找
`.tools-col .tools-section .search-wrap .search-ipt`，在后面添加`,.search-header .search-ipt`
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
`.tools-col .tools-section .search-wrap ::-webkit-input-placeholder`，后面添加`,.search-header ::-webkit-input-placeholder`
```
.tools-col .tools-section .search-wrap ::-webkit-input-placeholder,.search-header ::-webkit-input-placeholder {
    color: #ededed
}
```
* 定位文件`themes\yilia\layout\_partial\tools.ejs`，在里面找到搜索图标的i标签，在标签里添加一个id：`js-icon-search`
这里实现的是点击搜索图标出现搜索框
```
<div class="search-wrap">
  <input class="search-ipt" q-model="search" type="text" placeholder="find something…">
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
简单说明一下原理：通过获取搜索图标的id，添加点击事件，通过点击事件弹出全局搜索框，添加一个背景层，在背景层添加一个关闭搜索弹窗的点击事件，关闭全局搜索
主题配置文件全局搜索的开关通过`search.ejs`文件中的第一行判断语句进行判断
这里对css的修改只有两处，其余样式的实现都是靠js来实现，添加css样式的的地方里面有提示，可以根据自己的需求更改
yilia主题有一个气泡上浮的动画效果，在搜索弹窗中没有成功实现(实现了搜索弹窗淡入效果)
最后，再次感谢以上的杰出贡献者，使我在yilia主题中实现了全局搜索功能