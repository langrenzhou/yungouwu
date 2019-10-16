(function(){
    $(function(){
        var html=''
        $.ajax({
            url:'../php_LR/24Hbaihuo-border.php',
            type:'GET',
            dataType:'json',
            success:function(res){
                for(var i=0;i<res.length;i++){
                    if(res[i].type_id == 0){
                        $(".body_LR>.area>ul>li>.area>.gouwuche").css({backgroundColor:'#ccc'})
                        html+=" <li><div class='area'><div class='img'><img src="+res[i].img_Url+"></div><div class='content'><a href=''title="+res[i].title+">"+res[i].title+"</a></div><div class='jiage clear'> <p class='p1'>热卖价 ：</p><p class='p2'>￥"+res[i].jiage+"</p></div><div class=gouwuche><a href=''>已售罄</a></div></li>";
                        
                    }else{
                        html+=" <li><div class='area'><div class='img'><img src="+res[i].img_Url+"></div><div class='content'><a href=''title="+res[i].title+">"+res[i].title+"</a></div><div class='jiage clear'> <p class='p1'>热卖价 ：</p><p class='p2'>￥"+res[i].jiage+"</p></div><div class=gouwuche><a href=''>加入购物车>>></a></div></li>"
                    }
                    $(".body_LR>.area>ul").html(html)
                }
            },
            error:function(){
                alert("请求错误")
            }
        })
    })
})()