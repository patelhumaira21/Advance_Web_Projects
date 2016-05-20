package helpers;

import java.lang.String;
import java.lang.System;
import java.sql.*;
import java.util.*;

/**
 * This class acts as a helper for all the Database related processing to the servlets.
 *
 *
 */
public class DBHelper implements java.io.Serializable {

	private static String connectionURL = "jdbc:mysql://opatija:3306/jadrn022?user=jadrn022&password=removal";
	private static Connection connection = null;
	private static Statement statement = null;
	private static ResultSet resultSet = null;

	public DBHelper() {
	}

    /**
     * This method runs the quesry and returns the result in the form of
     * vector.
     *
     * @param s
     * @return
     */
	public synchronized static Vector runQuery(String s) {
		String answer = "";
		Vector<String[]> answerVector = null;

		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			connection = DriverManager.getConnection(connectionURL);
			statement = connection.createStatement();
			resultSet = statement.executeQuery(s);
			ResultSetMetaData rsmd = resultSet.getMetaData();
			answerVector = new Vector<String[]>();
			while (resultSet.next()) {
				String[] row = new String[rsmd.getColumnCount()];
				for (int i = 0; i < rsmd.getColumnCount(); i++)
					row[i] = resultSet.getString(i + 1);
				answerVector.add(row);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (resultSet != null)
					resultSet.close();
				if (statement != null)
					statement.close();
				if (connection != null)
					connection.close();
			} catch (SQLException e) {
				answer += e;
			}
		}
		return answerVector;

	}

    /**
     * This method runs the update query to the database and returns a boolean value
     * representing if the query was successful.
     *
     *
     * @param s
     * @return
     */
	public synchronized static boolean runUpdateQuery(String s) {
		int result = 0;
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			connection = DriverManager.getConnection(connectionURL);
			statement = connection.createStatement();
			result = statement.executeUpdate(s);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (statement != null)
					statement.close();
				if (connection != null)
					connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return (result > 0);
	}

    /**
     * This method returns all the products in the form of hashmap
     *
     *
     * @return
     */
	public synchronized static HashMap<String, Product> getProducts() {
		HashMap<String, Product> hashMap = new HashMap<String, Product>();
		Vector<String[]> v = DBHelper
				.runQuery("SELECT sku, category.name as category, vendor.name as vendor,"
						+ "manufactureID,description, features, cost, retail, image, NULL "
						+ "FROM product, category, vendor "
						+ "WHERE product.catID = category.id AND product.venID = vendor.id;");

		for (int i = 0; i < v.size(); i++) {
			String[] tmp = v.elementAt(i);
			Product b = new Product(tmp[0], tmp[1], tmp[2], tmp[3], tmp[4],
					tmp[5], tmp[6], tmp[7], tmp[8], tmp[9]);
			hashMap.put(tmp[0], b);
		}
		return hashMap;
	}

    /**
     * This method gets the in_hand quantity for the given sku.
     *
     * @param sku
     * @return
     */
	public synchronized static int getOnHandQuantity(String sku) {
		Vector<String[]> dbResult = runQuery("Select * from on_hand where sku ='"
				+ sku + "';");
		System.out.println("Size=" + dbResult.size());
		if (dbResult.size() == 0) {
			return -9999;
		} else {
			System.out.println("Quantity=" + dbResult.get(0)[2]);
			return Integer.parseInt(dbResult.get(0)[2]);
		}
	}

    /**
     * This method gets the list of product with the in-Hand quanity of the product.
     *
     * @return
     */
    public synchronized static Hashtable<String,Product> getProductWithQuantity(){

        Hashtable<String, Product> productTable = new Hashtable<String, Product>();
        Vector<String[]> v = DBHelper
                .runQuery("SELECT product.*, on_hand.on_hand_quantity FROM "
                        + "(SELECT sku, category.name as category , vendor.name as vendor, "
                        + "manufactureID, description, features, cost, retail, image "
                        + "FROM product, category, vendor WHERE product.catID = category.id "
                        + "AND product.venID = vendor.id) product "
                        + "LEFT OUTER JOIN "
                        + "(SELECT *  FROM on_hand) on_hand  "
                        + "ON product.sku = on_hand.sku");

        for (int i = 0; i < v.size(); i++) {
            String[] tmp = v.elementAt(i);
            Product b = new Product(tmp[0], tmp[1], tmp[2], tmp[3], tmp[4],
                    tmp[5], tmp[6], tmp[7], tmp[8], tmp[9]);
            productTable.put(tmp[0], b);
        }
        return productTable;
    }


    public synchronized static Hashtable<String,Integer> getProductOnHandQuantity(){

        Hashtable<String, Integer> productTable = new Hashtable<String, Integer>();
        Vector<String[]> v = DBHelper
                .runQuery ("SELECT sku,on_hand_quantity  FROM on_hand");
        for (int i = 0; i < v.size(); i++) {
            String[] tmp = v.elementAt(i);
            productTable.put(tmp[0],Integer.parseInt(tmp[1]));
        }
        return productTable;
    }

    /**
     * This method returns a stringified list of categories.
     *
     * @return
     */
    public synchronized static String getCategoryValues(){
        return vectorToString(runQuery("SELECT DISTINCT name FROM category;"));
    }

    /**
     * This method returns a stringified list of vendors.
     *
     * @return
     */
    public synchronized static String getVendorValues(){
        return vectorToString(runQuery("SELECT DISTINCT name FROM vendor;"));
    }

    /**
     * This method converts a vector to a stringified list.
     *
     * @param vect
     * @return
     */
    private static String vectorToString(Vector<String[]> vect) {
        String value = "";
        for (int i = 0; i < vect.size(); i++) {
            if (i == (vect.size() - 1)) {
                value += vect.get(i)[0];
            } else {
                value += vect.get(i)[0] + "|&|";
            }
        }

        return value;
    }

}
