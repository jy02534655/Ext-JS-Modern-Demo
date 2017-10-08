//视图
//分享管理
Ext.define('app.view.share.List', {
    alternateClassName: 'shareList',
    extend: 'Ext.List',
    xtype: 'shareList',
    controller: 'share',
    listeners: {
        initialize: 'onListInitialize',
        childtap: 'onListChildtap',
        //监听长按事件
        childtaphold: 'onListChildtaphold'
    },
    config: {
        title: '分享管理',
        itemTpl: '<div>{name}</div>',
        store: 'share'
    }
});