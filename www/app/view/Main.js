//登录后主容器
Ext.define('app.view.Main', {
    extend: 'Ext.navigation.View',
    alternateClassName: 'main',
    xtype: 'main',
    config: {
        //导航栏配置
        navigationBar: {
            //返回按钮
            backButton: {
                //返回按钮ui
                ui: 'action'
            }
        },
        //返回按钮文字
        defaultBackButtonText: '&emsp;&emsp;',
        items: [{
            //当显示这个视图时，导航栏标题
            title: '主页',
            xtype: 'home'
        }]
    }
});