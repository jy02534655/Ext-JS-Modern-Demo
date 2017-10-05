//视图控制器
//用户控制器
Ext.define('app.view.user.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user',
    //登录页面启动时
    onLoginInitialize: function () {
        var me = this;
        app.model.User.load(1, {
            success: function (user) {
                //如果读取到本地用户信息，自动填充到表单
                me.getView().setValues(user.getData());
            }
        });
    },
    //点击登录
    onLoginClick: function (button) {
        var me = this,
     form = me.getView(),
            values;
        if (form.validate()) {
            values = form.getValues()
            //请求登录接口
            util.ajaxB(config.user.login, values, 'POST').then(function (response) {
                if (response.success) {
                    me.keepUser(values);
                    //登录成功
                    me.loginSuccess(response.data);
                } else {
                    //登录失败
                    form.setValues({
                        password: ''
                    });
                }
                //提示消息
                Ext.toast(response.message, 2000);
            });
        }
    },
    //登录成功
    loginSuccess: function (data) {
        //全局变量写入用户信息
        config.userData = data;
        //触发路由
        //由核心控制器接收路由，处理登录成功流程
        this.redirectTo('push/main');
    },
    //保存用户信息
    keepUser: function (user) {
        if (!user.persist) {
            user.password = '';
        }
        //id必须为int类型，否则localstorage代理不能正确存储ids
        //感谢@纳新 提醒
        user.id = 1;
        var logUser = Ext.create('app.model.User', user);
        //储存到本地
        logUser.save();
    }
});