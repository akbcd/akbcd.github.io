/*!
 * main.js
 * js方法调用
 */
(function main() {
    // pc页面且宽度大于800，执行anm.js动画（影响性能）
    if (!(browser.versions.mobile || document.body.clientWidth <= 800)) {
        anm();
    }
    // 代码块隐藏
    addHighlightTool();
    // 返回顶部
    backTop(document.getElementById('js-jump-container'), document.getElementById('container'), 500);
    // hexo 不支持的配置
    fix();
    // 搜索文章标题
    slider();
    // photoswipe（页面载入完成后执行）
    window.addEventListener("load", viewer());
    // 移动端样式美化
    mobile();
})()