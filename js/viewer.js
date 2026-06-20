/*!
 * viewer.js
 * photoswipe
 */
import PhotoSwipeLightbox from"/js/lib/photoswipe/photoswipe-lightbox.esm.min.js";function viewer(){const t=document.querySelectorAll(".article-entry img:not(.reward-img)");if(!t.length)return;const e=Array.from(t).map(t=>({src:t.getAttribute("data-target")||t.getAttribute("src"),width:t.naturalWidth||t.width,height:t.naturalHeight||t.height,alt:t.getAttribute("alt")||""})),i=new PhotoSwipeLightbox({dataSource:e,pswpModule:()=>import("/js/lib/photoswipe/photoswipe.esm.min.js")});t.forEach((t,e)=>{t.addEventListener("click",t=>{t.preventDefault(),document.querySelector(".left-col.show")||i.loadAndOpen(e)})}),i.init()}window.addEventListener("load",viewer);