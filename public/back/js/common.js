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
    });



    //二级菜单的显示和隐藏
    $('.category').prev().on('click',function(){
        $(this).next().slideToggle();
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
    if(location.href.indexOf('login.html')){
        $.ajax({
            type:'GET',
            url:'/employee/checkRootLogin',
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(!info.success){
                    location.href='login.html'
                }
            }
        })
    }
});

