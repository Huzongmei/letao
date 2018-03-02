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
        }
    })
})();