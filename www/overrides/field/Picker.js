//重写类 
//选择控件
Ext.define("override.field.Picker", {
    override: "Ext.field.Picker",
    //根据标签名称设置空白提示语
    updateLabel: function (value) {
        //如果已经配置空白提示语则不执行
        if (value && !this.getPlaceholder()) { 
            this.setPlaceholder('请选择' + value);
        }
        this.callParent(arguments);
    }
});