
require.config({
    baseUrl: '/public/assets',
    paths: {
        jquery: 'jquery/jquery.min',
        cookic: 'jquery-cookie/jquery.cookie',
        echarts: 'echarts/echarts.min',
        template: 'artTemplate/template',
        bootstrap: 'bootstrap/js/bootstrap',
        util: '../js/util',
        overlayer : '../js/overlayer'
    },
    shim: {
        //把bootstrap转换为标准模块,(依赖于标准的jQuery模块)
        bootstrap: {
            deps: ["jquery"]
        }
    }
});