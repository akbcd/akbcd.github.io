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
```js
var copyButton=document.querySelectorAll(".code #js-btn-copy");
for(var i in copyButton){
    copyButton[i].onclick=function(button){}
}
```
如果想把onclick绑定的函数单独定义一个方法为button()，则
```js
function button(){};
var copyButton=document.querySelectorAll(".code #js-btn-copy");
for(var i in copyButton){
    copyButton[i].onclick=button;
}
```
`copyButton[i].onclick=button;`这里等于的是button而不是button()，如果直接在html标签里面添加onclick事件，是`onclick="button()"`。
2. `$(ele).html(value)`
js实现：`ele.innerHTML=value`
3. `$(ele).mouseout(function(){})`
js：`ele.onmouseout=function(){}`
对应的，jq的`$(ele).mouseover(function(){})`也是这样实现
4. `$('.toc-child').hide();`
这个可以用js封装函数实现
```js
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
```js
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
6. `$('body,html').animate({scrollTop: scrollOffset.top-50},1000);`
题目是jq封装的一个锚点跳转方法，也就是页面平滑滚动，这里分享一个js封装的方法，功能大致相同
```js
// 页面平滑滚动
var timer=null;
function slideTo(targetPageY,element){
    if(timer){
      clearInterval(timer);
    }
    timer=setInterval(function(){
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
传入两个参数targetPageY,element，其中：
targetPageY：滚动位置
element：滚动条所在容器
支持向上向下滚动，速度调节speed
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
```js
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
```js
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
12. js中querySelector()与querySelectorAll()方法
    * querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。用法与$()获取元素相同，但是只返回一个元素。
    实例
    ```js
    //获取文档中 id="demo" 的元素：
    document.querySelector("#demo");
    ```
    document可以更换为已经获取的元素
    实例
    ```js
    //获取文档中 id='header'的元素
    var $header=document.getElementById('header');
    //在获取的id='header'元素中获取class="example" 的第一个元素:
    var $example=$header.querySelector(".example");
    ```
    确保$header已经获取到元素，否则控制台报错：
    `Cannot read property 'querySelector' of undefined`
    如果不确定$header是否获取到元素，防止控制台报错，建议直接使用
    `document.querySelector("#header .example")`
    * querySelectorAll() 方法返回文档中匹配指定 CSS 选择器的所有元素，返回 NodeList 对象。
    简言之，querySelectorAll() 方法返回的是一个数组，使用时需要对其遍历，遍历方法参考1。
    querySelectorAll() 方法与getElementsByClassName() 方法返回的数据均为数组，不同在于querySelectorAll()支持jquery选择器，与querySelector()使用方法相同
    实例
    ```js
    //获取文档中 id="demo" 的元素：
    document.querySelectorAll("#demo")[0];
    ```
    document可以更换为已经获取的元素，需要注意的点与querySelector() 方法相同。

最后，截至目前，本主题只剩1个功能还需要jquery，这个有点难度。