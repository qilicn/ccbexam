/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.base.BaseAjaxProxy',{
   extend : 'Ext.data.proxy.Ajax',
   baseUrl:'http://localhost:8084/ccbexam',
   constructor : function(){
       this.url = this.baseUrl+this.url;
       this.callParent;
   }
});

