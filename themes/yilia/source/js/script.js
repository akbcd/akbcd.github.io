"use strict";var progressElement=window.document.querySelector(".progress-bar");if(progressElement){new ScrollProgress(function(x,y){progressElement.style.width=y*100+"%"
})}$(".toc-child").hide();$(".toc-link").on("click",function(e){e.preventDefault();
toToc($(this).attr("href"))});var expandToc=function expandToc($item){if($item.is(":visible")){return
}$item.fadeIn(400)};var isanchor=yiliaConfig.anchor;var updateAnchor=function updateAnchor(anchor){if(window.history.replaceState&&anchor!==window.location.hash){window.history.replaceState(undefined,undefined,anchor)
}};$("#container").scroll(function(){var currentTop=$(this).scrollTop();findPcHeadPosition(currentTop)
});$(window).scroll(function(){var currentTop=$(this).scrollTop()||document.documentElement.scrollTop;
findMobileHeadPosition(currentTop+50)});var findPcHeadPosition=function findPcHeadPosition(top){if($(".toc-link").length===0){return false
}var list=$(".article-entry").find("h1,h2,h3,h4,h5,h6");var currentId="";list.each(function(){var head=$(this);
if(top>head.position().top){currentId="#"+$(this).attr("id")}});if(currentId===""){$(".toc-link").removeClass("active");
$(".toc-child").hide()}var currentActive=$(".toc-link.active");if(currentId&&currentActive.attr("href")!==currentId){if(isanchor){updateAnchor(currentId)
}$(".toc-link").removeClass("active");var _this=$('.toc-link[href="'+currentId+'"]');
_this.addClass("active");var parents=_this.parents(".toc-child");var topLink=parents.length>0?parents.last():_this;
expandToc(topLink.closest(".toc-item").find(".toc-child"));topLink.closest(".toc-item").siblings(".toc-item").find(".toc-child").hide()
}};var findMobileHeadPosition=function findMobileHeadPosition(top){if($(".toc-link").length===0){return false
}var list=$(".article-entry").find("h1,h2,h3,h4,h5,h6");var currentId="";list.each(function(){var head=$(this);
if(top>head.offset().top-25){currentId="#"+$(this).attr("id")}});if(currentId===""){$(".toc-link").removeClass("active");
$(".toc-child").hide()}var currentActive=$(".toc-link.active");if(currentId&&currentActive.attr("href")!==currentId){if(isanchor){updateAnchor(currentId)
}$(".toc-link").removeClass("active");var _this=$('.toc-link[href="'+currentId+'"]');
_this.addClass("active");var parents=_this.parents(".toc-child");var topLink=parents.length>0?parents.last():_this;
expandToc(topLink.closest(".toc-item").find(".toc-child"));topLink.closest(".toc-item").siblings(".toc-item").find(".toc-child").hide()
}};function toToc(name){var scrollPositionTop=$(name).position().top+50;$("#container").animate({scrollTop:scrollPositionTop},1000);
var scrollOffset=$(name).offset();$("body,html").animate({scrollTop:scrollOffset.top-50})
};