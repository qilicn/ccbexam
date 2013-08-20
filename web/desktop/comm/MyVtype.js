/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('comm.MyVtype', {
    statics: {
//两个字段值相等的校验的Vtype校验
        fieldEq: function() {
            var obj = new Object();
            Ext.apply(obj, {
                fieldEqualedText: '这两个字段值不能相同',
                firstName: null,
                secondName: null,
                tempText: '这两个字段值不能相同',
                fieldEqualed: function(val, field) {
                    var firstVal = null,
                            firstField = null,
                            secondVal = null,
                            secondField = null,
                            status = true;

                    if (field.fieldEqualed) {
                        if (field.fieldEqualed.firstField) {
                            firstField = Ext.getCmp(field.fieldEqualed.firstField);
                            firstVal = firstField.getValue();
                        }
                        if (field.fieldEqualed.secondField) {
                            secondField = Ext.getCmp(field.fieldEqualed.secondField);
                            secondVal = secondField.getValue();
                        }
                    }
                    if (firstVal === secondVal) {
                        this.fieldEqualedText = null;
                        this.fieldEqualedText = firstField.getFieldLabel() + '与' + secondField.getFieldLabel() + ":" + this.tempText;
                        status = false;
                    }
                    return status;
                }
            });
            return obj;
        },
        fieldNotEq: function() {
            var obj = new Object();
            Ext.apply(obj, {
                fieldEqualedText: null,
                firstName: null,
                secondName: null,
                tempText: '这两个字段值必须相同',
                fieldNotEqualed: function(val, field) {
                    var firstVal = null,
                            firstField = null,
                            secondVal = null,
                            secondField = null,
                            status = true;

                    if (field.fieldEqualed) {
                        if (field.fieldNotEqualed.firstField) {
                            firstField = Ext.getCmp(field.fieldNotEqualed.firstField);
                            firstVal = firstField.getValue();
                        }
                        if (field.fieldNotEqualed.secondField) {
                            secondField = Ext.getCmp(field.fieldNotEqualed.secondField);
                            secondVal = secondField.getValue();
                        }
                    }
                    if (firstVal !== secondVal) {
                        this.fieldEqualedText = null;
                        this.fieldEqualedText = firstField.getFieldLabel() + '与' + secondField.getFieldLabel() + ":" + this.tempText;
                        status = false;
                    }
                    return status;
                }
            });
            return obj;
        },
        //更改密码的校验规则
        chkPwd: function() {
            var obj = new Object();
            Ext.apply(obj, {
                chkPwdText: null,
                tempTexto: '新旧密码必须不同',
                tempTextn: '两次输入的新密码不同',
                chkPwd: function(val, field) {
                    var of = null, //旧密码域
                            ff = null, //新密码域
                            sf = null, //重输的新密码域
                            ov = null, //就密码值
                            fv = null, //新密码值
                            sv = null, //重输的新密码值
                            status = true; //返回状态       
                    if (field.chkPwd) {
                        if (field.chkPwd.of) {
                            of = Ext.getCmp(field.chkPwd.of);
                            ov = of.getValue();
                        }
                        if (field.chkPwd.ff) {
                            ff = Ext.getCmp(field.chkPwd.ff);
                            fv = ff.getValue();
                        }
                        if (field.chkPwd.sf) {
                            sf = Ext.getCmp(field.chkPwd.sf);
                            sv = sf.getValue();
                        }                        
                    }
                    if( ov && fv  ){
                        if( ov === fv ){
                            this.chkPwdText = this.tempTexto;
                            status = false;
                        }
                    }
                    if( fv && sv ){
                        if( fv !== sv ){
                            this.chkPwdText = this.tempTextn;
                            status = false;
                        }
                    }
                    return status;
                }
            });
            return obj;
        }
//    var obj = {
//        chkPwdText: null,
//        tempTexto: '新旧密码必须不同',
//        tempTextn: '两次输入的新密码不同',
//        chkPwd: function(val, field) {
//            var of = null, //旧密码域
//                    ff = null, //新密码域
//                    sf = null, //重输的新密码域
//                    ov = null, //就密码值
//                    fv = null, //新密码值
//                    sv = null, //重输的新密码值
//                    status = true; //返回状态
//
//            if (field.chkPwd) {
//                if (field.chkPwd.of) {
//                    of = Ext.getCmp(field.chkPwd.of);
//                    ov = of.getValue();
//                }
//                if (field.chkPwd.ff) {
//                    ff = Ext.getCmp(field.chkPwd.ff);
//                    fv = ff.getValue();
//                }
//                if (field.chkPwd.sf) {
//                    sf = Ext.getCmp(field.chkPwd.sf);
//                    sv = sf.getValue();
//                }
//                if (ov && fv) {
//                    if (ov === fv) {
//
//                    }
//
//                }
//            }
//        }

    }
});

