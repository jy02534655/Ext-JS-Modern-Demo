//视图控制器
//分享管理
Ext.define('app.view.share.Controller', {
    extend: 'ux.app.ViewController',
    alias: 'controller.share',
    //点击列表时
    onListChildtap: function (t, location) {
        //如果在长按状态停止后续事件的执行
        if (t.isSimple) {
            t.isSimple = false;
        } else {
            //如果不是长按则进入编辑页
            //跳转到编辑页
            this.showView('shareEdit', {
                viewModel: {
                    data: {
                        //将模型绑定到data中
                        data: location.record
                    }
                }
            });
        }
    },
    //长按列表时
    onListChildtaphold: function (t, location) {
        //给list一个标识，表示现在是长按状态，避免误判
        t.isSimple = true;
        //注意这里需要引入Ext.MessageBox
        Ext.Msg.confirm("删除", "你确定要删除所选分享吗?",
        function (buttonId) {
            if (buttonId === 'yes') {
                var store = t.getStore();
                //从store中移除所选项
                store.remove(location.record);
                store.save();
            }
        },
        this);
    },
    //点击保存
    onSave: function () {
        this.viewModelSave(Ext.getStore('share'));
    }
});