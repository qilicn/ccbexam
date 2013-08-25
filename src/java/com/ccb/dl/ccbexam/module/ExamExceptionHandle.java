/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam.module;

import com.ccb.dl.ccbexam.util.DaoRecordUtil;
import com.ccb.dl.ccbexam.util.PubUtil;
import org.nutz.aop.InterceptorChain;
import org.nutz.aop.MethodInterceptor;
import org.nutz.dao.Dao;
import org.nutz.dao.entity.Record;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.log.Log;
import org.nutz.log.Logs;

/**
 *
 * @author yx 处理未预期的异常与系统锁定的情况
 */
@IocBean(name = "exceptionHandle")
public class ExamExceptionHandle  implements MethodInterceptor{
    @Inject
    private Dao dao;
    
    private static final Log log = Logs.getLog(ExamExceptionHandle.class);
    @Override
    public void filter(InterceptorChain ic) throws Throwable {
        try{     
            String sql = "select * from B_M_EXM_WORK_CTRL where ctrl_type = 'lock'";
            Record rd = DaoRecordUtil.getRecord(dao, sql);
            if( rd.getString("ctrl_value").compareToIgnoreCase("no")==0)
                ic.doChain();
            else{
                ic.setReturnValue(PubUtil.GenFailed("0001", "为审批工作汇报，系统已锁定，请稍后再试"));
                return;
            }
        }catch(Exception ex){
            ic.setReturnValue(PubUtil.GenFailed("0007", "出现了未知意外，请联系管理员"));
            log.fatal(ex.getMessage());
            return;
        }       
    }
    
}
