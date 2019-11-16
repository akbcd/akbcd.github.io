---
title: js与jquery的相互转换
date: 2019-11-16 22:10:11
tags: html
---
之前上课老师有说过这两个对象相互转换，最近我在项目调试中遇到了这种需求，这里记录学习一下
<!--more-->
## js对象转jq
这是一个js对象
var js = document.getElementById("js");
转为jq对象
$(js)
## jq对象转js
语法：`jq对象[索引]` 或者 `jq对象.get(索引)`
这是一个jq对象
var jq = $("#jq");
转为js对象
方法一：
`jq[0]`
方法二：
`jq.get(0)`
## 例子
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="jquery-3.3.1.min.js"></script>
</head>
<body>
<div id="d1">想问沙漠借一个红线</div>
<div id="d2">缝件披风为你御寒</div>

<script type="text/javascript">
    // 1.用js获得html里面所有div对象
    var jsdiv = document.getElementsByTagName("div");
    //2 让其内容全部修改为 用丝绸去润泽你的肌肤
    for (var i=0;i<jsdiv.length;i++){
        jsdiv[i].innerHTML="用丝绸去润泽你的肌肤";
        // js转为jq进行修改
        // js转为jq语法：$(js对象)
        $(jsdiv[i]).html("我就在火炉边为你取暖");
        // 内容即修改为 我就在火炉边为你取暖
    }

    // 通过jq的方法获得div元素
    // 内容全修改为 想问姻缘借一根红线
    var jqdiv = $("div");
    jqdiv.html("想问姻缘借一根红线");

    // jq转js
    // 语法：jq对象[索引] 或者 jq对象.get[索引]
    // 全部修改为深埋生命血脉相连
    jqdiv[0].innerHTML="深埋生命血脉相连";
    jqdiv[1].innerHTML="深埋生命血脉相连";

</script>
</body>
</html>
```