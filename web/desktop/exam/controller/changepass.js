/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//用户更换密码功能
Ext.define('ccb.exam.controller.changepass', {
    extend: 'Ext.app.Controller',
    views: ['changepass'],
    msg:null,
    init: function() {
        this.control({
            'changepass button[action=change]': {
                click: this.change
            },
            'changepass button[action=close]': {
                click: this.close
            }
        });
    },
    change: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var bform = form.getForm();
        if( bform.hasInvalidField() === false ){
            Ext.MessageBox.alert('有非法的输入项，请检查后提交');
            return;
        }
    },
    close: function(button) {

    }
});


