/**
 * Created by Admin on 2018/3/5.
 */
;(function(){
    // 渲染侧边栏一级分类

    var render = function(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategory',
            dataType:'json',
            success:function(info){
                //console.log(info);
                $('.lt_aside ul').html(template('asideTpl',info))
                var id = info.rows[0].id;
                setBrand(id)
            }
        })
    };
    render();


    //渲染品牌展示区二级分类

    var setBrand = function (id){
        $.ajax({
            type:'GET',
            url:'/category/querySecondCategory',
            data:{id:id},
            dataType:'json',
            success:function(info){
                //console.log(info);
                $('.lt_brand').html(template('brandTpl',info));
            }
        })
    };


    // 点击一级分类切换二级分类

    $('.lt_aside ul').on('click','a',function(){
        // 切换背景样式
        $(this).parent().addClass('now').siblings().removeClass('now');
        // 重新渲染二级分类
        var id = $(this).parent().data('id');
        setBrand(id);
    });

    // 优化：如果没有数据，需要提示用户，当前页面无数据
})();