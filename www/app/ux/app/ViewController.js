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
    },

    //显示指定页面
    showView: function (view, tmpConfig) {
        config.tmpParams = tmpConfig;
        this.redirectTo('redirect/' + view, true);
    },
    //返回上一页
    onBack: function () {
        this.redirectTo('redirect');
    },

    //重置当前页模型
    modelReject: function () {
        var model = this.getViewModel().get('data');
        if (model && model.isModel) {
            //取消模型的更改
            model.reject();
        }
    },

    //模型保存
    //链式
    modelSave: function () {
        var me = this,
        form = me.getView(),
        deferred,
        model;
        //如果不是表单，向下查找表单控件
        if (!form.isXType('formpanel')) {
            form = form.down('formpanel');
        }
        //验证表单数据是否正确
        if (form.isValid()) {
            //获取当前viewModel中data数据
            model = me.getViewModel().get('data');
            //如果不是模型
            if (!model.isModel) {
                //说明是新增，根据form中自定义属性modelName创建新的模型
                model = Ext.create(form.modelName);
            }
            //验证模型数据
            //模型里面也可以写验证的
            //注意模型里面未定义的字段不会被提交
            model = util.validFormModel(form, model);
            if (model) {
                return util.saveModel(model);
            }
        }
        deferred = new Ext.Deferred();
        return deferred.promise;
    },
    //模型保存并更新数据仓库
    //store     数据源
    //isReload  默认为无刷新添加,需要服务端返回主键id
    //          true 新增成功后直接刷新列表
    //isEditReload 默认不操作
    //          true 编辑成功后直接刷新列表 
    modelSaveByStore: function (store, isReload, isEditReload) {
        var me = this;
        return me.modelSave().then(function (data) {
            //如果是新增
            if (data.phantom) {
                if (isReload) {
                    store.reload();
                } else {
                    store.add(data.rec);
                }
            } else if (isEditReload) {
                store.reload();
            }
        });
    },
    //返回页保存模型数据 链式
    //以model.save形式
    //store     数据源
    //isReload  默认为无刷新添加,需要服务端返回主键id
    //          true 新增成功后直接刷新列表
    //isEditReload 默认不操作
    //          true 编辑成功后直接刷新列表 
    viewModelSave: function (store, isReload, isEditReload) {
        var me = this;
        return me.modelSaveByStore(store, isReload, isEditReload).then(function () {
            me.onBack();
        });
    },
    //保存弹窗表单的值
    //以model.save形式
    //isReload  默认为无刷新添加,需要服务端返回主键id
    //          true 新增成功后直接刷新列表
    //isEditReload 默认不操作
    //          true 编辑成功后直接刷新列表 
    winModelSave: function (isReload, isEditReload) {
        var me = this;
        return me.modelSaveByStore(isReload, isEditReload).then(function () {
            me.onClose();
        });
    }
});