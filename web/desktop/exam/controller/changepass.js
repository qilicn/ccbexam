/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//用户更换密码功能
Ext.define('ccb.exam.controller.changepass', {
    extend: 'Ext.app.Controller',
    views: ['changepass', 'testapp_2'],
    msg: null,
    init: function() {
        this.control({
            'changepass button[action=change]': {
                click: this.change
            },
            'changepass button[action=close]': {
                click: this.close
            },
            'changepass button[action=test]': {
                click: this.test
            }
        });
    },
    //获取指定form的basic类
    getBform: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var bform = form.getForm();
        return bform;
    },
    change: function(button) {
        var bform = this.getBform(button);
        if (bform.hasInvalidField() === true) {
            Ext.MessageBox.alert('有非法的输入项，请检查后提交');
            return;
        }

        var sessInfo = comm.pubUtil.getUserInfo();

        bform.submit({
            url: comm.pubUtil.baseUrl + '/exam/chgpwd.nutz',
            mothod: 'GET',
            params: {userId: sessInfo.userid},
            waitMsg: '提交中，请稍后....',
            success: function(form, action) {
                comm.pubUtil.sessTimeOut('密码更新成功', '您已成功更新密码，现在将退出系统使用新密码登录');
            },
            failure: function(form, action) {
                var result = action.result;
                comm.pubUtil.storeErrLog(result);
                Ext.Msg.alert('处理失败', result.retMsg);
            }
        });
    },
    close: function(button) {
        var bform = this.getBform(button);
        bform.setValues([
            {id: 'opassWd', value: null},
            {id: 'passWd1', value: null},
            {id: 'passWd2', value: null}
        ]);
        bform.clearInvalid();
        return;
    },
    test: function(button) {
        var view = Ext.widget('testapp_2');
        console.log(view);
        view.show();
    }
});


