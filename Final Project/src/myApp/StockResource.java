package myApp;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/stock")
public class StockResource {

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public List<Stock> getStockQuantities() {
		return StockDao.instance.getStockQuantities();
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("/read/{barcode}")
	public Stock getStockItem(@PathParam("barcode") String barcode) {
		return StockDao.instance.getStockItem(barcode);
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("/order/")
	public List<Order> getOrderQuantities() {
		return StockDao.instance.getOrderQuantities();
	}

	@POST
	@Produces
	@Path("/create/")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public void postStock(@FormParam("barcode") String barcode,
			@FormParam("quantity") String quantity,
			@FormParam("name") String productName,
			@FormParam("price") String price,
			@FormParam("description") String description,
			@FormParam("department") String department,
			@FormParam("min_level") String min_level) {
		Stock s = new Stock();
		s.setBarcode(barcode);
		s.setQuantity(Integer.parseInt(quantity));
		s.setName(productName);
		s.setPrice(Double.parseDouble(price));
		s.setDescription(description);
		s.setDepartment(department);
		s.setMin_level(Integer.parseInt(min_level));
		StockDao.instance.create(s);
		StockDao.instance.reloadFromDB();
		StockDao.instance.reloadFromDBorder();
	}

	@POST
	@Produces
	@Path("/update/")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public void updateStock(@FormParam("barcode") String barcode,
			@FormParam("option") String option,
			@FormParam("newValue") String newValue) {
		StockDao.instance.update(barcode, option, newValue);
		StockDao.instance.reloadFromDB();
		StockDao.instance.reloadFromDBorder();
	}

	@POST
	@Produces
	@Path("/quickupdate/")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public void quickUpdateStock(@FormParam("barcode") String barcode,
			@FormParam("option") String option,
			@FormParam("newValue") String newValue) {
		StockDao.instance.quickupdate(barcode, option, newValue);
		StockDao.instance.reloadFromDB();
		StockDao.instance.reloadFromDBorder();
	}

	@DELETE
	@Produces(MediaType.TEXT_HTML)
	@Path("/delete/{barcode}")
	public void deleteStock(@PathParam("barcode") String barcode)
			throws IOException {
		StockDao.instance.delete(barcode);
		StockDao.instance.reloadFromDB();
		StockDao.instance.reloadFromDBorder();
	}
}
