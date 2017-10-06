//汉化下拉刷新插件
Ext.define("overrides.plugin.PullRefresh", {
    override: "Ext.plugin.PullRefresh",
    config: {
        lastUpdatedText: '上次刷新时间：',
        loadedText: '等一会再刷新吧...',
        loadingText: '加载中...',
        pullText: '下拉可以手动刷新',
        releaseText: '松开可以刷新',
        lastUpdatedDateFormat: 'Y-m-d H:i'
    }
});