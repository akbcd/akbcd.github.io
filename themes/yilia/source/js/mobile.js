/*!
 * mobile
 * 移动端样式美化
 */
function mobile() {
    function isPathMatch(path, href) {
        let reg = /\/|index.html/g;
        return (path.replace(reg, '')) === (href.replace(reg, ''))
    }
    function tabActive() {
        let $tabs = document.querySelectorAll('.js-header-menu li a');
        let path = window.location.pathname;
        for (var i = 0, len = $tabs.length; i < len; i++) {
            let $tab = $tabs[i];
            // 中文URL可能存在加密，使用decodeURI
            if (isPathMatch(decodeURI(path), decodeURI($tab.getAttribute('href')))) {
                $tab.classList.add('active');
            }
        }
    }
    function getElementTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }
    // js实现insertAfter
    function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            // 如果最后的节点是目标元素，则直接添加。因为默认是最后
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
            //如果不是，则插入在目标元素的下一个兄弟节点的前面。也就是目标元素的后面
        }
    }
    function scrollStop($dom, top, limit, zIndex, diff) {
        let nowTop = getElementTop($dom) - top;
        if (nowTop - limit <= diff) {
            let $newDom = $dom.$newDom;
            if (!$newDom) {
                $newDom = $dom.cloneNode(true);
                insertAfter($newDom, $dom);
                $dom.$newDom = $newDom;
                $newDom.style.position = 'fixed';
                $newDom.style.top = limit + 'px';
                $newDom.style.left = 0;
                $newDom.style.zIndex = zIndex || 2;
                $newDom.style.width = '100%';
                $newDom.style.color = '#fff';
            }
            $newDom.style.visibility = 'visible';
            $dom.style.visibility = 'hidden';
        } else {
            $dom.style.visibility = 'visible';
            let $newDom = $dom.$newDom;
            if ($newDom) {
                $newDom.style.visibility = 'hidden'
            }
        }
    }
    function handleScroll() {
        let $overlay = document.querySelector('.js-overlay');
        let $menu = document.querySelector('.js-header-menu');
        let $scrollTop = parseInt(document.body.scrollTop) || parseInt(document.querySelector("#container").scrollTop);
        scrollStop($overlay, $scrollTop, -63, 2, 0);
        // 动画微调，修复pc页面getElementTop($menu)=0
        if (document.body.clientWidth > 800) {
            // 手动设置pc页面getElementTop($menu)=158
            scrollStop($menu, $scrollTop - 158, -1, 3, 10)
        } else {
            scrollStop($menu, $scrollTop, -1, 3, 10)
        }
    }
    function bindScroll() {
        // 初始化
        handleScroll();
        // 事件配置
        const scrollOptions = { passive: true };
        // 事件监听
        const events = [
            // mobile
            [document.body, 'scroll', handleScroll],
            // pc
            [document.querySelector("#container"), 'scroll', handleScroll]
        ];
        events.forEach(([target, event, handler]) => {
            target.addEventListener(event, handler, scrollOptions);
        });
    };
    // 当前页面菜单样式美化
    tabActive();
    // 页面滚动时的样式美化
    bindScroll();
    // 优化移动端页面内容过短可能出现的样式问题
    if (document.body.clientHeight < window.innerHeight) {
        var n = document.querySelector("#container");
        var height = window.innerHeight;
        n.setAttribute("style", "height:" + height + "px")
    }
}
// 执行 移动端样式美化
mobile();
