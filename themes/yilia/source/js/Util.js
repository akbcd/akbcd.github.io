/*!
 * 浏览器检测
 * detectDevice
 */
function detectDevice() {
    const isMobile = {
        Android: () => navigator.userAgent.match(/Android/i),
        BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
        iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
        Windows: () => navigator.userAgent.match(/IEMobile|Windows Phone/i),
        HarmonyOS: () => navigator.userAgent.match(/HarmonyOS/i),
        any: function () {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Windows() || this.HarmonyOS());
        }
    };
    // 检测 iPadOS 13+ 的 Safari（UA 为 Macintosh 但支持触摸）
    const isiPad = navigator.userAgent.match(/Macintosh/i) &&
        navigator.maxTouchPoints > 0 &&
        window.screen.width > 768;
    if (isiPad) isMobile.iOS = () => true;
    // 更严格的触摸设备判断
    const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
        (isMobile.any() || window.screen.width < 1024);
    return {
        isMobile: isMobile.any(),
        isDesktop: !isMobile.any(),
        isTouchDevice,
        isiPad
    };
}
/*!
 * 节流
 * throttle
 */
function throttle(func, wait) {
    let timer;
    return function () {
        const self = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(self, args), wait);
    }
}
