package com.ccb.dl.ccbexam.dao;

import org.nutz.dao.entity.annotation.*;



/**
* 
*/
@Table("B_M_EXM_ROLE_FUNC")
@PK({"roleid","name"})
public class BmexmRoleFunc {

	/**
	 * 角色编号
	 */
	@Column("ROLEID")
        
	private String roleid;
	/**
	 * 功能名
	 */
	@Column("NAME")
	private String name;
	/**
	 * 图标名
	 */
	@Column("ICONCLS")
	private String iconcls;
	/**
	 * 前台模块名
	 */
	@Column("MODULE")
	private String module;
}