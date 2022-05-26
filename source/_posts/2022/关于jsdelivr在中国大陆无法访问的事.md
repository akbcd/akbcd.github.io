---
title: 关于jsdelivr在中国大陆无法访问的事
date: 2022-05-25 20:29:32
tags: 随笔
---
jsdelivr在中国大陆遭到dns污染，虽然现在只是`cdn.jsdelivr.net`正在遭到污染，但是不解决根本问题，转至jsdelivr其他域名不是最终办法，jsdelivr的其他域名在中国大陆最终也会得到相同的待遇。
<!--more-->
看过一篇文章中写到：
>在这之前有一个同样支持GitHub加速的静态资源库`statically.io`已被SNI阻断，与曾经的jsDelivr唯一的不同便是没有ICP许可证的保护。它走过的路，冥冥中暗示着jsDelivr注定的结局。

是这样没错，从支持加速GitHub的静态资源库开始，这个网站在中国的结局可能已经注定了。

就是因为jsdelivr支持加速GitHub静态资源库而受到了我的关注，也写了好几篇的文章介绍如何在github托管的博客上使用jsdelivr加速。结果就是，自己的博客能用到jsdelivr加速的地方，几乎都用上了，这直接导致在jsdelivr遭到dns污染时，自己的博客几乎无法访问。
1. 如果只是想临时解决问题，可以尝试切换jsdelivr的其他域名。不建议通过切换jsdelivr其他域名解决，速度慢不说，而且容易再次被污染。

>修复 cdn.jsdelivr.net 无法访问的问题
https://github.com/PipecraftNet/jsdelivr-auto-fallback

2. 能切换其他cdn，请切换其他cdn加速，npm的资源，可切换cdn加速，如：unpkg.com
`cdn.jsdelivr.net/npm`=>`unpkg.com`
3. github托管的静态资源，能直接引用就直接引用吧

好啦，本篇文章就这么多，感谢阅读~