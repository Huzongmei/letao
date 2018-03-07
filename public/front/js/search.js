/**
 * Created by Admin on 2018/3/7.
 */
$(function(){
    //列表渲染功能
    //1. 从本地缓存中获取到需要渲染的数据

    //希望这个函数无论如何都能返回一个数组，如果没有记录，返回一个[]
    function getHistory() {
        var history = localStorage.getItem("search_list") || '[]';
        var arr = JSON.parse(history);
        return arr;
    }

    function render() {
        var arr = getHistory();
        //console.log(arr);
        //2. 结合模版引擎渲染数据。
        $(".lt_history").html( template("tpl", {arr:arr}) );
    }

    render();

    //清空记录功能
   // 1.给清空按钮注册点击使劲按（事件委托）
   // 2.清掉search_list里面的值
   // 3.重新渲染
    $('.lt_history').on('click','.btn_empty',function(){
        var arr = getHistory();
        //console.log(arr);
        //弹出确认框
        mui.confirm('你确认要清空历史记录吗？','温馨提示',['是','否'],function(e){
            if(e.index==0){
                localStorage.removeItem('search_list');
                render();
            }
        })
    });

    //单条删除功能
    // 1.给btn_delete按钮注册点击事件(事件委托)
    // 2.删除掉search_list里面对应的数据
    // 3.重新渲染
    $('.lt_history').on('click','.btn_delete',function(){
        var arr = getHistory();
        var id = $(this).parent().data('id');
        mui.confirm('你确认要删除此次历史记录吗','温馨提示',['是','否'],function(e){
            if(e.index==0){
                arr.splice(id,1);
                //console.log(arr);
                localStorage.setItem('search_list',JSON.stringify(arr))
                render();
            }

        });

    });

    //添加功能
    //1.给搜索btn_search按钮注册点击事件
    //2.获取input框的value值
    //3.添加到search_list里面去
    //4.重新渲染
    $('.btn_search').on('click',function(){
        var value = $('.lt_search input').val();
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
        render();
        //清空输入框的值
        $('.lt_search input').val('');
        //跳转searchList商品列表
        location.href='searchList.html?key='+value;

    })
});