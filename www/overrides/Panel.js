//重写Panel,隐藏标题
Ext.define('overrides.Panel', {
    override: 'Ext.Panel',
    config: {
        //默认不显示标题栏
        header: false
    }
});