package myApp;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "order")
@XmlType(propOrder = { "barcode", "name", "quantity" })
public class Order {
	private String barcode;
	private String name;
	private int quantity;

	public Order(String barcode, String name, int quantity) {
		super();
		this.barcode = barcode;
		this.name = name;
		this.quantity = quantity;
	}

	public Order() {
		super();
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
