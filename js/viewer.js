/*!
 * viewer.js
 * photoswipe
 */
function viewer() {
    let pswpElement = document.querySelectorAll('.pswp')[0];
    let $imgArr = document.querySelectorAll(('.article-entry img:not(.reward-img)'));
    $imgArr.forEach(($em, i) => {
        $em.onclick = () => {
            // slider展开状态
            // todo: 这样不好，后面改成状态
            if (document.querySelector('.left-col.show')) return;
            let items = [];
            $imgArr.forEach(($em2, i2) => {
                let img = $em2.getAttribute('data-idx', i2);
                let src = $em2.getAttribute('data-target') || $em2.getAttribute('src');
                let title = $em2.getAttribute('alt');
                // 获得原图尺寸
                const image = new Image();
                image.src = src;
                items.push({
                    src: src,
                    w: image.width || $em2.width,
                    h: image.height || $em2.height,
                    title: title
                })
            });
            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
                index: parseInt(i)
            });
            gallery.init();
        }
    })
}
// 执行 photoswipe（页面载入完成后执行）
window.addEventListener("load", viewer());
