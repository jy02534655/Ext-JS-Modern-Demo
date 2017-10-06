//视图
//登录页
Ext.define("app.view.user.Login", {
    //继承于Ext.form.Panel
    extend: 'Ext.form.Panel',
    //依赖的类
    requires: ['Ext.field.Password', 'Ext.Button', 'Ext.field.Toggle', 'Ext.layout.HBox', 'Ext.Toast'],
    //别名,配置后可以通过Ext.create('userLogin')直接创建，等同于Ext.create('app.view.user.Login')
    alternateClassName: 'userLogin',
    //类名
    xtype: 'userLogin',
    //视图控制器
    controller: 'user',
    //监听事件
    listeners: {
        //视图初始化事件
        initialize: 'onLoginInitialize'
    },
    config: {
        //相当于css属性中的padding
        padding: '40 30 0 30',
        items: [{
            //文本框控件
            xtype: 'textfield',
            //用于form控件取值
            name: 'userid',
            label: '账号',
            //必填项
            required: true
        },
        {
            //密码控件，使用此控件需要配置依赖 Ext.field.Password
            xtype: 'passwordfield',
            name: 'password',
            label: '密码',
            required: true
        },
        {
            //布局
            layout: {
                //横向布局，使用此布局需要配置依赖 Ext.layout.HBox
                type: 'hbox',
                //右对齐
                pack: 'end'
            },
            //相当于css属性中的margin
            margin: '10 0',
            items: [{
                //togglefield控件，使用此控件需要配置依赖 Ext.field.Toggle
                xtype: 'togglefield',
                name: 'persist',
                //标签文本
                label: '记住我',
                //文本对齐配置
                labelTextAlign: 'right',
                //文本相对控件位置
                labelAlign: 'left',
                //默认选中
                value: true
            }]
        },
        {
            //按钮控件，使用此控件需要配置依赖 Ext.Button
            xtype: 'button',
            //相当于css属性中的width
            width: '100%',
            //按钮显示值
            text: '登&emsp;&emsp;&emsp;陆',
            //按钮皮肤
            ui: 'action',
            //监听事件
            listeners: {
                //监听点击事件
                tap: 'onLoginClick'
            }
        }]
    }
});