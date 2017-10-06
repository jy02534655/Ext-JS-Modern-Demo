//模拟数据源
//登录接口
Ext.define('app.data.used.List', {
    extend: 'app.data.Simulated',
    data: {
        //数据总数用于分页
        //因为模拟接口本身有bug，所以返回的数据总数正好和pageSize相等，这样就不会有分页了
        total: 7,
        data: [{
            id: 1,
            type: 1,
            name: '摩托车',
            content: '内容'
        },
        {
            id: 2,
            type: 1,
            name: '摩托车2',
            content: '内容2'
        },
        {
            id: 3,
            type: 1,
            name: '摩托车3',
            content: '内容3'
        },
        {
            id: 4,
            type: 1,
            name: '摩托车4',
            content: '内容4'
        },
        {
            id: 5,
            type: 1,
            name: '摩托车5',
            content: '内容5'
        },
        {
            id: 6,
            type: 1,
            name: '摩托车6',
            content: '内容6'
        },
        {
            id: 7,
            type: 1,
            name: '摩托车7',
            content: '内容7'
        }]
    }
});