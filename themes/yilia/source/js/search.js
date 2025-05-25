/*!
 * search.js
 * 全局搜索
 * 需要使用hexo插件：hexo-generator-searchdb
 */
!function () {
    //添加清空输入内容按钮
    var $searchInput = document.getElementById('js-searchInput');
    var $clearInput = document.getElementById('js-searchTextCancel');
    $searchInput.onfocus = function () {
        if (this.value != '') {
            $clearInput.style.display = 'block';
        }
    };
    $searchInput.addEventListener('input', function () {
        if (this.value == '') {
            $clearInput.style.display = 'none';
        } else {
            $clearInput.style.display = 'block';
        }
    });
    window.addEventListener("DOMContentLoaded", function () {
        $clearInput.onclick = function () {
            $searchInput.value = '';
            document.getElementById("js-searchResult").innerHTML = '';
            $clearInput.style.display = 'none';
        };
        //给搜索图标添加点击事件
        let open = document.getElementById('js-icon-search');
        let close = document.getElementById('js-modal-overlay');
        let $searchModal = document.getElementById('js-searchModal');
        open.onclick = function () {
            //弹窗出现时淡入动画
            $searchModal.style.display = "block";
            close.style.display = "block";
            setTimeout(function () {
                $searchModal.style.opacity = 1;
                close.style.opacity = 0.3;
            }, .1);
        };
        //关闭搜索
        close.onclick = function () {
            //弹窗关闭时淡出动画
            $searchModal.style.opacity = 0;
            close.style.opacity = 0;
            setTimeout(function () {
                $searchModal.removeAttribute("style");
                close.removeAttribute("style");
            }, 600);
        }
    });
}();
//全局搜索
var searchFunc = function (path, search_id, content_id) {
    var $resultContent = document.getElementById(content_id);
    fetch(path)
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.text()
    })
    .then(res => new window.DOMParser().parseFromString(res, 'text/xml'))
    .then(data => {
        const datas = [...data.querySelectorAll('entry')].map(function (item) {
            return {
                title: item.querySelector('title').textContent,
                content: item.querySelector('content').textContent,
                url: item.querySelector('url').textContent
            }
        });
        var $input = document.getElementById(search_id);
        $input.addEventListener('input', function () {
            var str = '<ul class=\"search-result-list\">';
            var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
            $resultContent.innerHTML = "";
            if (this.value.trim().length <= 0) {
                return;
            }
            // perform local searching
            datas.forEach(function (data) {
                var isMatch = true;
                var data_title = data.title.trim().toLowerCase();
                var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                var data_url = data.url;
                var index_title = -1;
                var index_content = -1;
                var first_occur = -1;
                // only match artiles with not empty titles and contents
                if (data_title != '' && data_content != '') {
                    keywords.forEach(function (keyword, i) {
                        index_title = data_title.indexOf(keyword);
                        index_content = data_content.indexOf(keyword);
                        if (index_title < 0 && index_content < 0) {
                            isMatch = false;
                        } else {
                            if (index_content < 0) {
                                index_content = 0;
                            }
                            if (i == 0) {
                                first_occur = index_content;
                            }
                        }
                    });
                }
                // show search results
                if (isMatch) {
                    if (yiliaConfig.open_in_new) {
                        str += "<li><a href='" + data_url + "' class='search-result-title' target='_blank'>" + data_title + "</a>";
                    } else {
                        str += "<li><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
                    }
                    var content = data.content.trim().replace(/<[^>]+>/g, "");
                    if (first_occur >= 0) {
                        // cut out 100 characters
                        var start = first_occur - 20;
                        var end = first_occur + 80;
                        if (start < 0) {
                            start = 0;
                        }
                        if (start == 0) {
                            end = 100;
                        }
                        if (end > content.length) {
                            end = content.length;
                        }
                        var match_content = content.substr(start, end);
                        // highlight all keywords
                        keywords.forEach(function (keyword) {
                            var regS = new RegExp(keyword, "gi");
                            match_content = match_content.replace(regS, "<em class=\"search-keyword\">" + keyword + "</em>");
                        });
                        str += "<p class=\"search-result\">" + match_content + "...</p>"
                    }
                    str += "</li>";
                }
            });
            str += "</ul>";
            $resultContent.innerHTML = str;
        });
    })
    .catch((err) => {
        err = "<ul class='search-result-list'><li>" + err;
        err += "<br/>缺失模块。<br/>1、请确保node版本大于6.2<br/>2、在博客根目录（注意不是yilia根目录）执行以下命令：<br/>npm i hexo-generator-searchdb --save<br/>";
        err += "3、在根目录_config.yml里添加配置：<br/><pre>search:</pre><pre>  path: search.xml</pre><pre>  field: post</pre>";
        err += "</li></ul>";
        $resultContent.innerHTML = err;
    })
};
