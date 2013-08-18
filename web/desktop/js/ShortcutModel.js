/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * @class Ext.ux.desktop.ShortcutModel
 * @extends Ext.data.Model
 * This model defines the minimal set of fields for desktop shortcuts.
 */
Ext.define('Ext.ux.desktop.ShortcutModel', {
    extend: 'Ext.data.Model',
    fields: [
        //中文名
        {name: 'name'},
        //桌面图标的css Class
        {name: 'iconCls'},
        //应用标识
        {name: 'module'},
        //注释
        {name: 'comme'},
        //类名
        {name: 'class'},
        //应用范围
        //用于判断是否需要在桌面初始化图标
        //如果为desktop需要，其他不需要
        {name: 'appscope'}
    ],
    beLongsTo: 'ccb.exam.model.user'
});
