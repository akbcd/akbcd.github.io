---
title: html复习
date: 2019-05-15 21:48:40
tags: html
---
### 编译器快捷键
ctrl+s保存 ctrl+c复制 ctrl+v粘贴 ctrl+z上一步 ctrl+y下一步
`<!DOCTYPE HTML>`文档的声明，浏览器按W3C标准解析网页
`<html> </html>`跟标签 `<meta charset="utf-8">`指定文件标准
编码的种类
gb2312/gbk/ANSIC 国标 uft-8 国际通用标准
<!--more-->
```
<title></title>
<body></body>
```
html4.01 html5正式版
1.h标签 h1~h6默认加粗，h1只能用一次，权重最高
2.p标签 用于显示文章的段落
3.div标签 用于模式布局，使用频率最高
单标签 img用于显示图片
`<img src="图片路径" alt="替换文本" width="宽度" height="高度">`
注：图片名称最好不要出现中文
css样式表：又名层叠样式，通过css来修饰标签样式
```
<style>
    h3{
        color: red;
    }
</style>
```
内部css样式表
color:颜色 font-size:表示文字大小，单位px：像素单位
font-weight:文字是否加粗  blod 加粗 normal 正常(多适用于h标签)
font-family:"微软雅黑" 文字宋体，还可用于"宋体"
text-align:表示文字的对齐方式 left 左对齐（默认） center 居中 right 右对齐
width:容器的宽度（适用于div标签） 单位px或百分比
margin:0 auto div标签居中 容器水平方向居中
text-indent:表示首行文字的缩进 单位 em：表示一个字符的大小
例：text-indent:2em
line-height:行高（可理解为行间距） 特点：文本会在行高中自动垂直居中 单位：px
letter-spacing:字符之间距离 px
font-style:文本的标识 italic 倾斜 narmal 正常显示（默认）
text-decoration:文本的修饰 none 表示去掉所有的修饰符如：下划线 underline 加下划线 主要适用于 a标签
a标签（超链接）
`<a href="页面地址" title="提示文字" target="打开方式">中间内容</a>` target:_blank 在新页面打开，默认原页面跳转
伪类选择器
```
a:hover{

}
```
注：文本路径要用相对路径
代码注释：选中相应的代码，`ctrl+/`，即可注释
css:`/*被注释的css*/`
html:`<!--被注释的html代码-->`
class选择器
```
<style>
    .aaa{

    }
</style>
<div class="aaa">
```
注："aaa"可换
特点：根据元素的class属性来查找元素 好处：可以区分相同元素的不同样式
列表结构
ul>li 双标签 无序列表
ol>li 双标签 有序列表
dl>dd/dt 双标签 定义列表/描述列表
列表结构 css样式 
list-style:列表风格 none 去掉小黑点（去掉li标签的默认修饰符）
选择器结构
写法：选择器1 选择器2 选择器3 {...} 空格表示“的”的意思
防止各模式样式冲突 通常以模块的根节点作为结构选择器的第一级选择器 通常都是class选择器
```
<style>
    .aaa{

    }
    #.list{

    }
</style>
<div class="aaa"></div>
<div id="list"></div>
```
`#`是id选择器
选择器优先级
行间样式 权重：1000>id选择器 权重：100>class选择器 权重：10>标签选择器 权重：1>通配符选择器
不要写行间样式，不要用id选择器(推荐)
***
边框样式（div标签）
border: 5px soild red 粗细 样式 颜色
soild实线 dashed虚线 dotted点划线
border可以分开指定 border-();()可以是top 即border-top；上边框  left左边框  right右边框  bottom下边框
背景 background
background-color:背景颜色 background-image:背景图片 url(图片路径)
background-repeat:背景图平铺（重复） no-repeat repeat-x repeat-y
background-position:背景位置 x轴方向 y轴方向
（1）英文： center left right bottom top
（2）数字： x y =>起始点 0 0
（3）数字+中文
（4）一个值时，第二个默认是center
简写：
background: red url() 0px center no-repeat
盒子
margin外边距 px
1个值 4个方向  2个值 上下 左右  3个值 上 左右下  4个值 顺时针方向 上右下左
可以分开写
margin-();
内边距 padding px
同外边距
***
**块元素**：独占一行的元素
div、h、p、ul、li、ol、dl、dd
p标签不能嵌套任何标签，其余可以嵌套
**行内元素**：不会独占一行 a span标签
可嵌套任何标签
img：行内块元素 本质上是行内元素 但支持宽和高样式
元素之间转换
display:inline 转行内 block 转块元素 inline-block 转行内块
***
浮动
float: left(right);左（右）浮动  解决块元素在一行显示
停止条件：
（1）父元素的边缘
（2）其他的浮动元素
浮动过程中，宽度不够会挤下来
清除浮动
```
<div class="clear"></div>
.class{
    clear: both;
}
```
清除浮动带来的影响，就像一个挡板一样
```
.clearfix:after{
    display: block;
    content: ' ';
    clear: both;
}
```