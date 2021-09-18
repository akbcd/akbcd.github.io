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
    function aside() {
        backTop(document.getElementById('js-jump-container'), document.getElementById('container'), 500);
    }
    aside();
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
}();