---
title: yilia主题进阶配置
date: 2019-10-14 11:13:55
tags: 博客
toc: true
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
yilia博客拥有一个搜索功能，这个功能只能匹配到标题和标签，不是很强大，接下来介绍一个能匹配到文章内容关键字的搜索功能
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
本功能的实现需要导入jquery，我用的版本是`jquery-3.4.1.js`（可以在线引用）
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
查看是否有页面显示，出现页面，插件安装成功（这一步决定全局搜索功能是否会实现）
* 在主题路径`themes\yilia\layout\_partial`下创建`search.ejs`文件
* 上jquery官网下载jquery，将`jquery-3.4.1.js`放在`themes\yilia\source`路径下（这里在线引用）

在`search.ejs`中添加以下内容（粘贴到`search.ejs`中即可）
```
<% if (theme.local_search && theme.local_search.enable){ %>
<div id="js-searchModal">
    <div style="padding: 24px;">
        <div class="search-header">
            <span><i class="icon-search icon"></i>&nbsp;&nbsp;搜索</span>
            <input class="search-ipt" q-model="search" type="text" placeholder="请输入搜索的关键字" id="js-searchInput">
        </div>
        <div id="js-searchResult"></div>
    </div>
</div>
<!--搜索背景层-->
<div id="js-modal-overlay"></div>
<script type="text/javascript">
    window.onload=function(){
        var top1=0;
        function stopBodyScroll(isFixed){
            var bodyEl=document.body;
            if(isFixed){
                //获取页面滚动的距离
                top1=window.scrollY;
                //将body标签在当前位置固定
                bodyEl.style.position='fixed';
                bodyEl.style.top=-top1+'px';
                bodyEl.style.width='100%'
            }else{
                bodyEl.style.position='';
                bodyEl.style.top='';
                //页面回到获取的位置
                window.scrollTo(0,top1)
            }
        }
        //给搜索图标添加点击事件
        var open = document.getElementById('js-icon-search');
        open.setAttribute("title","搜索")
        open.onclick = function(){
            //弹窗出现时淡入动画
            $("#js-searchModal").fadeIn(1000);
            $("#js-modal-overlay").fadeIn(1000);
            //固定body
            stopBodyScroll(true);
        }
        //关闭搜索
        var close = document.getElementById('js-modal-overlay');
        close.onclick = function(){
            //弹窗关闭时淡出动画
            $("#js-searchModal").fadeOut(500);
            $("#js-modal-overlay").fadeOut(500);
            //移除body固定
            stopBodyScroll(false);
            document.body.removeAttribute('style');
        }
    }
</script>
<!-- 引入jquery -->
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<!-- 调用本地搜索函数 -->
<script src="<%=config.root%>./js/search.js"></script>
<% } %>
```
* 在主题`themes\yilia\source`路径下创建一个`js`文件夹，里面创建`search.js`文件，将以下内容（[jQuery-based Local Search Engine for Hexo](https://www.hahack.com/codes/local-search-engine-for-hexo/)）粘贴到此文件中（路径和文件名根据自己需要在上面的内容中修改）

```
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
            });
        }
    });
}
//调用搜索函数
$(function () {
    searchFunc("/" + "search.xml", 'js-searchInput', 'js-searchResult');
});
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
* 修改搜索弹窗的样式，主题`themes\yilia\source\main.0cf68a.css`文件中添加

```
/* 全局搜索样式 */
#js-searchModal {
	display: none;
	top: 10%;
    min-height: 500px;
    max-height: 70%;
	width: 80%;
	z-index: 1001;
	position: fixed;
	left: 0;
	right: 0;
	background: linear-gradient(200deg,#a0cfe4,#e8c37e);
	margin: auto;
	overflow-x: hidden;
	overflow-y: auto;
	border-radius: 10px
}

#js-modal-overlay {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	bottom: 0;
	width: 100%;
	background: rgb(0, 0, 0);
	opacity: .3
}

.search-header,.search-header i {
	color: #fff;
	font-size: 18px
}

.search-header ::-webkit-input-placeholder {
	color: #ededed
}

.search-header .search-ipt {
	width: 100%;
	color: #fff;
	background: none;
	border: none;
	border-bottom: 2px solid #fff;
	font-family: Roboto,serif
}

.search-result-list li {
	border-bottom: 1px dotted #dcdcdc;
	padding-top: 5px
}

.search-result-list a {
	color: #fff;
	font-size: 18px;
	font-weight: 300;
	line-height: 35px
}

