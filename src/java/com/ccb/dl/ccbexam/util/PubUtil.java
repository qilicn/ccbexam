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
    
    public static RetBean GenRetBean(String retCode , String retMsg , Object retVal){
        RetBean rt = new RetBean();
        rt.setRetCode(retCode);
        rt.setRetMsg(retMsg);
        rt.setRetVal(retVal);
        
        return rt;
    }
}
