//添加清空输入内容按钮
var searchInput = document.getElementById('js-searchInput');
var clearInput = document.getElementById('js-searchTextCancel');
searchInput.onfocus=function () {
    if($(this).val() != ''){
        clearInput.style.display='block';
    }
};
searchInput.addEventListener('input', function () {
    if($(this).val() == ''){
        clearInput.style.display='none';
    }else{
        clearInput.style.display='block';
    }
});
var top1=0;
function stopBodyScroll(isFixed){
    var bodyEl=document.body;
    if(isFixed){
        //获取页面滚动的距离
        top1=window.scrollY;
        //将body标签在当前位置固定
        bodyEl.style.position='fixed';
        bodyEl.style.top=-top1+'px';
        bodyEl.style.width='100%'
    }else{
        bodyEl.style.position='';
        bodyEl.style.top='';
        //页面回到获取的位置
        window.scrollTo(0,top1)
    }
};
$(document).ready(function(){
    clearInput.onclick=function(){
        $('#js-searchInput').val('');
        $('#js-searchResult').html('');
        clearInput.style.display='none';
    };
    //给搜索图标添加点击事件
    var open = document.getElementById('js-icon-search');
    open.onclick = function(){
        //弹窗出现时淡入动画
        $('#js-searchModal').fadeIn(1000);
        $('#js-modal-overlay').fadeIn(1000);
        //固定body
        stopBodyScroll(true);
    }
    //关闭搜索
    var close = document.getElementById('js-modal-overlay');
    close.onclick = function(){
        //弹窗关闭时淡出动画
        $('#js-searchModal').fadeOut(500);
        $('#js-modal-overlay').fadeOut(500);
        //移除body固定
        stopBodyScroll(false);
        document.body.removeAttribute('style');
    }
});
//全局搜索
var searchFunc = function (path, search_id, content_id) {
    'use strict';
    $.ajax({
        url: path,
        dataType: "xml",
        success: function (xmlResponse) {
            // get the contents from search data
            var datas = $("entry", xmlResponse).map(function () {
                return {
                    title: $("title", this).text(),
                    content: $("content", this).text(),
                    url: $("url", this).text()
                };
            }).get();
            var $input = document.getElementById(search_id);
            var $resultContent = document.getElementById(content_id);
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
                    var content_index = [];
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
                        str += "<li><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
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
        }
    });
}
//调用搜索函数
$(function () {
    searchFunc("/" + "search.xml", 'js-searchInput', 'js-searchResult');
});