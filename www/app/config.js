//公用类
//用于存放各种配置
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
            list: '~api/used/list'
        }
    }
});