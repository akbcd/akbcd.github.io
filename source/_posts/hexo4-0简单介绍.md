---
title: hexo4.0简单介绍
date: 2019-10-20 09:36:40
tags: [hexo,博客]
toc: true
---
**Hexo 4.0.0 Released**已于2019年10月14日更新。
想要升级体验，请在package.json中更改以下行，
```
-"hexo": "^3.9.0"，
+"hexo": "^4.0.0"，
```
之后输入git命令`npm install`安装，
查看hexo版本`hexo -v`显示`hexo: 4.0.0`即安装成功
<!--more-->
升级到hexo4.0，发现了几个问题，在这里分享一下
## 1.hexo生成的主页中，个别转义字符显示不出来
比如说我用的yilia主题，主页中，上一页和下一页旁边的转义字符，在hexo4.0中显示的是代码，并非是转义成的字符
hexo4.0中显示`下一页 &raquo;`
hexo3版本中显示`下一页 »`
这里以下一页为例，上一页同样是这个问题
**这里补充说明一下：通过js在第一页和最后一页中添加的上一页和下一页中的转义字符不受影响**
## 2.页面中点击不跳转的a标签`<a href="javascript:void(0)" >`自动被添加上了target属性
说到点击a标签不跳转，上网查了一下资料，共有这几个方法，这里简单说一下
* 1.`<a href="javascript:void(0);"></a> `（不会刷新页面，yilia主题中主要使用的这种方法）
* 2.`<a href="javascript:;"></a>`（与上面的方法类似）
* 3.`<a href="" οnclick="return false;"></a>`（会刷新页面）
* 4.`<a href="#" οnclick="return false;"></a>`（可能会刷新页面）

### 更多说明
* 1.javascript:void(0)不建议使用
* 2.链接（href）直接使用javascript:void(0)在IE中可能会引起一些问题，比如：造成gif动画停止播放等，所以，最安全的办法还 是使用“####”。为防止点击链接后跳转到页首，onclick事件return false即可，a这个标签的执行顺序应该是先执行onclick的脚本，最后才进行href参数指定页面的跳转。在onclick中返回false，就可以中止a标签的工作流程，也就是不让页面跳转到href参数指定的页面。 
* 3.如果仅仅是想鼠标移过，变成手形，可以使用 
`<span style="cursor:pointer" οnclick="jsFun()">手型!</span>`

hexo4.0版本中，ejs文件中出现`href="javascript:void(0);`和`href="javascript:;`的标签，如果你没有添加`target`属性，hexo合成网页时hexo4.0版本会自动给你添加上
hexo3版本中显示`<a href="javascript:void(0);"></a> `
hexo4.0版本显示`<a href="javascript:void(0);" target="_blank" rel="noopener"></a> `
自动添加了`target="_blank" rel="noopener"`属性，ie浏览器还好，点击这样的a标签，页面没有跳转
但是谷歌浏览器，点击这样的a标签，直接跳转到了一个新页面`about:blank#blocked`，页面空白
很显然hexo4.0版本对`href="javascript:void(0);`和`href="javascript:;`很不友好，遇到这样的href自动添加属性，具有点击事件的a标签，被添加上了页面跳转（这个问题只涉及到ejs文件，不涉及js）
yilia主题已经入坑，如果你的主题ejs文件中a标签也是用这种方法禁止跳转，那你就要注意了，不要轻易更新hexo4.0版本
这里简单提供一个解决方法
### 解决方法
遇到这种问题的a标签，一般都具有点击事件。尝试删除`href="javascript:void(0);`和`href="javascript:;`，问题可以解决，但是鼠标悬停在a标签上并没有变成手型
所以只需要将href属性改为手型`style="cursor:pointer"`属性即可
到此问题解决
## 对url的编码更为严谨encodeURI()
之前对`window.location.pathname`获得的url使用了此函数，现在对`getAttribute("href")`获得的url也使用了此函数
想要不被编码，只能运用解码函数decodeURI()
在文章[yilia主题常见问题及解决办法](https://akbcd.github.io/2019/06/27/yilia主题常见问题及解决办法/#3-随笔a标签点击后样式不改变（移动端）)中有相关介绍
***
以下链接为hexo4.0官方文档
[Hexo 4.0.0 Released](https://hexo.io/news/2019/10/14/hexo-4-released/)