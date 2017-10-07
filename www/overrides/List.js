//汉化List
//取消选择效果
//禁用加载遮罩，防止跳转时页面卡顿，使用统一的遮罩效果
Ext.define("overrides.List", {
    override: "Ext.List",
    config: {
        //禁用加载遮罩，防止跳转时页面卡顿，使用统一的遮罩效果
        loadingText: false,
        emptyText: '暂无记录',
        //刷新时滚动到顶部
        scrollToTopOnRefresh:false
    }
});