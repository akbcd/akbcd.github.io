---
title: 用js原生实现jquery的部分方法（笔记）
date: 2021-01-17 17:25:43
tags: js
---
在这里记录一下自己用原生js实现jquery的部分方法，算是jquery转js吧
持续更新
<!--more-->
1. `$(".code").on("click","#js-btn-copy",function(){})`
标题实现对class的子元素绑定click事件，原生js实现
```
var copyButton=document.querySelectorAll(".code #js-btn-copy");
for(var i in copyButton){
    copyButton[i].onclick=function(button){}
}
```
2. `$(ele).html(value)`
js实现：`ele.innerHTML=value`
3. `$(ele).mouseout(function(){})`
js：`ele.onmouseout=function(){}`
对应的，jq的`$(ele).mouseover(function(){})`也是这样实现
4. `$('.toc-child').hide();`
这个可以用js封装函数实现
```
function tocChild(key,value){
    var $toc_child=document.getElementsByClassName("toc-child");
    for(var i=0;i<$toc_child.length;i++){
      $toc_child[i].style.cssText=key+":"+value;
    }
}
tocChild("display","none")
```
5. `$(name).offset()`
获取offset，js有name.offsetTop和name.offsetLeft方法
分享一个获取元素绝对位置的方法
```
function getElementTop(element){
    var actualTop=element.offsetTop;
    var current=element.offsetParent;
    while(current!==null){
      actualTop+=current.offsetTop;
      current=current.offsetParent;
    }
    return actualTop;
  }
```
jquery中有一个position()方法，这个还没有整清楚如何实现，所以主题中目录优化部分还是没有去除jquery
6. ~`$('body,html').animate({scrollTop: scrollOffset.top-50},1000);`~
~题目是jq封装的一个锚点跳转方法，也就是页面平滑滚动，这里分享一个js封装的方法，功能大致相同~
```
// 页面平滑滚动
function slideTo(targetPageY,element){
    var timer=setInterval(function(){
        //当前高度
        var scrollY=element.scrollTop;
        //剩余距离
        var distance=targetPageY>scrollY?targetPageY-scrollY:scrollY-targetPageY;
        //每时每刻速度
        var speed=Math.ceil(distance/10);
        if(parseInt(targetPageY)==parseInt(scrollY)){
        clearInterval(timer);
        }else{
        element.scrollTop=targetPageY>scrollY?scrollY+speed:scrollY-speed;
        }
    },10)
}
```
~传入两个参数targetPageY,element，其中~
~targetPageY：滚动位置~
~element：滚动条所在容器~
~支持向上向下滚动，速度调节speed，如果被重复调用时，上次没执行完毕，会出现很严重的问题~
7. `$(ele).scrollTop();`
js：`var eleTop =ele.scrollTop;`
8. `$(window).scroll(function() {})`
题目是滚动监听，js实现：`window.addEventListener('scroll', (e) => {})`
jq很多监听之类的函数，都可以通过js的addEventListener实现
9. `$(window).load(function() {});`
同上，添加addEventListener，即：`window.addEventListener("load",function(){})`
`window.addEventListener("load",function(){})`不同于`window.onload=function(){}`
`window.onload=function(){}`只能执行一次，通常不建议使用。
10. jquery中ready方法
js的addEventListener中有一个DOMContentLoaded，实现ready方法，用法同上
`window.addEventListener("DOMContentLoaded",function(){})`
11. jquery中ajax方法
```
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
  }
})
```
原生js中提供了fetch方法
```
fetch(path)
.then(response => response.text())
.then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
.then(data => {
    const datas = [...data.querySelectorAll('entry')].map(function (item) {
        return {
            title: item.querySelector('title').textContent,
            content: item.querySelector('content').textContent,
            url: item.querySelector('url').textContent
        }
    });
})
```
最后，截至目前，本主题只剩1个功能还需要jquery，这个有点难度。