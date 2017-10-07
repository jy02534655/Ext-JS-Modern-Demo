//模型
//物品类型
Ext.define('app.model.used.Type', {
    extend: 'Ext.data.Model',
    fields: [{
        //名称
        name: 'name',
        type: 'string'
    }],
    proxy: {
        type: 'api',
        api: {
            create: config.used.type.add,
            update: config.used.type.update
        }
    }
});