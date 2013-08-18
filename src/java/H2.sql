/**查找用户信息**/
/*getUserLoginInfo*/
SELECT INFO.USER_ID userId,
       INFO.USER_NAME userName,
       INFO.USER_KEY userRole,
       LOGIN.PASSWORD passwd,
       INFO.ORG_NO orgNo
  FROM    EXAMINE.B_M_EXM_USER_INFO info
       LEFT JOIN
          EXAMINE.B_M_EXM_LOGIN_INFO login
       ON INFO.USER_ID = LOGIN.USER_ID
 WHERE INFO.USER_ID = '%s'
/**取用户功能列表**/
/*getRoleFuncInfo*/
SELECT info.name name,
       info.iconcls iconCls,
       info.module module,
       info.comments comme,
       info.class class,
       info.appscope
  FROM examine.b_m_exm_func_info info
 WHERE info.id IN (SELECT name
                       FROM b_m_exm_role_func func
                      WHERE func.roleId = '%s')