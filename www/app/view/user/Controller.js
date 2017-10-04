//视图控制器
//用户控制器
Ext.define('app.view.user.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user',
    //点击登录
    onLoginClick: function (button) {
        alert('我点击了登录按钮！');
    }
});