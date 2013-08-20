/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam.util;

import cn.ccb.dl.cryo.DESCipher;
import com.ccb.dl.ccbexam.bean.RetBean;

/**
 *
 * @author yx
 */
public class PubUtil {

    public static String getPassWord(String strBaseKey) {
        try {
            return DESCipher.getEncryptString("11111111", strBaseKey);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //如果不加success，意味这自己ajax成功，但应用是否成功需要通过retCode来判断
    //所以，这里success返回true
    //如果在form中，不应调用这个类
    //这个类仅是为了保留给以前通过原生方法的ajax调用使用
    public static RetBean GenRetBean(String retCode, String retMsg, Object retVal) {
        RetBean rt = new RetBean();
        rt.setRetCode(retCode);
        rt.setRetMsg(retMsg);
        rt.setRetVal(retVal);
        rt.setSuccess(true);
        return rt;
    }

    public static RetBean GenRetBean(String retCode, String retMsg, Object retVal, boolean success) {
        RetBean rt = new RetBean();
        rt.setRetCode(retCode);
        rt.setRetMsg(retMsg);
        rt.setRetVal(retVal);
        rt.setSuccess(success);
        return rt;
    }

    public static RetBean GenSuccessOnly() {
        RetBean rt = new RetBean();
        rt.setRetCode("0000");
        rt.setSuccess(true);
        rt.setRetMsg("方法调用成功");        
        return rt;
    }

    public static RetBean GenSuccess(Object RetVal) {
        RetBean rt = new RetBean();
        rt.setRetCode("0000");
        rt.setSuccess(true);
        rt.setRetMsg("方法调用成功");
        rt.setRetVal(RetVal);
        return rt;
    }

    public static RetBean GenFailed(String retCode, String retMsg) {
        RetBean rt = new RetBean();
        rt.setRetCode(retCode);
        rt.setRetMsg(retMsg);
        rt.setSuccess(false);
        return rt;
    }

    public static RetBean GenFailed(String retCode, String retMsg, String errMsg) {
        RetBean rt = new RetBean();
        rt.setRetCode(retCode);
        rt.setRetMsg(retMsg);
        rt.setErrMsg(errMsg);
        rt.setSuccess(false);
        return rt;
    }
}
