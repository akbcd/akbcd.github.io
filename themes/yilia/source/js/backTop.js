/*!
 * backTop.js
 * 返回顶部
 */
const backTop = function (domE, ctn, distance) {
    if (!domE) return;
    var _onclick = domE.onclick;
    // pc
    ctn.onscroll = throttle(() => toggleDomE(), 100);
    // mobile
    document.body.addEventListener('scroll', ctn.onscroll);
    domE.onclick = function () {
        let timer = null;
        typeof _onclick === 'function' && _onclick.apply(this, arguments);
        timer = setInterval(function () { //设置一个计时器
            var ct = ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离
            var diff = Math.max(10, ct / 6);
            ct -= diff;
            if (ct > 0) {//如果与顶部的距离大于零
                ctn.scrollTop = ctn.scrollTop - diff;
                document.body.scrollTo(0, ct);//向上移动10px
            } else {//如果距离小于等于零
                ctn.scrollTop = 0;
                document.body.scrollTo(0, 0);//移动到顶部
                clearInterval(timer);//清除计时器
            }
        }, 10);//隔10ms执行一次前面的function，展现一种平滑滑动效果
    };
    function toggleDomE() {
        domE.style.display = (ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop) > distance ? 'block' : 'none';
    }
};
