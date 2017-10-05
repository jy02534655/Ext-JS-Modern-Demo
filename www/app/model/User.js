//模型
//用户
Ext.define('app.model.User', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.proxy.LocalStorage'],
    fields: [{
        //字段名称
        name: 'userid',
        //字段类似
        type: 'string'
    },
    {
        name: 'password',
        type: 'string'
    },
    {
        name: 'persist',
        type: 'boolean',
        //默认值
        defaultValue: false
    }],
    //代理
    proxy: {
        //本地储存
        type: 'localstorage',
        id: 'instance-login-user'
    }
});