package com.ccb.dl.ccbexam.dao;

import org.nutz.dao.entity.annotation.*;

/**
 *
 */
@Table("B_M_EXM_RPT_FLOW")
public class BmexmRptFlow {

    /**
     *
     */
    @Column("ID")
    @Id
    @Prev(@SQL("select B_M_EXM_FLOW_SEQ.nextval  from dual"))
    private Long id;
    /**
     *
     */
    @Column("USER_ID")
    private String userid;
    /**
     *
     */
    @Column("RPTDATE")
    private String rdate;
    /**
     *
     */
    @Column("RPTTYPE")
    private String rtype;
    /**
     *
     */
    @Column("RPTCONX")
    private String rept;
    /**
     * 0: 已提交， 1:审批通过， 2: 作废
     */
    @Column("RPTSTATUS")
    private String rptstatus;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getRdate() {
        return rdate;
    }

    public void setRdate(String rdate) {
        this.rdate = rdate;
    }

    public String getRtype() {
        return rtype;
    }

    public void setRtype(String rtype) {
        this.rtype = rtype;
    }

    public String getRept() {
        return rept;
    }

    public void setRept(String rept) {
        this.rept = rept;
    }

    public String getRptstatus() {
        return rptstatus;
    }

    public void setRptstatus(String rptstatus) {
        this.rptstatus = rptstatus;
    }
    
    
}