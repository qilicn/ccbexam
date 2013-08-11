/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var ioc={
    dataSource : {
        type : "com.alibaba.druid.pool.DruidDataSource",
        events : {
            depose : 'close'
        },
        fields : {
            driverClassName : 'oracle.jdbc.OracleDriver',
            poolPreparedStatements : 'true',
            testWhileIdle : 'true',
            timeBetweenEvictionRunsMillis : 10000,
            maxOpenPreparedStatements : 100,
//            url : 'jdbc:h2:tcp://localhost/~/test;CACHE_TYPE=TQ ;CACHE_SIZE=131072',
            url : 'jdbc:oracle:thin:@localhost:1521:orcl',
            username : 'examine',
            password : 'examine',
            initialSize : 10,
            maxActive : 30,
            validationQuery : 'SELECT 1 from dual ',
            maxWait : '60000',
            minIdle : 10
//            ,
//            filters:'stat'
        }
    },
    dao : {
        type:'org.nutz.dao.impl.NutDao',
        args:[{
             refer:'dataSource'
          // jndi:"jdbc/splii"
        }]
    },
    fsm : {
        type:'org.nutz.dao.impl.FileSqlManager',
        args:['H2.sql']
    }

};

