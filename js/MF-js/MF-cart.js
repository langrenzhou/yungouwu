$(function () {

  (function () {
    //省市区三级联动
    console.log(place)

    function writePro() {
      //将省的信息循环到pro中
      var pro_html = ""
      for (var pro in place) {
        // console.log(pro)
        pro_html += '<option value="' + pro + '">' + pro + '</option>'
      }
      $('#pro').html(pro_html)
    }

    function writeCity() {
      //将市名循环添加到city中
      // console.log(place["河南省"][0])
      var city_html = ''
      for (var city in place[$("#pro").val()][0]) {
        // console.log(city)
        city_html += '<option value="' + city + '">' + city + '</option>'
      }
      $("#city").html(city_html)
    }

    function writeArea() {
      //将市县的信息添加到area中
      var area_html = ""
      for (var i = 0; i < place[$("#pro").val()][0][$("#city").val()].length; i++) {
        // console.log(place["河南省"][0]["郑州市"][i])
        for (area in place[$("#pro").val()][0][$("#city").val()][i]) {
          // console.log(area)
          area_html += '<option value="' + area + '">' + area + '</option>'
        }
      }
      $("#area").html(area_html)
    }

    //初始化
    function init() {
      writePro()
      writeCity()
      writeArea()
      $("#pro").change(function () {
        console.log($(this).val())
        writeCity()
        writeArea()
      })

      $("#city").change(function () {
        writeArea()
      })
    }
    init()
  }());
  (function () {
    //获取cookie
    //    console.log(window.comId)
    function getCookieVal() {
      var getCookie = document.cookie;
      var arr = getCookie.split("; ");
      console.log(arr);
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf("comId") != -1) {
          var str = arr[i].split("=");
          //console.log(str[1]);
          return str[1];
        }
      }
    }
    var comid = getCookieVal();
    var html = "";
    // console.log(comid)
    $.ajax({
      url: '../../php/MF-php/MF-cart.php',
      type: 'get',
      dataType: 'json',
      data: {
        comId: comid
      },
      error: function () {
        console.log("数据请求失败！");
      },
      success: function (res) {
        console.log(res);
        var str = res[0].pro_assess;
        var str1 = res[0].price;
        var pro_place = str.trim();
        var pro_price = parseFloat(str1.slice(1));
        $(".tolmoney1").text(pro_price)
        html += `
                <tr class="cart-table-name">
                <td class="goodsclassify" colspan=6>
                  <input type="checkbox" name="${pro_place}" id="" checked class="onecheck blcheck" />
                  <i class="iconfont icon-tubiaolunkuo- cartfont"></i>
                  <span class="ibl">${pro_place}</span>
                </td>
              </tr>
                `;
        html += `
                <tr class="cartGoodslist">
                <td class="goodsselect goodImg">
                  <label for="goodscheck">
                    <input type="checkbox" name="${pro_place}" id="" checked class="goodscheck onecheck" />
                    <img src="${res[0].img_url}" alt="">
                  </label>
                </td>
                <td class="goodsinformation"><a href="#">${res[0].pro_title}</a></td>
                <td class="goodsprice">
                  <span>￥</span>
                  <span class="onePrice">${pro_price}</span>
                </td>
                <td class="goodsnum goodsPR">
                  <div class="reduce clicksty">-</div>
                  <div>
                    <input type="text" value="1" class="countNum commodityNum">
                  </div>
                  <div class="plus clicksty">+</div>
                </td>
                <td class="goodsmoney">
                  <span>￥</span>
                  <span class="totalPrice">${pro_price}</span>
                </td>
                <td class="goodsopt">
                  <div class="deleteGoods">删除</div>
                </td>
              </tr>
                `;
        $(".cartTable").append(html);


        //checkbox的点击事件
        $(".allcheck").click(function () {
          var check = $(this).prop("checked");
          if(check){
            $(".tolmoney1").text(pro_price);
            $(".choiceNum").text(1)
            $(".totalGoodsNum").text(1)
          }else{
            $(".tolmoney1").text(0.00);
            $(".choiceNum").text(0)
            $(".totalGoodsNum").text(0)
          }
          $(".onecheck").prop({
            "checked": check
          })
          console.log($(this).prop("checked"));
        });

        $inputName = $("input[name='" + pro_place + "']");
        $inputName.click(function () {
          var check = $(this).prop("checked");
          $inputName.prop("checked", check);
          // $(".goodscheck").prop({
          //   "checked": check
          // })
        })

        //获取商品的总金额
        var totalMoney = parseFloat($(".tolmoney1").text());


        //商品数量加
        $(".plus").click(function () {
          //点击添加时选中复选框|
          $inputName.prop("checked", true);
          //获取当前的商品数量
          var goodsNum = parseInt($(this).prev().children(".countNum").val());
          console.log(typeof goodsNum);
          var totalNum = goodsNum + 1;
          $(this).prev().children(".countNum").val(totalNum);

          //获取单价
          var onePrice = parseFloat($(this).parent().siblings().children(".onePrice").text());
          console.log(onePrice)
          //获取当前的总价格
          nowPrice = parseFloat($(this).parent().siblings().children(".totalPrice").text());
          var totalPrice = onePrice + nowPrice;
          $(this).parent().siblings().children(".totalPrice").text(totalPrice.toFixed(2));

          // console.log("当前总金额：" + totalMoney)
          // totalMoney=totalPrice;
          totalMoney = totalMoney + onePrice;
          console.log(typeof totalMoney);
          $(".tolmoney1").text(totalMoney.toFixed(2));
          //获取商品总数量
          var totalGoodsNums = parseInt($(".choiceNum").text());
          totalGoodsNums = totalGoodsNums + 1;
          $(".choiceNum").text(totalGoodsNums)
          $(".totalGoodsNum").text(totalGoodsNums)
        });



        //商品数量减
        $(".reduce").click(function () {
          //点击减少时选中复选框|
          $inputName.prop("checked", true);
          //获取当前数量
          var goodsNum = parseInt($(this).next().children(".countNum").val());
          if (goodsNum > 1) {
            //判断当前的商品数量是否小于1
            var totalNum = goodsNum - 1;
            $(this).next().children(".countNum").val(totalNum);
            //获取当前元素的单价
            var onePrice = parseFloat($(this).parent().siblings().children(".onePrice").text());
            //获取当前的总价
            var nowPrice = parseFloat($(this).parent().siblings().children(".totalPrice").text());
            var totalPrice = nowPrice - onePrice;
            $(this).parent().siblings().children(".totalPrice").html(totalPrice.toFixed(2));
            //获取商品的总金额
            // var totalMoney = parseFloat($(".tolmoney1").text());
            // console.log("当前总金额：" + totalMoney)
            // totalMoney = totalMoney - totalPrice;
            totalMoney = totalPrice;
            $(".tolmoney1").text(totalMoney.toFixed(2));
            //获取商品总数量
            var totalGoodsNums = parseInt($(".choiceNum").text());
            if (totalGoodsNums > 0) {
              totalGoodsNums = totalGoodsNums - 1;
              $(".choiceNum").text(totalGoodsNums)
              $(".totalGoodsNum").text(totalGoodsNums)
            }
          }
        });


        //点击删除
        $(".deleteGoods").click(function () {
          //获取当前的总数量
          var deleteTotalNum = $(this).parent().siblings().find(".countNum").val();
          //获取商品总数量
          var totalGoodsNums = parseInt($(".choiceNum").text());
          if (totalGoodsNums > 0) {
            totalGoodsNums = totalGoodsNums - deleteTotalNum;
            $(".choiceNum").text(totalGoodsNums)
            $(".totalGoodsNum").text(totalGoodsNums)
          }
          //获取当前的总价
          var deleteTotalPrice = $(this).parent().siblings().children(".totalPrice").text();
          //获取商品的总金额
          // var totalMoney = parseFloat($(".tolmoney1").text());
          // console.log("当前总金额：" + totalMoney)
          totalMoney = totalMoney - deleteTotalPrice;
          $(".tolmoney1").text(totalMoney.toFixed(2));
          // console.log(num, price)
          $(this).parent().parent().remove();
        })
      }
    })




  }());
})