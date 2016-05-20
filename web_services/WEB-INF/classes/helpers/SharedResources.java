package helpers;

import java.util.Hashtable;


/**
 * This class contains all the shared resources used by
 * different servlets. It contains product details and cart
 * details for each user session. There will only be one instance
 * of each of the shared resources and the resources will be served
 * as singleton.
 *
 */
public class SharedResources {
    // Shopping cart for each user session
    private static Hashtable<String, Cart> shoppingCart;

    //Product table
    private static Hashtable<String, Product> productTable ;

    public static void initialize(){
        shoppingCart   =  new Hashtable<String, Cart>();
        productTable   =  new Hashtable<String, Product>(DBHelper.getProducts());
    }

    /**
     * Returns the Shopping cart
     *
     * @return
     */
    public static Hashtable<String, Cart> getShoppingCart(){
        if(shoppingCart == null)
            shoppingCart   =  new Hashtable<String, Cart>();

        return shoppingCart;
    }

    /**
     * Returns the productTable
     *
     * @return
     */
    public static Hashtable<String, Product> getProducttable(){
        if(productTable == null)
            productTable   =  new Hashtable<String, Product>(DBHelper.getProducts());

        return productTable;
    }

    public static Hashtable<String, Product> updateProductQuantity(){
        Hashtable<String,Product> myProducts = getProducttable();
        Hashtable<String,Integer> productQuantity = DBHelper.getProductOnHandQuantity();
        for(String sku : productQuantity.keySet()){
            Product p = myProducts.get(sku);
            p.setOnHandQuantity(productQuantity.get(sku).toString());
            myProducts.put(sku,p);
        }
        return myProducts;
    }
}
