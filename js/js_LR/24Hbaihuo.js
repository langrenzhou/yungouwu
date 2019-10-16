(function(){
    $(function () {
        var index = 0;
        var length = $(".lbts>ul>li").length
        length = length / 4
        var width = $(".lbt>.lbts>ul>li").width()
        setInterval(function () {
            index++;
            if (index == length - 1) {
                $(".lbt>.lbts>ul").stop().animate({
                    left: -index * width
                },1000,function () {
                    $(".lbt>.lbts>ul").css({
                        left:0
                    })
                })
              index = 0   
            } else {
                $(".lbt>.lbts>ul").stop().animate({
                    left: -index * width
                },1000)
            }
        }, 2000)
    })
})()