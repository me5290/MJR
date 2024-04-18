package project1.model.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Dao {
    // DB 연동용 클래스입니다.
    // ---------- JDBC DB연동 ----------//
    public Connection conn;
    public PreparedStatement ps;
    public ResultSet rs;
    public Dao(){
        try {
            // 1. mysql JDBC 호출 ( 각 회사별  상이 , 라이브러리 다운로드 )
            Class.forName("com.mysql.cj.jdbc.Driver");
            // 2. 해당 db서버의 주소와 db연동
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mzr", "root", "1234");
            System.out.println("DB 연동됨");
        }catch (Exception e ){   System.out.println(e); }
        //리민형
    }
}