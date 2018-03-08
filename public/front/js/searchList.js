/**
 * Created by Admin on 2018/3/7.
 */
$(function(){
    //截取地址栏的拼接字符 示例?key=9
    var str = location.search;
    str = decodeURI(str);//编码 ?key=三叶草
    str = str.split('?')[1]; // key=三叶草
    var arr = str.split('='); //  ["key", "三叶草"]

    var obj={};
    obj.proName=arr[1];
    obj.page=1;
    obj.pageSize=10;
    //console.log(obj);
    function render(){
        $.ajax({
            type:'GET',
            url:'/product/queryProduct',
            data:obj,
            dataType:'json',
            success:function(info){
                //console.log(info);
                $('.lt_list').html(template('tpl',info))
            }
        })
    }

    //列表渲染
    render();


    //点击搜索 重新渲染页面
    $('.btn_search').on('click',function(){
        //获取input输入的value值
        var value = $('.lt_search input').val();
        //把value值拼接到地址栏后 重新渲染
        obj.proName=value;
        render();
    });
''
    //给search_nav下的a注册点击事件
    $('.search_nav a[data-type]').on('click',function(){
        //修改样式 字体颜色 小图标 排他
        if($(this).hasClass('now')){
            $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');


        }else{
            $(this).addClass('now').siblings().removeClass('now');
            $('.search_nav a span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }

        //根据search_nav下的a样式请求后台数据
        if($(this).data('type')=='price'){
            if(obj.num){
                delete obj.num;
            }
            if($(this).find('span').hasClass('fa-angle-down')){
                obj.price=2;
            }else{
                obj.price=1;

            }
        }
        if($(this).data('type')=='num'){
            if(obj.price){
                delete obj.price;
            }
            if($(this).find('span').hasClass('fa-angle-down')){
                obj.num=2;
            }else{
                obj.num=1;
            }
        }
        render();
    });




});