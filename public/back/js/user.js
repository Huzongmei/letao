/**
 * Created by Admin on 2018/3/5.
 */
$(function(){
    var page=1;
    var pageSize=5;
    var render=function(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                //console.log(info);
                $('.table tbody').html(template('tpl',info));
                id=info.rows[0].id;
                isDelete=info.rows[0].isDelete;
                //console.log(id);
            }
        })
    };

    // 渲染table
    render();

    // 禁用功能模态框

    $('.table tbody').on('click','.btn_stop',function(){
        // 显示模态框
        $('#tbl_modal').modal('show');
        var id=$(this).parent().data('id');
        var isDelete=$(this).hasClass('btn-danger')?0:1;

        // 禁用功能
        $('.btn_confirm').on('click',function(){
             //ajax请求后台修改数据
            $.ajax({
                type:'POST',
                url:'/user/updateUser',
                dataType:'json',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    //console.log(info);
                    // 模态框关闭
                    $('#tbl_modal').modal('hide');

                    // 重新渲染
                    render();
                }
            })
        })
    });


});