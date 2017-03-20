/**
 * 控制全局遮罩功能
 * 如果同时发送多次ajax请求,那么stop时会以最后响应的时间为准
 */
define(["jquery","nprogress"],function($,nprogress){
    $(document).ajaxStart(function(){
        nprogress.start();
        $(".overlayer").show();
    });
     $(document).ajaxStop(function(){
          nprogress.done();
        $(".overlayer").hide();
    });
});
