/*!
 * search.js
 * 全局搜索
 * 需要使用hexo插件：hexo-generator-searchdb
 */
function searchFunc() {
    // 搜索使用的xml
    const path = '/search.xml';
    // 存储所有文章数据
    let postData = null;
    // 标记数据是否加载
    let dataLoaded = false;
    // DOM元素（在 UI 初始化时赋值）
    let $searchInput, $clearInput, $resultContent, $open, $close, $searchModal;
    // 加载数据
    function loadData() {
        if (dataLoaded) return;
        fetch(path)
        .then(function (response) {
            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
            return response.text();
        })
        .then(function (res) {
            const xml = new window.DOMParser().parseFromString(res, 'text/xml');
            const entries = xml.querySelectorAll('entry');
            postData = Array.from(entries).map(function (item) {
                return {
                    title: item.querySelector('title').textContent,
                    content: item.querySelector('content').textContent,
                    url: item.querySelector('url').textContent
                };
            });
            dataLoaded = true;
            // 绑定输入事件
            bindInputEvent();
        })
        .catch(function (err) {
            let errMsg = "<ul class='search-result-list'><li id='js-searchdbFail'>" + err;
            errMsg += "<br/>缺失模块。<br/>1、请确保node版本大于6.2<br/>2、在博客根目录（注意不是yilia根目录）执行以下命令：<br/>npm i hexo-generator-searchdb --save<br/>";
            errMsg += "3、在根目录_config.yml里添加配置：<pre>search:\n  path: search.xml\n  field: post</pre>";
            errMsg += "</li></ul>";
            $resultContent.innerHTML = errMsg;
            const failEl = document.getElementById('js-searchdbFail');
            if (failEl) {
                failEl.style.cssText = "font-size: 12px; color: rgba(77, 77, 77, 0.75)";
            }
        });
    }
    // 绑定输入事件（搜索逻辑）
    function bindInputEvent() {
        // 转义正则特殊字符
        function escapeRegExp(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        // 事件绑定
        $searchInput.addEventListener('input', function () {
            const rawValue = this.value.trim();
            $resultContent.innerHTML = '';
            if (rawValue.length === 0) return;
            const keywords = rawValue.toLowerCase().split(/\s+/).filter(k => k.length > 0);
            if (keywords.length === 0) return;
            let str = '<ul class="search-result-list">';
            postData.forEach(function (data) {
                const data_title = data.title.trim().toLowerCase();
                const contentRaw = data.content.trim().replace(/<[^>]+>/g, "");
                const data_content = contentRaw.toLowerCase();
                if (data_title === '' || data_content === '') return;
                let isMatch = true;
                let first_occur = -1;
                for (let keyword of keywords) {
                    const idxTitle = data_title.indexOf(keyword);
                    let idxContent = data_content.indexOf(keyword);
                    if (idxTitle < 0 && idxContent < 0) {
                        isMatch = false;
                        break;
                    }
                    // 当内容匹配且之前没记录过位置时，记录首次位置
                    if (idxContent >= 0 && first_occur === -1) {
                        first_occur = idxContent;
                    }
                }
                // 显示搜索结果
                if (isMatch) {
                    // 新标签页打开
                    const openTarget = (yiliaConfig.open_in_new) ? ' target="_blank"' : '';
                    str += `<li><a href="${data.url}" class="search-result-title"${openTarget}>${data.title}</a>`;
                    // 当正文中有匹配时才截取，否则不显示片段
                    if (first_occur >= 0) {
                        let start = Math.max(0, first_occur - 20);
                        let end = (start === 0) ? Math.min(100, contentRaw.length) : Math.min(contentRaw.length, first_occur + 80);
                        let match_content = contentRaw.substring(start, end);
                        // 将关键词按长度降序排列，优先匹配长词
                        const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
                        const escaped = sortedKeywords.map(escapeRegExp).join('|');
                        const globalRegex = new RegExp(escaped, "gi");
                        // 关键字高亮标签
                        match_content = match_content.replace(globalRegex, function(keyword) {
                            return `<em class="search-keyword">${keyword}</em>`;
                        });
                        str += `<p class="search-result">${match_content}...</p>`;
                    }
                    str += '</li>';
                }
            });
            str += '</ul>';
            $resultContent.innerHTML = str;
        });
    }
    // 获取DOM元素（UI初始化）
    function initUI() {
        // 搜索输入框
        $searchInput = document.getElementById('js-searchInput');
        // 搜索清空按钮
        $clearInput = document.getElementById('js-searchTextCancel');
        // 搜索结果框
        $resultContent = document.getElementById('js-searchResult');
        // slider搜索图标
        $open = document.getElementById('js-icon-search');
        // 搜索背景框
        $close = document.getElementById('js-modal-overlay');
        // 搜索框
        $searchModal = document.getElementById('js-searchModal');
        // 输入框焦点/输入时控制清空按钮显示
        $searchInput.onfocus = function () {
            $clearInput.style.display = (this.value !== '') ? 'block' : 'none';
        };
        $searchInput.addEventListener('input', function () {
            $clearInput.style.display = (this.value !== '') ? 'block' : 'none';
        });
        // 清空按钮
        $clearInput.onclick = function () {
            $searchInput.value = '';
            const failEl = document.getElementById('js-searchdbFail');
            // 不显示错误提示时，清空内容
            if (!failEl) { 
                $resultContent.innerHTML = '';
            }
            $clearInput.style.display = 'none';
        };
        // 打开搜索
        $open.onclick = function () {
            $searchModal.style.display = 'block';
            $close.style.display = 'block';
            setTimeout(function () {
                $searchModal.style.opacity = 1;
                $close.style.opacity = 0.3;
            }, 10);
            // 加载数据
            loadData();
            // 自动聚焦输入框（等待渲染完成）
            setTimeout(function () {
                $searchInput.focus();
            }, 100);
        };
        // 关闭搜索
        $close.onclick = function () {
            $searchModal.style.opacity = 0;
            $close.style.opacity = 0;
            setTimeout(function () {
                $searchModal.removeAttribute('style');
                $close.removeAttribute('style');
                // $searchInput.value = '';
                // $resultContent.innerHTML = '';
                // $clearInput.style.display = 'none';
            }, 600);
        };
    }
    window.addEventListener('DOMContentLoaded', initUI);
}
// 执行 全局搜索
searchFunc();
