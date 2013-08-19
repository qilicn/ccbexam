/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//用户登录认证及获取权限的store
Ext.define('ccb.exam.store.userchk',{
    require:['comm.pubUtil'],
    extend : 'Ext.data.Store',
    model : 'ccb.exam.model.RetModel',
    id : 'userChk',
    proxy :{
        type : 'ajax',
        url : comm.pubUtil.baseUrl+'/exam/getUserInfo.nutz'
    }
});

