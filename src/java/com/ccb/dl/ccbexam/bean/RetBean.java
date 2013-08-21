/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam.bean;

/**
 *
 * @author yx
 */
public class RetBean {
    private String retCode;
    private String retMsg;
    private Object retVal;
    private boolean success;
    private String errMsg; 
    private int total;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getErrMsg() {
        return errMsg;
    }

    public void setErrMsg(String errMsg) {
        this.errMsg = errMsg;
    }
    
    

    public String getRetCode() {
        return retCode;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setRetCode(String retCode) {
        this.retCode = retCode;
    }

    public String getRetMsg() {
        return retMsg;
    }

    public void setRetMsg(String retMsg) {
        this.retMsg = retMsg;
    }

    public Object getRetVal() {
        return retVal;
    }

    public void setRetVal(Object retVal) {
        this.retVal = retVal;
    }
    
    
}
