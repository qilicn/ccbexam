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
        console.log('buuton click');
    },
    close: function(button) {

    }
});


