/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//用户工作汇报相关的store
Ext.define('ccb.exam.store.reptStore', {
    extend: 'Ext.data.Store',
    model: 'ccb.exam.model.reportInfo',
    id: 'reptStore',
    buffered: true,
    leadingBufferZone: 300,
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: comm.pubUtil.baseUrl + '/exam/reportUtil.nutz',
        api: {
            create: comm.pubUtil.baseUrl + '/exam/crtrpt.nutz',
            update: comm.pubUtil.baseUrl + '/exam/updateReport.nutz'
        },
        reader: {
            root: 'retVal',
            totalProperty: 'total',
            successProperty:'success',
            model: 'ccb.exam.model.reportInfo',
            messageProperty:'retMsg'
        },
        listeners:{
            //增加读取数据出错的处理
            exception: function(proxy, response, operation){
                var obj = Ext.JSON.decode(response.responseText);
                if( obj.retCode === '0009' ){
                    comm.pubUtil.sessTimeOut();
                }else{
                    Ext.Msg.alert('读取数据出现了错误',obj.retMsg);
                }               
            }
        }
    },
    autoLoad: true,
    autoSync: true
    
});

