//视图
//垂直布局
Ext.define('app.view.layout.Vbox', {
    extend: 'Ext.Container',
    alternateClassName: 'layoutVbox',
    xtype: 'layoutVbox',
    config: {
        title: '垂直布局',
        layout: 'vbox',
        defaults: {
            padding: 10
        },
        items: [{
            //第一项，占了四份中的一份
            html: "First Item",
            style: 'background:red',
            flex: 1
        },
        {
            //第二项，占了四份中的一份
            html: "Second Item",
            style: 'background:yellow',
            flex: 1
        },
        {
            //第三项，占了四份中的一份
            html: "Third Item",
            style: 'background:blue',
            flex: 1
        },
        {
            //第四项，占了四份中的一份
            html: "Fourth Item",
            style: 'background:green',
            flex: 1
        }]
    }
});