//视图
//综合布局
Ext.define('app.view.layout.VHbox', {
    extend: 'Ext.Container',
    alternateClassName: 'layoutVHbox',
    xtype: 'layoutVHbox',
    config: {
        title: '综合布局',
        layout: 'vbox',
        //第一级的items中每个元素的默认配置
        defaults: {
            padding: 10,
            //第二级的items中每个元素的默认配置
            defaults: {
                padding: 10
            }
        },
        items: [{
            //第一项，占了四份中的一份
            style: 'background:red',
            flex: 1,
            layout: 'hbox',
            items: [{
                html: 'hbox的子项一',
                flex: 1,
                style: 'background:white'
            },
            {
                html: 'hbox的子项二',
                flex: 1,
                style: 'background:gray'
            }]
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