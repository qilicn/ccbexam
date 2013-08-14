package com.ccb.dl.ccbexam.dao;

import java.util.List;
import org.nutz.dao.entity.annotation.*;


@Table("B_M_EXM_USER_INFO")
public class BmexmUserInfo {

	/**
	 * 
	 */
	@Name
	@Column("USER_ID")
	private String userId;
	/**
	 * 
	 */
	@Column("USER_NAME")
	private String userName;
	/**
	 * 
	 */
	@Column("UPPER_USER")
	private String upperUser;
	/**
	 * 
	 */
	@Column("USER_KEY")
	private String userRole;
	/**
	 * 
	 */
	@Column("ORG_NO")
	private String orgNo;
	/**
	 * 
	 */
	@Column("EXAMINE_FLAG")
	private String examineFlag;
	/**
	 * 
	 */
	@Column("STAFF_ID")
	private String staffId;
	/**
	 * 
	 */
	@Column("PASSWORD")
	private String password;
        
        private List<BmexmRoleFunc> shortcuts;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUpperUser() {
        return upperUser;
    }

    public void setUpperUser(String upperUser) {
        this.upperUser = upperUser;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getOrgNo() {
        return orgNo;
    }

    public void setOrgNo(String orgNo) {
        this.orgNo = orgNo;
    }

    public String getExamineFlag() {
        return examineFlag;
    }

    public void setExamineFlag(String examineFlag) {
        this.examineFlag = examineFlag;
    }

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<BmexmRoleFunc> getShortcuts() {
        return shortcuts;
    }

    public void setShortcuts(List<BmexmRoleFunc> shortcuts) {
        this.shortcuts = shortcuts;
    }        
}