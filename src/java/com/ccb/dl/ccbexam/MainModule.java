/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam;

import org.nutz.mvc.annotation.IocBy;
import org.nutz.mvc.annotation.Modules;
import org.nutz.mvc.ioc.provider.ComboIocProvider;

/**
 *
 * @author cys
 */
@Modules(scanPackage = true)
@IocBy(type=ComboIocProvider.class,
        args={"*org.nutz.ioc.loader.json.JsonLoader","app.js",
        "*org.nutz.ioc.loader.annotation.AnnotationIocLoader","com.ccb.dl.mmisii"})

public class MainModule {
    
}