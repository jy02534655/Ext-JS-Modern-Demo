//视图
//物品列表
Ext.define('app.view.used.List', {
    extend: 'Ext.List',
    requires: ['Ext.plugin.PullRefresh', 'Ext.plugin.ListPaging'],
    alternateClassName: 'usedList',
    xtype: 'usedList',
    controller: 'used',
    listeners: {
        initialize: 'onListInitialize',
        //监听点击事件
        childtap: 'onListChildtap'
    },
    config: {
        title: '物品',
        //数据模版，具体查看api，搜索XTemplate能看到详细示例
        itemTpl: '<div>{name}</div>',
        //对应的数据仓库id
        store: 'used',
        //下拉刷新插件和分页插件
        //注意分页和下拉插件不是添加了就完事了
        //服务端很重要，我们只发送请求，服务端返回啥我们就显示啥
        //因为模拟接口本身有bug，所以返回的数据总数正好和页码相等，这样就不会有分页了
        //实际开发中分页插件可正常使用
        plugins: ['pullrefresh', 'listpaging']
    }
});