/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ccb.dl.ccbexam.util;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.nutz.dao.entity.Record;
import org.nutz.json.Json;

/**
 *
 * @author admin
 */
public class ExportExcel {
    public static Object getJsonFromString(String json){
        return Json.fromJson(json);
    }
    public static Object JsonPath(Object json, String src) {
        int i;
        int j;
        String temp;
        Object obj = json;
        boolean k = false;
        while (src.length() > 0) {
            if (k) {
                i = src.indexOf("]");
                if (i == src.length()) {
                    break;
                }
                int intv = Integer.valueOf(src.substring(0, i));
                src = src.substring(i + 1);
                obj = ((List) obj).get(intv);
                k = false;
            } else {
                i = src.indexOf("[");
                j = src.indexOf(".");
                if (i >= 0 && (i < j || j < 0)) {
                    temp = src.substring(0, i);
                    src = src.substring(i + 1);
                    k = true;
                    if (i != 0) {
                        obj = ((Map) obj).get(temp);
                    }
                } else if (j >= 0 && (j < i || i < 0)) {
                    temp = src.substring(0, j);
                    src = src.substring(j + 1);
                    if (j != 0) {
                        obj = ((Map) obj).get(temp);
                    }
                } else if (i < 0 && j < 0) {
                    obj = ((Map) obj).get(src);
                    return obj;
                } else {
                    return null;
                }
            }
        }
        return obj;
    }
    public static List<String> getFileds(String fileds){
        List<String> list=new ArrayList();
        int k=0;
        System.out.println(fileds);
        while((k=fileds.indexOf("#"))>=0)
        {
            if(fileds.length()==0)
                break;
            if(k!=0)
                list.add(fileds.substring(0,k));
            fileds=fileds.substring(k+1);
            System.out.println(fileds);
        }
        list.add(fileds);
        return list;
    }
    public static void WriteExcel(File f,List<Record> list,List<String> listField){
          int rowLength=list.size()+1;
          int columnLength=listField.size();
          String[][] result=new String[rowLength][columnLength];
          for(int i=0;i<columnLength;i++)
          {
              result[0][i]=listField.get(i);
          }
          for(int i=0;i<list.size();i++)
          {
              Record rd=list.get(i);
              for(int j=0;j<columnLength;j++)
              {
                  if(rd.get(result[0][j].toLowerCase())!=null)
                    result[i+1][j]=""+rd.get(result[0][j].toLowerCase());
                  else
                    result[i+1][j]="";
              }
          }
        try{
            write(f,"asd",result);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
        public static void WriteExcel(File f,List<Record> list,List<String> listField,Record rdName){
          int rowLength=list.size()+1;
          int columnLength=listField.size();
          String[][] result=new String[rowLength][columnLength];
          for(int i=0;i<columnLength;i++)
          {
              result[0][i]=(String) rdName.get(listField.get(i));
          }
          for(int i=0;i<list.size();i++)
          {
              Record rd=list.get(i);
              for(int j=0;j<columnLength;j++)
              {
                  if(rd.get(listField.get(j).toLowerCase())!=null)
                    result[i+1][j]=""+rd.get(listField.get(j).toLowerCase());
                  else
                    result[i+1][j]="";
              }
          }
        try{
            write(f,"asd",result);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    public static void WriteExcel(File f,List<Record> list){
          if(list.size()<0)
              return;
          Record rd=list.get(0);
          String[] d=new String[rd.getColumnCount()];
          rd.getColumnNames().toArray(d);
          List<String> fieldlist=new ArrayList();
          for(int i=0;i<d.length;i++){
              fieldlist.add(d[i]);
          }
          WriteExcel(f,list,fieldlist);
    }
    public static List<String> getFieldList(Record rd){
          Iterator<String> set = rd.getColumnNames().iterator();
          List<String> fieldlist=new ArrayList();
          while(set.hasNext()){
              fieldlist.add(set.next());
          }
          return fieldlist;
    }
    public static void WriteExcel(File f,List<Record> list,Record rdName){
          if(list.size()<0)
              return;
          Record rd=list.get(0);
          List<String> fieldlist=getFieldList(rd);
          WriteExcel(f,list,fieldlist,rdName);
    }
    
    public static File WriteExcel(String filepath,List<Record> list){
         File f = new File(filepath);
         if (!f.isDirectory()) {
             f.mkdirs();
         }
         File file=new File(filepath+"/"+System.currentTimeMillis()+".xls");
         WriteExcel(file,list);
         return file;
    }
    
    public static File WriteExcel(String filepath,List<Record> list,Record rdName){
         File f = new File(filepath);
         if (!f.isDirectory()) {
             f.mkdirs();
         }
         File file=new File(filepath+"/"+System.currentTimeMillis()+".xls");
         WriteExcel(file,list,rdName);
         return file;
    }
    public static File WriteExcel(String filepath,List<Record> list,List<String> listfield,Record rdName){
         File f = new File(filepath);
         if (!f.isDirectory()) {
             f.mkdirs();
         }
         File file=new File(filepath+"/"+System.currentTimeMillis()+".xls");
         WriteExcel(file,list,listfield,rdName);
         return file;
    }
    
    public static File wirte(String filepath,String sheetName,String result[][]) throws Exception{
         File f = new File(filepath);
         if (!f.isDirectory()) {
             f.mkdirs();
         }
         File file=new File(filepath+"/"+System.currentTimeMillis()+".xls");
         write(file,sheetName,result);
         return file;
    }
    private static void write(File f, String sheetName, String[][] result) throws Exception {
        Workbook wb = new HSSFWorkbook();
        Sheet sheet = wb.createSheet();
        wb.setSheetName(0, sheetName);

        Row row = null;
        for (int i = 0; i < result.length; i++) {
            row = sheet.createRow(i);
            for (int j = 0; j < result[i].length; j++) {
                Cell c = row.createCell(j);
                c.setCellValue(result[i][j]);
               // sheet.setColumnWidth(j, (short) ((50 * 8) / ((double) 1 / 20)));
            }
        }
        FileOutputStream out = new FileOutputStream(f);
        wb.write(out);
        out.close();
    }
    public static String[][] read(File f, String sheetName) throws Exception {
        String[][] result;
        FileInputStream fis = new FileInputStream(f);
        Workbook workbook = WorkbookFactory.create(fis);

        Sheet sheet = workbook.getSheet(sheetName);
        if(sheet==null)
            return null;
        result = new String[sheet.getLastRowNum() + 1][];
        Row row = null;
        for (int i = 0; i < result.length; i++) {
            row = sheet.getRow(i);
            if(row.getLastCellNum()>=0)
                result[i] = new String[row.getLastCellNum()];
            else
                continue;
            for (int j = 0; j < result[i].length; j++) {
                if(row.getCell(j)==null){
                    result[i][j]="";
                    continue;
                }
                if (row.getCell(j).getCellType() == Cell.CELL_TYPE_NUMERIC) {
                    result[i][j] = row.getCell(j).getNumericCellValue() + "";
                } else {
                    result[i][j] = row.getCell(j).getStringCellValue();
                }
            }
        }
        fis.close();
        return result;
    }
        public static String[][] read(File f) throws Exception {
        String[][] result;
        FileInputStream fis = new FileInputStream(f);
        Workbook workbook = WorkbookFactory.create(fis);

        Sheet sheet = workbook.getSheetAt(0);
        if(sheet==null)
            return null;
        result = new String[sheet.getLastRowNum() + 1][];
        Row row = null;
        for (int i = 0; i < result.length; i++) {
            row = sheet.getRow(i);
            if(row.getLastCellNum()>=0)
                result[i] = new String[row.getLastCellNum()];
            else
                continue;
            for (int j = 0; j < result[i].length; j++) {
                if(row.getCell(j)==null){
                    result[i][j]="";
                    continue;
                }
                if (row.getCell(j).getCellType() == Cell.CELL_TYPE_NUMERIC) {
                    result[i][j] = row.getCell(j).getNumericCellValue() + "";
                } else {
                    result[i][j] = row.getCell(j).getStringCellValue();
                }
            }
        }
        fis.close();
        return result;
    }
        public static String[][] read(File f,int sheetIndex,int columnnum) throws Exception {
        String[][] result;
        FileInputStream fis = new FileInputStream(f);
        Workbook workbook = WorkbookFactory.create(fis);

        Sheet sheet = workbook.getSheetAt(sheetIndex);
        if(sheet==null)
            return null;
        result = new String[sheet.getLastRowNum() + 1][columnnum];
        for(int i=0;i<result.length;i++){
            for(int j=0;j<columnnum;j++)
                result[i][j]="";
        }
        Row row = null;
        for (int i = 0; i < result.length; i++) {
            row = sheet.getRow(i);
            for (int j = 0; j < columnnum&&j<row.getLastCellNum(); j++) {
                if(row.getCell(j)==null){
                    result[i][j]="";
                    continue;
                }
                if (row.getCell(j).getCellType() == Cell.CELL_TYPE_NUMERIC) {
                    result[i][j] = row.getCell(j).getNumericCellValue() + "";
                } else {
                    result[i][j] = row.getCell(j).getStringCellValue();
                }
            }
        }
        fis.close();
        return result;
    }
}
