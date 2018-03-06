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

                //设置分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages: Math.ceil(info.total/pageSize),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a, b, c,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page=p;
                        render();
                    }
                });
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