/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * 定义用户存储在本地的信息
 */
Ext.define('ccb.exam.model.localInfo', {
    extend: 'Ext.data.Model',
    fields: [
        //用户Id，用户登录时显示
        {name: 'userId', type: 'string'},
        //屏幕类型,用于确定窗口大小
        {name: 'screenType', type: 'string'},
        //上次登录时间
        {name:'lastLogInTime',type:'string'},
        //是否显示帮助
        {name:'needHelp',type:'string'},
        //壁纸
        {name:'wallpage',type:'string'}
    ]
});

