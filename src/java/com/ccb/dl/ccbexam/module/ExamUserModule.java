/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam.module;

import com.ccb.dl.ccbexam.bean.CcbExamUserSessionBean;
import com.ccb.dl.ccbexam.bean.RetBean;
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
        BmexmUserInfo uinfo = null;
        try {
            uinfo = dao.fetch(BmexmUserInfo.class, userId);
        } catch (Exception e) {
            rt = PubUtil.GenRetBean("0009", "系统异常，请稍后在试", "");
            return rt;
        }
        if (uinfo == null) {
            rt = PubUtil.GenRetBean("0005", "用户ID输入错误", "");
            log.info("用户名不正确:" + userId);
        } else {
            String epass = PubUtil.getPassWord(passWord);
            log.debug("epass:" + epass + " dpass:" + uinfo.getPasswd());
            if (epass.compareTo(uinfo.getPasswd()) != 0) {
                rt = PubUtil.GenRetBean("0006", "密码不正确", "");
                log.info("密码不正确:" + userId);
            } else {
                List<BmexmRoleFunc> list = dao.query(BmexmRoleFunc.class, Cnd.where("roleid", "=", uinfo.getUserRole()));
                if (list != null) {
                    uinfo.setShortcuts(list);
                }
                usb.setVal("userInfo", uinfo);
                rt = PubUtil.GenRetBean("0000", "用户验证成功", uinfo);
            }
        }
        return rt;



    }
}
