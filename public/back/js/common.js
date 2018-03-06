/**
 * Created by Admin on 2018/3/2.
 */
$(function(){

    //设置页面加载进度条
    //禁用进度环
    NProgress.configure({
        showSpinner: false
    });
    $(document).ajaxStart(function(){
        //ajax发送请求开始时，开启进度条
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        //ajax发送请求结束时，结束进度条
        setTimeout(function(){
            NProgress.done();
        },500)
    });



    //二级菜单的显示和隐藏
    $('.category').prev().on('click',function(){
        $(this).next().slideToggle();
        $(this).toggleClass('now');
    });


    //侧边栏显示和隐藏
    $('.icon_menu').on('click',function(){
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');
    });


    //退出功能
    //点击退出 显示模态框
    $('.icon_loginout').on('click',function(){
        $('#modal').modal('show');
    });
    //点击退出，ajax请求后台，实现退出
    $('.btn_loginout').on('click',function(){
        $.ajax({
            type:'GET',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(info.success){
                    location.href='login.html';
                }
            }
        })
    });


    //如果不是登录页，发送ajax请求，查询管理员是否登录
    if(location.href.indexOf('login.html')==-1){
        $.ajax({
            type:'GET',
            url:'/employee/checkRootLogin',
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(info.error==400){
                    location.href='login.html'
                }
            }
        })
    }


});
