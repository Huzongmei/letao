/**
 * Created by Admin on 2018/3/2.
 */
$(function(){
    //��������Ҫ�������ݵ�ҳ����ӽ�����
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        NProgress.done();
    });



    //�����˵�����ʾ������
    $('.category').prev().on('click',function(){
        $(this).next().slideToggle();
    });


    //�������ʾ������
    $('.icon_menu').on('click',function(){
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');
    });


    //�˳�����
    //����˳� ��ʾģ̬��
    $('.icon_loginout').on('click',function(){
        $('#modal').modal('show');
    });
    //����˳���ajax�����̨��ʵ���˳�
    $('.btn_loginout').on('click',function(){
        $.ajax({
            type:'GET',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(info.success){
                    location.href='login.html';
                }
            }
        })
    });


    //������ǵ�¼ҳ������ajax���󣬲�ѯ����Ա�Ƿ��¼
    if(location.href.indexOf('login.html')){
        $.ajax({
            type:'GET',
            url:'/employee/checkRootLogin',
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(!info.success){
                    location.href='login.html'
                }
            }
        })
    }
});

