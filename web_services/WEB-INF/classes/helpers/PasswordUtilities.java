package helpers;

import java.lang.System;
import java.security.*;
import java.util.*;
import java.io.*;

public class PasswordUtilities {

    public static void createUsers(){
        insertUser("Ashpak","9930041717");
        //insertUser("Humi","Patel_90");
        insertUser("Humpak","Humpak");
        insertUser("jadrn022","819819");
    }

    public static  boolean insertUser(String usr, String pass){
        String username = usr.trim();
        String encryptedPassword = getEncryptedPassword(pass.trim());
        return DBHelper.runUpdateQuery("Insert into user values('"+username+"','"+encryptedPassword+"');");
    }

    public static boolean isValidLogin(String username, String password) {
       String encryptedPassword = getEncryptedPassword(password);
       Vector<String[]> dbResult = DBHelper.runQuery("Select * from user where username ='"+username+"';");
       for(int i=0; i < dbResult.size(); i++) {
           String dbUsername = dbResult.get(i)[0];
           String dbPassword = dbResult.get(i)[1];
            if(dbUsername.equals(username) &&
                    dbPassword.equals(encryptedPassword))
                return true;                             
            }   // end for
        return false;
        }
        
    public static String getEncryptedPassword(String str) {   
        try {  
            MessageDigest d = MessageDigest.getInstance("MD5");
            byte [] b = str.getBytes();     
            d.update(b);
            return  byteArrayToHexString(d.digest());
            }
        catch(Exception e) {
            e.printStackTrace();               
            }
    return null;
    }          
    
    private static String byteArrayToHexString(byte[] b){
        String str = "";
        for(int i=0; i < b.length; i++) {
            int value = b[i] & 0xFF;
            if(value < 16)
                str += "0";
            str += Integer.toHexString(value);
            }
        return str.toUpperCase();
        }

}
