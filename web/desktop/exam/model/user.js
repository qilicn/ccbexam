/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/*******
 * 定义用户模型与功能点模型
 * @param {type} param1
 * @param {type} param2
 */
Ext.define('ccb.exam.model.user',{
    extend: 'Ext.data.Model',
    fields: [
        {name : 'userid',type :'string'},
        {name : 'passwd',type :'string'},
        {name : 'username',type:'string'},
        {name : 'orgno',type:'string'},
        {name : 'userrole',type:'string'}
    ],
    hasMany  : {model: 'Ext.ux.desktop.ShortcutModel',name:'shortcuts'}
});

