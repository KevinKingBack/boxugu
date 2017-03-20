/**
 * 教师列表功能 
 */
define(["jquery", "template","util","overlayer", "bootstrap"], function ($, template,util) {
    //处理点击左侧按钮的显示
    util.setMenu(location.pathname);
    $.ajax({
        type: 'get',
        url: '/api/teacher',
        data: null,
        dataType: 'json',
        success: function (data) {
            var html = template("teacherTpl", { list: data.result });
            $("#teacherlist").html(html);
            //查看讲师功能  
            $('.teacherBtns').find('a:eq(0)').click(function () {
                var tc_id = $(this).closest('td').attr('data-tcid');
                $.ajax({
                    type: 'get',
                    url: '/api/teacher/view',
                    data: { tc_id: tc_id },
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g, ' ');
                            // data.result.tc_hometown=data.result.tc_hometown.split('|').join(' ');
                            var html = template("teacherInfoModal", data.result);
                            $("#teacher_Info").html(html);
                            $("#teacherModal").modal();
                        }

                    }
                });
                return false;
            });
            //启用和注销功能
            $('.teacherBtns').find('a:eq(2)').click(function () {
                var that = this;
                var td = $(this).closest('td');
                var tc_id = td.attr('data-tcid');
                var tc_status = td.attr('data-status');
                $.ajax({
                    type: 'post',
                    url: '/api/teacher/handle',
                    data: { tc_id: tc_id, tc_status: tc_status },
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            if (data.result.tc_status == 0) {
                                $(that).text('注销');
                            } else {
                                $(that).text('启用');
                            }
                            //修改浏览器端的状态
                            td.attr('data-status', data.result.tc_status);
                        }
                    }
                });
                return false;
            });
        }

    });


});