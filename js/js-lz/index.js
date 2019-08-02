$(function () {
    // 引入header.html
    $("#header").load("./header.html");

    // 引入footer.html
    $("#footer").load("./footer.html");

    // 引入右侧导航
    $("#right_nav_wrap").load("../MF-html/MF-rightNav.html");

    // 登录
    function show_login() {
        $("#right_nav_wrap .rightcont").toggle(1, function () {
            $(".login-ban").fadeIn().siblings().fadeOut();
        });
    }
    $(".loginTips>a").click(function () {
        show_login();
    })
    $(".bannerRightWrap>.top>div:nth-child(2) a:first-child").click(function(){
        show_login();
    })

    // 点击del 图片和遮罩层均消失
    $(".regist>.del").click(function () {
        $(this).parent().fadeOut().prev().fadeOut();
    })
        // 渐隐渐现轮播图
        ; (function () {
            // 设置全局变量
            var $li = $(".slideShow>li")
            var n = $li.length;
            var _index = 0;

            // dotBar
            var $dotBar = $(".slideShowWrap>.dotBar");
            var _html = "";
            for (var i = 1; i <= n; i++) {
                _html += "<li class='fl'><a></a></li>";
            }
            $dotBar.html(_html);
            var _width = $dotBar.width();
            $dotBar.css("marginLeft", -(_width / 2));
            var $dotBarLi = $(".slideShowWrap>.dotBar>li");

            // 自动轮播 
            function fadetype() {
                $li.eq(_index).fadeIn().siblings().fadeOut();
                $dotBarLi.eq(_index).children().css("backgroundColor", "#000").parent().siblings().children().css("backgroundColor", "#fff");
            }

            // 设置默认第一个圆点背景色为黑色
            $dotBarLi.eq(_index).children().css("backgroundColor", "#000").parent().siblings().children().css("backgroundColor", "#fff");

            // 先执行一次自动播放，解决刚打开页面时的延时轮播问题
            _index++;
            fadetype();

            // 自动播放
            var timer = setInterval(function () {
                _index++;
                _index = _index == n ? 0 : _index;
                fadetype();
            }, 3000)

            // 左右点击切换
            var $left = $(".slideShowWrap>.slide_left");
            var $right = $(".slideShowWrap>.slide_right");
            $(".slideShowWrap").mouseenter(function (e) {
                clearInterval(timer);
                $left.fadeIn();
                $right.fadeIn();
            })
            $(".slideShowWrap").mouseleave(function (e) {
                timer = setInterval(function () {
                    _index++;
                    _index = _index == n ? 0 : _index;
                    fadetype();
                }, 3000)
                $left.fadeOut();
                $right.fadeOut();
            })
            $left.click(function () {
                _index = _index == 0 ? n - 1 : _index - 1;
                fadetype();
            })
            $right.click(function () {
                _index = _index == n - 1 ? 0 : _index + 1;
                fadetype();
            })

            // 点击某个小圆点切换到对应图片
            $dotBarLi.click(function () {
                _index = $(this).index();
                fadetype();
            })
        })()

    // ajax渲染bannerLeft内容
    $.ajax({
        url: "../../php/php-lz/bannerLeft.php",
        dataType: "json",
        success: function (res) {
            res[0].text
            var _html = "";
            for (var i = 0; i < res.length; i++) {
                var _text = res[i].text;
                var _i = (-i * 30) + "px";
                _html += `<li><i style=' background-position: 0 ${_i}'></i><a href=''> ${_text}</a><div class="menuWrap pa pr">
                <div class="menu clearfix">
                    <div class="leftCont fl">
                        <ul>
                            <li>
                                <dl class="clearfix">
                                    <dd class="fl">
                                        <a href="">美妆护肤 &gt;</a>
                                    </dd>
                                    <dt class="fl">
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                    </dt>
                                </dl>
                            </li>
                            <li>
                                <dl class="clearfix">
                                    <dd class="fl">
                                        <a href="">美妆护肤 &gt;</a>
                                    </dd>
                                    <dt class="fl">
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                    </dt>
                                </dl>
                            </li>
                            <li>
                                <dl class="clearfix">
                                    <dd class="fl">
                                        <a href="">美妆护肤 &gt;</a>
                                    </dd>
                                    <dt class="fl">
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                    </dt>
                                </dl>
                            </li>
                            <li>
                                <dl class="clearfix">
                                    <dd class="fl">
                                        <a href="">美妆护肤 &gt;</a>
                                    </dd>
                                    <dt class="fl">
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                    </dt>
                                </dl>
                            </li>
                            <li>
                                <dl class="clearfix">
                                    <dd class="fl">
                                        <a href="">美妆护肤 &gt;</a>
                                    </dd>
                                    <dt class="fl">
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                        <a href="">面膜</a>
                                    </dt>
                                </dl>
                            </li>
                     
                            
                        </ul>
                    </div>
                    <div class="rightImg fr">
                        <a href="">
                            <img src="../../images/image-lz/banner-img1.jpg">
                        </a>
                        <a href="">
                            <img src="../../images/image-lz/banner-img1.jpg">
                        </a>
                    </div>
                </div>
            </div></li>`;
            }
            $(".bannerLeft").html(_html);
        }
    })

        // superGroup
        ; (function () {
            // ajax获取数据
            $.ajax({
                url: "../../php/php-lz/d_supergroup.php",
                dataType: "json",
                success: function (res) {
                    var _html = "";
                    for (var i = 0; i < res.length; i++) {
                        var _price = res[i].d_price.slice(1);
                        _html += `<li class="fl pr">
                                    <div>
                                        <a href="">
                                            <img src="${res[i].d_src}">
                                        </a>
                                    </div>`;
                        if (res[i].d_ticket) {
                            _html += `<div class="pa">${res[i].d_ticket}</div>`;
                        } else {
                            _html += `<div class="pa" style="background: #fff;"></div>`;
                        }
                        _html += `<div class="intro">
                                        <a href="">${res[i].d_text}</a>
                                    </div>
                                    <p>￥<span>${_price}</span></p>
                                    <p>${res[i].d_rprice}</p>
                                </li>`;
                    }
                    $(".superGroup>.img_right_wrap>ul").html(_html);
                    $(".img_right_wrap>.nav>.right").click(function () {
                        $(this).fadeOut().prev().fadeIn().parent().prev().animate({
                            "left": "-966px"
                        })
                    })
                    $(".img_right_wrap>.nav>.left").click(function () {
                        $(this).fadeOut().next().fadeIn().parent().prev().animate({
                            "left": "0"
                        })
                    })
                }
            })
        })()

        // .featureChannel>.left_lubo
        ; (function () {
            var $li = $(".featureChannel>.left_lubo>.nav li");
            var $lubo = $(".featureChannel>.left_lubo");
            var $ul = $(".featureChannel>.left_lubo>ul");
            $ul.children("li:first-child").clone().appendTo($ul);
            $ul.width("915px");
            function process() {
                $li.eq(0).find(".process").animate({
                    "width": "30px"
                }, 1000, function () {
                    $(this).css("width", 0);
                    $ul.animate({
                        "left": "-305px"
                    }, 1000, function () {
                        $li.eq(1).find(".process").animate({
                            "width": "30px"
                        }, 1000, function () {
                            $(this).css("width", 0);
                            $ul.animate({
                                "left": "-610px"
                            }, 1000, function () {
                                $ul.css("left", 0);
                            })
                        })
                    })
                })
            }

            process();
            var timer = setInterval(function () {
                process();
            }, 4000)

            $lubo.hover(function () {
                clearInterval(timer);
            }, function () {
                timer = setInterval(function () {
                    process();
                }, 4000)
            })
        })()

    // .featureChannel>.right_imgs
    $.ajax({
        url: "../../php/php-lz/d_f_c_imgs.php",
        dataType: "json",
        success: function (res) {
            var _html = "";
            for (var i = 0; i < res.length; i++) {
                _html += `<li class="fl">
                            <a href="">
                                <img src="${res[i].img_src}">
                            </a>
                        </li> `;
            }
            $(".featureChannel>.right_imgs>ul").html(_html);
        }
    })

    // ajax 获取猜你喜欢部分的数据
    $.ajax({
        url: "../../php/php-lz/d_guesslike.php",
        dataType: "json",
        success: function (res) {
            var _html = "";
            for (var i = 0; i < res.length; i++) {
                _html += `<li class="fl">
                            <div class="img">
                                <a href="">
                                    <img src="${res[i].img_src}">
                                </a>
                            </div>
                            <div class="intro">
                                <a href="">${res[i].text}</a>
                            </div>
                            <div class="price_collect">
                                <div class="price fl"><span>￥</span>${res[i].price}</div>
                                <div class="collect fr">
                                    <a href=""><i class="iconfont icon-aixin1"></i>收藏</a>
                                </div>
                            </div>
                        </li>`;
            }
            $(".guess>.productArea>ul").html(_html);
            $(".productArea>ul>li:first").addClass("pr").append("<div class='mask_layer pa'></div>")
        }
    })
})