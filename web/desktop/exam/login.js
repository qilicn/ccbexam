/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'ccb.exam',
    appFolder: 'exam',
    controllers: [
        'login'
    ],    
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype:'login'
                }
            ]
        });
    }
});


