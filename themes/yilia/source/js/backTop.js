/*!
 * backTop.js
 * 返回顶部
 */
const backTop = (domE, ctn, distance) => {
    if (!domE) return;
    let animationFrameId = null;
    const _onclick = domE.onclick;
    // 获取高度
    const getScrollTop = () => ctn.scrollTop || document.body.scrollTop;
    // 设定高度
    const setScrollTop = value => {
        ctn.scrollTop = value;
        document.body.scrollTop = value;
    };
    // 节流显示逻辑
    const throttledToggle = throttle(() => {
        domE.style.display = getScrollTop() > distance ? 'block' : 'none';
    }, 100);
    // 事件配置
    const scrollOptions = { passive: true };
    // 事件监听
    const events = [
        // pc
        [ctn, 'scroll', throttledToggle],
        // mobile
        [document.body, 'scroll', throttledToggle]
    ];
    events.forEach(([target, event, handler]) => {
        target.addEventListener(event, handler, scrollOptions);
    });
    // 点击处理
    domE.onclick = function() {
        // 清理前序动画
        cancelAnimation();
        // 执行原始点击回调
        typeof _onclick === 'function' && _onclick.apply(this, arguments);
        // 动画参数
        const start = getScrollTop();
        const duration = 500;
        let startTime = null;
        // 动画帧回调
        const animate = timestamp => {
            startTime = startTime || timestamp;
            const progress = timestamp - startTime;
            const percent = Math.min(progress / duration, 1);
            // 缓动函数（easeOutQuad）
            const eased = percent * (2 - percent);
            setScrollTop(start - start * eased);
            if (percent < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                animationFrameId = null;
            }
        };
        animationFrameId = requestAnimationFrame(animate);
    };
    // 取消动画
    const cancelAnimation = () => {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    };
    // 清理函数
    return () => {
        cancelAnimation();
        events.forEach(([target, event, handler]) => {
            target.removeEventListener(event, handler, scrollOptions);
        });
    };
};
// 执行 返回顶部
backTop(document.getElementById('js-jump-container'), document.getElementById('container'), 500);
