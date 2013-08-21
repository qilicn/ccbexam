/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//定义领导人工作汇报的模型
Ext.define('ccb.exam.model.reportInfo',{
    extend: 'Ext.data.Model',
    fields : [
        {name : 'id'},
        //汇报日期
        {name : 'rdate',type :'string'},
        //汇报类型
        {name : 'rtype',type : 'string'},
        //汇报内容
        {name : 'rept',type : 'string'},
        //汇报状态(中文）
        {name : 'rstatus',type: 'string'},
        //汇报状态（代码)
        {name :'stscode',type:'string'}
    ]
});


