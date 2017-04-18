/*
 * https://www.google.com/settings/security/lesssecureapps
 */

package myApp;

import java.io.FileWriter;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;

public enum StockDao {
	instance;
	Statement stmt = null;

	private Map<Integer, Stock> stockMap = new HashMap<Integer, Stock>();
	private Map<Integer, Order> orderMap = new HashMap<Integer, Order>();
	Stock test = new Stock();
	Order test2 = new Order();

	private StockDao() {
		reloadFromDB();
		reloadFromDBorder();
	}

	public Map<Integer, Order> reloadFromDBorder() {
		orderMap.clear();
		try {
			Class.forName("org.hsqldb.jdbcDriver");
			Connection con = DriverManager.getConnection(
					"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");

			PreparedStatement psmt = con
					.prepareStatement("SELECT * FROM ORDER_TABLE");

			ResultSet rs = psmt.executeQuery();

			while (rs.next()) {
				Order o = new Order(rs.getString("barcode"),
						rs.getString("name"), rs.getInt("quantity"));
				orderMap.put(orderMap.size() + 1, o);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return orderMap;

	}

	public Map<Integer, Stock> reloadFromDB() {
		stockMap.clear();
		try {
			Class.forName("org.hsqldb.jdbcDriver");
			Connection con = DriverManager.getConnection(
					"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");

			PreparedStatement psmt = con
					.prepareStatement("SELECT * FROM STOCK_TABLE ORDER BY department ASC");

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

	public List<Order> getOrderQuantities() {
		List<Order> order = new ArrayList<Order>();
		order.addAll(orderMap.values());
		return order;
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
		if (option.equals("barcode") || option.equals("department") || option.equals("description") || option.equals("name")) {
			try {
				System.out.println(barcode +", "+ option +", "+ newValue);
				Class.forName("org.hsqldb.jdbcDriver");
				Connection con = DriverManager.getConnection(
						"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");
				Statement stmt = con.createStatement();
				stmt.executeUpdate("UPDATE STOCK_TABLE SET " + option + " = '"
						+ newValue + "' where barcode = '" + barcode + "'");
				stmt.close();
				con.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			try {
				System.out.println(barcode +", "+ option +", "+ newValue);
				Class.forName("org.hsqldb.jdbcDriver");
				Connection con = DriverManager.getConnection(
						"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");
				Statement stmt = con.createStatement();
				stmt.executeUpdate("UPDATE STOCK_TABLE SET " + option + " = "
						+ newValue + " where barcode = '" + barcode + "'");
				stmt.close();
				con.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public void delete(String barcode) {
		try {
			Class.forName("org.hsqldb.jdbcDriver");
			Connection con = DriverManager.getConnection(
					"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");
			Statement stmt = con.createStatement();
			stmt.executeUpdate("DELETE FROM STOCK_TABLE WHERE barcode='"
					+ barcode + "'");
			stmt.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void quickupdate(String barcode, String option, String newValue) {
		try {
			Class.forName("org.hsqldb.jdbcDriver");
			Connection con = DriverManager.getConnection(
					"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");
			Statement stmt = con.createStatement();
			stmt.executeUpdate("UPDATE STOCK_TABLE SET " + option + " = "
					+ option + " + " + newValue + " where barcode = '"
					+ barcode + "'");
			stmt.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void sendOrder() throws SQLException {
		try {
			Class.forName("org.hsqldb.jdbcDriver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		Connection con = DriverManager.getConnection(
				"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");
		stmt = con.createStatement();
		try {
			ResultSet rs = stmt.executeQuery("select * from order_table");
			writeTableToFile(rs);
			rs.next();
			rs.close();
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}

	}

	public void writeTableToFile(ResultSet rs) {
		try {
			System.out.println("In writeToFile");
			FileWriter outputFile = new FileWriter("exportedOrderData.csv");
			PrintWriter printWriter = new PrintWriter(outputFile);
			ResultSetMetaData rsmd = rs.getMetaData();
			int numColumns = rsmd.getColumnCount();

			for (int i = 0; i < numColumns; i++) {
				printWriter.print(rsmd.getColumnLabel(i + 1) + ",");
				System.out.println(rsmd.getColumnLabel(i + 1) + ",");
			}
			printWriter.print("\n");
			while (rs.next()) {
				for (int i = 0; i < numColumns; i++) {
					printWriter.print(rs.getString(i + 1) + ",");
					System.out.println(rs.getString(i + 1) + ",");
				}
				printWriter.print("\n");
				printWriter.flush();
			}
			printWriter.close();
			outputFile.close();

			sendEmail();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void sendEmail() {
		String to = "shaneconcannon@gmail.com";
		String from = "collegelibrarysystem@gmail.com";

		final String username = "stockmanagementsystem001@gmail.com";
		final String password = "SMS12345";

		String host = "smtp.gmail.com";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", host);
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(username, password);
					}
				});
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));
			message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(to));
			Date date = new Date();
			message.setSubject("New Order Received");
			BodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart
					.setText("New Order From : 'Test Company'\nOrder Date: "
							+ date + "\nOrder Content: See Attachment");
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);

			messageBodyPart = new MimeBodyPart();
			String filename = "exportedOrderData.csv";
			DataSource source = new FileDataSource(filename);
			messageBodyPart.setDataHandler(new DataHandler(source));
			messageBodyPart.setFileName(filename);
			multipart.addBodyPart(messageBodyPart);

			message.setContent(multipart);
			Transport.send(message);
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}

	public void clearOrderTable() throws ClassNotFoundException, SQLException {
		Class.forName("org.hsqldb.jdbcDriver");
		Connection con = DriverManager.getConnection(
				"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");
		Statement stmt = con.createStatement();
		stmt.executeUpdate("DELETE FROM order_table");
		stmt.close();
		con.close();
	}
}
