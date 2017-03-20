
require.config({
    baseUrl: '/public/assets',
    paths: {
        jquery: 'jquery/jquery.min',
        cookic: 'jquery-cookie/jquery.cookie',
        echarts:'echarts/echarts.min',
        template:'artTemplate/template',
        bootstrap:'bootstrap/js/bootstrap'
    },
    shim:{
        //暂时先不加
        bootstrap:{
            deps:["jquery"]
        }
    }
});