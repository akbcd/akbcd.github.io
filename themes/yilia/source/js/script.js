/** script.js*/
!function(){
    // 获取变量
    const $container=document.getElementById("container");
    const progressElement = window.document.querySelector('.progress-bar');
    /*
    progress bar init
    mobile底部进度条
    */
    if (progressElement) {
        new ScrollProgress((x, y) => {
            progressElement.style.width = y * 100 + '%';
        });
    }
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
                window.history.replaceState(undefined, undefined, anchor);
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
                    scrollTop: window.screen.width<800?scrollPositionTop-50:scrollPositionTop
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
            const $article_content=document.getElementById('article-content');
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
                findHeadPosition(window.screen.width<800?currentTop+50:currentTop);
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
}()