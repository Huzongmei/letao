/**
 * Created by Admin on 2018/3/2.
 */
$(function(){
    //给所有需要请求数据的页面添加进度条
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        NProgress.done();
    })
});

