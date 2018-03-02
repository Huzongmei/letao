/**
 * Created by Admin on 2018/3/2.
 */
;(function(){
    //登录页面用户输入校验
    //1. 用户名不能为空
    //2. 用户名长度为3-6位
    //3. 用户密码不能为空
    //4. 用户密码长度为6-12位
    $('form').bootstrapValidator({
        //校验字段
        fields:{
            username:{
                validators:{
                    notEmpty:{
                       message:'用户名不能为空'
                    },
                    stringLength:{
                        min: 3,
                        max: 6,
                        message: '用户名长度必须在3到6位之间'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'用户密码不能为空'
                    },
                    stringLength:{
                        min: 6,
                        max: 12,
                        message: '用户密码长度必须在3到6位之间'
                    }
                }
            }
        },
        //添加校验小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });


    //点击重置按钮 表单校验信息隐藏
    $('[type="reset"]').on('click',function(){
        $('form').data('bootstrapValidator').resetForm();
    });

    //给表单注册一个校验成功的事件，当校验成功时，阻止表单的默认提交
    $('form').on('success.form.bv',function(e){
        e.preventDefault();

        //ajax请求后台验证用户登录
        $.ajax({
            type:'POST',
            url:'/employee/employeeLogin',
            data: $('form').serialize(),
            success:function(info){
                console.log(info);
            }
        })
    })

})();