/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.controller.workReport', {
    extend: 'Ext.app.Controller',
    views: ['workReport'],
    msg: null,  
    init: function() {
        this.control({
            'workReport button[id=addReprt]':{
                click : this.addReport
            }
        });
    },
    addReport : function(button){
        console.log(button);
    }        
    
});

