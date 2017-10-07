//模型
//物品
Ext.define('app.model.Used', {
    extend: 'Ext.data.Model',
    //每个模型都有一个默认的主键字段
    //字段名称默认为id，如果需要修改请修改idProperty属性
    //它的作用是根据主键来区分重复数据
    //在配合store使用时，主键指定错误可能会导致store中出现重复数据
    idProperty: 'id',
    fields: [{
        //类型
        name: 'type',
        type: 'int'
    },
    {
        //标题
        name: 'name',
        type: 'string',
        //这是模型针对单个字段的处理方法
        //有时候需要用这个方法来处理一些数据
        //这里是简单示例
        convert: function (v, record) {
            if (!v) {
                return '标题不存在';
            }
            return v;
        }
    },
    {
        //内容
        name: 'content',
        type: 'string',
        //默认值
        defaultValue: '内容为空'
    }],
    proxy: {
        type: 'api',
        api: {
            //新增
            create: config.used.add,
            //更新
            update: config.used.update
        }
    }
});