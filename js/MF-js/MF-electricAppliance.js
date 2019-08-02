
$(function () {
    //左侧导航
    (function () {
        $(".leftmune li").hover(function () {
            $(this).css("background", "#fff").find(".list-title").css("color", "#000").parent().parent().siblings().css("background", "#0897de");
            $(this).find(".list-tit .icon").css("color", "#000");
            $(this).children(".list-con").children("a").css("color", "#666");
            $(this).children(".list-con").children(".MO").css("color", "#0897de");
            $(this).children(".nav-list").css("display", "block").parent().siblings().children(".nav-list").css("display", "none");
        }, function () {
            $(this).css("background", "#0897de").find(".list-title").css("color", "#fff");
            $(this).find(".list-tit .icon").css("color", "#fff");
            $(this).children(".list-con").children("a").css("color", "#cfefff");
            $(this).children(".list-con").children(".MO").css("color", "#fff100");
            $(this).children(".nav-list").css("display", "none");
        });
    }());

    //渐隐渐现轮播
    (function () {
        var length = $(".main-img a").length;
        var i = 0;
        var timer;

        function counter() {
            timer = setInterval(function () {
                i++;
                lunbo();
            }, 2000);
        }
        counter();

        $(".lunbo").hover(function () {
            clearInterval(timer);
        }, function () {
            counter();
        });
        $(".main-doct li").click(function () {
            i = $(this).index();
            lunbo();
        });

        function lunbo() {
            if (i > length - 1) {
                i = 0;
            }
            $(".main-img a").eq(i).stop().fadeIn().siblings().stop().fadeOut();
            $(".main-doct li").eq(i).addClass("doctBackground").siblings().removeClass("doctBackground");
        }
    }());

    //点击展开出现更多商品
    (function () {
        //数据请求
        var start = 0;
        var flag = true;
        AjaxMore();
        // console.log(num);
        function AjaxMore() {
            $.ajax({
                url: '../../php/MF-php/MF-electricAppliance.php',
                type: 'get',
                dataType: 'json',
                error: function () {
                    console.log("数据请求失败！");
                },
                data: {
                    start: start,
                    num: 5,
                    id: 4
                },
                success: function (res) {
                    //console.log(res);
                    var html = "";
                    var i = 0;
                    for (i = 0; i < res.length; i++) {
                        html += `
                 <li>
                 <div>
                     <img src="${res[i].img_url}" alt="图片">
                     <p><a href="javascript:">${res[i].title}</a></p>
                     <p class="price">${res[i].price}</p>
                 </div>
                 <div class="buy-tip">
                    <a href="javascript:">
                        立即购买
                    </a>
                 </div>

             </li>
                 `
                    }
                    //console.log(i);
                    if (flag) {
                        $(".list-v").html(html);
                    } else {
                        $(".list-h").html(html);
                    }
                }
            })
        }

        //更多商品的点击事件
        $(".more").click(function () {
            if (flag) {
                flag = false;
                start = 5;
                // top = $(this).offset().top;
                AjaxMore();
                $(this).siblings(".list-hidden").slideDown(500);
                $(this).find("i").removeClass("icon-jiantou-shang-cuxiantiao").addClass("icon-jiantou-xia-cuxiantiao");
            } else {
                $(this).siblings(".list-hidden").slideUp(500);
                $(this).find("i").addClass(".icon-shangjiantou").removeClass("icon-jiantou-xia-cuxiantiao");
                flag = true
            }
        });
    }());


    //无缝轮播
     (function () {
        $('.banner1').myBanner({
             speed: 500,
            // interval: 2000
        });
        $('.banner2').myBanner({
            speed: 500,
            interval: 2000
        })
        $('.banner3').myBanner({
            speed:500,
            interval:2000
        })

     }());

    //楼层商品展示
    (function () {
        //数据请求
        var num = 0;
        var j;
        for (j = 1; j <= 3; j++) {
            AjaxMore(j);
        }
        function AjaxMore(k) {
            $.ajax({
                url: '../../php/MF-php/MF-electricAppliance.php',
                type: 'get',
                dataType: 'json',
                error: function () {
                    console.log("数据请求失败！");
                },
                data: {
                    start: 0,
                    num: 6,
                    id: k
                },
                beforeSend: function () {
                    // $.loading()
                    if (k == 1) {
                        $(".first").html('<img src="../../images/MF-image/MF-commodity/loading3.gif" alt="" class="loadImg"/>');
                    }
                    if (k == 2) {
                        $(".second").html('<img src="../../images/MF-image/MF-commodity/loading3.gif" alt="" class="loadImg"/>');
                    }
                    if (k == 3) {
                        $(".third").html('<img src="../../images/MF-image/MF-commodity/loading3.gif" alt="" class="loadImg"/>');
                    }
                    
                },
                complete: function () {
                    // $.loading("hide")
                },
                success: function (res) {
                    // console.log(res);
                    var html = "";
                    var i = 0;
                    for (i = 0; i < res.length; i++) {
                        html += `
                            <li>
                            <div class="listname">
                                <a href="../../html/MF-html/MF-commodity.html">${res[i].title}</a>
                            </div>
                            <div class="listtitle">
                                <span>${res[i].content}</span>
                            </div>
                            <div class="listprice">${res[i].price}</div>
                            <div class="listimg">
                                <a href="../../html/MF-html/MF-commodity.html">
                                    <img src="${res[i].img_url}" alt="图片">
                                </a>
                            </div>
                        </li>
                            `
                    }
                    if (k == 1) {
                        $(".first").html(html);
                    }
                    if (k == 2) {
                        $(".second").html(html);
                    }
                    if (k == 3) {
                        $(".third").html(html);
                    }
                }
            })
        }
    }());

    //排行榜信息
    (function () {
        //数据请求
        var j;
        for (j = 1; j <= 3; j++) {
            AjaxMore(j);
        }
        function AjaxMore(k) {
            $.ajax({
                url: '../../php/MF-php/MF-electricAppliTop.php',
                type: 'get',
                dataType: 'json',
                error: function () {
                    console.log("数据请求失败！");
                },
                data: {
                    id: k
                },
                success: function (res) {
                    console.log(res);
                    var html = "";
                    var i = 0;
                    for (i = 0; i < res.length; i++) {
                        html += `
                                <li>
                                <div class="sel-con clearfix">
                                    <div class="contitle">
                                        <a href="../../html/MF-html/MF-commodity.html">${res[i].title}</a>
                                    </div>
                                    <div class="conprice">
                                        <p class="selprice">${res[i].price}</p>
                                    </div>
                                </div>
                                <div class="select">
                                    <div class="selectinfo">
                                        <p class="info">
                                            <a href="../../html/MF-html/MF-commodity.html">${res[i].title}</a>
        
                                        </p>
                                        <p class="selprice">${res[i].price}</p>
                                    </div>
                                    <div class="selectimg">
                                        <img src="${res[i].img_url}" alt="图片">
                                    </div>
                                </div>
                            </li>
                                `
                    }
                    if (k == 1) {
                        $(".first-top").html(html);
                    }
                    if (k == 2) {
                        $(".second-top").html(html);
                    }
                    if (k == 3) {
                        $(".third-top").html(html);
                    }
                }
            })
        }

        //TOP榜
        $(".top-name:first").css("background", "red");
        $(".top-name").on("mouseenter", "li", function () {
            $(this).css("height", "104px").children(".sel-con").css("display", "none").siblings(".select").css("display", "block");
        })
        $(".top-name").on("mouseleave", "li", function () {
            $(this).css("height", "47px").children(".sel-con").css("display", "block").siblings(".select").css("display", "none");
        })
    }());


})
