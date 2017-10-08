//公用类
//各种共用方法
Ext.define('app.util', {
    //别名，为了方便调用，这样通过 util.方法名(参数) 就能直接使用
    //如util.equals({a:1},{b:2});
    alternateClassName: 'util',
    statics: {
        //当前请求总数，起始值为0,有几个自动加载的store项则加几
        messageTotal: 0,
        //ajax请求，post提交方式
        //使用方式util.ajaxP(url, params,isNoMes).then(function(response){执行方法})
        //url请求地址
        //params参数
        //isNoMes是否不显示消息提示
        //response返回的数据，已转换为json
        //只有执行成功才执行then
        ajaxP: function (url, params, isNoMes) {
            return this.ajax(url, params, isNoMes, 'POST');
        },
        //ajax请求，get提交方式
        //使用方式util.ajax(url, params,isNoMes).then(function(response){执行方法})
        //url请求地址
        //params参数
        //isNoMes是否不显示消息提示
        //response返回的数据，已转换为json
        //只有执行成功才执行then
        ajax: function (url, params, isNoMes, method) {
            var deferred = new Ext.Deferred();
            Ext.Ajax.request({
                url: url,
                method: method || 'GET',
                params: params,
                success: function (response) {
                    //处理返回值，转换为json对象
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        deferred.resolve(response);
                    }
                    if (!response.success || !isNoMes) {
                        Ext.toast(response.message);
                    }
                }
            });
            return deferred.promise;
        },
        //可以返回错误信息的ajax
        ajaxB: function (url, params, method) {
            var deferred = new Ext.Deferred();
            Ext.Ajax.request({
                url: url,
                method: method || 'GET',
                params: params,
                success: function (response) {
                    //处理返回值，转换为json对象
                    response = Ext.decode(response.responseText);
                    deferred.resolve(response);
                },
                failure: function () {
                    deferred.resolve({
                        success: false,
                        message: '请求失败，服务端无法连接或出错！'
                    });
                }
            });
            return deferred.promise;
        },

        //视图请求store数据的方法，这个视图必须绑定了store
        //view视图对象
        //params参数，这是一个json对象，示例{userName:'test',passWord:'test'}
        //update是否强制重新请求数据
        viewLoad: function (view, params, update) {
            var store = view.getStore(),
            storeId = store.storeId;
            if (storeId == 'ext-empty-store') {
                //在ext中，如果使用bind方式绑定store，在加载数据时可能出现store还未绑定到视图中就请求数据的情况
                //这种情况我们就获取到ViewModel，根据ViewModel来加载数据
                //console.log('列表还未绑定store，从ViewModel中加载');
                store = view.getViewModel().getStore(view.getBind().store.stub.name);
            }
            this.storeLoad(store, params, update);
        },
        //store请求数据的方法
        //store数据仓库对象
        //params参数，这是一个json对象，示例{userName:'test',passWord:'test'}
        //update是否强制重新请求数据
        storeLoad: function (store, params, update) {
            //console.log('store正在加载:', store.isLoading(), '参数：', params);
            //如果已经在请求数据，中断
            if (store.isLoading()) {
                return;
            } else if (update) {
                //如果强制刷新，重新设置参数，并且清空数据
                store.getProxy().setExtraParams(params);
                store.removeAll();
            }
                //如果有参数
            else if (params) {
                //获取旧的参数
                var oldParams = store.getProxy().getExtraParams();
                //如果没有数据直接重新请求
                //比较新旧两个参数是否相同，如果不同，重新设置参数，并且清空数据
                //如果相同中断执行
                if (store.getCount() < 1) {
                    store.getProxy().setExtraParams(params);
                } else if (!this.equals(oldParams, params)) {
                    store.getProxy().setExtraParams(params);
                    store.removeAll();
                } else {
                    return;
                }
            } else if (store.getCount() > 0) {
                //console.log('已有数据，中断执行');
                //如果没有参数，但是数据已经存在，中断执行
                return;
            }
            //请求数据
            store.loadPage(1);
        },
        //比较两个对象是否相等
        equals: function (x, y) {
            var me = this;
            //直接相等
            if (x === y) {
                return true;
            }
            //如果x或者y任意一个不是object类型
            if (!(x instanceof Object) || !(y instanceof Object)) {
                return false;
            }
            //如果constructor不相等
            if (x.constructor !== y.constructor) {
                return false;
            }
            //遍历比较
            for (var p in x) {
                //如果p是x的属性
                if (x.hasOwnProperty(p)) {
                    //如果y中没有p这个属性
                    if (!y.hasOwnProperty(p)) {
                        return false;
                    }
                    //原代码x[p] === y[p]
                    //这里不进行强制比较
                    if (x[p] == y[p]) {
                        continue;
                    }
                    if (typeof (x[p]) !== "object") {
                        return false;
                    }
                    if ((!x[p] && y[p]) || (x[p] && !y[p])) {
                        return false;
                    }
                    //自调用进行比较
                    if (!me.equals(x[p], y[p])) {
                        return false;
                    }
                }
            }
            for (p in y) {
                if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                    return false;
                }
            }
            return true;
        },

        //链式
        //model.saveModel方式
        //使用方式util.saveModel(model).then(function(record, b){执行方法})
        //model model
        //只有执行成功才执行then
        saveModel: function (model) {
            var deferred = new Ext.Deferred(),
            phantom = model.phantom, response, message;
            //console.log(phantom, model.dirty);
            //修改状态并且未做修改
            if (!phantom && !model.dirty) {
                console.log('模型数据无变化，直接返回消息!');
                Ext.toast('编辑成功！');
                //直接返回数据
                deferred.resolve({
                    rec: model,
                    phantom: phantom
                });
            } else {
                model.save({
                    success: function (record, b) {
                        response = b.getResultSet();
                        if (response) {
                            message = response;
                        } else {
                            message = phantom ? '新增成功！' : '编辑成功！';
                        }
                        Ext.toast(message);
                        deferred.resolve({
                            rec: record,
                            phantom: phantom
                        });
                    },
                    //表单提交失败
                    failure: function (response, b) {
                        //如果是修改
                        if (!phantom) {
                            //取消模型的更改
                            model.reject();
                        }
                        try {
                            Ext.toast(b.getResultSet().message);
                        } catch (e) { }
                    }
                });
            }
            return deferred.promise;
        },

        //验证模型
        //form  表单视图控件
        //model 模型对象
        validFormModel: function (form, model) {
            //更新模型数据，将表单中的数据赋给模型
            this.updateRecord(form,model);
            var errors = model.validate(),
            //验证结果
            valid = errors.isValid(),
            message;
            if (!valid) {
                //遍历错误信息，弹出提示框
                errors.each(function (err) {
                    //提示信息，注意这里依赖于Ext.Toast，需引入
                    //2秒后自动隐藏此信息，默认为1秒后隐藏
                    Ext.toast(err.getMessage());
                    return false;
                });
                return valid;
            }
            return model;
        },
        //更新模型数据，将表单中的数据赋给模型
        updateRecord: function (form, record) {
            //获取模型已定义字段
            var fields = record.self.fields,
                //获取表单中的值
                values = form.getValues(),
                obj = {},
                i = 0,
                len = fields.length,
                name;
            //只更新模型中已定义的字段
            for (; i < len; ++i) {
                name = fields[i].name;
                //如果表单中有模型对应字段的值，赋值
                if (values.hasOwnProperty(name)) {
                    obj[name] = values[name];
                }
            }
            //模型开始编辑
            record.beginEdit();
            //赋值
            record.set(obj);
            //模型结束编辑
            record.endEdit();
        },

        //Viewport添加新项,Viewport之中始终只有一项
        //这里的xtype参数是指视图中的alternateClassName的值
        ePush: function (xtype) {
            //获取容器
            var me = Ext.Viewport,
            //获取当前显示的视图
            view = me.getActiveItem();
            //根据itemId判断视图是否已经被展示了，避免重复展示
            if (view && view.getItemId() == xtype) {
                return;
            }
            //创建视图
            view = Ext.create(xtype, {
                itemId: xtype
            });
            //将视图添加到容器中，并展示
            me.animateActiveItem(view, {
                //视图切换动画效果
                type: 'slide',
                //视图切换方向
                direction: 'left'
            });
        },
        //监听Ext.Viewport,在视图切换时销毁旧的视图(需要执行一次)
        eActiveitemchange: function () {
            //console.log('开始监听Ext.Viewport视图切换');
            var me = Ext.Viewport;
            me.onAfter('activeitemchange',
            function (t, value, oldValue, eOpts) {
                if (oldValue) {
                    //强制销毁，防止销毁不完全引发错误
                    me.remove(oldValue, true);
                }
            });
        },

        /*为Ext.Viewport添加一个正在加载数据的遮罩层(需要执行一次)*/
        addMessage: function () {
            //为Ext.Viewport添加一个遮罩层
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '正在请求数据...'
            });
            //隐藏这个遮罩层
            this.hideMessage();
        },
        /*显示遮罩层*/
        showMessage: function (mes) {
            var me = this,
            //获取遮罩层
            message = me.getMessage();
            //请求总数+1
            me.messageTotal++;
            message.setMessage(mes);
            //console.log('显示遮罩层,目前请求总数：', me.messageTotal);
            //显示
            message.show();
        },
        //隐藏遮罩层
        hideMessage: function () {
            var me = this;
            ////console.log('目前请求总数：', me.messageTotal);
            //请求总数大于1则不隐藏只减1
            if (me.messageTotal > 1) {
                me.messageTotal--;
            } else {
                //隐藏遮罩
                me.getMessage().hide();
                //请求总数归0
                me.messageTotal = 0;
                //console.log('隐藏遮罩层');
            }
        },
        //获取遮罩层
        getMessage: function () {
            return Ext.Viewport.getMasked();
        },
        //这里的xtype参数是指视图中的alternateClassName的值
        //重写ajax，在请求数据时自动加入请求动画遮罩(需要执行一次),如果此方法报错，请引入Ext.Ajax
        //如果不使用jsonp记得注释掉
        overrideAjax: function () {
            var me = this,
            //st的setTime方法，task.delay(500);表示500毫秒后执行
            //如果500毫秒类再次触发，之前触发的会自动取消
            task = Ext.create('Ext.util.DelayedTask',
            function () {
                Ext.toast('请求失败，请检查网络连接！');
            });
            //监听ajax事件，开始请求时显示遮罩
            Ext.Ajax.on('beforerequest',
            function (connection, options) {
                console.log('正在请求数据...');
                console.log('请求地址：', options.url);
                console.log('请求方式：', options.method);
                var params = options.params;
                if (params) {
                    console.log('参数：', params);
                }
                if (options.jsonData) {
                    console.log('json参数：', options.jsonData);
                }
                //某些情况下不需要遮罩
                //在参数里面增加isNoMask:true即可不显示遮罩
                if (!(params && params.isNoMask)) {
                    me.showMessage('正在请求数据...');
                }
            });
            //ajax请求成功
            Ext.Ajax.on('requestcomplete',
            function (connection,response, options) {
                console.log('请求成功,服务端返回数据(已转为json对象)：', Ext.decode(response.responseText));
                me.hideMessage();
            });
            //ajax请求败
            Ext.Ajax.on('requestexception',
            function (connection, options) {
                me.hideMessage();
                //延迟执行，避免遮罩消除失败无法输入
                task.delay(500);
            });
        },
        //重写jsonp，在请求数据时自动加入请求动画遮罩(需要执行一次),如果此方法报错，请引入Ext.data.JsonP
        //如果不使用jsonp记得注释掉
        overrideJsonP: function () {
            var me = this;
            Ext.define("Ext.zh.data.JsonP", {
                override: "Ext.data.JsonP",
                handleResponse: function () {
                    this.callParent(arguments);
                    me.hideMessage();
                },
                createScript: function () {
                    me.showMessage();
                    return this.callParent(arguments);
                }
            });
        },
        //格式化字符串
        format: function () {
            return Ext.util.Format.format.apply(this, arguments);
        },

        //重写汉化Pick相关(需要执行一次)
        overridePick: function () {
            Ext.Date.monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
        },
        //app.js中调用执行，根据需求设置需要需要执行一次的方法
        init: function () {
            var me = this;
            me.overridePick();
            me.addMessage();
            me.overrideAjax();
        }
    }
});