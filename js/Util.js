/*!
 * 浏览器检测
 * detectDevice
 */
function detectDevice(){const i={Android:()=>navigator.userAgent.match(/Android/i),BlackBerry:()=>navigator.userAgent.match(/BlackBerry/i),iOS:()=>navigator.userAgent.match(/iPhone|iPad|iPod/i),Windows:()=>navigator.userAgent.match(/IEMobile|Windows Phone/i),HarmonyOS:()=>navigator.userAgent.match(/HarmonyOS/i),any:function(){return this.Android()||this.BlackBerry()||this.iOS()||this.Windows()||this.HarmonyOS()}},t=navigator.userAgent.match(/Macintosh/i)&&navigator.maxTouchPoints>0&&window.screen.width>768;t&&(i.iOS=()=>!0);const n=("ontouchstart"in window||navigator.maxTouchPoints>0)&&(i.any()||window.screen.width<1024);return{isMobile:i.any(),isDesktop:!i.any(),isTouchDevice:n,isiPad:t}}
/*!
 * 节流
 * throttle
 */function throttle(i,t){let n;return function(){const o=this,a=arguments;clearTimeout(n),n=setTimeout(()=>i.apply(o,a),t)}}