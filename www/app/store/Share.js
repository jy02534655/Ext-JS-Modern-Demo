//数据仓库
//分享
Ext.define('app.store.Share', {
    extend: 'Ext.data.Store',
    model: 'app.model.Share',
    storeId: 'share',
    //是否自动保存
    //如果设置为自动保存，模型只要发生了变化就会报错数据，无须提交
    //autoSync: true,
    //是否自动加载，因为这里是本地数据代理，所以需要
    autoLoad: true
});