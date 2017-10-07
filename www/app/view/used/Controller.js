//视图控制器
//用户控制器
//注意这个视图控制器不是唯一的
//在多视图中通过  controller: 'used', 会创建多个视图控制器
//每个视图控制器都依赖与创建它的视图，视图销毁这个视图控制器也就随之销毁了
Ext.define('app.view.used.Controller', {
    extend: 'ux.app.ViewController',
    alias: 'controller.used',
    //点击列表时
    onListChildtap: function (t, location) {
        //跳转到编辑页
        this.showView('usedEdit', {
            viewModel: {
                data: {
                    //将模型绑定到data中
                    data: location.record
                }
            }
        });
    },
    //点击保存
    onSave: function () {
        this.viewModelSave(Ext.getStore('used'));
    }
});