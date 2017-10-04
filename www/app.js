/*
 *项目入口文件，继承于app.Application
 */
Ext.application({
    extend: 'app.Application',
    //应用命名空间
    name: 'app',
    //全局控制层需要在这里引入才能起作用
    controllers: ['Main'],
    //自动引入app目录下所以的类，不需要在其他地方再次引入
    //注意每次新增类需要执行一次sencha app build命令，如果执行后无反应可以尝试再执行sencha app watch命令
    requires: [
        'app.*', 'Ext.util.DelayedTask', 'Ext.Ajax'
    ],
    // 默认起始页
    mainView: 'app.view.user.Login'
});
