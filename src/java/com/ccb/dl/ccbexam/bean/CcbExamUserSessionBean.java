/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam.bean;

import java.util.HashMap;
import java.util.Map;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 *
 * @author yx
 */
@IocBean(name = "usb",scope = "session")
public class CcbExamUserSessionBean {
    //定义seesion级用户缓存
    private Map<String,Object> map = new HashMap<String, Object>();
    
    //存入内容
    public void setVal(String id ,Object val){
        map.put(id, val);
    }
    
    //取出内容
    public Object getVal(String id){
        return map.get(id);
    }
    
    //查找内容
    public boolean contains( String id){
        return map.containsKey(id);
    }
    
    public void removeVal( String id ){
        map.remove(id);
    }
}
