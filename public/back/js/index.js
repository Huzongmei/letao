/**
 * Created by Admin on 2018/3/4.
 */
$(function(){
    // ��ʼ��echartsʵ��
    var myChart = echarts.init(document.getElementById('main'));

    // ָ��ͼ��������������
    option = {
        xAxis: {
            type: 'category',
            data: ['һ��', '����', '����', '����', '����', '����', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    };

    // ʹ�ø�ָ�����������������ʾͼ��
    myChart.setOption(option);
});