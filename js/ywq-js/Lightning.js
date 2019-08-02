// 轮播
$(function () {
    var speed = 1000;
    var key = 0;
    var timer = setInterval(auto, 2000);

    function auto() {
        key++;
        if (key > 5) {
            $(".slideshow ul").css("left", "0px");
            key = 1;
        }
        $(".slideshow ul").stop().animate({
            "left": -key * 380
        }, speed);
        if (key == 5) {
            $(".slideshow ol li").eq(0).addClass("current").siblings().removeClass("current");
        } else {
            $(".slideshow ol li").eq(key).addClass("current").siblings().removeClass("current");
        }
    }
    $(".slideshow").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(auto, 2000);
    })
    $(".slideshow ol li").hover(function () {
        key = $(this).index();
        $(".slideshow ul").stop().animate({
            "left": -key * 380
        }, speed);
        if (key == 5) {
            $(".slideshow ol li").eq(0).addClass("current").siblings().removeClass("current");
        } else {
            $(".slideshow ol li").eq(key).addClass("current").siblings().removeClass("current");
        }
    })


});

//页面渲染

for (var j = 1; j < 10; j++) {
    Lightning(j);
}

function Lightning(i) {
    $.ajax({
        async: false,
        type: "GET",
        data: {
            num: i,
        },
        dataType: "JSON",
        url: "../../php/ywq-php/LightningShopping.php",
        error: function () {
            alert("服务器连接错误");
        },
        success: function (res) {
            // console.log(res);
            if (i == 1) {
                var str = "";
                for (key in res) {
                    str += `<li>
                    <div class="top-box fl">
                        <a href="#"><img src="${res[key].img_url}" alt="" width="378" height="226"></a>
                        <p>${res[key].intro}</p>
                        <div class="discounts">
                            <img src="${res[key].discounts_url}" alt="" width="88" height="88">
                        </div>
                    </div>
                    <div class="bottom-box clearfix fl">
                        <div class="left-box fl">
                            <a href="#" class="clearfix">
                                <img src="${res[key].logo_url}" alt="" width="100" height="50" class="fl">
                                <span class="fr">${res[key].title}</span>
                            </a>
                        </div>
                        <div class="right-box fr">
                            <i>${res[key].price}</i>
                            <span>元起</span>
                        </div>
                    </div>
                </li>`;
                    $('.goodsLi').html(str);

                };
            } else {
                var str = "";
                str = `<div class="everyday-new container">
                      <div class="everyday-new-title">
                          <p class="list-title">${res[0].header}</p>
                     </div>
                 </div>
            <div class="everyday-ul">
            <div class="container goods">
                <div class="list">
                    <ul class="clearfix goodsLi">`

                for (var j = 0; j < res.length; j++) {
                    str += `
                        <li>
                            <div class="top-box fl">
                                <a href="#"><img src="${res[j].img_url}" alt="" width="378" height="226"></a>
                                <p>${res[j].intro}</p>
                                <div class="discounts">
                                    <img src="${res[j].discounts_url}" alt="" width="88" height="88">
                                </div>
                            </div>
                            <div class="bottom-box clearfix fl">
                                <div class="left-box fl">
                                    <a href="#" class="clearfix">
                                        <img src="${res[j].logo_url}" alt="" width="100" height="50" class="fl">
                                        <span class="fr">${res[j].title}</span>
                                    </a>
                                </div>
                                <div class="right-box fr">
                                    <i>${res[j].price}</i>
                                    <span>元起</span>
                                </div>
                            </div>
                        </li>             
                     `;
                }

                str += `</ul>
                    </div>
                    <div class="more" id="more">
                    <a href="#">查看更多>></a>
                </div>
                </div>
            </div>`
                $(".list_box").append(str);
                // $('.list_box').html(str);

            }
        }


    });

}


// 预告


$.ajax({
    type: "GET",
    dataType: "JSON",
    url: "../../php/ywq-php/proshow.php",
    error: function () {
        alert("服务器连接错误");
    },
    success: function (res) {
        // console.log(res);
        var str = "";
        for (key in res) {
            str += `<li style="${res[key].bgimg_url}">
                        <div class="pre-show-content">
                            <div class="pre-show-logo">
                                <img src="${res[key].logo_url}" width="100" height="50">
                            </div>
                            <div class="pre-show-info">
                                <p>${res[key].title}</p>
                                <div class="pre-show-info-price">
                                    <strong>${res[key].price}</strong>
                                    <span>元起</span>
                                </div>
                            </div>
                        </div>
                        <div class="mask">
                            <p>7月29日上线</p>
                        </div>
                    </li>`
            $('.pre-show>ul').html(str);
        };
    }
});



// 左侧边栏

$(function () {
    $(window).on('scroll', function () {
        $('.everyday-new-title').each(function (i) {
            var scroll = $(window).scrollTop();
            var ofset = $(this).offset().top;
            if ($(window).scrollTop() >= 130) {
                $("#nav").addClass('nav-active')
            } else{
                $("#nav").removeClass('nav-active')
            }

            if ($(window).scrollTop() >= 550) {
                $(".left-nav").show();
            } else {
                $(".left-nav").hide();
            }
            if (ofset - scroll < 100 && ofset >= scroll) {
                $('.left-nav li').css({
                    backgroundImage: 'url(../../images/ywq-images/right-bg-1.png',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'center',
                    color: 'black'
                })
                $('.left-nav li').eq(i).css({
                    backgroundImage: 'url(../../images/ywq-images/right-bg-2.png',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'center',
                    color: 'white'
                })
            }
        })
    })

    $('.left-nav li').on('click', function () {
        $('.left-nav li').css({
            backgroundImage: 'url(../../images/ywq-images/right-bg-1.png',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'center',
            color: 'black'
        })
        $(this).css({
            backgroundImage: 'url(../../images/ywq-images/right-bg-2.png',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'center',
            color: 'white'
        })
        var setTop = $('.everyday-new-title').eq($(this).index()).offset().top;
        $('body,html').stop(true, true).animate({
            scrollTop: setTop
        });
    })

    $('.button-top').click(function(){
        $('body,html').animate({
            scrollTop:0
        })
    })

    $('.left-nav li').hover(function () {
        $(this).css({
            backgroundImage: 'url(../../images/ywq-images/right-bg-3.png',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'center',
            color: '#6d4433'
        })
    }, function () {
        $(this).css({
            backgroundImage: 'url(../../images/ywq-images/right-bg-1.png',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'center',
            color: 'black'
        })
    })
})