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
        {name : 'userId',type :'string'},
        {name : 'passwd',type :'string'},
        {name : 'userName',type:'string'},
        {name : 'userClass',type:'string'},
        {name : 'userRole',type:'string'}
    ],
    hasMany  : {model: 'ccb.exam.model.shortcut', name: 'shortcuts'}
});
Ext.define('ccb.exam.model.shortcut',{
    extend: 'Ext.data.Model',
    fields: [
       { name: 'name' },
       { name: 'iconCls' },
       { name: 'module' }
    ],
    belongsTo : 'ccb.exam.model.use' 
});

