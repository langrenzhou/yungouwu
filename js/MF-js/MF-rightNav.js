$(function () {
    // 右侧导航栏动画
    (function () {
        $(window).resize(function () {
            var offsetTop = $(window).height();
            console.log(offsetTop);
            $(".rightnavwrap").css("height", offsetTop);
            $(".rightcont").css("height", offsetTop);

        });
    }());
    (function () {
        $(".box").hover(function () {
            $(this).children(".tip").stop().css({
                "width": "86px",
                "left": "-88px",
            });
            $(this).children(".tipcode").stop().css({
                "width": "150px",
                "left": "-152px",
            });
            $(this).addClass("box1");
        }, function () {
            $(this).children(".tip").stop().css({
                "width": "0px",
                "left": "0px",
            });
            $(this).children(".tipcode").stop().css({
                "width": "0px",
                "left": "-152px",
            });
            $(this).removeClass("box1");
        })
    }());
    //用户信息点击事件
    (function () {
        var flage = true;
        $(".box").click(function () {
            $(this).addClass("box2").siblings(".box").removeClass("box2");
        })
        $(".myinfo").click(function () {
            if (flage) {
                $(".rightcont").show("linear", function () {
                    $(".login-ban").fadeIn().siblings().fadeOut();
                });
                flage = false;
            }else{
                $(".rightcont").hide("linear");
                flage = true;
            }
        });

        $(".cart").click(function () {
            $(".rightcont").show("linear", function () {
                $(".cart-ban").fadeIn().siblings().fadeOut();
            });
            // if(!flage){
            //     $(".cart-ban").fadeIn().siblings().fadeOut();
            // }
        });

        $(".rightarrow").click(function () {
            $(".rightcont").toggle("linear", function () {
                $(".login-ban").fadeOut();
            });
        })
        $(window).on('scroll', function () {
            var scroll = $(window).scrollTop();
            if (scroll > 300) {
                $(".returnTop").css("display", "block");
                $(".returnTop").click(function () {
                    $('body,html').stop().animate({
                        scrollTop: 0
                    });
                });
            } else {
                $(".returnTop").css("display", "none");
            }
        })
        //右侧导航购物车
        $(".lookCart").click(function(){
            window.location.href="./MF-cart.html";
        })
    }());

});