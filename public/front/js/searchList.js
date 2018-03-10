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

    //希望这个函数无论如何都能返回一个数组，如果没有记录，返回一个[]
    function getHistory() {
        var history = localStorage.getItem("search_list") || '[]';
        var arr = JSON.parse(history);
        return arr;
    }
    //点击搜索 重新渲染页面
    $('.btn_search').on('click',function(){
        //获取input输入的value值
        var value = $('.lt_search input').val();
        //把value值拼接到地址栏后 重新渲染
        obj.proName=value;
        render();

        var arr = getHistory();
        //确认输入框不为空
        if(value.trim()==0){
            mui.toast('请输入搜索关键字');
        }
        //渲染列表只显示10条最近添加历史记录
        if(arr.length>10){
            arr.pop();
        }
        //如果历史记录已经有相同的记录，删除此前的记录，并添加最新的记录
        if(arr.indexOf(value)!=-1){
            arr.splice(arr.indexOf(value),1);
        }
        arr.splice(0,0,value);
        //console.log(arr);
        localStorage.setItem('search_list',JSON.stringify(arr));
    });

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