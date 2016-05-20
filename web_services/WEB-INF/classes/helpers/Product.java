package helpers;

/**
 * This class represents the product bean and contains all the product
 * attributes.
 *
 */
public class Product implements java.io.Serializable {
	private String sku, category, vendor, vendorModel,
	               description, features, cost, retail, image, onHandQuantity;

	public Product() {}
	
	public Product(String s, String c, String v, String vM,
			String d, String f, String cst, String r, String i, String oHQ) {
		sku = s; category = c; vendor = v; vendorModel = vM;
		description = d; features = f; cost = cst; retail = r;
		image = i; onHandQuantity = oHQ;
		}
		
	public void setSku(String s) 		{ sku = s; }
	public void setCategory(String s) 	{ category = s; }
	public void setVendor(String s) 	{ vendor = s; }
	public void setVendorModel(String s) 	{ vendorModel = s; }
	public void setDescription(String s) 	{ description = s; }
	public void setFeatures(String s) 	{ features = s; }
	public void setCost(String s) 		{ cost = s; }					
	public void setRetail(String s) 	{ retail = s; }
	public void setImage(String s) 		{ image = s; }	
	public void setOnHandQuantity(String s) 	{ onHandQuantity = s; }	
	
	public String getSku() 			{ return sku; }	
	public String getCategory() 		{ return category; }
	public String getVendor() 		{ return vendor; }
	public String getVendorModel() 		{ return vendorModel; }
	public String getDescription() 		{ return description.replaceAll("\\r\\n\\t\\f", ""); }			     
	public String getFeatures() 		{ return features.replaceAll("\\r\\n\\t\\f", ""); }
	public String getCost() 		{ return cost; }
	public String getRetail() 		{ return retail; }
	public String getImage() 		{ return image; }
	public String getOnHandQuantity() 	{ return onHandQuantity; }	
	
	public String toString() {

		return sku+"|&|"+category+"|&|"+vendor+"|&|"+vendorModel+"|&|"+getDescription()+"|&|"+getFeatures()+"|&|"+
		cost+"|&|"+retail+"|&|"+image+"|&|"+onHandQuantity;
		
	}
}
