//视图
//垂直布局1
Ext.define('app.view.layout.Vbox1', {
    extend: 'Ext.Container',
    alternateClassName: 'layoutVbox1',
    xtype: 'layoutVbox1',
    config: {
        title: '垂直布局1',
        layout: 'vbox',
        defaults: {
            padding: 10
        },
        items: [{
            //第一项，占了100px的高度
            html: "First Item",
            style: 'background:red',
            height: 100
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