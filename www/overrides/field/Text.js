//重写类 
//表单控件
Ext.define("override.field.Text", {
    override: "Ext.field.Text",
    //根据空白提示语设置必填提示
    updatePlaceholder: function (value) {
        //如果已经配置必填提示语则不执行
        if (value && !this.getRequiredMessage()) {
            this.setRequiredMessage(value);
        }
        this.callParent(arguments);
    },
    //根据标签名称设置空白提示语
    updateLabel: function (value) {
        //如果已经配置空白提示语则不执行
        if (value && !this.getPlaceholder()) { 
            this.setPlaceholder('请输入' + value);
        }
        this.callParent(arguments);
    }
});