/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('ccb.exam.util.ScreenType', {
    loadStype: function() {
      var store =  Ext.create('Ext.data.Store', {
            fields: ['type', 'code'],
            data: [
                {type: '宽屏显示', code: 'w'},
                {type: '窄屏显示', code: 's'}
            ]
        });
        return store;
    }
})

