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
/**查找一个领导人的工作日志**/
/*getUserReport*/
 SELECT *
    FROM (SELECT id id,
                 rptdate rdate,
                 rpttype rtype,
                 rptconx rept,
                 CASE FLOW.RPTSTATUS
                    WHEN '0' THEN '未审批'
                    WHEN '1' THEN '审批通过'
                    WHEN '2' THEN '拒绝'
                 END
                    rstatus,
                 FLOW.RPTSTATUS stscode
            FROM B_M_EXM_RPT_FLOW flow
           WHERE user_id = '%s'
          UNION ALL
          SELECT sysid id,
                 TO_CHAR (TO_DATE (req_startdate, 'yyyy-mm-dd'), 'yyyymmdd')
                    rdate,
                 CASE holiday.req_type
                    WHEN '1' THEN '出差'
                    WHEN '2' THEN '请假'
                 END
                    rtype,
                 req_remark rept,
                 CASE holiday.req_status
                    WHEN '0' THEN '未审批'
                    WHEN '1' THEN '审批通过'
                    WHEN '2' THEN '拒绝'
                 END
                    rstatus,
                 holiday.req_status stscode
            FROM B_M_EXM_SPV_HOLIDAY holiday
           WHERE req_user = '%s') info
ORDER BY info.id desc, info.rdate DESC
/**取可补录的日期**/
/*getCanReportDate*/
SELECT workdate
  FROM (SELECT T.*, ROWNUM RN
          FROM (  SELECT cal.workdate
                    FROM B_M_EXM_WORK_CAL cal
                   WHERE     CAL.WORKDATE <= (SELECT PARAM.WORKVALUE
                                                FROM B_M_EXM_WORKPARAM param
                                               WHERE PARAM.WORKKEY = 'curdate')
                         AND CAL.DATEFLAG = '0'
                ORDER BY CAL.WORKDATE DESC) T
         WHERE ROWNUM <= %d)
 WHERE RN >= 0