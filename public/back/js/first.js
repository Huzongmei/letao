/**
 * Created by Admin on 2018/3/6.
 */
$(function(){
    var $form=$('#form');
    // 点击添加分类 显示模态框

    $('.btn_add').on('click',function(){
        $('#add_modal').modal('show');
    });

    // 设置添加分类校验
    $form.bootstrapValidator({
        //添加校验小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'请输入一级分类的名称'
                    }
                }
            }
        }
    });



    // table渲染
    var page=1;
    var pageSize=5;
    function render(){
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                //console.log(info);
                $('.table tbody').html(template('tpl',info))

                // 设置分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    //type属性：
                    // 如果是首页---> first
                    // 上一页-->prev
                    // 下一页-->next
                    // 尾页-->last
                    // 具体的页码-->page
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            //如果是page，说明就是数字，只需要返回对应的数字即可
                            default:
                                return page;
                        }
                    },
                    totalPages:Math.ceil(info.total/pageSize),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a, b, c,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page=p;
                        render();
                    }
                });
            }
        })
    }
    render();


    // 注册校验成功后事件 关闭模态框 返回数据给到后台 重新渲染 表单重置
    $form.on('success.form.bv',function(e){
        e.preventDefault();

        var data=$(this).serialize();
        $.ajax({
            type:'POST',
            url:'/category/addTopCategory',
            data:data,
            success:function(info){
                //console.log(info);
                if(info.success){
                    $('#add_modal').modal('hide');
                    render();
                    $('#form').data('bootstrapValidator').resetForm();
                }

            }
        })

    });

});