/**
 * Created by Admin on 2018/3/8.
 */
$(function(){

    //渲染列表
    //1.获取地址栏里的id ?productId=1
    //2.根据id后台请求数据
    var id = location.search.split('?')[1].split('=')[1];
    //console.log(id);
    function render(){
        $.ajax({
            type:'GET',
            url:'/product/queryProductDetail',
            data:{id:id},
            dataType:'json',
            success:function(info){
                //console.log(info);
                $('.mui-scroll').html(template('tpl',info))
                // 图片轮播初始化
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
                });

                //数字框初始化
                mui('.mui-numbox').numbox();

                // 给尺寸span注册点击事件
                $('.lt_size span').on('tap',function(){
                    $(this).addClass('now').siblings().removeClass('now')
                })
            }
        })
    }
    render();

    //给加入购物车注册点击事件

    $('.btn_add_cart').on('tap',function(){

        var num = $('.lt_num input').val();
        var size = $('.lt_size span.now').text();
        if(!size){
            mui.toast('请选择尺码');
            return;
        }
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:id,
                num:num,
                size:size
            },
            dataType:'json',
            success:function(info){
                if(info.success){
                    mui.confirm('添加成功','温馨提示',["去购物车", "继续浏览"],function(e){
                        if(e.index==0){
                            location.href='cart.html'
                        }
                    })
                }
                if(info.error==400){
                    location.href = "login.html?retUrl="+location.href;
                }
            }
        })
    });

});