---
title: yilia主题进阶配置
date: 2019-10-14 11:13:55
tags: [博客,hexo]
toc: true
---
这篇文章添加几个适用于yilia主题的功能
<!--more-->
快速导航：
[yilia主题添加本地头像](#yilia主题添加本地头像)
[添加字数统计](#添加字数统计)
[安装全局搜索功能](#安装全局搜索功能)
[yilia主题添加博客文章置顶功能和置顶标签](#yilia主题添加博客文章置顶功能和置顶标签)
[hexo文章加密功能](#hexo文章加密功能)
[yilia主题移动端添加页面进度条](#yilia主题移动端添加页面进度条)
[hexo代码块复制功能](#hexo代码块复制功能)
[代码区块高亮](#代码区块高亮)
[添加文章更新时间](#添加文章更新时间)
[yilia主题添加aplayer播放器](#yilia主题添加aplayer播放器)
## yilia主题添加本地头像
如果你的头像是引用网络的，那就要注意了，网络上的图片随时都有可能被删除，删除之后，头像就没有了
头像的图片一般不是很大，完全可以进行本地引用（你要深刻意识到，本地引用图片是会影响到网页加载速度的）

补充：近期不知你有没有发现[小贱贱图床](http://pic.xiaojianjian.net/)登录说明
>登录说明
问：为什么突然要登录了？
答：因为顶不住咯。估计被xx瞄上了吧。换了N的多账号去维持了，已经被逼去买xx小号了。
问：没有注册入口，怎么样获取账号？
答： 老用户请加wx：dashu007hao，（请备注说明图床，否则不通过）
碎碎念：还能维护多久我也不知道，说不准哪天就不维护了。且用且珍惜吧。珍惜最后的时光 

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
        <% if (!index && ((theme.wordcount === 1 && post.wordcount) || theme.wordcount === 2)){ %>
        <div style="color: #999">
        <span>字数 <%= wordcount(post.content) %></span>
        <div>
        <% } %>
        <!-- 添加完成 -->
      </header>
<% } %>
```
这里div添加了颜色属性，适配主题
**div标签的样式可以自己修改，添加style属性即可，也可以添加class，在css中美化**
* 添加了判断条件，修改主题配置文件`themes\yilia\_config.yml`，添加

```
# 字数统计
# 本功能实现需要插件hexo-wordcount
# 设定：0-不显示字数； 1-文章对应的md文件里有wordcount:true属性，才显示字数； 2-所有文章均显示字数
# 不需要使用，直接设置值为false，或注释掉
wordcount: 2
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

### 效果图（具体效果可参看本主题）
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

```js
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

```html
<div class="search-wrap">
  <input class="search-ipt" q-model="search" type="text" placeholder="find something…">
  <!--修改位置-->
  <i class="icon-search icon" q-show="search|isEmptyStr" id="js-icon-search"></i>
  <i class="icon-close icon" q-show="search|isNotEmptyStr" q-on="click:clearChose(e)"></i>
</div>
```
* 修改搜索弹窗的样式，主题`themes\yilia\source\main.0cf68a.css`文件中添加

```css
/* 全局搜索样式 */
#js-searchModal {
	display: none;
	top: 10%;
    min-height: 500px;
    max-height: 70%;
    width: 80%;
    word-wrap: break-word;
	z-index: 1001;
	position: fixed;
	left: 0;
	right: 0;
    background: linear-gradient(200deg,#a0cfe4,#e8c37e);
	margin: auto;
	overflow: auto;
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
`page.password`控制只在有password的文章导入下面的代码，如果不添加此项，会使所有文章都导入下面代码（效果一样，但是代码量不一样）
```
<% if (theme.verifyPassword.enable && page.password) { %>
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
## yilia主题移动端添加页面进度条
移动端隐藏了滚动条，加一个网页进度条可以更清楚了解到当前页面在网页的位置
### 说明
此网页进度条只在移动端页面出现，pc端进度条宽度始终为0
网页进度条在页面最下方，样式可根据自己的需要更改
### 实现方法
需要用到scrollprogress.js，这里云端引用
* `themes\yilia\layout\_partial\script.ejs`文件中添加

```html
<!-- 页面进度条 -->
<script src="https://cdn.bootcss.com/scrollprogress/3.0.2/scrollProgress.js"></script>
<script>
    // progress bar init
    const progressElement = window.document.querySelector('.progress-bar');
    if (progressElement) {
        new ScrollProgress((x, y) => {
            progressElement.style.width = y * 100 + '%';
        });
    }
</script>
```
* 在`themes\yilia\layout\layout.ejs`添加滚动条`<div class="progress-bar"></div>`的位置，我是在`<%- partial('_partial/footer') %>`下面添加

```
<%- partial('_partial/footer') %>
<!-- 开始添加 -->
<div class="progress-bar"></div>
<!-- 添加结束 -->
```
* `themes\yilia\source\main.0cf68a.css`添加样式

```css
/* 进度条 */
.progress-bar {
    height: 4px;
    position: fixed;
    bottom: 0;
    z-index: 300;
    background: #eaeaea;
    opacity: 0.8;
}
```
yilia主题pc页面与移动端页面布局不同，pc端不会显示进度条，上面的js在pc端页面返回值始终是0，即进度条的宽度始终为0
### 感谢
[https://blinkfox.github.io/](https://blinkfox.github.io/)
## hexo代码块复制功能
此功能应该适用于所有的hexo主题
### 说明
代码块复制功能是在代码块部分显示复制按钮，点击复制按钮，实现代码块复制功能
本功能实现需要引入jquery
运用[clipboard.js](http://www.clipboardjs.cn/)实现复制代码块功能
### 实现方法（更新）
前提：
本功能依据hexo配置文件`_config.yml`（不是主题那个）中`highlight.enable`值为true所生成的代码区块标签实现。
如果你的`highlight.enable`值为false，那么复制按钮的位置要做相应改变
主题中添加js代码
本js中clipboard.js使用网络引用，可以将其下载到本地引用
如果主题中没有引入jquery，请将jquery引入
```html
<!-- 复制代码块 -->
<script src="https://clipboardjs.com/dist/clipboard.min.js"></script>
<script>
    /*页面载入完成后，创建复制按钮*/
    !function (e, t, a) {
        var initCopyCode = function(){
            var copyHtml = '<button type="button" class="js-btn-copy">复制</button>';
            $(".code pre").before(copyHtml);
        }
        initCopyCode();
        // 代码块复制
        $(".code").on("click",".js-btn-copy",function(button){
            var copy=button.currentTarget;
            var clipboard = new ClipboardJS('.js-btn-copy', {
                target: function(trigger) {
                    if(trigger.nextElementSibling != null){
                        return trigger.nextElementSibling;
                    }
                }
            });
            clipboard.on('success', function(e) {
                e.clearSelection();
                $(copy).html("复制成功");
                clipboard.destroy();
            });
            clipboard.on('error', function(e) {
                $(copy).html("复制失败");
                clipboard.destroy();
            });
            $(copy).mouseout(function(){$(event.currentTarget).html("复制")});
        });
    }(window, document);
</script>
```
主题中添加css样式（本样式根据yilia主题美化）
```css
/* 代码块复制 */
.js-btn-copy {
    display: none;
    right: 10%;
    font-size: 1em;
    line-height: 20px;
    color: #4d4d4d;
    background-color: white;
    padding: 2px 8px;
    border: 1px solid #d5d5d5;
    border-radius: 4px;
    position: absolute; 
}
figure:hover .js-btn-copy{
    display: block;
}
@media screen and (max-width: 800px) {
    .js-btn-copy {
        right: 5%;
    }
}
```
样式根据自己的主题需要进行更改，重点更改自己主题中复制按钮的样式
### 实现效果
点击复制按钮，复制按钮变成复制成功
### 更新说明
美化复制按钮样式（模仿CSDN），添加代码块复制失败提示，修改click事件传参形式
### 感谢
本功能实现参照
[hexo+yilia添加复制代码块的功能](https://blog.csdn.net/weixin_41287260/article/details/103051122)
[蒋振飞的博客 - 网站搭建 (第23天) 代码块复制功能](https://jzfblog.com/detail/153)
重点应用
[clipboard.js](http://www.clipboardjs.cn/)
对以上杰出贡献者表示感谢
## 代码区块高亮
yilia主题自带高亮
分享一下这篇文章[hexo+yilia修改代码块等样式](https://blog.csdn.net/weixin_41287260/article/details/103051056)
### 两种实现方法
#### 第一种：使用主题自带代码区块高亮实现
**方法一**
前提：
hexo配置文件`_config.yml`（不是主题那个）中`highlight.enable`值为true
```
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:
```
在代码块标签后面声明代码区块语言（这里以css为例）
````
```css
figure:hover .js-btn-copy{
  opacity: 1;
}
```
````
效果：
```css
figure:hover .js-btn-copy{
  opacity: 1;
}
```
**方法二**
通过修改hexo配置文件实现
将`highlight.auto_detect`值设为true
即开启代码区块语言自动检测功能
```
highlight:
  enable: true
  line_number: true
  auto_detect: true
  tab_replace:
```
注：修改hexo配置文件后需要重启hexo服务才能生效
如果依然没有生效，请尝试使用`hexo clean`
高亮样式通过主题css样式文件进行实现（可以根据需要自行修改`main.0cf68a.css`文件）
#### 第二种：通过[highlight.js](https://highlightjs.org/)实现代码区块高亮
[highlight.js](https://highlightjs.org/)是实现代码区块高亮的js
此js会自动检测页面中`<pre><code>..</code></pre>`的代码区块（这是重点）
**实现方法：**
改变hexo代码区块标签结构（可选）
hexo配置文件`_config.yml`（不是主题那个）中`highlight.enable`值为false
true和false的值会改变代码区块的标签结构
如果不想修改`highlight.enable`值为false，请看下面的补充说明
```
highlight:
  enable: false
  line_number: true
  auto_detect: false
  tab_replace:
```
在主题中引入`highlight.js`，这里引用网络（可以下载到本地）
具体实现可以观看官方文档[https://highlightjs.org/usage/](https://highlightjs.org/usage/)
```html
<script src="https://highlightjs.org/static/highlight.site.pack.js"></script>
<script>
    //代码区块高亮
    hljs.initHighlightingOnLoad();
</script>
```
主题中引入css（官网下载`highlight.js`压缩包），里面有很多css样式，引入自己喜欢的一种即可
**补充说明：**
如果代码区块没有高亮，请观看一下你的代码区块的标签是不是`<pre><code>..</code></pre>`格式
`highlight.enable`值为false的标签结构
```
<pre>
    <code>
        <span>这是代码区块</span>
    </code>
</pre>
```
先说一下我遇到的问题
我的这个页面中，代码区块的标签格式
```
<figure>
    <table>
        <tbody>
            <tr>
                <tb>
                    <pre>
                        <span>这是代码区块</span>
                    </pre>
                </tb>
            </tr>
        </tbody>
    </table>
</figure>
```
可以明显看到代码区块的标签并不是`<pre><code>..</code></pre>`格式（`highlight.enable`值为true导致）
进行jquery手动修复
在`hljs.initHighlightingOnLoad();`添加
```js
$("figure table").wrap("<code></code>");
$("figure code").wrap("<pre></pre>");
```
将table标签用code标签包裹起来，再用pre标签将code标签包裹起来，实现上面的代码结构（很显然，这个方法有些麻烦）
```html
<script>
    //代码块高亮
    $("figure table").wrap("<code></code>");
    $("figure code").wrap("<pre></pre>");
    hljs.initHighlightingOnLoad();
</script>
```
## 添加文章更新时间
在发布时间后面添加更新时间
### 实现方法
修改主题文件`themes\yilia\layout\_partial\post\date.ejs`
添加如下内容：
```
<% if(!index && post.updated && post.updated > post.date){ %>
		<time datetime="<%= date_xml(post.updated) %>" itemprop="dateUpdated"><span>更新于 </span><i class="icon-calendar icon"></i><%= date(post.updated, date_format) %></time>
<% } %>
```
说明一下原理：
`if`判断页面是否文章详细页面，判断文章`.md`文件中是否有`updated`参数，`updated`参数时间是否大于`date`参数时间
如果均成立，添加时间标签
修改后的`date.ejs`
```
<a href="<%- url_for(post.path) %>" class="<%= class_name %>">
  	<time datetime="<%= date_xml(post.date) %>" itemprop="datePublished"><i class="icon-calendar icon"></i><%= date(post.date, date_format) %></time>
	<% if(!index && post.updated && post.updated > post.date){ %>
		<time datetime="<%= date_xml(post.updated) %>" itemprop="dateUpdated">最后更新于：<i class="icon-calendar icon"></i><%= date(post.updated, date_format) %></time>
	<% } %>
</a>
```
如果文章`md`文件中有`updated`参数，且`updated`参数有时间，则文章显示参数时间
写文章的时候可以直接在文章开头设置更新时间
```
updated: 2020-02-09 21:05:00
```
如果参数为空，显示md文件的修改日期（`updated`参数可有可无）
### 感谢
hexo添加文章更新时间（简书）：[https://www.jianshu.com/p/ae3a0666e998](https://www.jianshu.com/p/ae3a0666e998)
hexo添加文章更新时间（CSDN）：[https://blog.csdn.net/ganzhilin520/article/details/79053399](https://blog.csdn.net/ganzhilin520/article/details/79053399)
## yilia主题添加aplayer播放器
yilia主题添加音乐播放器，想了很久，但是一直没有实现
本主题属于自适应主题，但是pc端和移动端的智能菜单完全是两个页面，因此考虑添加两个播放器，一个用于pc页面，另一个用于移动端，当然，这只是我的方法
两个播放器都是存在的，只不过不会同时显示
pc页面时（根据屏幕宽度判断），移动端音乐播放器不显示，移动端页面时，pc播放器隐藏（当然这与音乐播放器添加的位置有很大关系）
至于效果，如果你看到这个页面，应该是可以看到效果，因此，我就不贴图片了
### 实现方法
aplayer播放器的实现，需要运用[APlayer](https://github.com/MoePlayer/APlayer)，下载github压缩包（不到300k，可以耐心等等），解压后把dist文件夹中的js与css文件复制到自己要引用的主题文件夹中，在代码中进行引用即可。
这里提供引用的网址，不需要下载文件
### 添加pc页面音乐播放器
定位主题文件`themes\yilia\layout\_partial\left-col.ejs`
在`<nav class="header-nav">`标签中的`div`标签后面添加
```
<% if (theme.music.enable && site.data && site.data.musics) { %>
    <div class="music-player">
    <%- partial('music/aplayer') %>
    </div>
<% } %>
```
添加后的样子
```
<nav class="header-nav">
    <div class="social">
        <% for (var i in theme.subnav){ %>
            <a class="<%= i %>" target="_blank" href="<%- url_for(theme.subnav[i]) %>" title="<%= i %>"><i class="icon-<%= i %>"></i></a>
        <%}%>
    </div>
    <!-- 开始 -->
    <% if (theme.music.enable && site.data && site.data.musics) { %>
        <div class="music-player">
        <%- partial('music/aplayer') %>
        </div>
    <% } %>
    <!-- 结束 -->
</nav>
```
在themes\yilia\layout\_partial文件夹中创建一个music文件夹（与上面引入的代码相匹配）
在music文件夹中创建`aplayer.ejs`（pc页面播放器js）和`mobile-aplayer.ejs`（移动端页面）两个文件
`aplayer.ejs`添加，仿照[https://blinkfox.github.io/](https://blinkfox.github.io/)
```html
<% var audiosJson = JSON.stringify(site.data.musics); %>
<!-- aplayer -->
<!-- 引入dist文件夹中复制的css文件，这里提供网址引用 -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
<!-- 隐藏滚动条两端的按钮和外层轨道，适配yilia主题，只适用于pc页面 -->
<style>
    #aplayer ::-webkit-scrollbar-button,#aplayer ::-webkit-scrollbar-track{
        display: none;
    }
</style>
<% if (theme.music.showTitle) { %>
<div class="title">
<%- theme.music.title %>
</div>
<% } %>
<div id="aplayer"></div>
<!-- 引入dist文件夹中复制的js文件，这里提供网址引用 -->
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
<script>
$(function () {
    new APlayer({
        container: document.getElementById('aplayer'),
        fixed: '<%- theme.music.fixed %>' === 'true',
        autoplay: '<%- theme.music.autoplay %>' === 'true',
        theme: '<%- theme.music.theme %>',
        loop: '<%- theme.music.loop %>',
        order: '<%- theme.music.order %>',
        preload: '<%- theme.music.preload %>',
        lrcType: Number('<%- theme.music.lrcType %>'),
        volume: Number('<%- theme.music.volume %>'),
        listFolded: '<%- theme.music.listFolded %>' === 'true',
        listMaxHeight: '<%- theme.music.listMaxHeight %>',
        audio: JSON.parse('<%- audiosJson %>')
    });
});
</script>
```
### 添加移动端页面音乐播放器
定位主题文件`themes\yilia\layout\_partial\mobile-nav.ejs`
在header标签中最后一个nav标签后面添加
```
<% if (theme.music.mobile_enable && site.data && site.data.musics) { %>
<nav class="music-player">
<%- partial('music/mobile-aplayer') %>
</nav>
<% } %>
```
添加后的样子
```
<nav class="header-menu js-header-menu">
        <ul style="width: <%= ulWidth %>">
        <% var divide = 100 / count + '%' %>
        <% for (var i in theme.menu){ %>
            <li style="width: <%= divide %>"><a href="<%- url_for(theme.menu[i]) %>"><%= i %></a></li>
        <%}%>
        </ul>
    </nav>
    <!-- 开始 -->
    <% if (theme.music.mobile_enable && site.data && site.data.musics) { %>
    <nav class="music-player">
    <%- partial('music/mobile-aplayer') %>
    </nav>
    <% } %>
    <!-- 结束 -->
</header>
```
在music文件夹中创建的`mobile-aplayer.ejs`文件中添加
```html
<% var audiosJson = JSON.stringify(site.data.musics); %>
<!-- mobile-aplayer -->
<% if (theme.music.mobile_showTitle) { %>
<div class="title">
<%- theme.music.mobile_title %>
</div>
<% } %>
<div id="mobile-aplayer"></div>
<script>
$(function () {
    new APlayer({
        container: document.getElementById('mobile-aplayer'),
        fixed: '<%- theme.music.mobile_fixed %>' === 'true',
        autoplay: '<%- theme.music.mobile_autoplay %>' === 'true',
        theme: '<%- theme.music.mobile_theme %>',
        loop: '<%- theme.music.mobile_loop %>',
        order: '<%- theme.music.mobile_order %>',
        preload: '<%- theme.music.preload %>',
        lrcType: Number('<%- theme.music.mobile_lrcType %>'),
        volume: Number('<%- theme.music.mobile_volume %>'),
        listFolded: '<%- theme.music.mobile_listFolded %>' === 'true',
        listMaxHeight: '<%- theme.music.mobile_listMaxHeight %>',
        audio: JSON.parse('<%- audiosJson %>')
    });
});
</script>
```
下载好的js和css文件只需要在pc播放器引用一次即可，不需要在移动端播放器重复引用
### 配置主题文件`_config.yml`
定位主题文件`themes\yilia\_config.yml`
在里面添加如下配置（几乎完全参照[hexo-theme-matery](https://blinkfox.github.io/)主题进行配置）：
```
# aplayer音乐播放器
# 要支持音乐播放，就必须开启音乐的播放配置和音乐的数据文件。
# 博客 source 目录下的 _data 目录（没有的话就新建一个）中新建 musics.json 文件（存放音乐数据）
# 吸底模式1.9.1之后版本生效。若开启吸底模式，不建议显示标题
music:
  # aplayer 电脑页面
  enable: true # 是否开启
  showTitle: true # 是否显示标题
  title: 听听音乐
  fixed: false # 吸底模式（fixed:true），迷你模式（mini:true），普通模式（注释此行或者设置fixed:false）
  autoplay: false # 是否自动播放
  theme: '#4d4d4d' # 主题色
  loop: 'all' # 音频循环播放, 可选值: 'all', 'one', 'none'
  order: 'list' # 音频循环顺序, 可选值: 'list', 'random'
  preload: 'auto' # 音频预加载，两个播放器同时生效，可选值: 'none', 'metadata', 'auto'
  volume: 0.7 # 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
  lrcType: 1 # 歌词格式，可选值：3（LRC文件歌词格式），1（JS字符串歌词格式），0（不显示歌词）
  listFolded: true # 列表是否折叠
  listMaxHeight: # 列表最大高度，一个列表'32px'
  # mobile-aplayer 移动端页面
  mobile_enable: true # 是否开启
  mobile_showTitle: true # 是否显示标题
  mobile_title: 
  mobile_fixed: true
  mobile_autoplay: false # 同时开启失效
  mobile_theme: '#4d4d4d'
  mobile_loop: 'all'
  mobile_order: 'list'
  mobile_volume: 0.7
  mobile_lrcType: 1
  mobile_listFolded: true
  mobile_listMaxHeight:
```
上面的内容根据自己需要更改
[aplayer中文文档](https://aplayer.js.org/#/zh-Hans/)有详细的参数说明
### 最后的配置
博客文件夹（不是主题文件夹）里的 source 中创建 _data 文件夹，在 _data 文件夹中创建 musics.json 文件
文件内容如下所示（如果上面歌词格式配置为0，则歌词lrc一行可以去掉）：
```
[{
    name: '平凡之路',
    artist: '朴树',
    lrc: '/downloads/lrc/平凡之路-朴树.lrc',
    cover: 'http://xxx.com/music-cover1.png',
    url: 'http://xxx.com/music1.mp3'
},  {
    name: '后会无期',
    artist: 'G.E.M.邓紫棋',
    lrc: '/downloads/lrc/后会无期-G.E.M.邓紫棋.lrc',
    cover: '/medias/music/cover2.png',
    url: '/medias/music/music2.mp3'
}]
```
播放器中有标题，简单配置一下标题样式

定位文件`themes\yilia\source\main.0cf68a.css`，在里面添加css（同时适用两个播放器,根据需求自行修改）
```css
/* music player title */
#header .music-player .title{
    font-size: 14px;
    color: #424242;
    text-align: center
}
```
补充说明：
1.APlayer.min.css与APlayer.min.js只在pc播放器中添加，并没有在移动页面添加，如果关闭pc播放器，移动端播放器会因为缺失相应的css和js而无法显示
这里提供一个解决办法
在主题的css与script文件中添加如下代码
```
/*css中添加*/
<% if (theme.music.enable || theme.music.mobile_enable) { %>
<link rel="stylesheet" type="text/css" href="<%- theme.css.aplayer %>">
<% } %>

/*script中添加*/
<% if (theme.music.enable || theme.music.mobile_enable) { %>
<script src="<%- theme.js.aplayer %>"></script>
<% } %>
```
把pc页面引入的js与css删除即可
2.隐藏滚动条两端的按钮和外层轨道，此样式只适用于pc页面，解决实际歌曲列表长度大于设置长度出现滚动条时播放器自带样式对滚动条设置与主题滚动条样式设置冲突问题，如果移动端出现样式冲突问题，请手动添加（移动端可能不会出现滚动条）
3.截至1.10.1版本发现1.9.1之后的版本会使部分浏览器锚点跳转失效（本页面引入的是1.10.1），解决办法就是将传统的`#位置`修改为`?id=#位置`。
4.移动端preload音频预加载属性不受关闭pc播放器影响
**到此，yilia主题添加aplayer播放器完成**
### 分享
既然谈到了添加音乐播放器，自然是需要音乐的直链，分享一个网易云获取音乐直链的方法（一般不会失效，除非歌曲下架）
```
https://music.163.com/song/media/outer/url?id=
```
id后面输入歌曲的id
分享一个[音乐直链搜索工具](https://music.liuzhijin.cn/)，通过此工具可以快速获取到网易云音乐歌曲id，自然网易云音乐歌曲直链就获取到了
此搜索工具获取到的音乐直链有时间限制，超过一定时间直链失效，目前只知道获取网易云音乐直链这一种方法，分享给大家
补充：
发现了一个音乐下载神器：[全网音乐免费下载神器](http://www.333ttt.com/up/tool/)，这个获取的音乐地址仿佛没有时间限制（切记，复制input文本框链接的地址，点击下载后获取的地址是有时间限制的）

获取酷我mp3外链地址
首先，获取要获得外链歌曲的id，在酷我歌曲页面上就有
其次，将id拼接到`player.kuwo.cn/webmusic/st/getNewMuiseByRid?rid=MUSIC_`后面，即`http://player.kuwo.cn/webmusic/st/getNewMuiseByRid?rid=MUSIC_76446978`
出现的是该音频的xml信息
```
<Song>
<music_id>76446978</music_id>
<mv_rid>null</mv_rid>
<name>鐧捐姳棣�</name>
<song_url>http://yinyue.kuwo.cnhttp://yinyue.kuwo.cn/yy/gequ-weixinyu_baihuaxiang/76446978.htm</song_url>
<artist>榄忔柊闆�</artist>
<artid></artid>
<singer>榄忔柊闆�</singer>
<special>鐧捐姳棣�</special>
<ridmd591>32257EAB20266AE1B2BE8BDF21480CF5</ridmd591>
<mp3size>null</mp3size>
<artist_url>http://yinyue.kuwo.cnhttp://yinyue.kuwo.cn/yy/geshou-weixinyu/%E9%AD%8F%E6%96%B0%E9%9B%A8.htm</artist_url>
<auther_url>http://www.kuwo.cn/mingxing/%E9%AD%8F%E6%96%B0%E9%9B%A8/</auther_url>
<playid>play?play=MQ==&num=MQ==</playid>
<artist_pic>http://img2.kuwo.cn/star/starheads/120/2/2ac2a0c633723c75215d05016e400af_0.jpg</artist_pic>
<artist_pic240></artist_pic240>
<path>null</path>
<mp3path>&format=mp3&rid=MUSIC_76446978&response=res&type=convert_url&</mp3path>
<aacpath>&format=mp3&rid=MUSIC_76446978&response=res&type=convert_url&</aacpath>
<mp3dl>antiserver.kuwo.cn/anti.s?useless=</mp3dl>
<aacdl>antiserver.kuwo.cn/anti.s?useless=</aacdl>
<lyric>DBYAHlReXEpRUEAeCgxVEgAORRgLG0MXCRgaCwoRAB5UAwEaBAkEBhwaXxcAHVReSAsMAVEkOj0wJjpbX1taT1xSVA==</lyric>
<lyric_zz>DBYAHlReXEpRUEAeCgxVEgAORRgLG0MXCRgaCwoRAB5UAwEaBAkEBhwaXxcAHVReSAsMAVEkOj0wJjpbX1taT1xSVE8DHBodWF0=</lyric_zz>
</Song>
```
提取`<mp3path>`和`<mp3dl>`中的内容，创建url： http://+`<mp3dl>`内容+`<mp3path>`内容
以上面信息为例，url如下：
```
http://antiserver.kuwo.cn/anti.s?useless=&format=mp3&rid=MUSIC_76446978&response=res&type=convert_url&
```
此url为该歌曲的外链（仅适用于酷我音乐）
#### 感谢
yilia主题添加aplayer播放器的实现，参照以下网站进行完成，在此表示感谢
[Hexo全局添加APlayer音乐播放器](https://www.techgrow.cn/posts/cfdad023.html)
[Hexo增加APlayer音乐播放功能](http://lantianwork.coding.me/2019/01/13/Hexo增加APlayer音乐播放功能/)
[Hexo博客主题之hexo-theme-matery的介绍](https://blinkfox.github.io/2018/09/28/qian-duan/hexo-bo-ke-zhu-ti-zhi-hexo-theme-matery-de-jie-shao/#toc-heading-18)
[aplayer中文文档](https://aplayer.js.org/#/zh-Hans/)
## 最后
最近又看到了许多有用的功能
随时更新，可以在所有文章中查询想要的功能