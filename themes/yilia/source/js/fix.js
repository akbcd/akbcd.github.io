/*!
 * fix.js
 * hexo 不支持的配置
 */
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
        document.querySelectorAll(".article-title,.article-more-a,.archive-article-date,.archive-article-title").forEach(i => { i.setAttribute("target", "_blank") });
        if (yiliaConfig.isPost) document.querySelectorAll(".article-title,.archive-article-date").forEach(i => { i.removeAttribute("target") });
    }
    // about me 转义
    var $aboutme = document.querySelector('#js-aboutme');
    if ($aboutme && $aboutme.length !== 0) {
        $aboutme.innerHTML = $aboutme.innerText
    }
    // 记录文章页面当前位置（cookie）
    if (yiliaConfig.isPost && yiliaConfig.scrollPos) {
        // container标签
        const $container = document.getElementById("container");
        // 存储滚动条位置到cookie中
        function writeCookie() {
            const scrollPos = parseInt($container.scrollTop) || parseInt(document.documentElement.scrollTop) || parseInt(document.body.scrollTop);
            document.cookie = "scrollTop=" + scrollPos; //存储滚动条位置到cookies中
        }
        //在即将离开当前页面（刷新或关闭）时触发
        window.onbeforeunload = function () {
            writeCookie();
        };
        //在离在开网页时（点击链接，刷新页面，关闭浏览器等）触发
        window.onpagehide = function () {
            writeCookie();
        };
        window.addEventListener("load", function () {
            // 判断是否已经滚动页面
            let $scrollTop = Math.trunc($container.scrollTop || document.documentElement.scrollTop || document.body.scrollTop);
            if (!$scrollTop && document.cookie.match(/scrollTop=([^;]+)(;|$)/) != null) {
                const arr = document.cookie.match(/scrollTop=([^;]+)(;|$)/); //cookies中不为空，则读取滚动条位置
                // 大于0时跳转至上次记录位置
                if (arr[1] > 0) {
                    $container.scrollTop = arr[1];
                    document.documentElement.scrollTop = arr[1];
                    document.body.scrollTop = arr[1];
                }
            }
        });
    };
    // toc目录优化
    if (yiliaConfig.isPost) {
        // container标签
        const $container = document.getElementById("container");
        // 获取标签绝对位置
        function getElementTop(element) {
            let actualTop = element.offsetTop;
            let current = element.offsetParent;
            while (current !== null) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            return actualTop;
        };
        // 更新锚点url
        const updateAnchor = function (anchor) {
            if (anchor !== window.location.hash) {
                if (!anchor) anchor = location.pathname;
                const title = document.title;
                window.history.replaceState({
                    url: location.href,
                    title: title
                }, title, anchor);
            }
        };
        // 目录锚点跳转
        function toToc(name) {
            // 目标元素
            const $name = document.getElementById(name.substring(1));
            // 目标元素绝对位置
            const scrollPositionTop = getElementTop($name);
            // container平滑跳转
            $container.scrollTo({ "behavior": "smooth", "top": document.body.clientWidth <= 800 ? scrollPositionTop - 50 : scrollPositionTop });
            // mobile平滑跳转
            document.body.scrollTo({ "behavior": "smooth", "top": scrollPositionTop - 50 });
        };
        // 文章主体内容标签
        const $article_content = document.getElementsByClassName('article-content')[0];
        // 目录配置
        const toc_hide_index = yiliaConfig.toc_hide_index;
        const isanchor = yiliaConfig.anchor;
        // a标签锚点跳转
        $article_content.querySelectorAll('a').forEach(i => {
            i.addEventListener('click', e => {
                if (i.getAttribute('href').charAt(0) == '#') {
                    e.preventDefault(); // 取消默认跳转
                    toToc(decodeURI(i.getAttribute('href')));
                }
            })
        });
        if (!document.getElementsByClassName('toc-container')[0]) return;
        let $toc_link, $toc_article, autoScrollToc;
        // 目录相关标签
        $toc_link = document.getElementsByClassName("toc-link");
        $toc_article = document.getElementsByClassName("toc-article")[0];
        if (!$toc_link[0]) return;
        // 隐藏目录序号
        if (toc_hide_index) {
            let $a = document.querySelectorAll(('.toc-number'));
            $a.forEach(($em) => {
                $em.style.display = 'none';
            })
        };
        // 目录元素点击跳转（a标签）
        $toc_article.querySelectorAll('a').forEach(i => {
            i.addEventListener('click', e => {
                e.preventDefault(); // 取消默认跳转
                toToc(decodeURI(i.getAttribute('href')));
            })
        });
        // 目录滚动
        autoScrollToc = item => {
            // active相对于窗口的位置
            const activeTop = item.getBoundingClientRect().top;
            // active最近祖先元素相对于窗口的位置
            if (!item.offsetParent) return;
            const activeParentTop = item.offsetParent.getBoundingClientRect().top;
            // active对于其定位的祖辈元素的位置（position().top）
            let activePosition = activeTop - activeParentTop;
            // 目录当前滚动条位置
            let articleScrolltop = $toc_article.scrollTop;
            // 目录滚动条每次滚动距离
            const scrollPixels = 150;
            // 目录滚动（向下）
            if (activePosition > $toc_article.clientHeight - 50) {
                while (true) {
                    activePosition -= scrollPixels;
                    articleScrolltop += scrollPixels;
                    if (!(activePosition > $toc_article.clientHeight - 50)) break;
                }
                $toc_article.scrollTo({ "behavior": "smooth", "top": articleScrolltop });
            }
            // 目录滚动（向上）
            if (activePosition < 50) {
                while (true) {
                    activePosition += scrollPixels;
                    articleScrolltop -= scrollPixels;
                    if (!(activePosition < 50)) break;
                }
                $toc_article.scrollTo({ "behavior": "smooth", "top": articleScrolltop });
            }
        };
        // find head position & add active class
        const list = $article_content.querySelectorAll('h1,h2,h3,h4,h5,h6');
        let detectItem = '';
        const findHeadPosition = function (top) {
            if (top === 0) return;
            let currentId = '';
            let currentIndex = '';
            list.forEach(function (ele, index) {
                if (top > getElementTop(ele) - 10) {
                    const id = ele.id;
                    currentId = id ? '#' + encodeURI(id) : '';
                    currentIndex = index;
                }
            });
            if (detectItem === currentIndex) {
                if (currentIndex != '') autoScrollToc($toc_link[currentIndex]);
                return;
            }
            // 更新url
            if (isanchor) updateAnchor(currentId);
            detectItem = currentIndex;
            $toc_article.querySelectorAll('.active').forEach(i => { i.classList.remove('active') });
            if (currentId === '') return;
            const currentActive = $toc_link[currentIndex];
            // 对当前目录节点及目录所在父级节点添加active属性
            currentActive.classList.add('active');
            setTimeout(() => {
                autoScrollToc(currentActive)
            }, 0);
            let parent = currentActive.parentNode;
            for (; !parent.matches('.toc'); parent = parent.parentNode) {
                if (parent.matches('li')) parent.classList.add('active')
            }
        };
        // pc动态目录
        $container.addEventListener('scroll', () => {
            const currentTop = $container.scrollTop;
            findHeadPosition(document.body.clientWidth <= 800 ? currentTop + 50 : currentTop);
        });
        // mobile动态目录
        document.body.addEventListener('scroll', () => {
            const currentTop = document.body.scrollTop || document.documentElement.scrollTop;
            findHeadPosition(currentTop + 50);
        });
    };
};
// 执行 hexo 不支持的配置
fix();