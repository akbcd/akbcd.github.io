/*!
 * 冒泡动画
 * anm.js
 * See https://github.com/litten/hexo-theme-yilia/tree/master/source-src/js/anm.js
 */
function anm() {
    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = false;
    // Main
    initHeader();
    addListeners();
    executeCheck();
    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: 0, y: height };
        largeHeader = document.getElementById('container');
        largeHeader.style.height = height + 'px';
        canvas = document.getElementById('anm-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        // create particles
        circles = [];
        for (var x = 0; x < width * 0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }
    // Event handling
    function addListeners() {
        window.addEventListener('scroll', throttle(scrollCheck, 100));
        window.addEventListener('resize', throttle(resize, 100));
    }
    // performance optimization
    function executeCheck() {
        // get element
        var element = document.getElementById('container');
        // create MutationObserver
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // if it's class
                if (mutation.attributeName === 'class') {
                    // when class has value
                    if (document.getElementById('container').getAttribute('class')) animateHeader = true;
                    // class has no value
                    else animateHeader = false;
                }
            })
        })
        // configure MutationObserver
        var config = { attributes: true }
        observer.observe(element, config)
    }
    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }
    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }
    // Canvas manipulation
    function Circle() {
        var _this = this;
        // constructor
        (function () {
            _this.pos = {};
            init();
            //console.log(_this);
        })();
        function init() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = height + Math.random() * 100;
            _this.alpha = 0.1 + Math.random() * 0.3;
            _this.scale = 0.1 + Math.random() * 0.3;
            _this.velocity = Math.random();
        }
        this.draw = function () {
            if (_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
            ctx.fill();
        };
    }
}
