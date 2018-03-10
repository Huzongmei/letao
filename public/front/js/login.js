/**
 * Created by Admin on 2018/3/10.
 */
$(function(){
    // 给登录按钮注册事件
    $('.btn_login').on('click',function(){
        //获取输入框值 判断是否为空
        var username = $('[name="username"]').val().trim();
        var password = $('[name="password"]').val().trim();

        if(!username){
            mui.toast('用户名不能为空！') ;
            return false;
        }
        if(!password){
            mui.toast('密码不能为空！') ;
            return false;
        }

        //请求后台数据
        $.ajax({
            type:'POST',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            dataType:'json',
            success:function(info){
                if(info.error==403){
                    mui.toast('用户名或者密码错误！');
                }
                if(info.success){
                    //成功了，怎么办？
                    //如果是购物车这类页面跳转过来的，需要跳回去
                    //如果是直接访问的login页面，需要跳转到会员中心
                    //获取到retUrl参数，如果有这个参数，直接跳转回去即可。如果没有没有这个，默认跳到会员中心。
                    var search = location.search;
                    if (search.indexOf("retUrl") != -1) {
                        //说明需要回跳
                        search = search.replace("?retUrl=", "");
                        location.href = search;
                    } else {
                        //跳转到会员中心
                        location.href = "user.html";
                    }
                }
            }
        });
    });


});