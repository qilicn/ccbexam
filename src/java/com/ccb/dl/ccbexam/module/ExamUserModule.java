/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam.module;

import com.ccb.dl.ccbexam.dao.BmexmRoleFunc;
import com.ccb.dl.ccbexam.dao.BmexmUserInfo;
import com.ccb.dl.ccbexam.util.PubUtil;
import java.util.List;
import org.nutz.dao.Cnd;
import org.nutz.log.Log;
import org.nutz.dao.Dao;
import org.nutz.dao.impl.FileSqlManager;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.log.Logs;
import org.nutz.mvc.adaptor.PairAdaptor;
import org.nutz.mvc.annotation.AdaptBy;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Ok;
import org.nutz.mvc.annotation.Param;

/**
 *
 * @author yangxin
 */
@IocBean(scope = "request")
public class ExamUserModule {
    
    @Inject
    private Dao dao;
    private static final Log log = Logs.getLog(ExamUserModule.class);
    @Inject
    private FileSqlManager fsm;  
    
    
    @At("/exam/getUserInfo")
    @Ok("json")
    @Fail("json")
    @AdaptBy(type=PairAdaptor.class)
    public BmexmUserInfo getUserInfo(@Param("userId") String userId,
                                       @Param("passWord") String passWord){
        log.debug(userId);
        BmexmUserInfo uinfo = dao.fetch(BmexmUserInfo.class, userId);
        if( uinfo == null ){
            uinfo = new BmexmUserInfo();
            uinfo.setUserId("");
        }else{
            String epass = PubUtil.getPassWord(passWord);
            log.debug("epass:"+epass+" dpass:"+uinfo.getPassword());
            if(epass.compareTo(uinfo.getPassword()) != 0 ){
                uinfo.setUserId("");
            }else{
                List<BmexmRoleFunc> list = dao.query(BmexmRoleFunc.class, Cnd.where("roleid","=",uinfo.getUserRole()));
                if( list != null ){
                    uinfo.setShortcuts(list);
                }
            }              
        }                
        return uinfo;
        
        
        
    }
}
