$(".showImg>.box").hover(function () {
    $(this).find(".polish").animate({
        width: "1200px"
    }, 300);
}, function () {
    $(this).find(".polish").css({
        width: "100px"
    }, 0.4);
});
// 楼层导航
$(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= 600) {
            $(".floorNav").show();
        } else {
            $(".floorNav").hide();
        }
        $('.floor_nav').each(function (i) {
            var scroll = $(window).scrollTop();
            var ofset = $(this).offset().top;
            if (ofset - scroll < 400) {
                $('#item li').eq(i).children(".list").show().parent().siblings().children('.list').hide();
            }
        });
    });
    $('#item li').hover(function () {
        $(this).children(".list").show();
    }, function () {
        $(this).children(".list").hide();
    })
    $('#item li').on('click', function () {
        var setTop = $('.floor_nav').eq($(this).index()).offset().top;
        $('body,html').stop(true, true).animate({
            scrollTop: setTop - 100
        });

    });
    $(".topscoll").click(function () {
        $("body,html").animate({
            scrollTop: 0
        }, 500)
    });
});

(function () {
    var arr = [];
    var str = "";
    var content = [];
    var img_url = [];
    var show_img = [];
    var position = 0;
    var hot_Pro = [];
    for (var i = 1; i <= 5; i++) {
        littleNew();
    }

    function littleNew() {
        $.ajax({
            type: "GET",
            data: {
                num: i,
            },
            dataType: "JSON",
            url: "../../php/php-dc/Daily_lifeDC.php",
            error: function () {
                // alert("服务器连接错误");
            },
            success: function (res) {
                var title = "";
                for (key in res) {
                    if (res[key].content != null) {
                        content = (res[key].content.split(","));
                        var titleList = "";
                        for (var i = 0; i < content.length; i++) {
                            titleList += `<li class="titleList">
                                <a href="#">${content[i]}</a></li>`;
                        };
                    };
                    img_url = (res[key].leng_img_url.split("&"));
                    var img_urlStr = "";
                    for (var i = 0; i < img_url.length; i++) {
                        img_urlStr += `<li class="logo">
                     <img src="${img_url[i]}">
                    </li>`;
                    };
                    show_img = res[key].show_img;
                    position = res[key].position;
                    hot_Pro = (res[key].hot_Pro.split(","));
                    var hot_ProStr = "";
                    for (var i = 0; i < hot_Pro.length; i++) {
                        hot_ProStr +=
                            `<a href="#" class="hot_Pro">${hot_Pro[i]}</a><span >|</span>`;
                    };
                    for (var i = 0; i < 6; i++) {
                        title += ` <li class="listPro fl">
        <a href=" ../html-wyh/detaill.html" class="title">${res[i].title}</a>
        <span class="price">${res[i].price}</span>
        <a href=" ../html-wyh/detaill.html"><img src="${res[i].img_url}" alt="" class="moveImg"></a>
    </li>`;
                    }
                }
                str += `
                    <div class="title_Box clearfix">
                    <div class="right fr">${hot_ProStr}</div>
                    </div>
                    <div class="proList floor_nav">
                    <div class="pro-left fl">
                        <i class="titleImg" style="background-position: 0 ${position}px"></i>
                        <ul class="titleBox">
                            ${titleList}
                        </ul>
                        <ul class="cplogo">
                            ${img_urlStr}
                        </ul>
                    </div>
                    <div class="show_img fl">
                        <img src="${show_img}">
                    </div>
                    <ul class="proRight">
                    ${title}
                    </ul>
                </div>    `;
                $(".applyPro").html(str);
            },

        });
    };

}());

