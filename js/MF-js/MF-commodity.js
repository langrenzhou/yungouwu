$(function () {
    (function () {
        var html = "";
        var flage = true;
        var more = true;
        //品牌数据请求
        $.ajax({
            url: '../../php/MF-php/MF-commodityCount.php',
            type: 'get',
            dataType: 'json',
            error: function () {
                console.log("数据请求失败！");
            },
            success: function (res) {
                console.log(res);
                var totalnum = parseInt(res.num);

                var num = totalnum - 16;
                AjaxCommodity(0, 16);
                $(".btn-b1").click(function () {
                    if (more) {
                        // var commli = true;
                        AjaxCommodity(16, num);
                        $(".btn-b1 span").html("收起");
                        more = false;
                    } else {
                        html = "";
                        AjaxCommodity(0, 16);
                        $(".btn-b1 span").html("展开");
                        $(".hdl").css("display", "none");
                        more = true;
                    }
                });
                $(".fil-btn-a").click(function () {
                    if (flage) {
                        // var commli = true;
                        AjaxCommodity(16, num);

                        $(".hdl").css("display", "block");
                        $(".list-class1").on("click", "li", function () {
                            $(this).children("i").toggle();
                            $(this).children("span").toggle();
                            $(this).toggleClass("commli");
                        });
                        flage = false;
                    } else {
                        html = "";
                        AjaxCommodity(0, 16);
                        $(".hdl").css("display", "none");
                        flage = true;
                    }
                });
            }
        })

        function AjaxCommodity(start, num) {
            $.ajax({
                url: '../../php/MF-php/MF-commodity.php',
                type: 'get',
                dataType: 'json',
                error: function () {
                    console.log("数据请求失败！");
                },
                data: {
                    start: start,
                    num: num,
                },
                success: function (res) {
                    console.log(res);
                    for (var i = 0; i < res.length; i++) {
                        html += `
                        <li>
                        <span>`
                        if (res[i].img_url !== "undefined") {
                            html += `<img src="${res[i].img_url}" alt="">`
                        } else {
                            html += `无品牌`
                        }
                        html += `</span>
                        <i class="pathtitle">${res[i].title}</i>
                        </li>
                        `;
                    }
                    $(".list-class1").html(html);
                }
            })
        }
        if (flage) {
            $(".list-class1").on("click", "li", function () {
                $(".pathclip-mid").css("display", "block");
                var listtitle = $(this).children("i").text();
                console.log(listtitle);
                $(".path-title").html(listtitle);
            });
        }

        $(".pathclip-brand .path-delete").click(function () {
            console.log(1);
            $(".path-title").html("");
            $(".pathclip-mid").css("display", "none");
        });
    }());

    (function () {
        var page = 1;
        $.ajax({
            url: '../../php/MF-php/MF-commodityCount1.php',
            type: 'get',
            dataType: 'json',
            error: function () {
                console.log("数据请求失败！");
            },
            success: function (res) {
                console.log(res);
                var num = parseInt(res.num);
                $(".totalmod").html(num);
                var count = parseInt(num / 50) + 1;
                console.log(count);
                $(".seque-total").text(count);
                var pageCont = "";
                for (var j = 2; j <= count - 1; j++) {
                    pageCont += `
                    <div class="middlepage">${j}</div>
                    `;
                }
                $(".pagewrap").html(pageCont);
                CommidityIntro(page);
            }
        })

        //商品
        function CommidityIntro(page) {
            $.ajax({
                url: '../../php/MF-php/MF-commodity1.php',
                type: 'get',
                dataType: 'json',
                error: function () {
                    console.log("数据请求失败！");
                },
                data: {
                    page: page
                },
                beforeSend: function () {
                    // $.loading()
                    $(".commolistpage").html('<img src="../../images/MF-image/MF-commodity/loading3.gif" alt="" class="loadImg"/>');
                },
                complete: function () {
                    // $.loading("hide")
                },
                success: function (res) {
                    console.log(res);
                    var html = "";
                    for (var i = 0; i < res.length; i++) {
                        html += `
                        <li>
                        <div class="commkands-img">
                        <img
                            src="${res[i].img_url}"
                            alt=""
                        />
                        </div>
                        <div class="commoney clearfix">
                        <div class="commoneyleft">
                        <span class="com-moneyl">${res[i].price}</span>
                        </div>`
                        if (res[i].money_fr !== "") {
                            html += `
                        <div class="commoneyright">
                                <span class="com-moneyl">${res[i].money_fr}</span>
                        </div>`
                        }

                        html += `
                        </div>
                        <div class="newtitle">`
                        if (res[i].new_pro) {
                            html += `
                        <span class="con-newp">${res[i].new_pro}</span>
                        `
                        }
                        html += `
                        <span>
                            <a href="" class="com-introd">
                            ${res[i].pro_title}
                            </a>
                        </span>
                        </div>
                        `
                        if (res[i].pro_top != "undefined") {
                            html += `
                        <div class="comtro">
                                <i class="iconfont icon-huangguan"></i>
                                <span>在</span>
                                <a href=""><span>${res[i].pro_top}</span></a>
                                <span>中</span>
                                <a href=""><span>畅销</span></a>
                        </div>`
                        } else if (res[i].pro_assess_num != "" && res[i].pro_assess_new != "") {
                            html += `
                         <div class="userwrite">
                                <i class="iconfont icon-liuyan"></i>
                                <span class="writenum">${res[i].pro_assess_num}</span>
                                <i class="iconfont icon-zan1"></i>
                                <span class="userzan">${res[i].pro_assess_new}</span>
                        </div>`
                        } else {
                            html += `
                        <div class="comtro">
                        </div>
                        `
                        }
                        html += `
                        <p class="productor">${res[i].pro_assess}</p>
                        <div class="addCart">
                        <span>加入购物车</span>
                        <input type="hidden" value="${res[i].Id}" class="comId">
                        </div>
                    </li>
                `;
                    }

                    $(".commolistpage").html(html);
                }
            })
        }

        //页码点击事件
        $(".pagelist>li>.middlepage").click(function () {
            var pagenum = parseInt($(this).text());
            page = pagenum;
            $(".seque-num").text(page);
            CommidityIntro(page);
            console.log(pagenum);
            console.log(typeof pagenum)
            if (page == 1) {
                $(".firstpage").css("display", "none");
                $(".pagewrap").css("marginLeft", 0);
                $(".firstespi").css("display", "none");
                $(".lastespi").css("display", "block");
                $(".lastpage").css("display", "block");
            }
            if (page == 21) {
                $(".lastespi").css("display", "none");
                $(".lastpage").css("display", "none");
                $(".firstespi").css("display", "block");
                $(".firstpage").css("display", "block");
                $(".pagewrap").css("marginLeft", -(20 - 5) * 36);
            }
            $(this).addClass("backg").parent().siblings().children(".middlepage").removeClass("backg");
            $(this).parent().siblings(".middlepages").find(".middlepage").removeClass("backg");
        });
        $(".pagelist>li>.pagewrap").on("click", ".middlepage", function () {
            // var pagenum=$(this).text();
            var pagenum = parseInt($(this).text());
            page = pagenum;
            $(".seque-num").text(page);
            CommidityIntro(page);
            var left = -(page - 5) * 36;
            if (page > 5) {
                $(".pagewrap").css("marginLeft", left);
            } else {
                $(".pagewrap").css("marginLeft", 0);
            }
            $(this).addClass("backg").siblings(".middlepage").removeClass("backg");
            $(this).parent().parent().siblings().find(".middlepage").removeClass("backg");
            if (page > 1) {
                $(".firstpage").css("display", "block");
            }
            if (page > 5) {
                $(".firstespi").css("display", "block");
            } else {
                $(".firstespi").css("display", "none");
            }
            if (page <= 20) {
                $(".lastpage").css("display", "block");
            }
            if (page < 20) {
                $(".lastespi").css("display", "block");
            }
            console.log(pagenum);
            console.log(typeof pagenum);
        });
        //点击上一页
        $(".firstpage").click(function () {
            page--;
            $(".page21").removeClass("backg");
            if (page < 2) {
                page = 1;
                $(".middlepage").removeClass("backg").parent().parent().siblings().children(".monpage1").addClass("backg");
                $(".firstespi").css("display", "none");
                $(".lastespi").css("display", "block");
            }
            if (page < 21) {
                $(".lastpage").css("display", "block");
            }
            CommidityIntro(page);
            var left = -(page - 5) * 36;
            $(".middlepage").eq(page - 1).addClass("backg").siblings().removeClass("backg");
            if (page > 5) {
                $(".pagewrap").css("marginLeft", left);
                $(".lastespi").css("display", "block");
            } else {
                $(".pagewrap").css("marginLeft", 0);
            }
            $(".seque-num").text(page);
        })
        //点击下一页
        $(".lastpage").click(function () {
            page++;
            $(".monpage1").removeClass("backg");
            if (page > 20) {
                page = 21;
                $(".firstespi").css("display", "block");
                $(".middlepage").removeClass("backg").parent().parent().siblings().children(".page21").addClass("backg");
                $(".lastespi").css("display", "none");
            }
            CommidityIntro(page);
            var left = -(page - 5) * 36;
            $(".middlepage").eq(page - 1).addClass("backg").siblings().removeClass("backg");
            if (page > 1) {
                $(".firstpage").css("display", "block");
            }
            if (page > 5) {
                $(".pagewrap").css("marginLeft", left);
                $(".firstespi").css("display", "block");
            } else {
                $(".pagewrap").css("marginLeft", 0);
            }
            $(".seque-num").text(page);
        })

        //加入购物车点击事件
        // var comId;
        var html="";
        var tolPrice=0;
        var tolCount=0;
        $(".commolistpage").on("click", "li>.addCart", function () {
            tolCount++;
            comId = $(this).children(".comId").val();
            $.ajax({
                url: '../../php/MF-php/MF-cart.php',
                type: 'get',
                dataType: 'json',
                data: {
                  comId: comId
                },
                error: function () {
                  console.log("数据请求失败！");
                },
                success: function (res) {
                  console.log(res);
                  var str1=res[0].price;
                  var pro_price=parseFloat(str1.slice(1));
                  tolPrice=tolPrice+pro_price;
                  html+=`
                  <li>
                  <div class="rigImg">
                    <img src="${res[0].img_url}" alt="图片">
                  </div>
                  <div class="rightIntroduct">
                    <div><span>${res[0].pro_title}</span></div>
                    <div>
                      <span>${pro_price}</span>
                      <span>x</span>
                      <span>1</span>
                    </div>
                  </div>
                  <div class="rightPrice">
                    <span>￥</span>
                    <span>${pro_price}</span>
                  </div>
                </li>
                  `;
                  $(".product_show").html(html);
                  $("#txtTotalNum").html(tolCount);
                  $(".redDot>span").html(tolCount);
                  $("#txtTotalPrice").html(tolPrice)
                }
            })
            console.log(window.comId);
            cookie("comId", comId, 7)
            // window.comId=comId;
        })
        
        // console.log(window.comId);
        // 设置cookie
        function cookie(user, value, settime) {
            if (settime) {
                var time = new Date();
                time.setTime(time.getTime() + settime * 24 * 60 * 60 * 1000);
                document.cookie = user + "=" + value + ";expires=" + time.toUTCString();
            } else {
                document.cookie = user + "=" + value+";path/";
            }
        }
        cookie("comId", 5, -8)
    }());
})