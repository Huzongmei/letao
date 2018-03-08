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
});