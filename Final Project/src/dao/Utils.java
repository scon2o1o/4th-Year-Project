package dao;

import java.sql.Connection;
import java.sql.DriverManager;

class Utils {
   public static Connection getConnection() {

      Connection connection = null;
      try {
         Class.forName("org.hsqldb.jdbcDriver");
         connection = DriverManager.getConnection(
               "jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");
      } catch (Exception e) {
         e.printStackTrace();
      }
      return connection;
   }

}
 