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
    })
});

