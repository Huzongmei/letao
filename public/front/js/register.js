/**
 * Created by Admin on 2018/3/10.
 */
$(function(){
    //获取验证码功能
    $('.btn_vcode').on('click',function(e){
        e.preventDefault();
        var $this=$(this);
        $this.prop('disabled',true).addClass('now').text('发送中......');

        //后台请求数据
        $.ajax({
            type:'GET',
            url:'/user/vCode',
            dataType:'json',
            success:function(info){
                console.log(info);
                //验证码发送成功了，应该开启倒计时功能。60秒可以重新发送
                var count = 5;
                var timer = setInterval(function () {
                    count--;
                    $this.text(count+"秒后再次发送");

                    //当时间为0
                    if(count === 0){
                        clearInterval(timer);
                        //让按钮能点
                        $this.prop("disabled", false).removeClass("disabled").text("再次发送");
                    }

                }, 1000);
            }
        })
    });

    //注册功能
    $('.btn_register').on('click',function(e){
        e.preventDefault();
        //表单简单校验
        var username=$('[name="username"]').val();
        var password=$('[name="password"]').val();
        var repassword = $('[name="repassword"]').val();
        var mobile=$('[name="mobile"]').val();
        var vCode=$('[name="vCode"]').val();
        if(!username){
            mui.toast('用户名不能为空！');
            return false;
        }
        if(!password){
            mui.toast('密码不能为空！');
            return false;
        }
        if(repassword!=password){
            mui.toast('用户名和密码不一致！');
            return false;
        }
        if(!mobile){
            mui.toast('手机不能为空！');
            return false;
        }
        if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast("手机号码格式不对");
            return false;
        }
        if(!vCode){
            mui.toast('验证码不能为空！');
            return false;
        }
        $.ajax({
            type:'POST',
            url:'/user/register',
            dataType:'json',
            data:$('.myform').serialize(),
            success:function(info){
                if(info.error === 403){
                    mui.toast(info.message);
                }

                if(info.success){
                    mui.toast("恭喜你，注册成功了，一秒后跳转到登录页");
                    setTimeout(function () {
                        location.href = "login.html";
                    }, 1000);
                }
            }
        })

    })
});