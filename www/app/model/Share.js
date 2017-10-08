//模型
//分享
Ext.define('app.model.Share', {
    extend: 'Ext.data.Model',
    requires: 'Ext.data.identifier.Uuid',
    //主键自增长策略
    identifier: 'uuid',
    fields: [{
        //一定要给主键字段，否则会出错
        name: 'id',
        type: 'string'
    }, {
        name: 'site',
        type: 'string'
    },
    {
        name: 'name',
        type: 'string'
    }],
    proxy: {
        //本地储存代理
        type: 'localstorage',
        id: 'share-data'
    }
});