/**
 * Created by Admin on 2018/3/4.
 */
$(function(){
    // 初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    option = {
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});