//视图
//新增、编辑分享
Ext.define('app.view.share.Edit', {
    extend: 'Ext.form.Panel',
    alternateClassName: 'shareEdit',
    xtype: 'shareEdit',
    controller: 'share',
    viewModel: {
    },
    listeners: {
        //如果用户没有点击保存按钮，而是点击的返回按钮，这里会自动重置数据
        destroy: 'modelReject'
    },
    modelName: 'app.model.Share',
    config: {
        padding: '40 30 0 30',
        title: '编辑',
        items: [{
            xtype: 'textfield',
            name: 'name',
            label: '名称',
            required: true,
            bind:'{data.name}'
        },
        {
            xtype: 'selectfield',
            name: 'site',
            label: '类型',
            options: [{
                text: '新浪微博',
                value: 'sinaminiblog'
            },
            {
                text: '搜狐微博',
                value: 'sohuminiblog'
            },
            {
                text: '开心网',
                value: 'kaixin001'
            },
            {
                text: '人人网',
                value: 'renren'
            }],
            required: true,
            bind: '{data.site}'
        },
        {
            width: '100%',
            xtype: 'button',
            text: '保&emsp;&emsp;&emsp;存',
            ui: 'action',
            listeners: {
                tap: 'onSave'
            }
        }]
    }
});