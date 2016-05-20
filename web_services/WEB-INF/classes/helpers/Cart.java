package helpers;

import java.util.*;

/**
 * This class represents a single cart in an application. This class is taken from
 * Professor Riggins examples. It handles all operations pertaining to a single
 * cart.
 *
 */
public class Cart implements java.io.Serializable {
    private String id;
    private Hashtable<String, Integer> table;

    public Cart(String sessionId) {
    	id = sessionId;
	table = new Hashtable<String, Integer>();
	}
	
    public String getId() {
    	return id;
	}
	
    public int size() {
    	return table.size();
	}
	
    public void insert(String s, int q) {
    	Integer quantity = table.get(s);
	if(quantity == null) 
		table.put(s,q);
	else
		table.put(s,quantity+q);
	}
	
    public void delete(String s) {
    	table.remove(s);
	}
	
    public void clear() {
        table.clear();
	}
	
    public int getQty(String s) {
    	Integer tmp = table.get(s);
	if(tmp == null) return 0;
	return tmp;
	}
	
    public Iterator<String> keys() {
    	return table.keySet().iterator();
	}
	
    public Iterator<Integer> values() {
    	return table.values().iterator();
	}
}	
    	
    
    
