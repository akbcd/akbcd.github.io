/*!
 * copyFn.js
 * 代码块复制
 */
var copyFn = function (copy, copy_success, copy_error) {
    var copyHtml = '<button type="button" class="js-btn-copy">' + copy + '</button>';
    [].forEach.call(document.querySelectorAll(".code>pre,pre>code"), function (button) {
        button.insertAdjacentHTML('beforebegin', copyHtml);
    });
    var copyButton = document.querySelectorAll(".code>.js-btn-copy,pre>.js-btn-copy");
    for (var i in copyButton) {
        copyButton[i].onclick = function (button) {
            var $copy = button.currentTarget;
            var clipboard = new ClipboardJS('.js-btn-copy', {
                target: function (trigger) {
                    if (trigger.nextElementSibling != null) {
                        return trigger.nextElementSibling;
                    }
                }
            });
            clipboard.on('success', function (e) {
                e.clearSelection();
                $copy.innerHTML = copy_success;
                clipboard.destroy();
            });
            clipboard.on('error', function (e) {
                $copy.innerHTML = copy_error;
                clipboard.destroy();
            });
            $copy.onmouseout = function () { $copy.innerHTML = copy };
        }
    }
}
