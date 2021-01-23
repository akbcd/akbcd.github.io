/*
open_in_new
新窗口打开链接
*/
if (yiliaConfig.open_in_new) {
  document.querySelectorAll(".article-title,.article-more-a,.archive-article-date,.archive-article-title").forEach(i=>{i.setAttribute("target", "_blank")});
  if (yiliaConfig.isPost) document.querySelectorAll(".article-title,.archive-article-date").forEach(i=>{i.removeAttribute("target")});
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
var $container=document.getElementById("container");
/*
toc目录优化，jq实现锚点跳转
依赖jquery
*/
if(yiliaConfig.isPost&&typeof(jQuery)!='undefined'){
  //遍历toc-child
  function tocChild(key,value){
    for(var i=0;i<$toc_child.length;i++){
      $toc_child[i].style.cssText=key+":"+value;
    }
  };
  //获取元素绝对位置
  function getElementTop(element){
    var actualTop=element.offsetTop;
    var current=element.offsetParent;
    while(current!==null){
      actualTop+=current.offsetTop;
      current=current.offsetParent;
    }
    return actualTop;
  };
  function toToc (name) {
    //目标元素
    var $name=document.getElementById(name.substring(1));
    //目标元素位置
    var scrollPositionTop = getElementTop($name);
    $('#container').animate({
      scrollTop: scrollPositionTop
    },1000);
    //mobile锚点跳转
    var scrollOffset = $(name).offset();
    $('body,html').animate({
      scrollTop: scrollOffset.top-50
    },1000);
  };
  //获取元素
  var $article_content=document.getElementById('article-content');
  var $toc_article=document.getElementsByClassName("toc-article")[0];
  var $toc_child=document.getElementsByClassName("toc-child");
  var $toc_link=document.getElementsByClassName("toc-link");
  // 隐藏子目录
  tocChild("display","none");
  // 添加目录锚点跳转
  for(var i in $toc_link){
    $toc_link[i].onclick=function(e){
        e.preventDefault();
        toToc(decodeURI(this.getAttribute('href')));
    };
  };
  // 更新锚点url
  var isanchor = yiliaConfig.anchor;
  var updateAnchor = function (anchor) {
    if (window.history.replaceState && anchor !== window.location.hash) {
      window.history.replaceState(undefined, undefined, anchor);
    }
  };
  // jquery实现显示子目录
  var expandToc = function ($item) {
    if ($item.is(':visible')) {
      return;
    }
    $item.fadeIn(400);
  };
  // 目录滚动
  var autoScrollToc = function () {
    if ($toc_article.querySelectorAll('.active').length) {
      var activePosition = $('.active').position().top;
      var articleScrolltop =$toc_article.scrollTop;
      if (activePosition > $toc_article.clientHeight-50) {
        $toc_article.scrollTop=articleScrolltop+150;
      }
      if (activePosition < 50) {
        $toc_article.scrollTop=articleScrolltop-150;
      }
    }
  };
  // pc动态目录
  $container.addEventListener('scroll', (e) => {
    var currentTop = $container.scrollTop;
    findHeadPosition(currentTop);
    autoScrollToc();
  });
  // mobile动态目录
  window.addEventListener('scroll', (e) => {
    var currentTop = document.body.scrollTop||document.documentElement.scrollTop;
    findHeadPosition(currentTop+50);
    autoScrollToc();
  });
  // find head position & add active class
  // DOM Hierarchy:
  // ol.toc > (li.toc-item, ...)
  // li.toc-item > (a.toc-link, ol.toc-child > (li.toc-item, ...))
  var findHeadPosition = function (top) {
  // assume that we are not in the post page if no TOC link be found,
  // thus no need to update the status
    if ($toc_link.length === 0) {
      return false;
    };
    var list = $article_content.querySelectorAll('h1,h2,h3,h4,h5,h6');
    var currentId = '';
    list.forEach(function (ele) {
      if (top > getElementTop(ele)-10) {
        currentId = '#' + ele.getAttribute('id');
      }
    });
    //获取hexo版本号
    var hexoVersion=(null!=document.querySelector('meta[name="generator"]'))?document.querySelector('meta[name="generator"]').getAttribute("content").substring(5,6):null;
    var currentActive = $toc_article.querySelectorAll('.active');
    if (currentId === '') {
      currentActive.forEach(i => { i.classList.remove('active')});
      tocChild("display","none");
    };
    if (currentId && decodeURI(currentActive[0]!=null?currentActive[0].getAttribute('href'):null) !== currentId) {
      if (isanchor) updateAnchor(currentId);

      $toc_article.querySelectorAll('.active').forEach(i => { i.classList.remove('active')});
      var _this=(null!=hexoVersion&&hexoVersion>=5)?
      document.querySelectorAll('.toc-link[href="'+encodeURI(currentId)+'"]')[0]:
      document.querySelectorAll('.toc-link[href="'+currentId+'"]')[0];
      _this.classList.add('active');
      // jquery实现动态子目录
      var parents = $(_this).parents('.toc-child');
      // Returned list is in reverse order of the DOM elements
      // Thus `parents.last()` is the outermost .toc-child container
      // i.e. list of subsections
      var topLink = (parents.length > 0) ? parents.last() : $(_this);
      expandToc(topLink.closest('.toc-item').find('.toc-child'));
      topLink
      // Find all top-level .toc-item containers, i.e. sections
      // excluding the currently active one
      .closest('.toc-item').siblings('.toc-item')
      // Hide their respective list of subsections
      .find('.toc-child').hide();
    }
  };
};

/*
记录文章页面当前位置
*/
if(yiliaConfig.isPost&&yiliaConfig.scrollPos){
  //在即将离开当前页面（刷新或关闭）时触发
  window.onbeforeunload = function(){
    var scrollPos=$container.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
    document.cookie="scrollTop="+scrollPos; //存储滚动条位置到cookies中
  };
  //在离在开网页时（点击链接，刷新页面，关闭浏览器等）触发
  window.onpagehide = function(){
    var scrollPos=$container.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
    document.cookie="scrollTop="+scrollPos; //存储滚动条位置到cookies中
  };
  window.addEventListener("load",function(){ 
    if(document.cookie.match(/scrollTop=([^;]+)(;|$)/)!=null){
        var arr=document.cookie.match(/scrollTop=([^;]+)(;|$)/); //cookies中不为空，则读取滚动条位置
        $container.scrollTop=arr[1];
        document.documentElement.scrollTop=parseInt(arr[1]);
        document.body.scrollTop=parseInt(arr[1]);
    }
  });
};