/*!
 * addHighlightTool.js
 * 代码块隐藏，只适用于hexo默认的代码渲染
 */
function addHighlightTool() {
    // 导入代码块配置
    const highlight = yiliaConfig.highlight;
    const highlight_show = highlight.highlight_show;
    // 代码块语言
    const highlight_lang = highlight.highlight_lang;
    if (highlight_show === 'none' && !highlight_lang) return;
    // 代码块是否隐藏
    function isHidden(ele) {
        return ele.offsetHeight === 0 && ele.offsetWidth === 0;
    }
    // 判断代码块渲染工具
    function highlight_pluginFn() {
        if (document.querySelectorAll('figure.highlight').length) {
            return 'highlight';
        } else if (document.querySelectorAll('pre[class*="language-"]').length) {
            return 'prismjs';
        } else if (document.querySelectorAll('.article-content pre').length) {
            return 'default';
        } else {
            return null;
        }
    }
    // 代码块隐藏
    const highlightShrinkFn = (ele) => {
        // highlight-tools标签
        const $firstEle = ele.parentNode.firstChild;
        // highlight-tools标签的下一个标签（数组）
        const $nextEle = [...ele.parentNode.children].slice(1);
        // 隐藏按钮class
        ele.firstChild.classList.toggle('closed');
        // 代码块隐藏，highlight-tools标签圆角
        if (isHidden($nextEle[$nextEle.length - 1])) {
            $nextEle.forEach(e => { e.style.display = 'block' });
            $firstEle.removeAttribute('style');
        } else {
            $nextEle.forEach(e => { e.style.display = 'none' });
            $firstEle.style['border-radius'] = '4px';
        }
    }
    // 调用代码块隐藏
    const highlightToolsFn = function (e) {
        const $target = e.target.classList;
        if ($target.contains('expand')) highlightShrinkFn(this);
    }
    // 创建选择器元素的父节点（选择器,标签类型,属性）
    const wrap = function (selector, eleType, options) {
        // 创建指定节点
        const creatEle = document.createElement(eleType);
        // 对创建的节点添加指定属性
        for (const [key, value] of Object.entries(options)) {
            creatEle.setAttribute(key, value);
        };
        // 在选择器节点之前插入创建的节点
        selector.parentNode.insertBefore(creatEle, selector);
        // 选择器节点作为创建节点的子节点
        creatEle.appendChild(selector);
    }
    // 创建highlight-tools标签（代码块语言,隐藏按钮,隐藏按钮class,隐藏按钮标签,代码块节点,代码块渲染工具）
    function createEle(lang, show, cls, ele, item, service) {
        // 创建空白节点
        const fragment = document.createDocumentFragment();
        // 创建highlight-tools标签
        const hlTools = document.createElement('div');
        // highlight-tools标签圆角
        if (cls === 'closed') {
            hlTools.style['border-radius'] = '4px';
        }
        // highlight-tools标签属性
        hlTools.className = cls ? `highlight-tools ${cls}` : 'highlight-tools';
        // highlight-tools标签添加隐藏按钮和代码块语言
        hlTools.innerHTML = ele + lang;
        // 删除添加的隐藏按钮
        if (show === 'none') hlTools.innerHTML = lang;
        // highlight-tools标签添加点击事件
        hlTools.addEventListener('click', highlightToolsFn);
        // 在空白中追加创建的highlight-tools标签
        fragment.appendChild(hlTools);
        // 插入创建节点
        if (service === 'highlight') {
            // 目标节点第一个子节点之前
            item.insertBefore(fragment, item.firstChild);
            // 目标节点最后一个子节点圆角边框修改（table标签）
            item.lastChild.style['border-radius'] = '0 0 4px 4px';
        } else {
            // 目标节点之前
            item.parentNode.insertBefore(fragment, item);
            // 目标节点圆角边框修改（pre标签）
            item.style['border-radius'] = '0 0 4px 4px';
        }
    }
    // 获取代码块渲染工具
    const highlight_plugin = highlight_pluginFn();
    // 页面没有代码块，跳出
    if (!highlight_plugin) return;
    // 渲染工具是否为highlight
    const isHighlight = highlight_plugin === 'highlight';
    // 获取代码块，三种情况：highlight，prismjs，default
    const $figureHighlight = isHighlight
        ? document.querySelectorAll('figure.highlight')
        : document.querySelectorAll('pre[class*="language-"]').length
            ? document.querySelectorAll('pre[class*="language-"]')
            : document.querySelectorAll('.article-content pre');
    // 代码块隐藏按钮标签
    let highlightShrinkEle = '';
    const highlightShrinkClass = highlight_show === true || highlight_show === 'none' ? '' : 'closed';
    if (highlight_show !== undefined) {
        highlightShrinkEle = `<i class="fas fa-angle-down icon-back expand ${highlightShrinkClass}"></i>`
    }
    if (highlight_lang) {
        // 显示代码块语言
        if (isHighlight) {
            // highlight，无语言（plaintext）显示为Code，添加节点
            $figureHighlight.forEach(function (item) {
                let langName = item.getAttribute('class').split(' ')[1];
                if (langName === 'plaintext' || langName === undefined) langName = 'Code';
                const highlightLangEle = `<div class="code-lang">${langName}</div>`;
                createEle(highlightLangEle, highlight_show, highlightShrinkClass, highlightShrinkEle, item, 'highlight');
            });
        } else {
            // prismjs，default，无语言显示为Code，添加节点
            $figureHighlight.forEach(function (item) {
                let langName = item.getAttribute('data-language') ? item.getAttribute('data-language') : 'Code';
                if (highlight_plugin === 'default') langName = item.lastChild.getAttribute('class')
                    ? item.lastChild.getAttribute('class').split(' ')[1]
                        ? item.lastChild.getAttribute('class').split(' ')[1]
                        : item.lastChild.getAttribute('class') : 'Code';
                const highlightLangEle = `<div class="code-lang">${langName}</div>`;
                wrap(item, 'figure', { class: 'highlight' });
                createEle(highlightLangEle, highlight_show, highlightShrinkClass, highlightShrinkEle, item);
            })
        }
    } else {
        // 不显示代码块语言
        if (isHighlight) {
            $figureHighlight.forEach(function (item) {
                createEle('', highlight_show, highlightShrinkClass, highlightShrinkEle, item, 'highlight');
            })
        } else {
            $figureHighlight.forEach(function (item) {
                wrap(item, 'figure', { class: 'highlight' });
                createEle('', highlight_show, highlightShrinkClass, highlightShrinkEle, item);
            })
        }
    }
};
