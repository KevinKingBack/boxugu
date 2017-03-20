
define(['jquery', 'echarts', 'template','overlayer', 'cookic'], function ($, echarts, template) {

    // 控制左侧导航菜单的显示和隐藏
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });
    var pathname = location.pathname;
    // 没有登录的时候跳转到登录页面
    var flag = $.cookie('PHPSESSID');
    if (!flag & pathname.indexOf("login") == -1) {
        // 没有登录
        location.href = '/login'
    }

    //实现登录功能
    $('#loginForm').submit(function () {
        var formData = $(this).serialize();
        $.ajax({
            type: 'post',
            // url:'http://api.studyit.com/login',
            url: '/api/login',
            data: formData,
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    // console.log(data.result);
                    var logInfo = JSON.stringify(data.result);
                    // console.log(logInfo);
                    //实现cookie数据的跨页面共享
                    $.cookie('logInfo', logInfo, { path: '/' });
                    location.href = '/index/index';
                }

            },
            error: function () {
                alert("请与管理员联系");
            }
        });
        return false;//阻止默认行为,只是在jQuery里面可以这样写
    });

    //退出功能
    $("#logoutId").on("click", function () {
        $.ajax({
            type: 'post',
            url: "/api/logout",
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    location.href = "/login";
                }
            }
        });
    });

    //设置登录头像和名称(第一个版本)
    // var obj = JSON.parse($.cookie('logInfo'));
    // $('.aside .profile img').attr("src", obj.tc_avatar);
    // $('.aside .profile h4').html(obj.tc_name);

    //第二个版本
    // var pathname=location.pathname;
    // if(pathname.indexOf('login')== -1){
    //     var obj = JSON.parse($.cookie('logInfo'));
    //     var html=template("loginInfo",obj);
    //     $(".aside .profile").html(html);
    // }

    //第三个版本
    var obj = JSON.parse($.cookie('logInfo'));
    var data = '<div class="avatar img-circle">' +
        '<img src="{{tc_avatar}}">' +
        '</div>' +
        '<h4>{{tc_name}}</h4>';
    var render = template.compile(data);
    var html = render(obj);
    $(".aside .profile").html(html);


});
