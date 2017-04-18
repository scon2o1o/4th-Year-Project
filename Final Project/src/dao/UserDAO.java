package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.User;

public enum UserDAO {
	instance;

	public User checkLogin(String username, String password) {
		Connection connection = Utils.getConnection();
		User user = null;

		try {
			PreparedStatement psmt = connection
					.prepareStatement("SELECT * FROM login_table WHERE USERNAME = ? AND PASSWORD = ?");
			psmt.setString(1, username);
			psmt.setString(2, password);
			ResultSet rs = psmt.executeQuery();
			if (rs.next()) {
				user = new User(rs.getString("firstName"),
						rs.getString("surname"), rs.getString("username"),
						rs.getString("password"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

	public User save(User user) {
		Connection connection = Utils.getConnection();

		try {
			PreparedStatement psmt = connection
					.prepareStatement("INSERT INTO login_table (username, password, firstName, surname) VALUES (?, ?, ?, ?)");
			psmt.setString(1, user.getUsername());
			psmt.setString(2, user.getPassword());
			psmt.setString(3, user.getFirstName());
			psmt.setString(4, user.getSurname());
			psmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}
}
