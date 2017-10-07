//模拟数据源
//物品类型列表
Ext.define('app.data.used.Type', {
    extend: 'app.data.Simulated',
    data: {
        total: 3,
        data: [{
            id: 1,
            name: '摩托车'
        },
        {
            id: 2,
            name: '自行车'
        },
        {
            id: 3,
            name: '汽车'
        }]
    }
});