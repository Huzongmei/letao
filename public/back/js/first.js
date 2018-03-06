/**
 * Created by Admin on 2018/3/6.
 */
$(function(){
    // 点击添加分类 显示模态框
    $('.btn_add').on('click',function(){
        $('#add_modal').modal('show');
    });

    // table渲染
    function render(){
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            dataType:'json',
            success:function(info){
                console.log(info);
            }
        })
    }
    render();
});