.search-result-list .search-result {
	font-size: 16px;
	line-height: 20px;
	color: #fffdd8
}

.search-result-list .search-keyword {
	color: #e96900;
	font-style: normal
}
/* 全局搜索样式结束 */
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
* 最后一步，在`themes\yilia\_config.yml`中添加判断配置

```
#是否开启全局搜索
#不开启值为false，开启，值为true
#使用方法：点击所有文章中的搜索图标
local_search:
  enable: true
```
简单说明一下原理：通过获取搜索图标的id，添加点击事件，通过点击事件弹出全局搜索框，添加一个背景层（这里的背景层类似于开启分享显示微信二维码时的背景层样式），并将body固定在当前位置（禁止背景层下的内容滚动），在背景层添加一个关闭搜索弹窗的点击事件，关闭全局搜索，移除body固定
主题配置文件全局搜索的开关通过`search.ejs`文件中的第一行判断语句进行判断
这里对`main.0cf68a.css`文件的修改可以根据自己的需求更改
yilia主题有一个气泡上浮的动画效果，在搜索弹窗中没有实现(添加了搜索弹窗淡入淡出效果)
每个人都应有自己的思路，根据需要修改相关内容
最后，再次感谢以上的杰出贡献者，使我在yilia主题中实现了全局搜索功能
## yilia主题添加博客文章置顶功能和置顶标签

**注：yilia主题内置文章置顶功能，只需在Front-matter中添加`top: true`即可，支持置顶多个文章，置顶的文章会再次以时间进行排序**
**请先在Front-matter中添加`top: true`，然后查看文章是否置顶，如果没有实现请继续看实现方法**

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
## hexo文章加密功能
阅读文章的密码验证功能，文章的密码是通过`SHA256`加密
此功能通过JavaScript实现，如果浏览器中有是否启用JavaScript选项，选否后，加密功能失效（[Pure浏览器](https://purelitebrowser.com)）
此功能适用于yilia主题
### 实现效果
在主页访问文章详细内容时，会在文章详细页出现弹窗，输入相应的密码进入详细页，密码输入错误跳回主页
### 实现方法
* 将以下内容添加到`themes\yilia\layout\_partial\article.ejs`文件的顶部
`<script src="<%=config.root%>./js/crypto-js.min.js"></script>`是本地引入js的路径，根据需要更改
这里提供的是云端引用（即联网才可用）
```
<% if (theme.verifyPassword.enable) { %>
<!-- 本地引入js -->
<!-- <script src="<%=config.root%>./js/crypto-js.min.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
<script>
    (function() {
        let pwd = '<%- page.password %>';
        if (pwd && pwd.length > 0) {
            if (pwd !== CryptoJS.SHA256(prompt('<%- theme.verifyPassword.promptMessage %>')).toString(CryptoJS.enc.Hex)) {
                alert('<%- theme.verifyPassword.errorMessage %>');
                location.href = '<%- url_for("/")  %>';
            }
        }
    })();
</script>
<% } %>
```
* 在`themes\yilia\_config.yml`中添加如下配置
```
# 阅读文章的密码验证功能，如要使用此功能请激活该配置项，并在对应文章的Front-matter中写上'password'的键和密码加密后的密文即可.
# 比如
# password: 加密的密文
# 请注意：为了保证密码原文不会被泄露到网页中，文章的密码必须是通过'SHA256'加密的，这样就不会被破解.
verifyPassword:
  enable: false
  promptMessage: 请输入访问本文章的密码
  errorMessage: 密码错误，将返回主页！
```
### 说明
在`Front-matter`中添加`password: SHA256`，`SHA256`是密码加密后的密文，访问文章时输入加密前的密码即可
如果要对文章设置阅读验证密码的功能，不仅要在 Front-matter 中设置采用了 SHA256 加密的 password 的值，还需要在主题的 `_config.yml` 中激活了配置。有些在线的 SHA256 加密的地址，可供你使用：
[开源中国在线工具](http://tool.oschina.net/encrypt?type=2)
[chahuo](http://encode.chahuo.com/)
[站长工具](http://tool.chinaz.com/tools/hash.aspx)
### 感谢
这个功能是hexo-theme-matery主题开发者实现的
[https://blinkfox.github.io/](https://blinkfox.github.io/)
在此表示感谢！
## 最后
最近又看到了许多有用的功能
1.`gitalk`评论
花时间研究研究看看能不能实现