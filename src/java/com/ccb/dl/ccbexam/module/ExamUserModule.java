/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam.module;

import com.ccb.dl.ccbexam.bean.CcbExamUserSessionBean;
import com.ccb.dl.ccbexam.bean.RetBean;
import com.ccb.dl.ccbexam.dao.BmexmRptFlow;
import com.ccb.dl.ccbexam.util.DaoRecordUtil;
import com.ccb.dl.ccbexam.util.PubUtil;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.nutz.log.Log;
import org.nutz.dao.Dao;
import org.nutz.dao.entity.Record;
import org.nutz.dao.impl.FileSqlManager;
import org.nutz.ioc.aop.Aop;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.log.Logs;
import org.nutz.mvc.Mvcs;
import org.nutz.mvc.adaptor.JsonAdaptor;
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

    private long getSerialId(String seqName) {
        String sql = "select %s.nextval serial from dual ";
        sql = String.format(sql, seqName);
        Record rd = DaoRecordUtil.getRecord(dao, sql);
        return rd.getInt("serial");
    }

    @At("/exam/getUserInfo")
    @Ok("json")
    @Fail("json")
    @AdaptBy(type = PairAdaptor.class)
    @Aop({"exceptionHandle"})
    public RetBean getUserInfo(@Param("userId") String userId,
            @Param("passWord") String passWord) {
        log.debug(userId);
        Record rd = null;
        List<Record> slist = null;

        String sql = fsm.get("getUserLoginInfo");

        sql = String.format(sql, userId);
        log.debug("查找用户的sql:" + sql);
        rd = DaoRecordUtil.getRecord(dao, sql);

        if (rd == null) {
            log.info("用户名不正确:" + userId);
            return PubUtil.GenRetBean("0005", "用户ID输入错误", "");

        } else {
            String epass = PubUtil.getPassWord(passWord);
            log.debug("epass:" + epass + " dpass:" + rd.getString("passwd"));
            if (epass.compareTo(rd.getString("passwd")) != 0) {
                log.info("密码不正确:" + userId);
                return PubUtil.GenRetBean("0006", "密码不正确", "");
            } else {
                sql = fsm.get("getRoleFuncInfo");
                sql = String.format(sql, rd.getString("userRole"));
                log.debug(sql);
                slist = DaoRecordUtil.getRecords(dao, sql);

                if (slist.isEmpty() == false) {
                    rd.set("shortcuts", slist);
                    usb.setVal("userInfo", rd);
                    HttpSession sess = Mvcs.getHttpSession();
                    sess.setAttribute("userId", rd);
                    return PubUtil.GenSuccess(rd);
                } else {
                    return PubUtil.GenRetBean("0003", "该用户未分配功能，不能登录", "");
                }
            }
        }

    }

    /**
     * 用户改密
     *
     * @param userId
     * @param opassWd
     * @param passWd1
     * @return
     */
    @At("/exam/chgpwd")
    @Ok("json")
    @Fail("json")
    @Aop({"sesschk", "exceptionHandle"})
    public RetBean chgpwd(@Param("userId") String userId, @Param("opassWd") String opassWd,
            @Param("passWd1") String passWd1) {
        log.debug(userId + "|" + opassWd + "|" + passWd1);

        Record rd = null;
        String sql = "";

        //验证用户密码是否正确

        sql = fsm.get("getUserLoginInfo");

        sql = String.format(sql, userId);
        log.debug("查找用户的sql:" + sql);
        rd = DaoRecordUtil.getRecord(dao, sql);


        if (rd == null) {
            log.info("用户名不正确:" + userId);
            return PubUtil.GenFailed("0005", "用户ID输入错误");

        } else {
            //校验用户密码是否正确
            String epass = PubUtil.getPassWord(opassWd);
            log.debug("epass:" + epass + " dpass:" + rd.getString("passwd"));
            if (epass.compareTo(rd.getString("passwd")) != 0) {
                log.info("密码不正确:" + userId);
                return PubUtil.GenFailed("0006", "旧密码不正确");
            }

            //插入数据库
            //计算新密码的密后值
            epass = PubUtil.getPassWord(passWd1);
            sql = fsm.get("changeUserPassword");
            sql = String.format(sql, epass, userId);
            log.info("更新用户密码sql :" + sql);
            int count = DaoRecordUtil.excuteSql(dao, sql);
            log.debug("更新记录 : " + count);

            return PubUtil.GenSuccessOnly();


        }
    }

    /**
     * 提取某一领导人的工作事项
     *
     * @param page
     * @param limit
     * @return
     */
    @At("/exam/reportUtil")
    @Ok("json")
    @Fail("json")
    @Aop({"sesschk", "exceptionHandle"})
    public RetBean getUserReport(@Param("page") int page, @Param("limit") int limit) {
        String sql = "";
//        int total = 50000;
        sql = fsm.get("getUserReport");
        log.debug("page :" + page + ";limit:" + limit);
        Record rd = (Record) usb.getVal("userInfo");
        if (rd == null) {
            return PubUtil.GenFailed("0009", "用户已超时");
        }
        sql = String.format(sql, rd.getString("userid"), rd.getString("userid"));
        Integer total = (Integer) usb.getVal("totalCount");
        if (total == null) {
            total = DaoRecordUtil.getSqlSize(dao, sql);
            usb.setVal("totalCount", total);
        }

        List<Record> list = DaoRecordUtil.getRecords(dao, sql, page, limit);
        return PubUtil.GenSuccess(list, total);
        //return list;
    }

    @At("exam/getWorkDate")
    @Ok("json")
    @Fail("json")
    @Aop({"sesschk", "exceptionHandle"})
    public RetBean getWorkDate(@Param("range") int range) {
        String sql = "";
        sql = fsm.get("getCanReportDate");
        sql = String.format(sql, range);
        log.debug(sql);
        List<Record> list = DaoRecordUtil.getRecords(dao, sql);
        return PubUtil.GenSuccess(list, list.size());
    }

    /**
     * 创建一条工作汇报
     */
    @At("exam/crtrpt")
    @Ok("json")
    @Fail("json")
    @Aop({"sesschk", "exceptionHandle"})
    @AdaptBy(type = JsonAdaptor.class)
    public RetBean createReport(BmexmRptFlow flow) {
        Record rd = (Record) usb.getVal("userInfo");
        String userId = rd.getString("userid");

        long id = this.getSerialId("B_M_EXM_FLOW_SEQ");
        flow.setRptstatus("0");
        flow.setUserid(userId);
        dao.insert(flow);

        usb.removeVal("totalCount");
        return PubUtil.GenSuccessOnly();
    }

    @At("exam/delrpt")
    @Ok("json")
    @Fail("json")
    @Aop({"sesschk", "exceptionHandle"})
    @AdaptBy(type = JsonAdaptor.class)
    public RetBean deleteRept(BmexmRptFlow flow) {
        dao.delete(flow);
        usb.removeVal("totalCount");
        return PubUtil.GenSuccessOnly();
    }
}
