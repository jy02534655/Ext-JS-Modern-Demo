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
            //宽
            width: '75%',
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
                iconCls: 'x-fa fa-star',
                text: '按钮2'
            },
            {
                iconCls: 'x-fa fa-bookmark',
                text: '按钮3'
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