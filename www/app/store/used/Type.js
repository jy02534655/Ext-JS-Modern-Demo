//数据源
//物品类型列表
Ext.define('app.store.used.Type', {
    extend: 'Ext.data.Store',
    model: 'app.model.used.Type',
    storeId: 'usedType',
    pageSize: 7,
    proxy: {
        type: 'api',
        url: config.used.type.list
    }
});