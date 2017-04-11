package myApp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public enum StockDao {
	instance;

	private Map<Integer, Stock> stockMap = new HashMap<Integer, Stock>();
	Stock test = new Stock();

	private StockDao() {
		reloadFromDB();
	}

	public Map<Integer, Stock> reloadFromDB() {
		try {
			Class.forName("org.hsqldb.jdbcDriver");
			Connection con = DriverManager.getConnection(
					"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");

			PreparedStatement psmt = con
					.prepareStatement("SELECT * FROM STOCK_TABLE");

			ResultSet rs = psmt.executeQuery();

			while (rs.next()) {
				Stock s = new Stock(rs.getString("name"),
						rs.getString("barcode"), rs.getFloat("price"),
						rs.getInt("quantity"), rs.getString("description"),
						rs.getString("department"), rs.getInt("min_level"));
				stockMap.put(stockMap.size() + 1, s);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return stockMap;
	}

	public List<Stock> getStockQuantities() {
		List<Stock> stock = new ArrayList<Stock>();
		stock.addAll(stockMap.values());
		return stock;
	}

	public Stock getStockItem(String barcode) {
		try {
			Class.forName("org.hsqldb.jdbcDriver");
			Connection con = DriverManager.getConnection(
					"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");

			PreparedStatement psmt = con
					.prepareStatement("SELECT * FROM STOCK_TABLE WHERE BARCODE='"
							+ barcode + "'");

			ResultSet rs = psmt.executeQuery();

			while (rs.next()) {
				Stock s = new Stock(rs.getString("name"),
						rs.getString("barcode"), rs.getFloat("price"),
						rs.getInt("quantity"), rs.getString("description"),
						rs.getString("department"), rs.getInt("min_level"));
				System.out.println(s);
				test = s;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return test;
	}

	public void create(Stock stock) {
		try {
			Class.forName("org.hsqldb.jdbcDriver");
			Connection con = DriverManager.getConnection(
					"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");
			Statement stmt = con.createStatement();
			stmt.executeUpdate("INSERT INTO STOCK_TABLE VALUES ('"
					+ stock.getBarcode() + "', " + stock.getQuantity() + ", '"
					+ stock.getName() + "', " + stock.getPrice() + ", '"
					+ stock.getDescription() + "', '" + stock.getDepartment()
					+ "', " + stock.getMin_level() + ")");
			stmt.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void update(String barcode, String option, String newValue) {
		try {
			Class.forName("org.hsqldb.jdbcDriver");
			Connection con = DriverManager.getConnection(
					"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");
			Statement stmt = con.createStatement();
			stmt.executeUpdate("UPDATE STOCK_TABLE SET " + option + "=" + newValue
					+ "where barcode='" + barcode + "'");
			stmt.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
 
	public void delete(String barcode) {
		try {
			Class.forName("org.hsqldb.jdbcDriver");
			Connection con = DriverManager.getConnection(
					"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");
			Statement stmt = con.createStatement();
			stmt.executeUpdate("DELETE FROM STOCK_TABLE WHERE barcode='" + barcode +"'");
			stmt.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
