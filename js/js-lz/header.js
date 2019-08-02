// toolBar的hover事件
$(".toolBar .left>li:nth-child(2)").hover(function () {
    $(this).find("i").removeClass("icon-jiantou9").addClass("icon-shangjiantou");
}, function () {
    $(this).find("i").removeClass("icon-shangjiantou").addClass("icon-jiantou9");
})
    ; (function () {
        // 上下箭头的切换
        var arrow;
        $(".toolBar .right>li").hover(function () {
            arrow = $(this).children("a").children("i")
            if (arrow.hasClass("iconfont")) {
                arrow.removeClass("icon-jiantou9").addClass("icon-shangjiantou");
            }
        }, function () {
            if (arrow.hasClass("iconfont")) {
                arrow.removeClass("icon-shangjiantou").addClass("icon-jiantou9");
            }
        })

        // webSite
        var $a;
        $(".toolBar .left .webSite").hover(function () {
            $a = $(this).prev("a");
            $a.css("color", "#666");
        }, function () {
            $a.css("color", "#ff3d3d");
        })

        // 点击登录和注册打开
        function show_login() {
            $("#right_nav_wrap .rightcont").toggle(1, function () {
                $(".login-ban").fadeIn().siblings().fadeOut();
            });
        }
        $(".toolBar .right li:first-child a:first-of-type").click(function () {
            show_login();
        })

        $(".headerFix .right a").click(function () {
            show_login();
        })
    })()

var _val;
var input_tip_html;
// jsonp 的回调函数
function cb(param) {
    var wants = param.result;
    var _html_classify = "";
    var _html_ct_match = "";
    _html_classify = `<span>${_val}</span>
                        <span>在${_val}分类中搜索</span>`;

    for (var i in wants) {
        var newWants = wants[i][0].replace(_val, "<b>" + _val + "</b>");
        _html_ct_match += `<li class="clearfix">
                                        <p class="fl">${newWants}<p>
                                        <p class="fr">
                                            约${wants[i][1]}个结果
                                        </p>
                                    </li>`;
    }
    $(".searchWrap>.sub_list>.classify_search").html(_html_classify);
    $(".searchWrap>.sub_list>.content_match").html(_html_ct_match);
    $(".searchWrap>.sub_list>.content_match>li").hover(function () {
        $(this).find("b").css("color", "#ff3d3d");
    }, function () {
        $(this).find("b").css("color", "#999");
    })
}

// 添加script到body
function get_data(){
    _val = $(this).val();
    var scriptNode = document.createElement('script');
    scriptNode.src = "https://suggest.taobao.com/sug?code=utf-8&q=" + _val + "&_ksTS=1562670406526_5627&callback=cb&area=b2c&code=utf-8&k=1&bucketid=16&src=tmall_pc"
    document.body.appendChild(scriptNode);
}
// 获取焦点
var $input = $(".searchWrap>.search_area>.user_input");
$input.focus(function () {
    $(this).val("").css({
        "borderBottom": "none",
        "outline": "none"
    });
    $(".searchWrap>.history_search").fadeIn().next().fadeIn(5, function () {
        // 鼠标悬浮状态
        $(this).children("span").hover(function () {
            $input.attr("placeholder", $(this).text());
        }, function () {
            $input.attr("placeholder", "");
        })
        // 鼠标点击
        $(".searchWrap>.input_tip>span").click(function () {
            $input.val($(this).text());
            // get_data();
            _val = $input.val();
            var scriptNode = document.createElement('script');
            scriptNode.src = "https://suggest.taobao.com/sug?code=utf-8&q=" + _val + "&_ksTS=1562670406526_5627&callback=cb&area=b2c&code=utf-8&k=1&bucketid=16&src=tmall_pc"
            document.body.appendChild(scriptNode);
            $(".searchWrap>.sub_list").fadeIn(5,function(){
                // 鼠标离开
                $input.mouseleave(function(){
                    $(".searchWrap>.sub_list").fadeOut(); 
                })
            });
        })
    });
})

// 输入信息时
$input.keyup(function () {
    $(".searchWrap>.history_search").fadeOut().next().fadeOut().next().fadeIn();
    // get_data();
    _val = $(this).val();
    var scriptNode = document.createElement('script');
    scriptNode.src = "https://suggest.taobao.com/sug?code=utf-8&q=" + _val + "&_ksTS=1562670406526_5627&callback=cb&area=b2c&code=utf-8&k=1&bucketid=16&src=tmall_pc"
    document.body.appendChild(scriptNode);
})

// 失去焦点
$input.blur(function () {
    $(".searchWrap>.sub_list").fadeOut().prev().fadeOut().prev().fadeOut();
    $(this).css("borderBottom", "1px solid #ff3d3d");
})

// headerFix
$(window).scroll(function () {
    if ($(document).scrollTop() >= 165) {
        $(".headerFix").slideDown();
    } else {
        $(".headerFix").slideUp();
    }
})

//登录获取cookie值
  var userIndex=getCookieVal();
  if(userIndex){
      $(".logo_a").html(userIndex+",欢迎！");
  }
  
  function getCookieVal() {
    var getCookie = document.cookie;
    var arr = getCookie.split("; ");
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf("username") != -1) {
        var str = arr[i].split("=");
        //console.log(str[1]);
        return str[1];
      }
    }
  }