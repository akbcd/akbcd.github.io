/*!
 * copyFn.js
 * 代码块复制（函数声明为导出）
 */
export default function copyFn(n,e,t){var o='<button type="button" class="js-btn-copy">'+n+"</button>";[].forEach.call(document.querySelectorAll(".code>pre,pre>code"),function(n){n.insertAdjacentHTML("beforebegin",o)}),document.querySelectorAll(".code>.js-btn-copy,pre>.js-btn-copy").forEach(function(e){e.onmouseout=function(){this.innerHTML=n}});var r=new ClipboardJS(".js-btn-copy",{target:function(n){if(null!=n.nextElementSibling)return n.nextElementSibling}});r.on("success",function(n){n.clearSelection(),n.trigger.innerHTML=e}),r.on("error",function(n){n.trigger.innerHTML=t})}