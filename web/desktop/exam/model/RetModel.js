/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//定义通用返回模型
Ext.define('ccb.exam.model.RetModel',{
    extend: 'Ext.data.Model',
    fields: [
        {name:'retCode',type:'string'},
        {name:'retMsg',type:'string'},
        {name:'retVal',type:'object'}
    ]
})

