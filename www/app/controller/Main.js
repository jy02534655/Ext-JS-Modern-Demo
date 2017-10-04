/*
* 核心控制器，控制视图跳转
*/
Ext.define('app.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        //路由
        routes: {
            //当路径为push/view时触发pushView方法
            //view是参数，不可以是中文
            'push/:view': 'pushView'
        }
    },
    pushView: function (view) {
        console.log('我是临时变量:', config.tmpParams);
        //移除临时变量
        delete config.tmpParams;
        console.log('临时变量被移除了，所以它是：', config.tmpParams);
    }
});