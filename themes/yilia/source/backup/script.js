// progress bar init
const progressElement = window.document.querySelector('.progress-bar');
if (progressElement) {
    new ScrollProgress((x, y) => {
        progressElement.style.width = y * 100 + '%';
    });
}