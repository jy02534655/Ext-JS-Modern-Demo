//汉化消息弹窗
Ext.define("overrides.MessageBox", {
    override: "Ext.MessageBox",
    statics: {
        OK: {
            text: '确定',
            itemId: 'ok'
        },
        YES: {
            text: '是',
            itemId: 'yes'
        },
        NO: {
            text: '否',
            itemId: 'no'
        },
        CANCEL: {
            text: '取消',
            itemId: 'cancel'
        },
        OKCANCEL: [{
            text: '确定',
            itemId: 'ok'
        },
        {
            text: '取消',
            itemId: 'cancel'
        }],
        YESNOCANCEL: [{
            text: '是',
            itemId: 'yes'
        },
        {
            text: '否',
            itemId: 'no'
        },
        {
            text: '取消',
            itemId: 'cancel'
        }],
        YESNO: [{
            text: '是',
            itemId: 'yes'
        },
        {
            text: '否',
            itemId: 'no'
        }]
    }
});