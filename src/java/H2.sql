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
       info.module module,
       info.appscope
  FROM examine.b_m_exm_func_info info
 WHERE info.module IN (SELECT name
                       FROM b_m_exm_role_func func
                      WHERE func.roleId = '%s')
/**更改用户密码**/
/*changeUserPassword*/
UPDATE b_m_exm_login_info login
   SET LOGIN.PASSWORD = '%s'
 WHERE LOGIN.USER_ID = '%s'