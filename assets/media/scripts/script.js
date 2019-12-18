/**
 * ViewImage.js
 * https://tokinx.github.io/view-image
 */
!
function(a) {
    a.extend({
        viewImage: function(b) {
            var c = a.extend({
                target: ".view-image img",
                exclude: "",
                delay: 300
            }, b);
            a(c.exclude).attr("view-image", !1), a(c.target).click(function() {
                var b = a(this).attr("src"),
                    d = a(this).attr("href"),
                    e = "",
                    f = "<style class='view-image-css'>.view-img{position:fixed;background:#fff;background:rgba(255,255,255,.92);width:100%;height:100%;top:0;left:0;text-align:center;padding:2%;z-index:999;cursor: zoom-out}.view-img img,.view-img span{max-width:100%;max-height:100%;position:relative;top:50%;transform: translateY(-50%);}.view-img img{animation:view-img-show .8s -0.1s ease-in-out}.view-img span{height:2em;color:#AAB2BD;overflow:hidden;position:absolute;top:50%;left:0;right:0;width:120px;text-align:center;margin:-1em auto;}.view-img span:after{content:'';position:absolute;bottom:0;left:0;transform: translateX(-100%);width:100%;height:2px;background:#3274ff;animation:view-img-load .8s -0.1s ease-in-out infinite;}@keyframes view-img-load{0%{transform: translateX(-100%);}100%{transform: translateX(100%);}}@keyframes view-img-show{0%{opacity:0;}100%{opacity:1;}}</style>";
                return a(this).attr("view-image") || a(this).attr("rel") ? void 0 : (e = b ? b : d, a("body").append(f + "<div class='view-img'><span>loading...</span></div>"), setTimeout(function() {
                    var b = new Image;
                    b.src = e, b.onload = function() {
                        a(".view-img").html("<img src=" + this.src + ">")
                    }, a(".view-img").click(function() {
                        a(".view-image-css").remove(), a(this).remove()
                    })
                }, c.delay), !1)
            })
        }
    })
}(jQuery);


// Run when the DOM ready
jQuery( function ( $ ) {

	var clickEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

	/**
	 * Scroll to top
	 */
	function scrollToTop() {
		var $window = $( window ),
			$button = $( '#scroll-to-top' );
		$window.scroll( function () {
			$button[$window.scrollTop() > 100 ? 'removeClass' : 'addClass']( 'hidden' );
		} );
		$button.on( clickEvent, function ( e ) {
			e.preventDefault();
			$( 'body, html' ).animate( {
				scrollTop: 0
			}, 500 );
		} );
	}

	scrollToTop();
} );


// 点击事件
jQuery(document).ready(function($) {
 	btn_click("#mStats", "stats_click", "stats_close"); //站点统计
 	btn_click("#mClick", "mobile_click", "mobile_close"); //二维码
	function btn_click(btn, on, off) {
		 flag=true;
		   $(btn).click(function () {
		       $(btn).prop('class', (flag = !flag) ? on : off);
		   });
	}
});


// 文章目录点击显示隐藏
$(document).ready(function(){
    $(".icon-list").click(function(){
        $(".fn_article_nav").toggle();
    });
});


// 移动端导航
var mNavlist = $('.js-m-navlist');

mNavlist.on('click', function () {
    var addclass = $(this).parent('.m_nav-list').data('cssclass'),
        isShowed = $(this).parent('.m_nav-list').hasClass(addclass);

    /* calculation the client height */
    var clientHeight = document.documentElement.clientHeight,
        setHeight = clientHeight * 1 + 'px',
        padding = clientHeight * 0.22 + 'px',
        navWrapper = $('.m_nav-wrapper');

    navWrapper.css({
        'height': setHeight,
        'padding': padding + ' 0 ' + padding,
        'transform': 'translate3d(0,-' + clientHeight + 'px,0)',
    });

    /* if it is showed */
    if (isShowed) {
        $(this).parent('.m_nav-list').removeClass(addclass);
        /* hide the navlist */
        navWrapper.css({
            'transform': 'translate3d(0,-' + clientHeight + 'px,0)'
        });

    } else {
        /* if it is closed */
        $(this).parent('.m_nav-list').addClass(addclass);
        /* show the navlist */
        navWrapper.css({
            'transform': 'translate3d(0,0,0)'
        });
    }
});


// hljs行号
$("pre code").each(function(){
  $(this).html("<ol><li>" + $(this).html().replace(/\n/g,"\n</li><li>") +"\n</li></ol>");
});


// 获取图片alt信息
$(".entry-content p img,.lonesome-img a img").each(function(){ 
    $("<figcaption class='image_title'></figcaption>").insertAfter(this); 
    var thisImage = $(this).parents('.entry-content p,.lonesome-img a').find('img'); 
    var title = thisImage.attr('alt'); 
    $(this).siblings('.image_title').html(title); 
});


// 将footer固定到底部
$(function(){
    function footerPosition(){
        $("footer").removeClass("fixed-bottom");
        var contentHeight = document.body.scrollHeight,//网页正文全文高度
            winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
        if(!(contentHeight > winHeight)){
            //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
            $("footer").addClass("fixed-bottom");
        } else {
            $("footer").removeClass("fixed-bottom");
        }
    }
    footerPosition();
    $(window).resize(footerPosition);
});


// 给不是图片链接的a标签里加rel
const regx = /\.(jpe?g|png)(?=\?|$)/i; // 正则表达式
$('.entry-content').find('a').each(function(){
    const href = $(this).attr('href');
    const isImg = regx.test(href); // 正则表达式与目标字符串是否匹配
    if (!isImg) {
        $(this).attr('rel', 'external');
    }
});


// 文章目录锚链接滑动
$(document).ready(function() {
    $('.toc a').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top+-60+'px';
                $('html,body').animate({
                    scrollTop: targetOffset
                },
                500);
                return false;
            }
        }
    });
});
