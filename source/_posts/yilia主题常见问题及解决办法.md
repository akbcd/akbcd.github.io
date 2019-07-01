---
title: yilia主题常见问题及解决办法
date: 2019-06-27 21:45:30
tags: 博客
---
这个主题本身挺好的，可是也有一些问题。
以下内容为自己发现的问题及解决办法(作者很长时间不更新主题了，所以有问题就要自己动手解决)
<!--more-->
### 1.主题首页，第一页的底部，出现了Prev选项
![](1.png)
***
明明没有上一页，为什么要有这个没用的选项。
最后一页也有同样的问题
***
![](2.png)
***
我的想法是直接把这个选项删除
**解决方法**
- 主题文件进入`themes\yilia\layout\_partial`,找到`script.ejs`文件，打开用编译器寻找
`if(t&&!document.querySelector("#page-nav .extend.prev")&&(t.innerHTML='<a class="extend prev disabled" rel="prev">&laquo; Prev</a>'+t.innerHTML),t&&!document.querySelector("#page-nav .extend.next")&&(t.innerHTML=t.innerHTML+'<a class="extend next disabled" rel="next">Next &raquo;</a>')`
***
![](3.png)
***
- 把这段代码删除，或者把`&laquo; Prev`和`Next &raquo;`删除
***
![](4.png)
***
- 删除后效果
***
![](5.png)
***
### 2.语言配置问题
查了各种资料，hexo博客修改语言，做了很多尝试，都不好使。既然是国人写的，为什么默认上一页和下一页是英文，反正我是看不惯。网上修改主题语言可能对别的主题有效，但是对yilia主题一点效果也没有。
**解决方法（将上一页和下一页改为中文）**
- 在主题文件中用编译器查找`&laquo; Prev`和`Next &raquo;`，然后将所有的`Prev`修改为上一页，`Next`修改为下一页（好多文件中都有这几个标签）
### 3.随笔a标签点击后样式不改变（移动端）
- 从github网站cloning最新的yilia主题，配置成功后，应该还记得两个a标签：主页、随笔
- 主页还好，你点击后，进入相应的页面，主页a标签的样式变了，但是当你点随笔的时候，进入相应的页面后，随笔a标签样式没有变。这个问题困惑了我很久，最开始以为，只有主页的样式能变，但是我错了，作者的那个博客，里面有相册这个标签，它的样式是可以变的，还有所有文章(有的起名为归档 `所有文章: /archives/`)标签，样式也可以变，唯独自己的随笔a标签被点击时，样式没有任何变化。
- 感觉这个是主题作者知道的问题，但是还没有修复，可能不会修复了
- 观察了一下，当你点完标签后，那些标签都被加了一个class属性，值为：active，唯独你随笔标签，它就不加那个class属性，添加class属性的函数找到了一个，不知道是不是，感觉没有什么问题，文件目录`themes\yilia\source-src\js\mobile.js`，重点是修改不起作用
***
![](6.png)
**解决办法**
- 既然tag标签样式不能变，那就都不让变，像pc端那样，加一个手指单击切换样式，不改变样式，在`themes\yilia\source\main.0cf68a.css`中查找`.header-menu li a.active`，把`a.active`改为`a:active`
***
![](7.png)
***
**皇天不负有心人，经过我的多番探索，找到了解决方法**
**问题分析**
- 1.首先，这个是点击a标签后，在a标签上添加了一个class属性：active,然后通过css改变点击后a标签的样式。（添加样式的方法只能是js语句）
- 2.定位文件 在主题文件中用编译器查找`.header-menu li a`，在文件目录`themes\yilia\layout\_partial`找到`script.ejs`文件，你会查询到以下代码(我的代码经过规范化整理，并非在一行显示)
```
function i(t, n) {
        var r = /\/|index.html/g;
        return t.replace(r, "") === n.replace(r, "")
    }
    function o() {
        for (var t = document.querySelectorAll(".js-header-menu li a"), n = window.location.pathname, r = 0, e = t.length; r < e; r++) {
            var o = t[r];
            i(n, o.getAttribute("href")) && (0,
            h.default)(o, "active")
        }
    }
```
- 没错，就是这两个函数，通过`return t.replace(r, "") === n.replace(r, "")`来判断，如果返回值为真，即添加class样式。
- 问题就出现在了`n.replace(r, "")`，用alert语句，当你点随笔时，界面会出现`tags%E9%9A%8F%E7%AC%94`,没错，就是中文乱码问题，添加alert语句`alert(t.replace(r, ""))`，显示`tags随笔`
- 从这你应该看出,当你点随笔时,语句`return t.replace(r, "") === n.replace(r, "")`不可能为真，因此也就不会执行`(0,h.default)(o, "active")`代码，即不会添加active属性。（归档标签为archives,没有中文，所以能添加样式）
**解决方法**
- `n = window.location.pathname`获取url路径，有中文时出现乱码，解决中文乱码问题。中文乱码原因：url中文编译语言问题
- 运用url解码函数`decodeURI()`,将乱码的中文翻译回中文
- 修改**i函数**传参`i(n, o.getAttribute("href"))`,把n改为`decodeURI(n)`
```
function i(t, n) {
        var r = /\/|index.html/g;
        return t.replace(r, "") === n.replace(r, "")
    }
    function o() {
        for (var t = document.querySelectorAll(".js-header-menu li a"), n = window.location.pathname, r = 0, e = t.length; r < e; r++) {
            var o = t[r];
            i(decodeURI(n), o.getAttribute("href")) && (0,
            h.default)(o, "active")
        }
    }
```
- 运用alert语句`alert(n.replace(r, ""))`，界面显示`tags随笔`，到此问题解决
- 在`themes\yilia\source\main.0cf68a.css`中，`.header-menu li a:active`，把`a:active`改回`a,active`,或者添加语句`,.header-menu li a:active`
```
.header-menu li a:active,.header-menu li a.active {
    color: #eaeaea;
    background: #a0a0a0
}
```
- 即保留`.header-menu li a:active`，解释一下为什么要保留，这个是点击事件样式，加上的话效果显示更好
***
### 4.css和js文件中的代码看不懂
css和js代码，在编译器中打开，我也真是无语，代码全部写在一行里，放眼望去，根本看不懂，好在我还是学过前端的人，但是，我看着都很费劲。主题作者，您是为了省空间吗？难道没有行业规范这个词，还是你就是特意这样做的，为的就是不让我们看懂？
观察了一下，代码全部写在一行里，节省了将近一半的空间，但是，我不缺空间。
**解决方法（解决了个别文件）**
本地预览博客，打开浏览器开发人员工具，找到网络（network），然后刷新页面，会下载css和js文件，开发者页面里有预览窗口，这个是多行且规范代码（浏览器自动生成），然后全选复制，粘贴到主题对应的文件里（谷歌浏览器亲测有效）
修改前
***
![](8.png)
***
修改后
***
![](9.png)
***
- 定位文件`themes\yilia\layout\_partial\script.ejs`,这个是ejs文件，ejs是一个JavaScript模板库，用来从JSON数据中生成HTML字符串。里面第一个script标签中有很多js代码，而且写在一行。比较了一下，这里面的js语句与`themes\yilia\source\mobile.992cbe.js`中的语句几乎是一模一样（特地比较了一下，就是把个别参数换了个名字，有的代码简写，本质上根本没变化）。这里我就不太理解了,`script.ejs`写了那么多js代码，为什么不把`mobile.992cbe.js`导入代替script标签中的js代码？这个就同为什么不把css样式直接写在style标签中，而是要link导入一个道理。
- 修改文件`script.ejs`,将`mobile.992cbe.js`导入代替script标签中的js代码，并将第一个script标签和其中的js代码删除（script是双标签）
```
<script src="<%=config.root%>./mobile.992cbe.js"></script>
<script src="<%=config.root%>./main.0cf68a.js"></script>
<script>
    !function(){
        !function(e){
            var t=document.createElement("script");
            document.getElementsByTagName("body")[0].appendChild(t),t.setAttribute("src",e)
        }("<%=config.root%>slider.e37972.js")
    }()
</script>
```
- `<script src="<%=config.root%>./mobile.992cbe.js"></script>`语句用于引入`mobile.992cbe.js`
- 之前在`script.ejs`修改的代码在`mobile.992cbe.js`中再修改一遍，或者，将`script.ejs`中第一个script标签中的js代码去替换`mobile.992cbe.js`中的代码，在最后一句加上一个`;`（其它js文件中代码结尾都有`;`）。
***
### 5.手机浏览器，网页中的代码有兼容问题，当然，电脑端的也有
**先说一下电脑端的问题，个人觉得不需要解决，看以下两张图片**
![](10.png)
***
Microsoft Edge浏览器
***
![](11.png)
***
Google Chrome浏览器
很明显的tag标签样式不兼容，一个是方框，一个是按钮，暂时没找到解决方法，其实没什么影响
**手机端的兼容问题比较严重**
在我的手机自带浏览器中，博客页面往下滑，你会看到一个效果
当顶部主页和随笔标签要滑出屏外时，那两个标签会自动在顶端悬停，看图片（主题作者博客测试 网址：http://litten.me/）
***
![](12.jpg)
***
这个是手机自带浏览器显示的效果，这个动画设计的很好，代码我不会。
有兼容问题的浏览器(Microsoft Edge测试，Google Chrome显示效果相同)
***
![](13.jpg)
***
动画直接没有，那两个标签直接就滑上去了，但是有一个标签下来了，最左边那个多功能标签，没有背景色，白色的字体，不仔细看都看不出来
这个问题起初我以为是我把主题某个配置文件改了导致的，但是作者博客在Chrome浏览器中测试的结果跟我一样，看来不是我以为的问题，而是这个博客的通病。某个动画效果在这几个浏览器中不兼容。整了将近一下午，也没找到解决办法，主要是前端的知识学的不够，现在学java了，前端的知识忘得更多了。
**解决方法（自己研究）**
- 既然有一个标签能下来，有时可能看不见，那就让它可见，添加一个背景色，与上面的颜色相同（因为这个标签是从上面移动下来的，如果颜色不一样，看着很不协调），将背景色改为透明
- 代码修改:`themes\yilia\source\main.0cf68a.css`中查找`.btnctn`，在里面添加一行代码`background: rgba(77, 77, 77, 0.5)`前提是之前没改过上面的背景颜色，如果改过，前三个值改为自己的rgb颜色，如果是十六进制颜色，自行转换，后面的0.5为透明色
***
![](14.png)
***
- 效果如下（图片左上角）
***
![](15.png)
***
- 按钮加了一个背景色，背景色透明，让人能够清晰地看到那个按钮（个人觉得不是很好看），在动画不生效的手机浏览器中这样显示，生效的浏览器会显示生效的动画页面
**皇天不负有心人，经过我的多番探索，找到了解决方法**
**问题分析**
- 既然是代码兼容问题，就要先找到执行此动画的代码，也是js代码
- 因为是a标签悬停，所以要找到a标签样式属性。在浏览器控制台可以看到`class="header-menu js-header-menu"`,开发者对代码的规范性还是有的，用到js的样式，都有js标注。
- 定位文件。在主题中，用编译器查找`js-header-menu`，如果你照着我之前将`mobile.992cbe.js`导入代替`script.ejs`中第一个script标签中的js代码，那么会在`mobile.992cbe.js`中找到如下代码,如果没有照做，代码应该在`script.ejs`文件中
***
![](16.png)
***
- 这个函数与上面的函数关联
***
![](17.png)
***
- 问题就出现在了这几个函数上了。通过使用alert语句，查询出了端倪。
***
![](16.png)
***
- 这个函数中
```
function a() {
        var t = document.querySelector(".js-overlay")
            , n = document.querySelector(".js-header-menu")
            , sTop=document.body.scrollTop+document.documentElement.scrollTop;
        f(t, document.body.scrollTop, -63, 2, 0),
        f(n, document.body.scrollTop, 1, 3, 0)
    }
```
- `document.body.scrollTop`的值始终为0，导致了上面对应的函数
```
function f(t, n, r, e, i) {
        var o = u(t)
            , f = c(t) - n;
        if (f - r <= i) {
            var a = t.$newDom;
            a || (a = t.cloneNode(!0),
            (0,
            d.default)(t, a),
            t.$newDom = a,
            a.style.position = "fixed",
            a.style.top = (r || f) + "px",
            a.style.left = o + "px",
            a.style.zIndex = e || 2,
            a.style.width = "100%",
            a.style.color = "#fff"),
            a.style.visibility = "visible",
            t.style.visibility = "hidden"
        } else {
            t.style.visibility = "visible";
            var s = t.$newDom;
            s && (s.style.visibility = "hidden")
        }
    }
```
- `if (f - r <= i)`的判定始终为false，从而执行else语句，导致没有了那个动画效果
- 相关代码（可自行分析）
```
function u(t) {
        for (var n = t.offsetLeft, r = t.offsetParent; null !== r; )
            n += r.offsetLeft,
            r = r.offsetParent;
        return n
    }
    function c(t) {
        for (var n = t.offsetTop, r = t.offsetParent; null !== r; )
            n += r.offsetTop,
            r = r.offsetParent;
        return n
    }
    function f(t, n, r, e, i) {
        var o = u(t)
            , f = c(t) - n;
        if (f - r <= i) {
            var a = t.$newDom;
            a || (a = t.cloneNode(!0),
            (0,
            d.default)(t, a),
            t.$newDom = a,
            a.style.position = "fixed",
            a.style.top = (r || f) + "px",
            a.style.left = o + "px",
            a.style.zIndex = e || 2,
            a.style.width = "100%",
            a.style.color = "#fff"),
            a.style.visibility = "visible",
            t.style.visibility = "hidden"
        } else {
            t.style.visibility = "visible";
            var s = t.$newDom;
            s && (s.style.visibility = "hidden")
        }
    }
    function a() {
        var t = document.querySelector(".js-overlay")
            , n = document.querySelector(".js-header-menu")
            , sTop=document.body.scrollTop+document.documentElement.scrollTop;
        f(t, document.body.scrollTop, -63, 2, 0),
        f(n, document.body.scrollTop, 1, 3, 0)
    }
```
**解决方法**
- `document.body.scrollTop`的值始终为0，那就查询一下这段代码是什么意思
>获取当前页面滚动条纵坐标的位置：document.body.scrollTop与document.documentElement.scrollTop
获取当前页面滚动条横坐标的位置：document.body.scrollLeft与document.documentElement.scrollLeft
1.各浏览器下 scrollTop的差异:
IE6/7/8：
可以使用 document.documentElement.scrollTop； 
IE9及以上：
可以使用window.pageYOffset或者document.documentElement.scrollTop 
Safari: 
safari： window.pageYOffset 与document.body.scrollTop都可以； 
Firefox: 
火狐等等相对标准些的浏览器就省心多了，直接用window.pageYOffset 或者 document.documentElement.scrollTop ；
Chrome：
谷歌浏览器只认识document.body.scrollTop;
注：标准浏览器是只认识documentElement.scrollTop的，但chrome虽然我感觉比firefox还标准，但却不认识这个，在有文档声明时，chrome也只认识document.body.scrollTop.
由于在不同情况下，document.body.scrollTop与document.documentElement.scrollTop都有可能取不到值，那到底网页的scrollTop值怎么得到呢？难道又要用JavaScript进行判断？
其实不必。因为document.body.scrollTop与document.documentElement.scrollTop两者有个特点，就是同时只会有一个值生效。比如document.body.scrollTop能取到值的时候，document.documentElement.scrollTop就会始终为0；反之亦然。所以，如果要得到网页的真正的scrollTop值，如果不考虑safari，可以这样：
var sTop=document.body.scrollTop+document.documentElement.scrollTop;
这两个值总会有一个恒为0，所以不用担心会对真正的scrollTop造成影响。一点小技巧，但很实用。
***
- 这个介绍中，明确说了`document.body.scrollTop`在不同浏览器上的不同情况，的确有兼容问题。而且文章中说**谷歌浏览器只认识document.body.scrollTop**，但是我就是在谷歌浏览器上测试效果的，很显然谷歌是不认`document.body.scrollTop`的，因为值始终为0。文章中有提到**因为document.body.scrollTop与document.documentElement.scrollTop两者有个特点，就是同时只会有一个值生效。比如document.body.scrollTop能取到值的时候，document.documentElement.scrollTop就会始终为0；反之亦然。**所以运用文章中的方法`var sTop=document.body.scrollTop+document.documentElement.scrollTop;`测试，方法的确有效，alert后，那个值不为0了
- 代码修改如下：
```
function a() {
        var t = document.querySelector(".js-overlay")
            , n = document.querySelector(".js-header-menu")
            , sTop=document.body.scrollTop+document.documentElement.scrollTop;
        f(t, sTop, -63, 2, 0),
        f(n, sTop, 1, 3, 0)
    }
```
- 声明一个sTop变量，`var sTop=document.body.scrollTop+document.documentElement.scrollTop;`，将这个变量传到**f函数**中，在浏览器上测试出现了效果。（js效果实现）
***
![](18.png)
***
- 补充：个人觉得作者开发这个效果其实是省去了回到顶端按钮的实现，因为那几个悬停在顶部的a标签就是回到顶部后所拥有的标签，而且效果很好，看着也很舒服
- 回到上面**解决方法（自己研究）**，将按钮添加背景色属性删除（效果实现后，这段代码很显然是用不到了）
### 6.yilia主题分享的一些问题
接着上面的效果实现，发现了一个问题。手机端进入到某个文章，上面的那几个a标签有时不能点击。电脑浏览器控制台发现，在那几个a标签上隐藏了一个微信分享的div标签（里面有微信分享二维码），虽然看不到，但是它却在那几个a标签的上面。看了一下开发者的博客，标签没有在那个地方隐藏，而是真正的隐藏。这个让我很困惑。
折腾了几次，找到了问题。如果微信分享二维码存在（即图片路径有效），那么微信分享的div标签即真正隐藏，如果无效，那它就会在顶部的那几个a标签上面隐藏，而使你不能点击那几个a标签
**解决方法**
在主题配置文件中关闭分享（我认为分享这个功能没有什么用，想分享直接把url地址分享出去就可以了）或者给微信分享的那个图片添加地址路径
***
**主题的开发者好久没有更新主题了，有什么问题就要自己动手解决**
***
以下内容为一个补充
想必大家有用hexo引用本地图片的吧
遇到如下情况解决方法
修改本地引用的图片，名字没有变，但是图片改了，浏览器预览后发现图片没有改，这时需要在git中输入
- `hexo clean`
之后再运行
- `hexo g -d`
完事后，图片就换了