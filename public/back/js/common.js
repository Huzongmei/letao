/**
 * Created by Admin on 2018/3/2.
 */
$(function(){
    //设置页面加载进度条
    $(document).ajaxStart(function(){
        //ajax发送请求开始时，开启进度条
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        //ajax发送请求结束时，结束进度条
        NProgress.done();
    })
});