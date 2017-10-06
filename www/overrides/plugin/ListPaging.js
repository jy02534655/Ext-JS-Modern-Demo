//汉化加载更多插件
//启用自动加载功能
Ext.define("overrides.plugin.ListPaging", {
    override: "Ext.plugin.ListPaging",
    config: {
        //自动加载
        //autoPaging: true,
        //滚动到最底部时是否自动加载下一页数据
        noMoreRecordsText: '没有更多内容了',
        loadMoreText: '加载更多...' //加载更多按钮显示内容
    }
});