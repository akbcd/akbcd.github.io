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

## 接下来想要实现的功能 