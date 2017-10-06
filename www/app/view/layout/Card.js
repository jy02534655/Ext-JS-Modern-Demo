//视图
//卡牌布局
Ext.define('app.view.layout.Card', {
    extend: 'Ext.Container',
    alternateClassName: 'layoutCard',
    xtype: 'layoutCard',
    config: {
        title: '卡牌布局',
        layout: 'card',
        //表示激活显示序号为2的项，我们也可以通过setActiveItem方法来动态改变激活项
        //我们所用的navigationView就是card布局
        activeItem: 2,
        defaults: {
            padding: 10
        },
        items: [{
            html: "First Item"
        },
        {
            html: "Second Item"
        },
        {
            html: "Third Item",
            style: 'background:red',
        },
        {
            html: "Fourth Item"
        }]
    }
});