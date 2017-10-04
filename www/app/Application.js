/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('app.Application', {
    extend: 'Ext.app.Application',

    name: 'app',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    launch: function () {
        this.redirectTo('home');
        //初始化帮助类
        util.init();
        //移除加载动画
        Ext.fly('loading-mask').destroy();
        //获取终端型号
        if (window.device != undefined) {
            config.appType = device.platform.toLowerCase();
        }
        console.log('当前终端型号：', config.appType);
        console.log('当前版本号：', config.ver);
        var eq = util.equals({ a: 1 }, { b: 2 });
        console.log('{ a: 1 } 与 { b: 2 }是否相同：', eq);
        eq = util.equals({ a: 1, c: { a: 1 } }, { a: 1, c: { a: 1 } });
        console.log('{ a: 1, c: { a: 1 } } 与 { a: 1, c: { a: 1 } }是否相同：', eq);
    },
    onAppUpdate: function () {
        window.location.reload();
    }
});
