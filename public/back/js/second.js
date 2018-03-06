/**
 * Created by Admin on 2018/3/6.
 */
$(function(){
    // 渲染table内容
    var page=1;
    var pageSize=5;
    var $form=$('#form');
    function render() {
        $.ajax({
            type:'GET',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                //console.log(info);
                $('.table tbody').html(template('tpl',info))

                // 设置分页
                $('#paginator').bootstrapPaginator({
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
                })


            }
        })
    }
    render();

    // 显示模态框
    $('.btn_add').on('click',function(){
        $('#add_modal').modal('show');

        //渲染下拉框内容
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                $('.dropdown-menu').html(template('dropTpl',info));
            }
        })

    });

    //给下拉框中所有的a标签注册点击事件
    $('.dropdown-menu').on('click','a',function(){
        //把选择的a的内容赋给下拉框
        $('.dropdown_text').text($(this).text());
        //把选择的a的id赋给隐藏的input的name
        $('[name="categoryId"]').val( $(this).data('id'));

        //3. 让categoryId校验变成成功
        //$form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");

    });

    //初始化图片上传
    $("#fileupload").fileupload({
        dataType: "json",//指定响应的格式
        done: function (e, data) {//图片上传成功之后的回调函数
            //通过data.result.picAddr可以获取到图片上传后的路径
            //console.log(data);
            //console.log(data.result.picAddr);

            //设置给img_box中img的src属性
            $(".img_box img").attr("src", data.result.picAddr);
            //把图片的地址赋值给brandLogo
            $("[name='brandLogo']").val(data.result.picAddr);

            //把brandLogo改成成功
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    // 表单校验
    $form.bootstrapValidator({
        excluded: [],//不校验的内容
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类的名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传品牌图片"
                    }
                }
            }
        }
    })


    //给表单注册校验成功事件
    $form.on("success.form.bv", function (e) {
        e.preventDefault();

        //发送ajax
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $form.serialize(),
            success: function (info) {
                if (info.success) {
                    //成功了
                    //1. 关闭模态框
                    $("#add_modal").modal("hide");
                    //2. 重新渲染第一页
                    currentPage = 1;
                    render();


                    //3. 重置内容和样式
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();

                    //4. 重置下拉框组件和图片
                    $(".dropdown_text").text("请选择一级分类");
                    $("[name='categoryId']").val('');
                    $(".img_box img").attr("src", "images/none.png");
                    $("[name='brandLogo']").val('');
                }
            }
        });

    })

});