/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//用户工作汇报相关的store
Ext.define('ccb.exam.store.reptStore', {
    extend: 'Ext.data.Store',
    model: 'ccb.exam.model.reportInfo',
    id: 'reptStore',
//    buffered: true,
//    leadingBufferZone: 300,
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: comm.pubUtil.baseUrl + '/exam/reportUtil.nutz',
        api: {
            create: comm.pubUtil.baseUrl + '/exam/createReport.nutz',
            update: comm.pubUtil.baseUrl + '/exam/updateReport.nutz'
        },
        reader: {
            root: 'retVal',
            totalProperty: 'total'
        },
    },
    autoLoad: true
});

