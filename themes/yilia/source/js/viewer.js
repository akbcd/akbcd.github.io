/*!
 * viewer.js
 * photoswipe
 */
import PhotoSwipeLightbox from "/js/lib/photoswipe/photoswipe-lightbox.esm.min.js"; // Include Lightbox (photoswipe-lightbox.esm.js)
function viewer() {
    const gallerySelector = '.article-entry'; // 图片父容器
    const imageSelector = 'img:not(.reward-img)'; // 排除打赏图片
    const $imgArr = document.querySelectorAll(`${gallerySelector} ${imageSelector}`);
    if (!$imgArr.length) return;
    // 将图片信息存储为items
    const items = Array.from($imgArr).map(($img) => ({
        src: $img.getAttribute('data-target') || $img.getAttribute('src'),
        width: $img.naturalWidth || $img.width,
        height: $img.naturalHeight || $img.height,
        alt: $img.getAttribute('alt') || ''
    }));
    // 创建 Lightbox 实例
    const lightbox = new PhotoSwipeLightbox({
        dataSource: items,
        pswpModule: () => import("/js/lib/photoswipe/photoswipe.esm.min.js") // Include Core (photoswipe.esm.js)
    });
    // 绑定点击事件
    $imgArr.forEach(($img, index) => {
        $img.addEventListener('click', (e) => {
            e.preventDefault();
            if (document.querySelector('.left-col.show')) return;
            lightbox.loadAndOpen(index);
        });
    });
    lightbox.init();
}
// 执行 photoswipe（页面载入完成后执行）
window.addEventListener("load", viewer);
