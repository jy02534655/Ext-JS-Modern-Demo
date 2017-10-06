//数据源
//物品列表
Ext.define('app.store.Used', {
    extend: 'Ext.data.Store',
    //扩展类需要引入才能使用
    requires: 'ux.proxy.API',
    //表示引用的模型
    //注意，不要图省事，有些看起来差不多的数据用同一个数据模型
    //你会发现共用一个模型的多个store之间数据混乱了
    model: 'app.model.Used',
    //数据仓库id
    //你可以通过Ext.getStore(仓库id)获取到这个模型
    //需要在Application.js或者全局控制器中通过stores:['Used']引入才能生效
    storeId: 'used',
    //是否自动加载，默认为true
    //默认不修改时，在应用启动时就会请求数据
    //所以一般情况下设置为false,手动请求
    autoLoad: false,
    //当数据发生变动时是否自动保存，默认为false
    //在请求远程数据时不推荐设置为true
    //在请求远程数据时,在proxy中有个api配置，里面可以配置增删改查等操作对应的url
    //如果为true会自动请求，不过请求产生的数据流比较大，不推荐使用
    autoSync: false,
    //数据仓库本身可以设置一些默认数据
    //不过一旦请求远程数据，这些数据将被覆盖
    //这里是演示，不用时请注释
    //data: [{
    //    id: 100
    //}],
    //每次请求数据条目，用于分页，默认值是25
    //注意这个只是向服务端发送一个limit=7的参数
    //不是说你只要设置了就只显示7条数据，而是取决于服务端
    pageSize: 7,
    proxy: {
        //代理类型
        type: 'api',
        //请求地址，这里我用一个全局变量，方便维护
        //如果要想数据仓库代理增删查改，可以把这个配置api中
        url: config.used.list
    }
});