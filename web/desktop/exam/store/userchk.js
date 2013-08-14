/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//用户登录认证及获取权限的store
Ext.define('ccb.exam.store.userchk',{
    extend : 'Ext.data.Store',
    model : 'ccb.exam.model.user',
    
    proxy :{
        type : 'ajax',
        url : exam_golbal.baseUrl+'/exam/getUserInfo.nutz'
    }
});

