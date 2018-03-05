/**
 * Created by Admin on 2018/3/4.
 */
$(function(){


    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('main1'));

    var myChart2 = echarts.init(document.getElementById('main2'));
    // 指定图表的配置项和数据

    // 柱状图
    option1 = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '人数',
            data: [500, 800, 1700, 2000, 1500, 1200, 2500],
            type: 'bar'
        }]
    };

    // 饼状图
    option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['阿迪','李宁','耐克','匡威','新百伦']
        },
        series : [
            {
                name: '销售占比',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'阿迪'},
                    {value:310, name:'李宁'},
                    {value:234, name:'耐克'},
                    {value:135, name:'匡威'},
                    {value:1548, name:'新百伦'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
    myChart2.setOption(option2);
});