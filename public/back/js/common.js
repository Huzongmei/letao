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
    })
});