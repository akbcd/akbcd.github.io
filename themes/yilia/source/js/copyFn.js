/*!
 * copyFn.js
 * 代码块复制（函数声明为导出）
 */
export default function copyFn(copy, copy_success, copy_error) {
    // 插入复制按钮
    var copyHtml = '<button type="button" class="js-btn-copy">' + copy + '</button>';
    [].forEach.call(document.querySelectorAll(".code>pre,pre>code"), function (button) {
        button.insertAdjacentHTML('beforebegin', copyHtml);
    });
    // 为所有复制按钮绑定 mouseout 事件（恢复原文本）
    var copyButtons = document.querySelectorAll(".code>.js-btn-copy,pre>.js-btn-copy");
    copyButtons.forEach(function(btn) {
        btn.onmouseout = function() {
            this.innerHTML = copy;
        };
    });
    // 创建单个 ClipboardJS 实例，自动处理点击
    var clipboard = new ClipboardJS('.js-btn-copy', {
        target: function (trigger) {
            if (trigger.nextElementSibling != null) {
                return trigger.nextElementSibling;
            }
        }
    });
    // 监听复制成功 / 失败事件
    clipboard.on('success', function(e) {
        e.clearSelection();
        e.trigger.innerHTML = copy_success;
    });
    clipboard.on('error', function(e) {
        e.trigger.innerHTML = copy_error;
    });
}
