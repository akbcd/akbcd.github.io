/*
open_in_new
新窗口打开链接
*/
if (yiliaConfig.open_in_new) {
  $('.article-title,.article-more-a,.archive-article-date,.archive-article-title').attr('target','_blank')
  if(yiliaConfig.isPost) {
    $('.article-title,.archive-article-date').removeAttr('target')
  }
}

/*
progress bar init
mobile底部进度条
*/
const progressElement = window.document.querySelector('.progress-bar');
if (progressElement) {
  new ScrollProgress((x, y) => {
      progressElement.style.width = y * 100 + '%';
  });
}

/*
toc目录优化，jq实现锚点跳转
*/
// 隐藏子目录
$('.toc-child').hide()
// 目录锚点跳转
$('.toc-link').on('click', function (e) {
    e.preventDefault()
    toToc(decodeURI($(this).attr('href')))
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
  if (currentId && decodeURI(currentActive.attr('href')) !== currentId) {
    if (isanchor) updateAnchor(currentId)

    $('.toc-link').removeClass('active')

    var _this = $('.toc-link[href="' + encodeURI(currentId) + '"]')
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
  if (currentId && decodeURI(currentActive.attr('href')) !== currentId) {
    if (isanchor) updateAnchor(currentId)

    $('.toc-link').removeClass('active')

    var _this = $('.toc-link[href="' + encodeURI(currentId) + '"]')
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

/*
记录文章页面当前位置
*/
if(yiliaConfig.isPost&&yiliaConfig.scrollPos){
  window.onbeforeunload = function(){
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