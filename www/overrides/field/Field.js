//重写类 
//表单控件 
//汉化
Ext.define("override.field.Field", {
    override: "Ext.field.Field",
    config: {
        //提示信息
        requiredMessage: '此项为必填项',
        //错误提示位置
        errorTarget: 'under'
    }
});