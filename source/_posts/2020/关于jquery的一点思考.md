---
title: 关于jquery的一点思考
date: 2020-12-08 10:25:44
updated: 2022-08-28
tags: 随笔
---
不知不觉已经到了2020年，距离jquery第一个版本（2006年）面世已经14年。
<!--more-->
>2006年，jQuery的第一个版本的面世，凭借着简洁、灵活的编程风格受到了开发者的喜爱。而它本身是一个 JavaScript 框架，它的设计的宗旨是“write Less，Do More”，即倡导写更少的代码，做更多的事情。它封装了 JavaScript 常用的功能代码，提供一种简便的 JavaScript 设计模式，优化 HTML 文档操作、事件处理、动画设计和 Ajax 交互。

2018年，GitHub改版并放弃了 jQuery ！Github 前端团队的 Mislav Marohnić 在 Twitter 发布了一则消息，表明在 GitHub 网站重构过程中放弃了 jQuery，没有再次使用其他任何框架去代替它，而是使用了原生的 JS，具体实现：
* 使用 querySelectorAll 来查询 DOM 节点；
* 使用 fetch 来代替 ajax；
* 事件处理使用了事件代理；
* 使用 DOM 标准化写了 polyfill；
* 使用了自定义元素。

去jquery化是不是从这时开始，我不知道，但是这对于GitHub来说，绝对是一件可以载入公司史册的大事。

前段时间，浏览了 hexo-theme-butterfly主题 ，发现最近作者正在为自己开发的主题去jquery，加上之前也听过去jquery的相关信息，引发了自己的一些思考。

关于yilia主题

虽然yilia主题的开发者已经不再更新yilia主题，但是自始至终作者也没有使用jquery。自己给yilia主题第一次加上jquery时，是添加全局搜索功能。自从引入了jquery，感觉自己已经依赖上了jquery，很多可以用原生js实现的代码，直接使用jquery实现。直到看到 hexo-theme-butterfly主题 作者正在去jquery，让我的想法发生了改变。回想起yilia主题，发现自己是否已经抛弃yilia主题开发者明确说明不兼容IE浏览器的初衷，难道不再使用jquery，转而投身到原生js已经是大势所趋？
可能有的人不会这么认为，可以说，我在写这篇文章前，还不这么认为。
种种迹象可能已经明确表明，随着时间的流逝，原生js方法对浏览器的兼容性已经不再是问题，新的原生js方法可以完美替代jquery所提供的方法。就像github改版不再使用jquery所说的那样，原生js已经可以实现jquery所实现的功能，不再依赖jquery。

思考

去jquery，是不是应该开始进行？
对于yilia主题，里面后加的功能，可以用原生js实现的功能，不会再用jquery实现。随着自己知识的积累，早晚要把jquery移出去。
jquery使用方便，相信不久的将来，原生js也会很方便。

参考文献
[GitHub：为什么我们最终选择放弃了 jQuery](https://blog.csdn.net/csdnnews/article/details/82783675)

最后

进行了一段时间，目前主题依然依赖jquery的功能有：
1.本地全局搜索
2.目录优化
3.代码块复制

加油！
**20220828更新：主题已经移除jquery**