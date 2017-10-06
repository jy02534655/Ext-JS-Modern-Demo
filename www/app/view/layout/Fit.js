//视图
//填充布局
Ext.define('app.view.layout.Fit', {
    extend: 'Ext.Container',
    //在同一项目中未从未引入过，需要引入
    requires: ['Ext.layout.Fit'],
    alternateClassName: 'layoutFit',
    xtype: 'layoutFit',
    config: {
        title: '填充布局',
        layout: 'fit',
        items: [{
            padding: 10,
            html: '我铺满了父容器',
            style: 'background:red'
        }]
    }
});