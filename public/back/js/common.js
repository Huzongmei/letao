/**
 * Created by Admin on 2018/3/2.
 */
$(function(){
    //����ҳ����ؽ�����
    $(document).ajaxStart(function(){
        //ajax��������ʼʱ������������
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        //ajax�����������ʱ������������
        NProgress.done();
    })
});