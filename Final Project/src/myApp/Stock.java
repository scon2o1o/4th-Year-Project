package myApp;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "stock")
@XmlType(propOrder = { "barcode", "name", "price", "quantity", "description",
		"department", "min_level" })
public class Stock {
	private String name;
	private String barcode;
	private double price;
	private int quantity;
	private String description;
	private String department;
	private int min_level;

	public Stock() {
		super();
	}

	public Stock(String name, String barcode, double price, int quantity,
			String description, String department, int min_level) {
		super();
		this.name = name;
		this.barcode = barcode;
		this.price = price;
		this.quantity = quantity;
		this.description = description;
		this.department = department;
		this.min_level = min_level;
	}

	public String getName() {
		return name;
	}

	public String getBarcode() {
		return barcode;
	}

	public double getPrice() {
		return price;
	}

	public int getQuantity() {
		return quantity;
	}

	public String getDescription() {
		return description;
	}

	public String getDepartment() {
		return department;
	}

	public int getMin_level() {
		return min_level;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public void setMin_level(int min_level) {
		this.min_level = min_level;
	}

}
