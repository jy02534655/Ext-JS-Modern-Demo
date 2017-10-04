/*
*跳转主控
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
        console.log('我是界面跳转路由');
    }
});