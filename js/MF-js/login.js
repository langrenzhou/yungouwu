$(function () {

  (function () {
    //生成随机数
    function randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    //生成随机颜色RGB分量
    function randomColor(min, max) {
      var _r = randomNum(min, max);
      var _g = randomNum(min, max);
      var _b = randomNum(min, max);
      return "rgb(" + _r + "," + _g + "," + _b + ")";
    }
    // 先阻止画布默认点击发生的行为再执行drawPic()方法
    // var validateNum;
    document.getElementById("canvas").onclick = function (e) {
      e.preventDefault();
      window.validateNum = drawPic();
      //console.log('毁掉----------'+ drawPic())
    };

    function drawPic() {
      //获取到元素canvas
      var $canvas = document.getElementById("canvas");
      var _str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";//设置随机数库
      var _picTxt = "";//随机数
      var _num = 4;//4个随机数字
      var _width = $canvas.width;
      var _height = $canvas.height;
      var ctx = $canvas.getContext("2d");//获取 context 对象
      ctx.textBaseline = "bottom";//文字上下对齐方式--底部对齐
      ctx.fillStyle = randomColor(180, 240);//填充画布颜色
      ctx.fillRect(0, 0, _width, _height);//填充矩形--画画
      for (var i = 0; i < _num; i++) {
        var x = (_width - 10) / _num * i + 10;
        var y = randomNum(_height / 2, _height);
        var deg = randomNum(-45, 45);
        var txt = _str[randomNum(0, _str.length)];
        _picTxt += txt;//获取一个随机数
        ctx.fillStyle = randomColor(10, 100);//填充随机颜色
        ctx.font = randomNum(16, 30) + "px SimHei";//设置随机数大小，字体为SimHei
        ctx.translate(x, y);//将当前xy坐标作为原始坐标
        ctx.rotate(deg * Math.PI / 180);//旋转随机角度
        ctx.fillText(txt, 0, 0);//绘制填色的文本
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-x, -y);
      }
      for (var i = 0; i < _num; i++) {
        //定义笔触颜色
        ctx.strokeStyle = randomColor(90, 180);
        ctx.beginPath();
        //随机划线--4条路径
        ctx.moveTo(randomNum(0, _width), randomNum(0, _height));
        ctx.lineTo(randomNum(0, _width), randomNum(0, _height));
        ctx.stroke();
      }
      for (var i = 0; i < _num * 10; i++) {
        ctx.fillStyle = randomColor(0, 255);
        ctx.beginPath();
        //随机画原，填充颜色
        ctx.arc(randomNum(0, _width), randomNum(0, _height), 1, 0, 2 * Math.PI);
        ctx.fill();
      }
      return _picTxt;//返回随机数字符串
    }

    window.validateNum = drawPic();
    // console.log(window.validateNum);

  }());

  //表单验证登录验证
  //用户名的验证
  var flage1 = true;
  $(".count").blur(function () {
    var count = $(".count").val();
    // console.log(count)
    var email = /^\w+@[a-zA-Z0-9]+\.[a-z]+$/;
    var phone = /1[3-9][0-9]{9}/;
    var strname = /[a-zA-Z0-9]+/;
    var res = email.test(count) || phone.test(count) || strname.test(count);
    if (!count) {
      $(".counterror").html("账号不能为空！");
      flage1 = false;
    } else if (!res) {
      $(".counterror").html("格式不正确！");
      flage1 = false;
    }
  });

  $(".count").focus(function () {
    $(".count").val("");
    $(".counterror").html("");
    flage1 = true;
  })
  //登录密码验证
  $(".pwd").blur(function () {
    var pwd = $(".pwd").val();
    // console.log(pwd)
    if (!pwd) {
      $(".pwderror").html("密码不能为空！");
    }
  });

  $(".pwd").focus(function () {
    $(".pwd").val("");
    $(".pwderror").html("");
    flage1 = true;
  });

  //登录验证码的验证
  $(".verificationCode").blur(function () {
    var verificationCode = $(".verificationCode").val();
    console.log(verificationCode)
    if (!verificationCode) {
      $(".codeerror").html("验证码不能为空！");
      flage1 = false;
    } else if (verificationCode.toLowerCase() != validateNum.toLowerCase()) {
      $(".codeerror").html("验证码输入有误！");
      flage1 = false;
    }
  });

  $(".verificationCode").focus(function () {
    $(".verificationCode").val("");
    $(".codeerror").html("");
    flage1 = true;
  })
  //登录点击事件
  $(".btn").click(function () {
    var count = $(".count").val();
    var pwd = $(".pwd").val();
    var verificationCode = $(".verificationCode").val();
    var mangess = count && pwd && verificationCode;
    if (flage1 && mangess) {
      // console.log(count, pwd);
      $.ajax({
        url: "../../php/MF-PHP/MF-login.php",
        data: {
          username: count,
          password: pwd
        },
        type: "post",
        success: function (res) {
          // console.log(res);
          if (!res) {
            $(".namepwd").html("用户名不存在或密码不正确！");
            setTimeout(function () {
              $(".namepwd").html("");
            }, 3000)
          } else {
            alert("登录成功！");
            cookie("username",count , 7);
            window.location.href="./../../html/html-lz/index.html"//跳转到首页
          }
        },
        error: function () {
          console.log("数据请求失败！");
        }
      });
    } else {
      $(".namepwd").html("信息填写不完整！");
      setTimeout(function () {
        $(".namepwd").html("");
      }, 3000)
    }
  });

  //表单的注册验证
  var flage = false;
  $(".username").blur(function () {
    var name = $(".username").val();
    // console.log(name);
    var strname = /[a-zA-Z0-9]+/;
    if (!name) {
      $(".regname").html("用户名不能为空！");
      flage = false;
    } else if (name > 22 && name < 6) {
      $(".regname").html("用户名不能少于6位或大于22位！");
      flage = false;
    } else if (!strname.test(name)) {
      $(".regname").html("用户名由字母和数字组成！");
      flage = false;
    } else {
      $.ajax({
        url: "../../php/MF-PHP/MF-register.php",
        data: {
          username: name,
        },
        type: "post",
        success: function (res) {
          if (res == "true") {
            $(".reg").html("用户名已存在，请重新输入！");
            flage = false;
          }
        },
        error: function () {
          console.log("数据请求失败！");
        }
      });
    }
  });
  $(".username").focus(function () {
    flage = true;
    $(".username").val("");
    $(".regname").html("");
    // console.log(flage);
  })
  //密码的验证
  $(".registerPwd").blur(function () {
    var registerPwd = $(".registerPwd").val();
    // console.log(registerPwd);
    var strpwd = /[a-zA-Z](?=.*?[1-9].*?)[a-zA-Z1-9]+|[1-9](?=.*?[a-zA-Z].*?)[a-zA-Z1-9]+/g
    if (!registerPwd) {
      $(".regpwd").html("密码不能为空！");
      flage = false;
    } else if (registerPwd.length < 6) {
      $(".regpwd").html("密码长度不能小于6位！");
      flage = false;
    } else if (!strpwd.test(registerPwd)) {
      $(".regpwd").html("密码格式不正确！");
      flage = false;
    }
  });
  $(".registerPwd").focus(function () {
    flage = true;
    $(".registerPwd").val("");
    $(".regpwd").html("");
    // console.log(flage);
  });
  //确认密码的验证
  $(".rePwd").blur(function () {
    var registerPwd = $(".registerPwd").val();
    var rePwd = $(".rePwd").val();
    // console.log(rePwd);
    if (registerPwd !== rePwd) {
      $(".reregpwd").html("两次密码输入不一致！");
      flage = false;
    }
  });
  $(".rePwd").focus(function () {
    flage = true;
    $(".rePwd").val("");
    $(".reregpwd").html("");
    // console.log(flage);
  });
  //手机号的验证
  $(".phone").blur(function () {
    var phone = $(".phone").val();
    // console.log(phone);
    var strphone = /1[3-9][0-9]{9}/;
    if (!phone) {
      $(".regphone").html("手机号不能为空！");
      flage = false;
    } else if (!strphone.test(phone)) {
      $(".regphone").html("手机号格式不正确！");
      flage = false;
    }
  });
  $(".phone").focus(function () {
    flage = true;
    $(".phone").val("");
    $(".regphone").html("");
    // console.log(flage);
  });
  //邮箱的验证
  $(".email").blur(function () {
    var email = $(".email").val();
    // console.log(email);
    var stremail = /^\w+@[a-zA-Z0-9]+\.[a-z]+$/;
    if (!stremail.test(email)) {
      $(".regemail").html("邮箱格式不正确！");
      flage = false;
    }
  });
  $(".email").focus(function () {
    flage = true;
    $(".email").val("");
    $(".regemail").html("");
    // console.log(flage);
  });
  //注册验证码的验证
  $('.regverCode').blur(function () {
    // console.log(validateNum)
    var regverCode = $(".regverCode").val();
    if (!regverCode) {
      $(".regcode").html("验证码不能为空！");
      flage1 = false;
    } else if (regverCode.toLowerCase() != validateNum.toLowerCase()) {
      $(".regcode").html("验证码输入有误！");
      flage1 = false;
    }
  });
  $(".regverCode").focus(function () {
    flage = true;
    $(".regverCode").val("");
    $(".regcode").html("");
    // console.log(flage);
  });

  //判断单选框是否选中
  var check = true;
  $(".agree").click(function () {
    check = $(".agree").prop("checked");
    // console.log(check);
  })

  //设置cookie
  function cookie(user, value, settime) {
    if (settime) {
      var time = new Date();
      time.setTime(time.getTime() + settime * 24 * 60 * 60 * 1000);
      document.cookie = user + "=" + value + ";path=/;expires=" + time.toUTCString();
    } else {
      document.cookie = user + "=" + value+";path=/";
    }
  }
  
  //注册点击事件
  $(".reginterbtn").click(function () {
    // console.log(flage);
    if (check) {
      var name = $(".username").val();
      var registerPwd = $(".registerPwd").val();
      var phone = $(".phone").val();
      var email = $(".email").val();
      var regverCode = $(".regverCode").val();
      var mangess = name && registerPwd && phone && regverCode;
      // console.log(name, registerPwd, phone, email)
      if (flage && mangess) {
        cookie(name, name, 7);
        $.ajax({
          url: "../../php/MF-PHP/MF-register.php",
          data: {
            username: name,
            password: registerPwd,
            phone: phone,
            email: email
          },
          type: "post",
          success: function (res) {
            if (res) {
              alert("注册成功！");
              cookie("username",name , 7);
              window.location.href="./../../html/html-lz/index.html"//跳转到首页
            }
          },
          error: function () {
            console.log("数据请求失败！");
          }
        });
      } else {
        $(".regerror").html("注册信息不完整！");
        setTimeout(function () {
          $(".regerror").html("");
        }, 3000);
      }
    }
  });
})
