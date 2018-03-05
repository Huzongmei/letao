/**
 * Created by Admin on 2018/3/2.
 */
$(function(){

    //����ҳ����ؽ�����
    //���ý��Ȼ�
    NProgress.configure({
        showSpinner: false
    });
    $(document).ajaxStart(function(){
        //ajax��������ʼʱ������������
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        //ajax�����������ʱ������������
        setTimeout(function(){
            NProgress.done();
        },500)
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
    if(location.href.indexOf('login.html')==-1){
        $.ajax({
            type:'GET',
            url:'/employee/checkRootLogin',
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(info.error==400){
                    location.href='login.html'
                }
            }
        })
    }

});

