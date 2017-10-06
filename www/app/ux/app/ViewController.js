//扩展
//扩展ViewController
//所有的视图控制器都可以继承这个扩展控制器
Ext.define('ux.app.ViewController', {
    extend: 'Ext.app.ViewController',
    //列表页被初始化
    onListInitialize: function (t) {
        //在列表被创建时才请求数据
        //t就是列表对象本身，具体查看api
        util.viewLoad(t);
    }
});