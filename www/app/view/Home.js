//视图
//主页
Ext.define('app.view.Home', {
    extend: 'Ext.Container',
    requires: ['Ext.Toolbar', 'Ext.layout.VBox'],
    xtype: 'home',
    config: {
        //当显示这个视图时，导航栏标题
        title: '首页',
        //布局
        layout: 'vbox',
        padding: 10,
        //第一级的items中每个元素的默认配置
        defaults: {
            layout: 'hbox'
        },
        items: [{
                height: '8em',
                margin: '0 0 10 0',
            //第二级的items中每个元素的默认配置
            defaults: {
                //默认为按钮类型
                xtype: 'button',
                //图标显示位置
                iconAlign: 'top',
                //自定义属性，用于在全局控制层中监听
                action: 'redirect',
                //html5特性
                flex: 1
            },
            items: [{
                //按钮样式，这里用了自带的图标样式
                iconCls: 'x-fa fa-steam',
                //按钮显示文字 
                text: '物品',
                //自定义属性，用于获取将要跳转的页面
                redirect: 'usedList'
            },
            {
                iconCls: 'x-fa fa-align-justify',
                text: '垂直布局',
                redirect: 'layoutVbox'
            },
            {
                iconCls: 'x-fa fa-bars',
                text: '垂直布局1',
                redirect: 'layoutVbox1'
            },
            {
                iconCls: 'x-fa fa-pause',
                text: '水平布局',
                redirect: 'layoutHbox'
            }]
        },
        {
            //宽
            height: '8em',
            defaults: {
                xtype: 'button',
                iconAlign: 'top',
                action: 'redirect',
                flex: 1
            },
            items: [{
                iconCls: 'x-fa fa-list-alt',
                text: '综合布局',
                redirect: 'layoutVHbox'
            },
            {
                iconCls: 'x-fa fa-stop',
                text: '填充布局',
                redirect: 'layoutFit'
            },
            {
                iconCls: 'x-fa fa-book',
                text: '卡牌布局',
                redirect: 'layoutCard'
            },
            {
                iconCls: 'x-fa fa-plus-circle',
                text: '新增物品',
                redirect: 'usedEdit',
                //这个参数是给下一个视图的，也就是编辑视图
                //在这里编辑和新增唯一的区别也就是标题的区别了
                params: { title: '新增物品' }
            }]
        },
        {
            //边栏控件
            xtype: 'toolbar',
            //停靠位置
            docked: 'bottom',
            defaults: {
                xtype: 'button',
                iconAlign: 'top',
                action: 'redirect'
            },
            items: [{
                iconCls: 'x-fa fa-user',
                text: '个人中心'
            },
            {
                iconCls: 'x-fa fa-cogs',
                text: '关于我们'
            }]
        }]
    }
});