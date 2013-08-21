/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam.util;


import java.util.List;
import org.nutz.dao.Dao;
import org.nutz.dao.Sqls;
import org.nutz.dao.entity.Record;
import org.nutz.dao.sql.Sql;

/**
 *
 * @author yx
 */
public class DaoRecordUtil {

    public static Record getRecord(Dao dao, String sql) {
        Sql s = Sqls.create(sql);
        s.setCallback(Sqls.callback.entity());
        s.setEntity(dao.getEntity(Record.class));
        dao.execute(s);
        return (Record) s.getResult();
    } 
    
    public static List<Record> getRecords(Dao dao, String sql) {
        Sql s = Sqls.create(sql);
        s.setCallback(Sqls.callback.entities());
        s.setEntity(dao.getEntity(Record.class));
        dao.execute(s);
        return (List<Record>) s.getList(Record.class);
    }
    
    public static int getSqlSize(Dao dao,String sql){
        sql="select count(*) as num from ( "+sql+" )";
        List<Record> list=getRecords(dao,sql);
        return list.get(0).getInt("num");
    }

    public static List<Record> getRecords(Dao dao, String sql,int page,int size) {
        Sql s = Sqls.create(sql);
        s.setCallback(Sqls.callback.entities());
        s.setPager(dao.createPager(page, size));
        s.setEntity(dao.getEntity(Record.class));
        dao.execute(s);
        return (List<Record>) s.getList(Record.class);
    }
    
    public static Object getRecort(Dao dao, String sql, Class t) {
        Sql s = Sqls.create(sql);
        s.setCallback(Sqls.callback.entity());
        s.setEntity(dao.getEntity(t));
        dao.execute(s);
        return s.getResult();
    }  

    public static List getRecords(Dao dao, String sql,Class t) {
        Sql s = Sqls.create(sql);
        s.setCallback(Sqls.callback.entities());
        s.setEntity(dao.getEntity(t));
        dao.execute(s);
        return  s.getList(Record.class);
    }

    public static List getRecords(Dao dao, String sql,Class t,int page,int size) {        
        Sql s = Sqls.create(sql);
        s.setCallback(Sqls.callback.entities());
        s.setPager(dao.createPager(page, size));
        s.setEntity(dao.getEntity(t));
        dao.execute(s);
        return  s.getList(Record.class);
    }    
    
    public static int excuteSql(Dao dao, String sql) {
        Sql s = Sqls.create(sql);
        dao.execute(s);
        return s.getUpdateCount();
    }

    /**
     * 用没有处理过的Nutz.sql带分页
     * @param dao
     * @param s
     * @param page
     * @param size
     * @return
     */
    public static Record getRecordsByNutSql(Dao dao, Sql s,int page,int size) {
        int total = getRecordSize(dao,s.toString());
        s.setCallback(Sqls.callback.entities());
        s.setPager(dao.createPager(page, size));
        s.setEntity(dao.getEntity(Record.class));
        dao.execute(s);
        Record rd = new Record();
        List<Record> records = s.getList(Record.class);
        rd.put("total", total);
        rd.put("rows", records);
        return rd;
    }

    public static int getRecordSize(Dao dao, String s){
        Sql _s = Sqls.create("select count(*) nums from ( "+s+" )");
        _s.setCallback(Sqls.callback.entity());
        _s.setEntity(dao.getEntity(Record.class));
        dao.execute(_s);
        return ((Record) _s.getResult()).getInt("nums");
    }
}
