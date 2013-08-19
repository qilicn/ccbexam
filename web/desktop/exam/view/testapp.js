/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.view.testapp', {
    extend: 'Ext.window.Window',
    alias: 'widget.testapp',
    width: 1024,
    height: 768,
    layout: 'fit',
    initComponent: function() {
        this.items = [
            {
                xtype: 'htmleditor',
                //xtype: 'textarea',
                id: 'notepad-editor',
                value: [
                    'Some <b>rich</b> <span style="color: rgb(255, 0, 0)">text</span> goes <u>here</u><br>',
                    'Give it a try!'
                ].join('')
            }
        ]

        this.callParent(arguments);
    }
});

