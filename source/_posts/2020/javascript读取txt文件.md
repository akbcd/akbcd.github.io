---
title: javascript读取txt文件
date: 2020-04-18 14:59:12
tags: js
---
以下代码实现javascript读取txt文件打印到浏览器中
```js
function load(name) {    
    let xhr = new XMLHttpRequest(),        
    okStatus = document.location.protocol === "file:" ? 0 : 200;    
    xhr.open('GET', name, false);    
    xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8    
    xhr.send(null);    
    return xhr.status === okStatus ? xhr.responseText : null;
}
let text = load("文件名.txt");
console.log(text);  //输出到浏览器控制器中 
//document.write(text);  //打印在网页中 
//document.write("<pre>"+text+"<pre/>")//解决txt的换行无法打印到网页上的问题
```

<div>
<button onclick="show()">预览</button>&emsp;&emsp;<a href="https://cdn.jsdelivr.net/gh/akbcd/akbcd.github.io@hexo/source/_posts/javascript读取txt文件/tv.txt" target="_blank">下载</a>
<figure class="highlight plain" >
<table><tbody><tr>
<td class="code">
<pre id="show"></pre>
</td>
</tr></tbody></table>
</figure>
<script type="text/javascript">
//读取txt文件
function load(name) {    
    let xhr = new XMLHttpRequest(),        
    okStatus = document.location.protocol === "file:" ? 0 : 200;    
    xhr.open('GET', name, false);    
    xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8    
    xhr.send(null);    
    return xhr.status === okStatus ? xhr.responseText : null;
}
function show(){
    let text = load("tv.txt");
    //console.log(text);  //输出到浏览器控制器中 
    //document.write(text);  //打印在网页中 
    //document.write("<pre>"+text+"<pre/>")//解决txt的换行无法打印到网页上的问题
    document.getElementById("show").innerHTML=text;
}
</script>
</div>