/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam.module;

import com.ccb.dl.ccbexam.bean.CcbExamUserSessionBean;
import com.ccb.dl.ccbexam.bean.RetBean;
import com.ccb.dl.ccbexam.util.DaoRecordUtil;
import com.ccb.dl.ccbexam.util.PubUtil;
import java.util.List;
import org.nutz.log.Log;
import org.nutz.dao.Dao;
import org.nutz.dao.entity.Record;
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
    @Inject
    private CcbExamUserSessionBean usb;
    
    @At("/exam/getUserInfo")
    @Ok("json")
    @Fail("json")
    @AdaptBy(type = PairAdaptor.class)
    public RetBean getUserInfo(@Param("userId") String userId,
            @Param("passWord") String passWord) {
        log.debug(userId);
        RetBean rt;
        Record rd = null;
        List<Record> slist = null;
        
        try {
            log.debug(fsm.count());
            String sql = fsm.get("getUserLoginInfo");
            
            sql = String.format(sql, userId);
            log.debug("查找用户的sql:" + sql);
            rd = DaoRecordUtil.getRecord(dao, sql);            
        } catch (Exception e) {
            log.fatal(e);
            rt = PubUtil.GenRetBean("0009", "系统异常，请稍后在试", "");
            return rt;
        }
        if (rd == null) {
            rt = PubUtil.GenRetBean("0005", "用户ID输入错误", "");
            log.info("用户名不正确:" + userId);
        } else {
            String epass = PubUtil.getPassWord(passWord);
            log.debug("epass:" + epass + " dpass:" + rd.getString("passwd"));
            if (epass.compareTo(rd.getString("passwd")) != 0) {
                rt = PubUtil.GenRetBean("0006", "密码不正确", "");
                log.info("密码不正确:" + userId);
            } else {
                try 
                {
                    String sql = fsm.get("getRoleFuncInfo");
                    sql = String.format(sql, rd.getString("userRole"));
                    log.debug(sql);
                    slist = DaoRecordUtil.getRecords(dao, sql);
                } catch (Exception e) {
                    log.fatal(e);
                    rt = PubUtil.GenRetBean("0009", "系统错误，请稍后再试", "");
                    return rt;
                }
                if (slist.isEmpty() == false) {
                    rd.set("shortcuts", slist);                                                                    
                    usb.setVal("userInfo", rd);
                    rt = PubUtil.GenRetBean("0000", "用户验证成功", rd);
                } else {
                    rt = PubUtil.GenRetBean("0003", "该用户未分配功能，不能登录", "");
                }
            }
        }
        return rt;
    }
}
