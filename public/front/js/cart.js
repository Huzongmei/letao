/**
 * Created by Admin on 2018/3/8.
 */
$(function(){
    // 渲染购物车列表页
    //下拉刷新
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto: true,
                //下拉刷新时触发
                callback : function(){
                    $.ajax({
                        type:'GET',
                        url:'/cart/queryCart',
                        dataType:'json',
                        success:function(info){
                            //console.log(info);

                            setTimeout(function(){
                                if (info.error === 400) {
                                    //没登录，跳转到登录页面 , 登录成功需要回跳
                                    location.href = "login.html?retUrl=" + location.href;
                                }
                                $('.lt_content').html(template('tpl',{list:info}));
                                //结束下拉刷新
                                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                            },1000);
                        }
                    })
                }
            }
        }
    });

    //给删除按钮注册点击事件
    $('.lt_content').on('tap','.btn_delete',function(){
        var id = $(this).data('id');
        //console.log(id);
        $.ajax({
            type:'GET',
            url:'/cart/deleteCart',
            data:{id:id},
            dataType:'json',
            success:function(info){
                console.log(info);
            }
        })
    });

    //编辑功能
    $('.lt_content').on('tap','.btn_edit',function(){
        var data = this.dataset;
        console.log(data);

        //把data和模版结合
        var html = template("tpl2", data);
        //html中会有很多的换行,把html这个字符串中所有的\n替换成""
        html = html.replace(/\n/g, "");

        mui.confirm(html, "编辑商品", ["确定", "取消"], function (e) {
            if(e.index === 0){
                //获取到参数 id 尺码  num
                var id = data.id;
                var num = $(".mui-numbox-input").val();
                var size = $(".lt_edit_size span.now").text();

                //发送ajax请求
                $.ajax({
                    type:"post",
                    url:"/cart/updateCart",
                    data:{
                        id:id,
                        num:num,
                        size:size
                    },
                    success:function (info) {
                        if(info.success) {
                            //下拉刷新一次
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
        });


        //给尺码注册点击事件
        $(".lt_edit_size span").on("tap", function () {
            $(this).addClass("now").siblings().removeClass("now");
        });

        //numbox也需要重新初始化
        mui(".mui-numbox").numbox();

    });

    //计算总金额
    $('body').on('change','.ck',function(){
        var sum=0;
        $(':checked').each(function(){
            var price = $(this).data('price');
            var num = $(this).data('num');
            sum+=price*num;
        });
        $('.total span').text(sum);
    })

});