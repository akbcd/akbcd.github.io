---
title: yilia主题目录优化
date: 2020-06-08 16:12:46
tags: 博客
toc: true
---
记得之前在[yilia主题常见问题及解决办法下](https://akbcd.github.io/2019/06/28/yilia主题常见问题及解决办法下/)文章中解决了移动端不显示目录的问题
这篇文章分享一下自己优化yilia主题目录的代码，主要体现在以下几个方面：
1.通过jquery封装的animate()锚点跳转方法替换主题自带的a标签跳转，解决添加aplayer播放器可能出现的锚点跳转失效问题
2.实现浏览器根据当前页面位置实时更新页面url（需手动设置生效）<!--more-->
3.目录随着页面位置滚动，实现动态目录
效果参看本博客
## 参考资料
参考[hexo-theme-butterfly主题](https://github.com/jerryc127/hexo-theme-butterfly)实现动态目录功能，在此表示感谢
因为主题目录布局不同，没有在yilia主题目录上实现页面当前位置百分比（你已经读了%）
感觉没有必要，因为yilia主题的目录是鼠标悬停显示的，不同于其它主题那样固定在页面的某个位置，显示页面当前所在目录位置很有必要
## 代码实现
此代码基于jquery实现
```js
/*
toc目录优化，jq实现锚点跳转
*/
// 隐藏子目录
$('.toc-child').hide()
// 目录锚点跳转
$('.toc-link').on('click', function (e) {
    e.preventDefault()
    toToc($(this).attr('href'))
})
function toToc (name) {
  //pc锚点跳转
  var scrollPositionTop = $(name).position().top+50
  $('#container').animate({
    scrollTop: scrollPositionTop
  },1000)
  //mobile锚点跳转
  var scrollOffset = $(name).offset()
  $('body,html').animate({
    scrollTop: scrollOffset.top-50
  })
};
// 更新锚点url
var isanchor = yiliaConfig.anchor
var updateAnchor = function (anchor) {
  if (window.history.replaceState && anchor !== window.location.hash) {
    window.history.replaceState(undefined, undefined, anchor)
  }
}
// 显示子目录
var expandToc = function ($item) {
  if ($item.is(':visible')) {
    return
  }
  $item.fadeIn(400)
}
// 目录滚动
var autoScrollToc = function () {
  if ($('.toc-link').hasClass('active')) {
    var activePosition = $('.active').position().top
    var articleScrolltop = $('.tooltip-content .toc-article').scrollTop()
    if (activePosition > $('.tooltip-content .toc-article').height()-50) {
      $('.tooltip-content .toc-article').scrollTop(articleScrolltop + 100)
    }
    if (activePosition < 50) {
      $('.tooltip-content .toc-article').scrollTop(articleScrolltop - 100)
    }
  }
}
// pc动态目录
$('#container').scroll(function() {
  var currentTop = $(this).scrollTop()
  findPcHeadPosition(currentTop)
  autoScrollToc()
})
// find head position & add active class
// DOM Hierarchy:
// ol.toc > (li.toc-item, ...)
// li.toc-item > (a.toc-link, ol.toc-child > (li.toc-item, ...))
var findPcHeadPosition = function (top) {
// assume that we are not in the post page if no TOC link be found,
// thus no need to update the status
  if ($('.toc-link').length === 0) {
    return false
  }
  var list = $('.article-entry').find('h1,h2,h3,h4,h5,h6')
  var currentId = ''
  list.each(function () {
    var head = $(this)
    if (top > head.position().top) {
      currentId = '#' + $(this).attr('id')
    }
  })

  if (currentId === '') {
    $('.toc-link').removeClass('active')
    $('.toc-child').hide()
  }

  var currentActive = $('.toc-link.active')
  if (currentId && currentActive.attr('href') !== currentId) {
    if (isanchor) updateAnchor(currentId)

    $('.toc-link').removeClass('active')

    var _this = $('.toc-link[href="' + currentId + '"]')
    _this.addClass('active')

    var parents = _this.parents('.toc-child')
    // Returned list is in reverse order of the DOM elements
    // Thus `parents.last()` is the outermost .toc-child container
    // i.e. list of subsections
    var topLink = (parents.length > 0) ? parents.last() : _this
    expandToc(topLink.closest('.toc-item').find('.toc-child'))
    topLink
    // Find all top-level .toc-item containers, i.e. sections
    // excluding the currently active one
    .closest('.toc-item').siblings('.toc-item')
    // Hide their respective list of subsections
    .find('.toc-child').hide()
  }
}
// mobile动态目录
$(window).scroll(function() {
  var currentTop = $(this).scrollTop()||document.documentElement.scrollTop
  findMobileHeadPosition(currentTop+50)
  autoScrollToc()
})
var findMobileHeadPosition = function (top) {
// assume that we are not in the post page if no TOC link be found,
// thus no need to update the status
  if ($('.toc-link').length === 0) {
    return false
  }
  var list = $('.article-entry').find('h1,h2,h3,h4,h5,h6')
  var currentId = ''
  list.each(function () {
    var head = $(this)
    if (top > head.offset().top-25) {
      currentId = '#' + $(this).attr('id')
    }
  })

  if (currentId === '') {
    $('.toc-link').removeClass('active')
    $('.toc-child').hide()
  }

  var currentActive = $('.toc-link.active')
  if (currentId && currentActive.attr('href') !== currentId) {
    if (isanchor) updateAnchor(currentId)

    $('.toc-link').removeClass('active')

    var _this = $('.toc-link[href="' + currentId + '"]')
    _this.addClass('active')

    var parents = _this.parents('.toc-child')
    // Returned list is in reverse order of the DOM elements
    // Thus `parents.last()` is the outermost .toc-child container
    // i.e. list of subsections
    var topLink = (parents.length > 0) ? parents.last() : _this
    expandToc(topLink.closest('.toc-item').find('.toc-child'))
    topLink
    // Find all top-level .toc-item containers, i.e. sections
    // excluding the currently active one
    .closest('.toc-item').siblings('.toc-item')
    // Hide their respective list of subsections
    .find('.toc-child').hide()
  }
}
```
以上代码是基于yilia主题优化的，在其他主题使用可能不生效
在`yilia\layout\_partial\after-footer.ejs`文件中的`yiliaConfig`变量中添加`anchor`获取主题配置文件中`anchor`的值
```
anchor: <%=theme.anchor%>
```
## 主题配置
在主题的script.ejs文件中创建一个script标签，将上面的代码粘贴到script标签中即可
主题配置文件中（`_config.yml`）添加如下配置，实现浏览器根据当前页面位置实时更新页面url：
```
# anchor 目录锚点url
# 当您在文章中滚动时，URL将根据标头ID进行更新。
anchor: true
```
切记在`yiliaConfig`变量中添加`anchor`
既然实现动态目录，自然要对动态目录添加一些样式，在主题的css文件中添加相应样式：
```css
/* 动态目录 */
.toc-container.tooltip-left .tooltip-east .tooltip-content .active {
    font-weight: bold;
    color: red;
}
```
将当前目录加粗，并且显示为红色进行区分，根据自己需要更改