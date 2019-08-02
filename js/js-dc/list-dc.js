; (function () {
    $(function () {
        var index = 0;
        var timer;
        var index_num = 0;
        timerFun()

        function timerFun() {
            timer = setInterval(function () {
                index++;
                $("img").eq(index).fadeIn().siblings().fadeOut();
                $(".nav_box li").eq(index).addClass('active').siblings().removeClass('active');
                if (index == 4) {
                    index = -1;
                }

            }, 2000)
        };
        $(".banner_box").hover(function () {
            clearInterval(timer);
        }, function () {
            timerFun();
        })
        $(".nav_box li").hover(function () {
            clearInterval(timer);
            index = $(this).index()
            $("img").eq(index).fadeIn().siblings().fadeOut();
            $("li").eq(index).addClass('active').siblings().removeClass('active');

        }, function () {
            timerFun()
        });
        // 下面是控制tab切换的

        $(".tab_nav li").click(function () {
            $(this).find(".title").css({
                color: "red"
            }).parent().siblings().find(".title").css({
                color: "#37060a"
            });

            $(this).children("div").addClass("activeLine");
            $(this).siblings().children("div").removeClass("activeLine");
            $(this).find(".jingling").css({
                backgroundPositionY: "0px"
            }).parent().siblings().find(".jingling").css({
                backgroundPositionY: "-47px"
            });
            index_num = $(this).index();
            list2(index_num)
        });
        // 下面是ajax

        list2(0)
        function list2(index_num) {
            var pro_content = "";

            $.ajax({
                type: 'GET',
                dataType: 'JSON',
                data: {
                    num: index_num,
                },
                url: '../../php/php-dc/list2.php',
                error: function () {
                    console.log("服务器连接错误")
                },
                success: function (res) {
                    // console.log(res);
                    for (key in res) {
                        // console.log(res[key])
                        pro_content += `
                        <li>
                <div class="img_box">
                    <a href="javaScript:;">
                        <img src="${res[key].img_url}" alt="${res[key].title}" class="pro_img">
                    </a>
                </div>
                <a href="javaScript:;" class="pro_title">${res[key].title}</a>
                <div class="discounts">
                    <p>${res[key].discount}</p>
                </div>
                <button class="lookMore">查看详情</button>
            </li>
                        `;
                    }
                    // console.log(pro_content);
                    $(".content_list ul").html(pro_content)

                }
            })
        };


    })
}())