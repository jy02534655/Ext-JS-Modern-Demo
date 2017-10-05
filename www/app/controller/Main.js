/*
* 核心控制器，控制视图跳转
*/
Ext.define('app.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        //引用
        refs: {
            //mian视图
            main: 'main',
            //所有action:redirect属性按钮
            redirectBtn: 'button[action=redirect]'
        },
        //路由
        routes: {
            //当路径为push/view时触发pushView方法
            //view是参数，不可以是中文
            'push/:view': 'pushView',
            //当路径为redirect时触发showView方法，里面不带参数
            'redirect': 'showView',
            //显示指定视图
            'redirect/:view': 'showView'
        },
        control: {
            //跳转按钮
            redirectBtn: {
                tap: function (t, value) {
                    //获取按钮自定义属性redirect的值
                    var redirect = t.getInitialConfig('redirect'),
                    //获取按钮自定义属性params的值
                    params = t.getInitialConfig('params');
                    //如果params有值
                    if (params) {
                        //设置全局临时变量
                        config.tmpParams = params;
                    }
                    //如果redirect有值
                    if (redirect) {
                        //跳转到指定页面
                        this.redirectTo('redirect/' + redirect, true);
                    } else {
                        //返回
                        this.redirectTo('redirect');
                    }
                }
            }
        }
    },
    pushView: function (view) {
        util.ePush(view);
    },
    //展示页面
    showView: function (view) {
        //获取临时变量
        var params = config.tmpParams || {};
        if (!view) {
            //如果目标视图存在，后退
            this.pop();
        } else {
            //展示指定页面
            this.push(view, params);
        }
        //清除临时变量
        config.tmpParams = null;;
    },
    //后退
    pop: function () {
        var main = this.getMain();
        if (main) {
            main.pop();
        }
    },
    //显示指定视图
    push: function (xtype, params) {
        //容器
        var main = this.getMain(),
        view;
        if (main) {
            params = params || {};
            //通过routeId检查视图是否已经存在
            view = main.child('component[routeId=' + xtype + ']');
            if (!view) {
                //routeId自定义标识
                params.routeId = xtype;
                console.log('新增视图', xtype, params);
                //视图不存在则创建视图
                view = Ext.create(xtype, params);
                //显示视图
                main.push(view);
            } else {
                console.log('当前视图', main.getActiveItem().routeId);
                //如果视图已经存在，并且未被激活
                if (main.getActiveItem().routeId != xtype) {
                    //显示视图
                    main.pop(xtype);
                }
                //如果有标题配置，重设标题
                if (params.title) {
                    main.setTitle(params.title);
                }
            }
            console.log('动画结束');
        }
    }
});