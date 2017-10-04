//视图控制器
//用户控制器
Ext.define('app.view.user.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user',
    //点击登录
    onLoginClick: function (button) {
        //临时变量，必须在redirectTo方法之前执行
        config.tmpParams = { userName: 'test', passWord: 'tese' };
        //在控制层中通过redirectTo方法即可改变url
        this.redirectTo('push/view');
    }
});