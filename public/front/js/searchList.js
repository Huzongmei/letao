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
    })
});