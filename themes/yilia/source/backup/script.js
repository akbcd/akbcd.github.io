// progress bar init
const progressElement = window.document.querySelector('.progress-bar');
if (progressElement) {
    new ScrollProgress((x, y) => {
        progressElement.style.width = y * 100 + '%';
    });
}
/*页面载入完成后，创建复制按钮*/
!function (e, t, a) {
    var initCopyCode = function(){
        var copyHtml = '<button id="js-btn-copy">复制</button>';
        $(".code pre").before(copyHtml);
    }
    initCopyCode();
    // 代码块复制
    $(".code").on("click","#js-btn-copy",function(button){
        var copy=button.currentTarget;
        var clipboard = new ClipboardJS('#js-btn-copy', {
            target: function(trigger) {
                if(trigger.nextElementSibling != null){
                    return trigger.nextElementSibling;
                }
            }
        });
        clipboard.on('success', function(e) {
            e.clearSelection();
            $(copy).html("复制成功");
            clipboard.destroy();
        });
        clipboard.on('error', function(e) {
            $(copy).html("复制失败");
            clipboard.destroy();
        });
        $(copy).mouseout(function(){$(event.currentTarget).html("复制")});
    });
}(window, document);