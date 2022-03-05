/** main.js*/
!function(){
    /** 返回顶部*/
    var backTop = function (domE, ctn, distance) {
        if (!domE) return;
        var timer = null;
        var _onscroll = window.onscroll,
            _onclick = domE.onclick;
        // pc
        ctn.onscroll = throttle(function () {
            typeof _onscroll === 'function' && _onscroll.apply(this, arguments);
            toggleDomE();
        }, 100);
        // mobile
        window.onscroll = ctn.onscroll;
        domE.onclick = function () {
            typeof _onclick === 'function' && _onclick.apply(this, arguments);
            timer = setInterval(function () { //设置一个计时器
                var ct = ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离
                var diff = Math.max(10, ct / 6);
                ct -= diff;
                if (ct > 0) {//如果与顶部的距离大于零
                    ctn.scrollTop = ctn.scrollTop - diff;
                    window.scrollTo(0, ct);//向上移动10px
                } else {//如果距离小于等于零
                    ctn.scrollTop = 0;
                    window.scrollTo(0, 0);//移动到顶部
                    clearInterval(timer);//清除计时器
                }
            }, 10);//隔10ms执行一次前面的function，展现一种平滑滑动效果
        };
        function toggleDomE() {
            domE.style.display = (ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop) > distance ? 'block' : 'none';
        }
        function throttle(func, wait) {
            var timer = null;
            return function () {
                var self = this, args = arguments;
                if (timer) clearTimeout(timer);
                timer = setTimeout(function () {
                    return typeof func === 'function' && func.apply(self, args);
                }, wait);
            }
        }
    };
    backTop(document.getElementById('js-jump-container'), document.getElementById('container'), 500);
    /** 分享*/
    function generate(url, opts) {
        var url = url.replace(/<%-sUrl%>/g, encodeURIComponent(opts.sUrl))
            .replace(/<%-sTitle%>/g, opts.sTitle)
            .replace(/<%-sDesc%>/g, opts.sDesc)
            .replace(/<%-sPic%>/g, encodeURIComponent(opts.sPic));
        window.open(url);
    }
    function showWX() {
        let $wx = document.querySelector('.js-wx-box');
        let $mask = document.querySelector('.mask');
        $wx.classList.add('in');
        $wx.classList.add('ready');
        $mask.classList.add('in');
    }
    function hideWX() {
        let $wx = document.querySelector('.js-wx-box');
        let $mask = document.querySelector('.mask');
        $wx.classList.remove('in');
        $wx.classList.remove('ready');
        $mask.classList.remove('in');
    }
    function handleClick(type, opts) {
        if (type === 'weibo') {
            generate('http://service.weibo.com/share/share.php?url=<%-sUrl%>&title=<%-sTitle%>&pic=<%-sPic%>', opts)
        } else if (type === 'qq') {
            generate('http://connect.qq.com/widget/shareqq/index.html?url=<%-sUrl%>&title=<%-sTitle%>&source=<%-sDesc%>', opts)
        } else if (type === 'douban') {
            generate('https://www.douban.com/share/service?image=<%-sPic%>&href=<%-sUrl%>&name=<%-sTitle%>&text=<%-sDesc%>', opts)
        } else if (type === 'qzone') {
            generate('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=<%-sUrl%>&title=<%-sTitle%>&pics=<%-sPic%>&summary=<%-sDesc%>', opts)
        } else if (type === 'facebook') {
            generate('https://www.facebook.com/sharer/sharer.php?u=<%-sUrl%>', opts)
        } else if (type === 'twitter') {
            generate('https://twitter.com/intent/tweet?text=<%-sTitle%>&url=<%-sUrl%>&via=<%-config.url%>', opts)
        } else if (type === 'google') {
            generate('https://plus.google.com/share?url=<%-sUrl%>', opts)
        } else if (type === 'weixin') {
            showWX();
        }
    }
    let share = function() {
        let $sns = document.querySelectorAll('.share-sns');
        if (!$sns || $sns.length === 0) return;
        let sUrl = window.location.href;
        let sTitle = document.querySelector('title').innerHTML;
        let $img = document.querySelectorAll('.article-entry img');
        let sPic = $img.length ? document.querySelector('.article-entry img').getAttribute('src') : '';
        if ((sPic !== '') && !/^(http:|https:)?\/\//.test(sPic)) {
            sPic = window.location.origin + sPic
        }
        $sns.forEach(($em) => {
            $em.onclick = (e) => {
                let type = $em.getAttribute('data-type');
                handleClick(type, {
                    sUrl: sUrl,
                    sPic: sPic,
                    sTitle: sTitle,
                    sDesc: sTitle
                })
            }
        });
        document.querySelector('.mask').onclick = hideWX;
        document.querySelector('.js-modal-close').onclick = hideWX;
    };
    share();
    /** hexo 不支持的配置*/
    function fix() {
        // 由于hexo分页不支持，手工美化，注释部分
        /*var $nav = document.querySelector('#page-nav')
        if ($nav && !document.querySelector('#page-nav .extend.prev')) {
            $nav.innerHTML = '<a class="extend prev disabled" rel="prev">&laquo; Prev</a>' + $nav.innerHTML
        }
        if ($nav && !document.querySelector('#page-nav .extend.next')) {
            $nav.innerHTML = $nav.innerHTML + '<a class="extend next disabled" rel="next">Next &raquo;</a>'
        }
        */
        // 新窗口打开
        if (yiliaConfig && yiliaConfig.open_in_new) {
            document.querySelectorAll(".article-title,.article-more-a,.archive-article-date,.archive-article-title").forEach(i=>{i.setAttribute("target", "_blank")});
            if (yiliaConfig.isPost) document.querySelectorAll(".article-title,.archive-article-date").forEach(i=>{i.removeAttribute("target")});
        }
        // 目录序号
        if (yiliaConfig && yiliaConfig.toc_hide_index) {
            let $a = document.querySelectorAll(('.toc-number'));
            $a.forEach(($em) => {
                $em.style.display = 'none';
            })
        }
        // about me 转义
        var $aboutme = document.querySelector('#js-aboutme');
        if ($aboutme && $aboutme.length !== 0) {
            $aboutme.innerHTML = $aboutme.innerText
        }    
    }
    fix();
    function Viwer() {
        let pswpElement = document.querySelectorAll('.pswp')[0];
        let $imgArr = document.querySelectorAll(('.article-entry img:not(.reward-img)'));
        $imgArr.forEach(($em, i) => {
            $em.onclick = () => {
                // slider展开状态
                // todo: 这样不好，后面改成状态
                if (document.querySelector('.left-col.show')) return;
                let items = [];
                $imgArr.forEach(($em2, i2) => {
                    let img = $em2.getAttribute('data-idx', i2);
                    let src = $em2.getAttribute('data-target') || $em2.getAttribute('src');
                    let title = $em2.getAttribute('alt');
                    // 获得原图尺寸
                    const image = new Image();
                    image.src = src;
                    items.push({
                        src: src,
                        w: image.width || $em2.width,
                        h: image.height || $em2.height,
                        title: title
                    })
                });
                var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
                    index: parseInt(i)
                });
                gallery.init();
            }
        })
    }
    // 页面载入完成后执行
    window.addEventListener("load", Viwer());
}();
!function(){
    // 获取变量
    const $container=document.getElementById("container");
    /*
    toc目录优化，jq实现目录滚动和锚点平滑跳转
    目录滚动和锚点平滑跳转依赖jquery
    */
    if(yiliaConfig.isPost){
        // 判断是否引入jquery
        const isjQuery=typeof(jQuery)!='undefined';
        // 目录元素
        const $toc_link=document.getElementsByClassName("toc-link");
        // 获取元素绝对位置
        function getElementTop(element){
            let actualTop=element.offsetTop;
            let current=element.offsetParent;
            while(current!==null){
                actualTop+=current.offsetTop;
                current=current.offsetParent;
            }
            return actualTop;
        };
        // 更新锚点url
        const isanchor = yiliaConfig.anchor;
        const updateAnchor = function (anchor) {
            if (window.history.replaceState && anchor !== window.location.hash) {
                window.history.replaceState(null, null, anchor);
            }
        };
        function toToc (name) {
            // 目标元素
            const $name=document.getElementById(name.substring(1));
            // 目标元素绝对位置
            const scrollPositionTop = getElementTop($name);
            if(isjQuery){
                // jquery实现平滑跳转
                $('#container').animate({
                    scrollTop: document.body.clientWidth<=800?scrollPositionTop-50:scrollPositionTop
                },1000);
                // mobile锚点平滑跳转
                $('body,html').animate({
                    scrollTop: scrollPositionTop-50
                },1000);
            }else{
                if (isanchor) updateAnchor(name);
                $container.scrollTop=scrollPositionTop;
                document.documentElement.scrollTop=scrollPositionTop-50;
                document.body.scrollTop=scrollPositionTop-50;
            }
        };
        // 添加目录元素锚点跳转
        for(let i in $toc_link){
            $toc_link[i].onclick=function(e){
                e.preventDefault();
                toToc(decodeURI(this.getAttribute('href')));
            };
        };
        // jQuery实现动态目录
        if(isjQuery){
            // 遍历toc-child
            function tocChild(key,value){
                for(let i=0;i<$toc_child.length;i++){
                    $toc_child[i].style.cssText=key+":"+value;
                }
            };
            // 获取元素
            const $article_content=document.getElementsByClassName('article-content')[0];
            const $toc_article=document.getElementsByClassName("toc-article")[0];
            const $toc_child=document.getElementsByClassName("toc-child");
            // 隐藏子目录
            tocChild("display","none");
            // jquery实现显示子目录
            const expandToc = function ($item) {
                if ($item.is(':visible')) {
                    return;
                }
                $item.fadeIn(400);
            };
            // 目录滚动
            const autoScrollToc = function () {
                if (document.querySelector('.toc-link.active')) {
                    const activePosition = $('.toc-link.active').position().top;
                    const articleScrolltop =$toc_article.scrollTop;
                    if (activePosition > $toc_article.clientHeight-50) {
                        $toc_article.scrollTop=articleScrolltop+150;
                    }
                    if (activePosition < 50) {
                        $toc_article.scrollTop=articleScrolltop-150;
                        if(activePosition<0)$toc_article.scrollTop=0;
                    }
                }
            };
            // pc动态目录
            $container.addEventListener('scroll', (e) => {
                const currentTop = $container.scrollTop;
                findHeadPosition(document.body.clientWidth<=800?currentTop+50:currentTop);
                autoScrollToc();
            });
            // mobile动态目录
            window.addEventListener('scroll', (e) => {
                const currentTop = document.body.scrollTop||document.documentElement.scrollTop;
                findHeadPosition(currentTop+50);
                autoScrollToc();
            });
            // find head position & add active class
            // DOM Hierarchy:
            // ol.toc > (li.toc-item, ...)
            // li.toc-item > (a.toc-link, ol.toc-child > (li.toc-item, ...))
            const findHeadPosition = function (top) {
            // assume that we are not in the post page if no TOC link be found,
            // thus no need to update the status
                if ($toc_link.length === 0) {
                    return false;
                };
                const list = $article_content.querySelectorAll('h1,h2,h3,h4,h5,h6');
                let currentId = '';
                list.forEach(function (ele) {
                    if (top > getElementTop(ele)-10) {
                        currentId = '#' + ele.getAttribute('id');
                    }
                });
                //获取hexo版本号
                const hexoVersion=(null!=document.querySelector('meta[name="generator"]'))?document.querySelector('meta[name="generator"]').getAttribute("content").substring(5,6):null;
                const currentActive = $toc_article.querySelectorAll('.active');
                if (currentId === '') {
                    currentActive.forEach(i => { i.classList.remove('active')});
                    tocChild("display","none");
                };
                if (currentId && decodeURI(currentActive[0]!=null?currentActive[0].getAttribute('href'):null) !== currentId) {
                    if (isanchor) updateAnchor(currentId);

                    $toc_article.querySelectorAll('.active').forEach(i => { i.classList.remove('active')});
                    const _this=(null!=hexoVersion&&hexoVersion>=5)?
                    document.querySelectorAll('.toc-link[href="'+encodeURI(currentId)+'"]')[0]:
                    document.querySelectorAll('.toc-link[href="'+currentId+'"]')[0];
                    _this.classList.add('active');
                    // jquery实现动态子目录
                    const parents = $(_this).parents('.toc-child');
                    // Returned list is in reverse order of the DOM elements
                    // Thus `parents.last()` is the outermost .toc-child container
                    // i.e. list of subsections
                    const topLink = (parents.length > 0) ? parents.last() : $(_this);
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
    };
    /*
    记录文章页面当前位置
    */
    if(yiliaConfig.isPost&&yiliaConfig.scrollPos){
        //在即将离开当前页面（刷新或关闭）时触发
        window.onbeforeunload = function(){
            const scrollPos=$container.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
            document.cookie="scrollTop="+scrollPos; //存储滚动条位置到cookies中
        };
        //在离在开网页时（点击链接，刷新页面，关闭浏览器等）触发
        window.onpagehide = function(){
            const scrollPos=$container.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
            document.cookie="scrollTop="+scrollPos; //存储滚动条位置到cookies中
        };
        window.addEventListener("load",function(){ 
            if(document.cookie.match(/scrollTop=([^;]+)(;|$)/)!=null){
                const arr=document.cookie.match(/scrollTop=([^;]+)(;|$)/); //cookies中不为空，则读取滚动条位置
                $container.scrollTop=arr[1];
                document.documentElement.scrollTop=parseInt(arr[1]);
                document.body.scrollTop=parseInt(arr[1]);
            }
        });
    };
}();