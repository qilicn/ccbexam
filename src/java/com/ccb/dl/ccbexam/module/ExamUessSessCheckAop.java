/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam.module;

import com.ccb.dl.ccbexam.util.PubUtil;
import javax.servlet.http.HttpSession;
import org.nutz.aop.InterceptorChain;
import org.nutz.aop.MethodInterceptor;
import org.nutz.dao.Dao;
import org.nutz.dao.entity.Record;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.log.Log;
import org.nutz.log.Logs;
import org.nutz.mvc.Mvcs;

/**
 *
 * @author yx 处理并返回意外
 */
@IocBean(name = "sesschk")
public class ExamUessSessCheckAop implements MethodInterceptor {

    private static final Log log = Logs.getLog(ExamUessSessCheckAop.class);
    @Override
    public void filter(InterceptorChain ic) throws Throwable {
        HttpSession sess = Mvcs.getHttpSession();
        Record rd = (Record) sess.getAttribute("userId");
        if( rd == null ){
            log.fatal("用户sess信息未取得");
            ic.setReturnValue(PubUtil.GenFailed("0009", "用户信息未取得"));
            return;
        }
        ic.doChain();
        
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
