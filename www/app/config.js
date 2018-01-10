//公用类
//用于存放各种配置
//没钱买服务器，后端接口用js模拟，返回的数据是固定数据
//只要服务端返回的数据格式标准
//实际开发中直接把模拟接口地址换成后端地址直接就能用
Ext.define('app.config', {
    //别名，为了方便调用，这样通过 config.参数名 就能直接使用
    //如config.ver
    alternateClassName: 'config',
    statics: {
        //终端型号
        appType: 'web',
        //版本号，用于自动更新
        version: '0.1',
        //临时变量
        tmpParams: null,
        //用户信息
        userData:null,
        //用户
        user: {
            //登录
            login: '~api/user/login'
        },
        //物品
        used: {
            //列表
            list: '~api/used/list',
            //新增
            add: '~api/add',
            //更新
            update: '~api/update',
            //物品类型
            type: {
                list: '~api/used/type'
            }
        }
    }
});
