// progress bar init
const progressElement = window.document.querySelector('.progress-bar');
if (progressElement) {
    new ScrollProgress((x, y) => {
        progressElement.style.width = y * 100 + '%';
    });
}
// 代码块复制
function copy(button){
    new ClipboardJS('#js-btn-copy', {
        target: function(trigger) {
            if(trigger.nextElementSibling != null){
                $(button).html("复制成功");
                setTimeout(function(){ $(button).html("复制") }, 1000);
                return trigger.nextElementSibling;
            }
        }
    });
}
/*页面载入完成后，创建复制按钮*/
!function (e, t, a) {
    var initCopyCode = function(){
        var copyHtml = '<button id="js-btn-copy" onclick="copy(this)" >复制</button>';
        $(".code pre").before(copyHtml);
    }
    initCopyCode();
}(window, document);