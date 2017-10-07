//视图
//新增、编辑物品
Ext.define('app.view.used.Edit', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.field.TextArea', 'Ext.field.Select', 'Ext.app.ViewModel'],
    alternateClassName: 'usedEdit',
    xtype: 'usedEdit',
    controller: 'used',
    //给一个默认的viewModel，避免bind出错
    viewModel: {
    },
    listeners: {
        //如果用户没有点击保存按钮，而是点击的返回按钮，这里会自动重置数据
        destroy: 'modelReject'
    },
    //自定义属性
    //模型类名
    //用于新增
    modelName: 'app.model.Used',
    config: {
        title:'编辑',
        padding: '40 30 0 30',
        items: [{
            xtype: 'textfield',
            name: 'name',
            label: '标题',
            required: true,
            //绑定数据，编辑时使用
            bind: '{data.name}'
        },
        {
            xtype: 'selectfield',
            name: 'type',
            label: '类型',
            store: 'usedType',
            //显示字段名称，
            displayField: 'name',
            //主键字段名称
            valueField: 'id',
            required: true,
            //监听初始化事件，自动加载类型数据
            listeners: {
                initialize: 'onListInitialize'
            },
            bind: '{data.type}'
        },
        {
            name: 'content',
            xtype: 'textareafield',
            maxRows: 4,
            label: '内容',
            required: true,
            bind: '{data.content}'
        },
        {
            width: '100%',
            xtype: 'button',
            text: '保&emsp;&emsp;&emsp;存',
            ui: 'action',
            //监听初始化事件，自动加载类型数据
            listeners: {
                tap: 'onSave'
            }
        }]
    }
});