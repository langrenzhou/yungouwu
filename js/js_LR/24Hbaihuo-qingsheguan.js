(function(){
    $(function () {
        var html = "";
        var htmls = "";
        var yeshu
        var html1 = ""
        var yjt = ""
        var search = location.search
        var num = search.split("&")
        var sj = num[0].split("=")
        var ly = sj[1]
        var page
        var loading=""
        var length
        if (num.length == 1) {
            page = 0;
        } else {
            var pages = num[1].split("=")
            page = pages[1]
        }
        $.ajax({
            url: "http://localhost/BL/php_LR/qingsheguan.php?t_acoods=" + ly + "&page=" + page + "",
            dataType: "json",
            type: "get",
            beford:function(){
                loading+=" <div class='loading_LR'><img src='../th.gif'></div>"
                 $(".header_LR-area").html(loading)
            },
            error: function () {
                alert("请求错误")
            },
            success: function (res) {
                //初始化页面时页面显示的内容
                for (var i = 0; i < res.length; i++) {
                    if (res[i].manxx == "undefined" || res[i].pinglunshu ==
                        "undefined" || res[
                            i].dianzanbaifenbi == "undefined") {
                        html +=
                            "<li class='header_LR-area-ul-li'><div class='header_LR-area-ul-li-area'><div class='image_LR'><a href='' title='" +
                            res[i].title + "'><img src='" + res[i].img_url +
                            "'></a></div><div class='money_LR clear'><p class='p1'><strong>" +
                            res[i].jiage + "</strong></p><p class='p2'>" +
                            res[i].zhekou +
                            "</p></div><div class='header_LR-area-ul-li-area-title'><a href=''>" +
                            res[i].title +
                            "</a></div><div class='header_LR-area-ul-li-area-zhekou'></div><div><span class='iconfont icon-xinxi'>66</span><span class='iconfont icon-zan'>66%</span></div><p class='header_LR-area-ul-li-area-bgzi'>百股自营</p><div class='header_LR-area-ul-li-area-gouwuche'>加入购物车</div> </div></li>"
                    } else {
                        html +=
                            " <li class='header_LR-area-ul-li'><div class='header_LR-area-ul-li-area'><div class='image_LR'><a href='' title='" +
                            res[i].title + "'><img src='" + res[i].img_url +
                            "'></a></div><div class='money_LR clear'><p class='p1'><strong>" +
                            res[i].jiage + "</strong></p><p class='p2'>" +
                            res[i].zhekou +
                            "</p></div><div class='header_LR-area-ul-li-area-title'><a href='' title='" +
                            res[i].title + "'>" + res[i].title +
                            "</a></div><div class='header_LR-area-ul-li-area-zhekou'><a href=''>" +
                            res[i].manxx +
                            "</a></div><div><span class='iconfont icon-xinxi'>" +
                            res[i].pinglunshu +
                            "</span><span class='iconfont icon-zan'>" + res[
                                i].dianzanbaifenbi +
                            "</span></div><p class='header_LR-area-ul-li-area-bgzi'>百股自营</p><div class='header_LR-area-ul-li-area-gouwuche'>加入购物车</div> </div></li>"
                    }
                    $(".remove_LR").remove()
                    $(".header_LR-area-ul").html(html)
                }
            }

        });
        //请求页数的
        $.ajax({
            url: "http://localhost/BL/php_LR/yeshu.php?t_acoods=" + ly + "",
            dataType: "json",
            type: "get",
            error: function () {
                alert("123")
            },
            success: function (asd) {
                yeshu = parseInt(asd.length / 40)
                for (var i = 1; i <= yeshu; i++) {
                    htmls +=
                        `<li class='foot_LR-ul-li'><a href='http://localhost/BL/html_LR/24Hbaihuo-qingsheguan.html?t_acoods=${ly}&page=${i}'>${i}</a></li>`;
                }
                $(".foot_LR-ul").html(htmls)
            }
        })
        //点击右箭头的时候
        $(".yeshu_LRy>a").click(function () {
            page++
            if (page > yeshu) {
                page=yeshu
                $(this).attr("href","#")
                $(".yeshu_LRy").remove()
            } else {
                if (page == 1) {
                    page = 2
                    $(this).attr("href", "http://localhost/BL/html_LR/24Hbaihuo-qingsheguan.html?t_acoods=" +
                ly + "&page=" + page + "")
                } else {
                    page = page
                    $(this).attr("href", "http://localhost/BL/html_LR/24Hbaihuo-qingsheguan.html?t_acoods=" +
                ly + "&page=" + page + "")
                }
            }
        })
        //点击左箭头的时候
        $(".yeshu_LRz>a").click(function () {
            page--
            if (page <= 0) {
                page = 1
                $(this).attr("href","#")
                $(".yeshu_LRz").remove()
            } else {
                page = page
                $(this).attr("href", "http://localhost/BL/html_LR/24Hbaihuo-qingsheguan.html?t_acoods=" +
                ly + "&page=" + page + "")
            }
        })
    })
})()