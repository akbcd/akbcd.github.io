---
title: js实现页面刷新后滚动条不改变位置
date: 2020-11-13 15:13:13
tags: [html,js]
---
最近浏览原神米游社，发现页面重新进入后页面浏览位置没有改变，上网查询了一些资料，在自己博客主题上实现了这个功能，在此分享一下
<!--more-->
在网上查询的资料中得知，此功能可以通过js实现，在页面关闭或刷新时，调用window.onbeforeunload函数将当前页面滚动条的滚动高度存储在当前页面的cookie中，页面载入时，读取当前页面cookie中存储的滚动条高度，跳转到对应的位置，以下是源码
```js
window.onbeforeunload = function(){
    var scrollPos;    
    if (typeof window.pageYOffset != 'undefined') {
        scrollPos = window.pageYOffset;
    }
    else if (typeof document.compatMode != 'undefined' &&
        document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    }
    else if (typeof document.body != 'undefined') {
        scrollPos = document.body.scrollTop;
    }
    document.cookie="scrollTop="+scrollPos; //存储滚动条位置到cookies中
}

window.onload = function()
{ 
    if(document.cookie.match(/scrollTop=([^;]+)(;|$)/)!=null){
        var arr=document.cookie.match(/scrollTop=([^;]+)(;|$)/); //cookies中不为空，则读取滚动条位置
        document.documentElement.scrollTop=parseInt(arr[1]);
        document.body.scrollTop=parseInt(arr[1]);
    }
}
```
由于yilia主题的特殊性（pc页面滚动时window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop均为0），在这里附上自己适配yilia主题的代码
```js
/*
记录文章页面当前位置
*/
if(yiliaConfig.isPost&&yiliaConfig.scrollPos){
  //在即将离开当前页面（刷新或关闭）时触发
  window.onbeforeunload = function(){
    var scrollPos=$('#container').scrollTop() || document.documentElement.scrollTop || document.body.scrollTop;
    document.cookie="scrollTop="+scrollPos; //存储滚动条位置到cookies中
  }
  //在离在开网页时（点击链接，刷新页面，关闭浏览器等）触发
  window.onpagehide = function(){
    var scrollPos=$('#container').scrollTop() || document.documentElement.scrollTop || document.body.scrollTop;
    document.cookie="scrollTop="+scrollPos; //存储滚动条位置到cookies中
  }
  $(document).ready(function(){
    if(document.cookie.match(/scrollTop=([^;]+)(;|$)/)!=null){
        var arr=document.cookie.match(/scrollTop=([^;]+)(;|$)/); //cookies中不为空，则读取滚动条位置
        $('#container').scrollTop(parseInt(arr[1]));
        document.documentElement.scrollTop=parseInt(arr[1]);
        document.body.scrollTop=parseInt(arr[1]);
    }
  })
}
```
其中，yiliaConfig.isPost判断当前页面是否为文章页，yiliaConfig.scrollPos为自添加属性，判断是否开启此功能。
因为window.onpagehide在mobile端浏览器存在不被触发的情况，所以添加window.onpagehide事件，解决大部分情况，事件区别可自行到相关网站查询。